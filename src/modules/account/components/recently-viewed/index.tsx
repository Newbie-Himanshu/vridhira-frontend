"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface RecentlyViewedProps {
  products: Array<{ id: string; title: string; handle: string; image_url?: string; price: number }>
}

const RecentlyViewed = ({ products }: RecentlyViewedProps) => {
  if (!products || products.length === 0) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 small:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recently Viewed</h3>
        <LocalizedClientLink href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </LocalizedClientLink>
      </div>

      <div className="grid grid-cols-2 small:grid-cols-3 gap-4">
        {products.slice(0, 6).map((product) => (
          <LocalizedClientLink href={`/products/${product.handle}`} key={product.id}>
            <div className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-40 object-cover hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="p-3">
                <p className="text-xs font-medium text-gray-900 line-clamp-2 mb-2">{product.title}</p>
                <p className="text-sm font-bold text-gray-900">₹{(product.price / 100).toFixed(0)}</p>
              </div>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed
