"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface PersonalizedRecommendationsProps {
  products: Array<{ id: string; title: string; handle: string; image_url?: string; price: number }>
}

const PersonalizedRecommendations = ({ products }: PersonalizedRecommendationsProps) => {
  if (!products || products.length === 0) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 small:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recommended For You ✨</h3>
          <p className="text-sm text-gray-600">Based on your browsing and purchase history</p>
        </div>
      </div>

      <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 gap-4">
        {products.slice(0, 6).map((product) => (
          <LocalizedClientLink href={`/products/${product.handle}`} key={product.id}>
            <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer border border-gray-200">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">{product.title}</p>
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-gray-900">₹{(product.price / 100).toFixed(0)}</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Recommended</span>
                </div>
              </div>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}

export default PersonalizedRecommendations
