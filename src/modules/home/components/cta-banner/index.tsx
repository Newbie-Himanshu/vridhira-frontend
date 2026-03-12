/**
 * ============================================================
 * Himanshu — E-Commerce for Indian Artisans
 * ============================================================
 * @author      Himanshu
 * @github      https://github.com/Newbie-Himanshu
 * @copyright   2026 Himanshu. All rights reserved.
 * @license     SEE LICENSE IN LICENSE
 * @modifiedWith    Antigravity
 * @modifiedOn      2026-03-06
 * @changeNote      Earthy Himanshu CTA banner — artisan story section
 * ============================================================
 */

"use client"

import { useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const highlights = [
  { icon: "🇮🇳", label: "Supporting 500+ Indian artisans" },
  { icon: "🔒", label: "Secure Razorpay & UPI payments" },
  { icon: "🚚", label: "Ships across all of India" },
]

export default function CtaBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (bannerRef.current) observer.observe(bannerRef.current)
    return () => {
      if (bannerRef.current) observer.unobserve(bannerRef.current)
    }
  }, [])

  return (
    <section
      className="py-24"
      style={{ background: "#FAF7F2" }}
      aria-label="Shop the collection"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={bannerRef}
          className="relative rounded-3xl overflow-hidden min-h-[400px] flex items-center transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.97)",
            background:
              "linear-gradient(135deg, #3D1C00 0%, #6B2F00 40%, #8B4513 75%, #A0522D 100%)",
          }}
        >
          {/* ── Decorative circles ── */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(201, 118, 43, 0.25) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 200, 120, 0.12) 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
            aria-hidden="true"
          />

          {/* ── Giant serif background word ── */}
          <div
            className="absolute inset-y-0 right-6 flex items-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="font-serif font-bold leading-none"
              style={{
                fontSize: "clamp(100px, 16vw, 240px)",
                color: "rgba(255, 255, 255, 0.04)",
              }}
            >
              Craft
            </span>
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 px-10 py-14 md:px-16 max-w-2xl">
            <span
              className="text-xs tracking-[0.3em] uppercase block mb-4"
              style={{ color: "rgba(212, 165, 116, 0.9)" }}
            >
              Our Promise
            </span>

            <h2
              className="font-serif leading-tight mb-2"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#FAF7F2",
              }}
            >
              Crafted with soul.
            </h2>
            <h2
              className="font-serif leading-tight mb-8"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                color: "rgba(250, 247, 242, 0.55)",
              }}
            >
              Made for you.
            </h2>

            {/* Highlights */}
            <ul className="flex flex-col gap-3 mb-10">
              {highlights.map((h) => (
                <li key={h.label} className="flex items-center gap-3">
                  <span className="text-lg flex-shrink-0">{h.icon}</span>
                  <span
                    className="text-base"
                    style={{ color: "rgba(250, 247, 242, 0.85)" }}
                  >
                    {h.label}
                  </span>
                </li>
              ))}
            </ul>

            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all duration-200 hover:gap-3"
              style={{
                background: "#FAF7F2",
                color: "#2C1810",
              }}
              data-testid="cta-shop-button"
            >
              Shop the Collection
              <span aria-hidden="true">→</span>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}
