import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-[#FAF7F2] relative min-h-screen">
      {/* Fixed top nav */}
      <div className="h-16 bg-[#FAF7F2] border-b border-[#E8DDD4]">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block text-sm font-semibold text-[#8D6E63] hover:text-[#C9762B] transition-colors">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden text-sm font-semibold text-[#8D6E63] hover:text-[#C9762B] transition-colors">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-serif text-2xl font-semibold text-[#2C1810] tracking-wide hover:text-[#C9762B] transition-colors"
            data-testid="store-link"
          >
            Himanshu
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>

      {/* Main content */}
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
    </div>
  )
}
