/**
 * ============================================================
 * himanshu — E-Commerce for Indian Artisans
 * ============================================================
 * @author      Himanshu
 * @github      https://github.com/Newbie-Himanshu
 * @copyright   2026 Himanshu. All rights reserved.
 * @license     SEE LICENSE IN LICENSE
 * @modifiedWith    Antigravity
 * @modifiedOn      2026-03-06
 * @changeNote      Auto-scrolling 3-col testimonials with himanshu artisan reviews
 * ============================================================
 */

"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    location: "Jaipur",
    rating: 5,
    text: "Ordered a blue pottery set — arrived beautifully wrapped, every piece unique. My family loved the story behind each artisan.",
    product: "Blue Pottery",
  },
  {
    id: 2,
    name: "Rahul M.",
    location: "Mumbai",
    rating: 5,
    text: "The Madhubani painting is stunning. The seller's handwritten note about the tradition made it so much more meaningful.",
    product: "Madhubani Art",
  },
  {
    id: 3,
    name: "Ananya K.",
    location: "Delhi",
    rating: 5,
    text: "Bought a Kanjeevaram dupatta as a gift. The quality was exceptional — and knowing it directly supports a family of weavers made it priceless.",
    product: "Handloom Textile",
  },
  {
    id: 4,
    name: "Vikash P.",
    location: "Pune",
    rating: 5,
    text: "The wooden toys from Rajasthan are perfect for my kids. Non-toxic, solid craft, and delivered in 3 days. Zero complaints.",
    product: "Wooden Toys",
  },
  {
    id: 5,
    name: "Meera T.",
    location: "Bangalore",
    rating: 5,
    text: "I've been searching for authentic tribal jewelry forever — himanshu is the only place I found real craft without inflated gallery prices.",
    product: "Tribal Jewellery",
  },
  {
    id: 6,
    name: "Aditya R.",
    location: "Hyderabad",
    rating: 5,
    text: "Got a Dhokra brass figurine. The packaging was excellent and came with a QR code linking to the artisan's workshop. Brilliant.",
    product: "Dhokra Craft",
  },
  {
    id: 7,
    name: "Sunita D.",
    location: "Chennai",
    rating: 5,
    text: "The handwoven saree is incredibly soft and the colour is exactly as shown. Already gifted two more to friends.",
    product: "Handwoven Saree",
  },
  {
    id: 8,
    name: "Kiran B.",
    location: "Kolkata",
    rating: 5,
    text: "Love the curation — genuine handcraft, not factory knockoffs. The block-print bedsheet is now my household favourite.",
    product: "Block Print",
  },
  {
    id: 9,
    name: "Deepak V.",
    location: "Lucknow",
    rating: 5,
    text: "Fragile ceramic order, zero damage. The packaging team clearly cares. Product is even better in person than the photos.",
    product: "Ceramic Art",
  },
]

// ─── Inline star icon ─────────────────────────────────────────────────────────
const StarIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="#C9762B"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

// ─── Card ─────────────────────────────────────────────────────────────────────
const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0]
}) => (
  <div
    className="rounded-2xl p-6 mb-4 flex-shrink-0"
    style={{
      background: "#FFFDF9",
      boxShadow:
        "rgba(139, 69, 19, 0.07) 0px 0px 0px 1px, rgba(139, 69, 19, 0.05) 0px 4px 14px, rgba(44, 24, 16, 0.04) 0px 1px 4px",
    }}
  >
    {/* Stars */}
    <div className="flex gap-0.5 mb-3" aria-label={`${testimonial.rating} out of 5 stars`}>
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>

    {/* Quote */}
    <p
      className="leading-relaxed mb-4 text-base font-serif"
      style={{ color: "rgba(44, 24, 16, 0.82)" }}
    >
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-sm font-semibold" style={{ color: "#2C1810" }}>
          {testimonial.name}
        </p>
        <p className="text-xs" style={{ color: "#8D6E63" }}>
          {testimonial.location}
        </p>
      </div>
      <span
        className="text-xs tracking-wide px-2 py-1 rounded-full whitespace-nowrap"
        style={{
          color: "rgba(139, 69, 19, 0.7)",
          background: "rgba(139, 69, 19, 0.06)",
        }}
      >
        {testimonial.product}
      </span>
    </div>
  </div>
)

// ─── Testimonials Section ─────────────────────────────────────────────────────
export default function Testimonials() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const column1 = [testimonials[0], testimonials[3], testimonials[6]]
  const column2 = [testimonials[1], testimonials[4], testimonials[7]]
  const column3 = [testimonials[2], testimonials[5], testimonials[8]]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true)
      },
      { threshold: 0.1 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current)
    }
  }, [])

  return (
    <section
      className="pt-12 pb-24 overflow-hidden"
      style={{ background: "#FAF7F2" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="text-xs tracking-[0.3em] uppercase mb-4 block transition-all duration-700"
            style={{
              color: "#C9762B",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(10px)",
            }}
          >
            What Customers Say
          </span>
          <h2
            className="font-serif text-4xl md:text-6xl leading-tight transition-all duration-700"
            style={{
              color: "#2C1810",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(14px)",
              transitionDelay: "150ms",
            }}
          >
            Loved across India
          </h2>
        </div>

        {/* ── Scrolling columns ── */}
        <div className="relative">
          {/* Top fade */}
          <div
            className="absolute top-0 inset-x-0 h-32 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to bottom, #FAF7F2, transparent)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to top, #FAF7F2, transparent)",
            }}
          />

          {/* Mobile — single column scrolling down */}
          <div className="md:hidden h-[600px] relative overflow-hidden">
            <div className="testimonials-scroll-down testimonials-scroll-down-hover">
              {[...testimonials, ...testimonials].map((t, i) => (
                <TestimonialCard key={`m-${t.id}-${i}`} testimonial={t} />
              ))}
            </div>
          </div>

          {/* Desktop — 3 columns alternating direction */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 h-[600px]">
            {/* Col 1 — down */}
            <div className="relative overflow-hidden">
              <div className="testimonials-scroll-down testimonials-scroll-down-hover">
                {[...column1, ...column1].map((t, i) => (
                  <TestimonialCard key={`c1-${t.id}-${i}`} testimonial={t} />
                ))}
              </div>
            </div>
            {/* Col 2 — up */}
            <div className="relative overflow-hidden">
              <div className="testimonials-scroll-up testimonials-scroll-up-hover">
                {[...column2, ...column2].map((t, i) => (
                  <TestimonialCard key={`c2-${t.id}-${i}`} testimonial={t} />
                ))}
              </div>
            </div>
            {/* Col 3 — down */}
            <div className="relative overflow-hidden">
              <div className="testimonials-scroll-down testimonials-scroll-down-hover">
                {[...column3, ...column3].map((t, i) => (
                  <TestimonialCard key={`c3-${t.id}-${i}`} testimonial={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped keyframe animations */}
      <style jsx>{`
        @keyframes scrollDown {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes scrollUp {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }

        .testimonials-scroll-down {
          animation: scrollDown 35s linear infinite;
        }
        .testimonials-scroll-up {
          animation: scrollUp 35s linear infinite;
        }
        .testimonials-scroll-down-hover:hover,
        .testimonials-scroll-down:hover {
          animation-duration: 70s;
        }
        .testimonials-scroll-up-hover:hover,
        .testimonials-scroll-up:hover {
          animation-duration: 70s;
        }
      `}</style>
    </section>
  )
}
