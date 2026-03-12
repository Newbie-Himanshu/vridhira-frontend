import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import CategoryStrip from "@modules/home/components/category-strip"
import FeaturedProducts from "@modules/home/components/featured-products"
import Testimonials from "@modules/home/components/testimonials"
import CtaBanner from "@modules/home/components/cta-banner"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "himanshu — India's Artisan Marketplace",
  description:
    "Handcrafted with soul. Delivered to your door. Shop authentic Indian handcraft — textiles, pottery, jewellery, woodcraft and more.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const [region, { collections }] = await Promise.all([
    getRegion(countryCode),
    listCollections({ fields: "id, handle, title" }),
  ])

  return (
    <>
      {/* 1 — Full-screen branded hero */}
      <Hero />

      {/* 2 — Shop by category (8 artisan categories) */}
      <CategoryStrip />

      {/* 3 — Featured products from collections */}
      {collections && region && (
        <div className="py-12" style={{ background: "#FAF7F2" }}>
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      )}

      {/* 4 — Auto-scrolling customer testimonials */}
      <Testimonials />

      {/* 5 — Earthy CTA banner */}
      <CtaBanner />
    </>
  )
}
