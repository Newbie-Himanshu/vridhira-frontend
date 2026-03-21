import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"
import { getBackendUrl } from "@lib/util/resolve-backend-url"

const BACKEND_URL = getBackendUrl()
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache

  // Return cached regions if available and fresh (within 1 hour)
  if (
    regionMap.keys().next().value &&
    regionMapUpdated > Date.now() - 3600 * 1000
  ) {
    return regionMap
  }

  // If cache is empty or stale, use default fallback without fetching
  // (Middleware runs in Edge context with network restrictions)
  // Pages will fetch regions server-side and handle rendering
  if (!regionMap.keys().next().value) {
    // Pre-populate with default region to prevent crashes
    const defaultRegion: HttpTypes.StoreRegion = {
      id: "default",
      name: DEFAULT_REGION === "in" ? "India" : "US",
      currency_code: DEFAULT_REGION === "in" ? "INR" : "USD",
      countries: DEFAULT_REGION === "in" 
        ? [{ iso_2: "in" }] 
        : [{ iso_2: "us" }],
    }
    regionMapCache.regionMap.set(DEFAULT_REGION || "in", defaultRegion)
    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
      )
    }
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  let redirectUrl = request.nextUrl.href

  let response = NextResponse.redirect(redirectUrl, 307)

  let cacheIdCookie = request.cookies.get("_medusa_cache_id")

  let cacheId = cacheIdCookie?.value || crypto.randomUUID()

  let regionMap: Map<string, HttpTypes.StoreRegion | number>

  try {
    regionMap = await getRegionMap(cacheId)
  } catch (e) {
    console.error("Middleware: failed to fetch region map:", e)
    // Always provide a fallback - never let middleware crash the entire app
    regionMap = new Map()
    const fallback: HttpTypes.StoreRegion = {
      id: "fallback",
      name: DEFAULT_REGION === "in" ? "India" : "US",
      currency_code: DEFAULT_REGION === "in" ? "INR" : "USD",
      countries: DEFAULT_REGION === "in" 
        ? [{ iso_2: "in" }] 
        : [{ iso_2: "us" }],
    }
    regionMap.set(DEFAULT_REGION || "in", fallback)
  }

  const countryCode = regionMap && (await getCountryCode(request, regionMap))

  const urlHasCountryCode =
    countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode)

  // if one of the country codes is in the url and the cache id is set, return next
  if (urlHasCountryCode && cacheIdCookie) {
    return NextResponse.next()
  }

  // if one of the country codes is in the url and the cache id is not set, set the cache id and redirect
  if (urlHasCountryCode && !cacheIdCookie) {
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })

    return response
  }

  // check if the url is a static asset
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next()
  }

  const redirectPath =
    request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname

  const queryString = request.nextUrl.search ? request.nextUrl.search : ""

  // If no country code is set, we redirect to the relevant region.
  if (!urlHasCountryCode && countryCode) {
    redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
    response = NextResponse.redirect(`${redirectUrl}`, 307)
  } else if (!urlHasCountryCode && !countryCode) {
    // Handle case where no valid country code exists (empty regions)
    return new NextResponse(
      "No valid regions configured. Please set up regions with countries in your Medusa Admin.",
      { status: 500 }
    )
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
