/**
 * ============================================================
 * VRIDHIRA — E-Commerce for Indian Artisans
 * ============================================================
 * @author      Himanshu
 * @github      https://github.com/Newbie-Himanshu
 * @repo        https://github.com/Newbie-Himanshu/frontend
 * @copyright   2026 Himanshu. All rights reserved.
 * @license     Dual-License (Community/Commercial) v2.0 — SEE LICENSE
 * ------------------------------------------------------------
 * @lastModifiedBy  Himanshu
 * @modifiedWith    GitHub Copilot
 * @modifiedOn      2026-03-07
 * @changeNote      Refactored to Server shell + NavShell client component for
 *                  floating pill scroll animation + landing page transparency.
 *                  Data fetching stays server-side; scroll state in client NavShell.
 * ============================================================
 */

import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavShell from "@modules/layout/components/nav-shell"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <NavShell
      sideMenu={
        <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
      }
      cartButton={
        <Suspense
          fallback={
            <a
              href="/cart"
              className="flex items-center gap-1 p-2 text-sm"
              data-testid="nav-cart-link"
            >
              Cart (0)
            </a>
          }
        >
          <CartButton />
        </Suspense>
      }
    />
  )
}
