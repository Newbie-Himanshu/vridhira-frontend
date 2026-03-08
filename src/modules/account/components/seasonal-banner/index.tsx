"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SeasonalBanner = () => {
  const currentMonth = new Date().getMonth()

  // Determine seasonal offer based on month
  const getSeason = () => {
    if ([11, 0].includes(currentMonth)) {
      return {
        title: "Holiday Sale! 🎉",
        description: "Get up to 40% off on selected items this season",
        cta: "Shop Now",
        colors: "from-red-500 to-yellow-500"
      }
    } else if ([2, 3, 4].includes(currentMonth)) {
      return {
        title: "Spring Collection ✨",
        description: "Fresh arrivals with exclusive spring designs",
        cta: "Explore",
        colors: "from-green-500 to-emerald-500"
      }
    } else if ([5, 6, 7].includes(currentMonth)) {
      return {
        title: "Summer Special ☀️",
        description: "Cool summer deals - Limited time only",
        cta: "Browse",
        colors: "from-orange-500 to-pink-500"
      }
    } else {
      return {
        title: "Fall Favorites 🍂",
        description: "Cozy autumn collection now available",
        cta: "Discover",
        colors: "from-amber-500 to-orange-500"
      }
    }
  }

  const season = getSeason()

  return (
    <LocalizedClientLink href="/">
      <div className={`bg-gradient-to-r ${season.colors} rounded-lg p-6 small:p-8 text-white cursor-pointer hover:shadow-lg transition-all`}>
        <h3 className="text-xl small:text-2xl font-bold mb-2">{season.title}</h3>
        <p className="text-white/90 mb-4">{season.description}</p>
        <span className="inline-flex items-center gap-2 font-semibold">
          {season.cta}
          <span>→</span>
        </span>
      </div>
    </LocalizedClientLink>
  )
}

export default SeasonalBanner
