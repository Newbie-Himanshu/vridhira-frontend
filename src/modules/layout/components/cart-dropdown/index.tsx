"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:          "rgba(255, 253, 249, 0.97)",
  border:      "rgba(232, 221, 212, 0.9)",
  primary:     "#C9762B",
  primaryBg:   "rgba(201, 118, 43, 0.08)",
  dark:        "#2C1810",
  muted:       "#8D6E63",
  separator:   "#E8DDD4",
  shadow:      "0 20px 60px rgba(44,24,16,0.18), 0 4px 12px rgba(44,24,16,0.08)",
  scrollThumb: "rgba(201,118,43,0.25)",
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

// ─── Empty bag illustration ───────────────────────────────────────────────────
const EmptyBag = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke={C.muted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open  = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems = cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const subtotal   = cartState?.subtotal ?? 0
  const itemRef    = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    open()
  }

  useEffect(() => {
    return () => { if (activeTimer) clearTimeout(activeTimer) }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div className="h-full z-50" onMouseEnter={openAndCancel} onMouseLeave={close}>
      <Popover className="relative h-full">
        <PopoverButton className="h-full outline-none">
          <LocalizedClientLink
            className="nvsh-icon relative flex items-center p-1.5 transition-opacity opacity-70 hover:opacity-100"
            href="/cart"
            data-testid="nav-cart-link"
            aria-label={`Cart (${totalItems} items)`}
          >
            {/* Cart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true">
              <circle cx="8"  cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>

            {/* Item count badge */}
            {totalItems > 0 && (
              <span
                style={{ background: C.primary }}
                className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full text-white text-[9px] font-bold leading-none ring-2 ring-white/20"
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </LocalizedClientLink>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-2 scale-[0.97]"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0 scale-100"
          leaveTo="opacity-0 translate-y-2 scale-[0.97]"
        >
          <PopoverPanel
            static
            data-testid="nav-cart-dropdown"
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              right: 0,
              width: 360,
              background: C.bg,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              boxShadow: C.shadow,
              overflow: "hidden",
              transformOrigin: "top right",
            }}
            className="hidden small:block"
          >
            {/* ── Header ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px 12px",
                borderBottom: `1px solid ${C.separator}`,
              }}
            >
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.primary }}>
                Your Basket
              </p>
              {totalItems > 0 && (
                <span style={{
                  fontSize: 11, fontWeight: 600, color: C.muted,
                  background: C.primaryBg, padding: "2px 8px",
                  borderRadius: 99, border: `1px solid ${C.separator}`,
                }}>
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              )}
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* ── Item list ── */}
                <div
                  style={{
                    overflowY: "auto",
                    maxHeight: 340,
                    padding: "8px 0",
                  }}
                  className="no-scrollbar"
                >
                  {cartState.items
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        data-testid="cart-item"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "68px 1fr",
                          gap: 12,
                          padding: "10px 18px",
                          borderBottom: `1px solid ${C.separator}`,
                        }}
                      >
                        {/* Thumbnail */}
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          style={{
                            display: "block",
                            width: 68, height: 68,
                            borderRadius: 12,
                            overflow: "hidden",
                            border: `1px solid ${C.separator}`,
                            background: "#F5EFE7",
                            flexShrink: 0,
                          }}
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>

                        {/* Info */}
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                          <div>
                            <LocalizedClientLink
                              href={`/products/${item.product_handle}`}
                              data-testid="product-link"
                              style={{
                                display: "block",
                                fontSize: 13,
                                fontWeight: 600,
                                color: C.dark,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                textDecoration: "none",
                                marginBottom: 2,
                              }}
                            >
                              {item.title}
                            </LocalizedClientLink>

                            <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            />

                            <span
                              data-testid="cart-item-quantity"
                              data-value={item.quantity}
                              style={{ fontSize: 11, color: C.muted }}
                            >
                              Qty: {item.quantity}
                            </span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <DeleteButton
                              id={item.id}
                              data-testid="cart-item-remove-button"
                              style={{
                                fontSize: 10,
                                color: C.muted,
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                                fontWeight: 600,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                              }}
                            >
                              Remove
                            </DeleteButton>

                            <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                              <LineItemPrice
                                item={item}
                                style="tight"
                                currencyCode={cartState.currency_code}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* ── Footer ── */}
                <div style={{ padding: "14px 18px", borderTop: `1px solid ${C.separator}` }}>
                  {/* Subtotal row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: C.muted, letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 600 }}>
                      Subtotal
                      <span style={{ fontWeight: 400, textTransform: "none", marginLeft: 4 }}>(excl. taxes)</span>
                    </span>
                    <span
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                      style={{ fontSize: 16, fontWeight: 700, color: C.dark }}
                    >
                      {convertToLocale({ amount: subtotal, currency_code: cartState.currency_code })}
                    </span>
                  </div>

                  {/* CTA */}
                  <LocalizedClientLink href="/cart" passHref data-testid="go-to-cart-button">
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        width: "100%",
                        padding: "13px 20px",
                        borderRadius: 12,
                        background: C.primary,
                        border: "none",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        boxShadow: "0 4px 16px rgba(201,118,43,0.35)",
                        transition: "opacity 150ms ease, transform 150ms ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.92"; e.currentTarget.style.transform = "scale(1.01)" }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)" }}
                    >
                      Go to Basket <ArrowIcon />
                    </button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              /* ── Empty state ── */
              <div style={{ padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 72, height: 72,
                  background: C.primaryBg,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: `1px solid ${C.separator}`,
                }}>
                  <EmptyBag />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 600, color: C.dark }}>Your basket is empty</p>
                  <p style={{ margin: 0, fontSize: 12, color: C.muted }}>Discover handcrafted pieces from India&apos;s artisans</p>
                </div>
                <LocalizedClientLink href="/store">
                  <button
                    onClick={close}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "10px 20px",
                      borderRadius: 99,
                      background: "none",
                      border: `1.5px solid ${C.primary}`,
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.primary,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      transition: "background 150ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = C.primaryBg }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "none" }}
                  >
                    Explore the Shop <ArrowIcon />
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
