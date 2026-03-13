import { NextResponse } from "next/server"

export async function GET() {
  const backendUrl = process.env.MEDUSA_BACKEND_URL
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  if (!backendUrl) {
    return NextResponse.json({
      status: "error",
      message: "MEDUSA_BACKEND_URL is not set",
    })
  }

  const results: Record<string, unknown> = {
    MEDUSA_BACKEND_URL: backendUrl,
    NEXT_PUBLIC_DEFAULT_REGION: process.env.NEXT_PUBLIC_DEFAULT_REGION,
    publishableKeySet: !!publishableKey,
    publishableKeyPrefix: publishableKey?.slice(0, 10) + "...",
  }

  // Test 1: health
  try {
    const healthRes = await fetch(`${backendUrl}/health`, {
      cache: "no-store",
    })
    results.health = { status: healthRes.status, ok: healthRes.ok }
  } catch (e: unknown) {
    results.health = {
      error: e instanceof Error ? e.message : String(e),
      cause:
        e instanceof Error && (e as NodeJS.ErrnoException).cause
          ? String((e as NodeJS.ErrnoException).cause)
          : undefined,
    }
  }

  // Test 2: store/regions
  try {
    const regionsRes = await fetch(`${backendUrl}/store/regions`, {
      headers: { "x-publishable-api-key": publishableKey! },
      cache: "no-store",
    })
    const body = await regionsRes.json()
    results.regions = { status: regionsRes.status, ok: regionsRes.ok, body }
  } catch (e: unknown) {
    results.regions = {
      error: e instanceof Error ? e.message : String(e),
      cause:
        e instanceof Error && (e as NodeJS.ErrnoException).cause
          ? String((e as NodeJS.ErrnoException).cause)
          : undefined,
    }
  }

  return NextResponse.json(results, { status: 200 })
}
