"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { PendingReview } from "@lib/data/account-features"
import { Button } from "@medusajs/ui"

interface ReviewsProps {
  pendingReviews: PendingReview[]
}

const Reviews = ({ pendingReviews }: ReviewsProps) => {
  if (!pendingReviews || pendingReviews.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center">
          <div className="mb-4 text-4xl">⭐</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending reviews</h3>
          <p className="text-sm text-gray-600 mb-6">
            You don't have any products awaiting your review
          </p>
          <LocalizedClientLink href="/" passHref>
            <Button variant="secondary">Continue Shopping</Button>
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <p className="text-base text-gray-600">
          {pendingReviews.length} product{pendingReviews.length !== 1 ? "s" : ""} waiting for your
          review
        </p>
      </div>

      <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
        {pendingReviews.map((review) => (
          <div
            key={review.product_id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            {review.product_image_url && (
              <div className="mb-4 relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={review.product_image_url}
                  alt={review.product_title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Product Info */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                {review.product_title}
              </h3>
              <div className="space-y-1 text-xs text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">Order:</span> #{review.order_number}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Purchased:</span>{" "}
                  {new Date(review.purchased_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <LocalizedClientLink
              href={`/account/reviews/${review.product_id}`}
              passHref
              className="w-full block"
            >
              <Button className="w-full" variant="secondary">
                Write Review
              </Button>
            </LocalizedClientLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews
