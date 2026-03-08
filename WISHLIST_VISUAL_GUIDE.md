# Wishlist Feature - Visual Architecture Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            ROOT LAYOUT (app/layout.tsx)                      │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                      ToastProvider (Context)                             │ │
│  │                                                                           │ │
│  │  Manages all toast notifications globally across the entire app         │ │
│  │  ├─ State: array of Toast objects                                       │ │
│  │  ├─ Methods: addToast(), removeToast()                                  │ │
│  │  └─ Duration: configurable auto-dismiss                                │ │
│  │                                                                           │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │ │
│  │  │                    Main App Content                              │  │ │
│  │  │                                                                   │  │ │
│  │  │  ┌────────────────────────┐  ┌─────────────────────────────┐  │  │ │
│  │  │  │   Product Components   │  │   Account Components        │  │  │ │
│  │  │  │                        │  │                             │  │  │ │
│  │  │  │ ProductPreview:        │  │ Wishlist Page:              │  │  │ │
│  │  │  │ ├─ Heart icon button   │  │ ├─ Lists all items          │  │  │ │
│  │  │  │ ├─ onClick listener    │  │ ├─ Shows count              │  │  │ │
│  │  │  │ └─ useToast() hook     │  │ └─ Fetches fresh data       │  │  │ │
│  │  │  │                        │  │                             │  │  │ │
│  │  │  │ handleWishlistToggle() │  │ WishlistCard:               │  │  │ │
│  │  │  │ ├─ Check state         │  │ ├─ Remove button            │  │  │ │
│  │  │  │ ├─ API call            │  │ ├─ Add to cart btn          │  │  │ │
│  │  │  │ ├─ Show toast          │  │ └─ useToast() hook          │  │  │ │
│  │  │  │ └─ Update UI           │  │                             │  │  │ │
│  │  │  └────────────────────────┘  └─────────────────────────────┘  │  │ │
│  │  │                                                                   │  │ │
│  │  └──────────────────────────────────────────────────────────────────┘  │ │
│  │                                                                           │ │
│  └───────────────────────────────────────────────────────────────────────┬─┘ │
│                                                                           │    │
│  ┌───────────────────────────────────────────────────────────────────────┴─┐ │
│  │                    ToastContainer (Component)                           │ │
│  │                                                                         │ │
│  │    Renders all active toasts in top-right corner                      │ │
│  │    ├─ Iterates through toast array from context                       │ │
│  │    ├─ Displays icon, message, close button                            │ │
│  │    └─ Auto-dismisses or manual close                                  │ │
│  │                                                                         │ │
│  │    TOAST DISPLAY AREA (Top-Right)                                    │ │
│  │    ┌─────────────────────────────────────┐                           │ │
│  │    │ ✅ Added to wishlist 🎉            │ ← Success toast            │ │
│  │    │ (auto-dismiss 2s)            [✕]  │                           │ │
│  │    └─────────────────────────────────────┘                           │ │
│  │                                                                         │ │
│  │    ┌─────────────────────────────────────┐                           │ │
│  │    │ ❌ Failed to add to wishlist       │ ← Error toast              │ │
│  │    │ (auto-dismiss 3s)             [✕]  │                           │ │
│  │    └─────────────────────────────────────┘                           │ │
│  │                                                                         │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow - Adding Item

```
USER ACTION
    │
    ▼ Click ❤️ heart icon
    │
    ├─→ ProductPreview Component
    │   ├─ Detect click event
    │   ├─ Prevent default/propagation
    │   └─ Call handleWishlistToggle()
    │
    ├─→ handleWishlistToggle() Function
    │   ├─ Check if already wishlisted
    │   ├─ setIsWishlistLoading(true) ─→ Disable button, show pulse
    │   ├─ Get firstVariantId
    │   └─ Call addToWishlist() API
    │
    ├─→ API: addToWishlist (src/lib/data/wishlist.ts)
    │   ├─ Server Action
    │   ├─ Get auth headers
    │   ├─ POST to /store/wishlist
    │   │  {
    │   │    product_id: "prod_123",
    │   │    variant_id: "var_456"
    │   │  }
    │   ├─ Receive: { wishlist_item: { id, product_id, ... } }
    │   ├─ Call: revalidatePath("/account/wishlist") ◄─ CACHE CLEAR
    │   └─ Return wishlistItem
    │
    ├─→ Back in handleWishlistToggle()
    │   ├─ wishlistItem = { id: "wish_789", product_id: ... }
    │   ├─ setWishlistItemId("wish_789") ─→ Store for removal
    │   ├─ setIsWishlisted(true)
    │   ├─ setIsWishlistLoading(false)
    │   └─ Call addToast("Added to wishlist 🎉", "success", 2000)
    │
    ├─→ UI Updates
    │   ├─ Heart icon fills RED ❤️
    │   ├─ Button enabled again
    │   ├─ Heart animation stops
    │   └─ Toast appears top-right (green bg)
    │
    ├─→ Toast Auto-Dismiss (after 2s)
    │   ├─ Toast fades out with animation
    │   └─ Removed from DOM
    │
    └─→ Later: User navigates to /account/wishlist
        ├─ Cache was cleared (revalidatePath)
        ├─ Wishlist page loads fresh
        ├─ listWishlistItems() executes
        ├─ Backend returns updated list
        ├─ NEW ITEM IS VISIBLE ✅
        └─ Item count updates in UI
```

## Data Flow - Removing Item

```
USER ACTION (Two Options)

OPTION A: From Product Card
├─→ Click red ❤️ heart icon
├─→ handleWishlistToggle()
│  ├─ isWishlisted is true
│  ├─ wishlistItemId = "wish_789"
│  └─ Call removeFromWishlist("wish_789")
└─→ [Continue to step 2 below]

OPTION B: From Wishlist Page
├─→ Click ✕ button on card
├─→ WishlistCard → handleRemove()
└─→ Call removeFromWishlist(item.id)

2. REMOVE PROCESS
├─→ API: removeFromWishlist (wishlist.ts)
│   ├─ Server Action
│   ├─ DELETE to /store/wishlist/{id}
│   ├─ Receive: { deleted: true }
│   ├─ Call: revalidatePath("/account/wishlist") ◄─ CACHE CLEAR
│   └─ Return: deleted = true
│
├─→ Back in Component
│   ├─ success = true
│   ├─ setIsWishlisted(false)
│   ├─ setWishlistItemId(null)
│   ├─ onRemove?.(itemId) [if from wishlist page]
│   └─ addToast("Removed from wishlist", "success", 2000)
│
├─→ UI Updates
│   ├─ Heart becomes outline ♡
│   ├─ Item disappears from wishlist page
│   ├─ Item count decreases
│   └─ Success toast appears
│
└─→ When user navigates to wishlist page
    ├─ Fresh data loaded (cache cleared)
    └─ Item not in list
```

## State Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ProductPreview Component                          │
│                                                                          │
│  State Variables:                                                        │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ isWishlisted: boolean                                            │   │
│  │ ├─ false = outline heart ♡                                      │   │
│  │ └─ true = filled heart ❤️                                        │   │
│  │                                                                  │   │
│  │ wishlistItemId: string | null                                   │   │
│  │ ├─ null = not wishlisted                                        │   │
│  │ └─ "wish_123" = backend ID for removal                         │   │
│  │                                                                  │   │
│  │ isWishlistLoading: boolean                                      │   │
│  │ ├─ false = button enabled                                       │   │
│  │ └─ true = button disabled, heart pulses                        │   │
│  │                                                                  │   │
│  │ isAdding: boolean (for Add to Cart)                            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  Transitions:                                                            │
│                                                                          │
│  1. Initial Load                                                         │
│     ├─ isWishlisted: false                                              │
│     ├─ wishlistItemId: null                                             │
│     └─ isWishlistLoading: false                                         │
│                                                                          │
│  2. User Clicks Heart                                                    │
│     ├─ isWishlistLoading: false → true (DISABLE/PULSE)                 │
│     └─ [API call]                                                       │
│                                                                          │
│  3. API Success                                                          │
│     ├─ wishlistItemId: null → "wish_123" (STORE ID)                    │
│     ├─ isWishlisted: false → true (FILL RED)                           │
│     ├─ isWishlistLoading: true → false (ENABLE)                        │
│     └─ Show success toast                                               │
│                                                                          │
│  4. API Failure                                                          │
│     ├─ isWishlistLoading: true → false (ENABLE)                        │
│     ├─ Show error toast                                                 │
│     └─ State unchanged (no wishlisting)                                 │
│                                                                          │
│  5. User Clicks Again (Remove)                                           │
│     ├─ isWishlistLoading: false → true (DISABLE/PULSE)                 │
│     ├─ [API call with wishlistItemId]                                   │
│     └─ If success:                                                      │
│        ├─ wishlistItemId: "wish_123" → null                             │
│        ├─ isWishlisted: true → false (OUTLINE)                          │
│        └─ Show remove toast                                             │
└─────────────────────────────────────────────────────────────────────────┘
```

## Cache Invalidation Flow

```
BEFORE: Cache Active
├─ /account/wishlist data cached
└─ listWishlistItems() returns cached data

USER ADDS ITEM
├─ addToWishlist() called
├─ Backend: item created ✅
└─ revalidatePath("/account/wishlist") CALLED

CACHE STATE: CLEARED
├─ Next.js deletes cache entry
├─ Page marked as stale
└─ No stale data in memory

WHEN USER NAVIGATES TO /account/wishlist
├─ Cache miss (no cached data found)
├─ listWishlistItems() EXECUTES (fresh query)
├─ DATABASE: Returns updated list with new item
├─ Data cached again (for next user)
├─ Component renders with new item ✅
└─ "X items saved" count updates

SUBSEQUENT VISITS (within cache TTL)
├─ Cache hit (has cached data)
├─ Instant page load (no API call)
└─ User sees same data
```

## Toast Notification Lifecycle

```
1. EVENT TRIGGERED
   ├─ User action (add/remove)
   ├─ API call made
   └─ Response received

2. TOAST CREATED
   ├─ addToast("message", "type", duration)
   ├─ Generates unique ID
   └─ Added to toasts array

3. RENDER (ToastContainer)
   ├─ Finds toast in array
   ├─ Renders with icon, message, close btn
   ├─ Applies animation class
   └─ Shows in top-right corner

4. AUTO-DISMISS (if duration > 0)
   ├─ Timer set for duration (2-3s)
   ├─ When timer fires:
   │  ├─ Toast removed from array
   │  ├─ Fade-out animation
   │  └─ Removed from DOM
   └─ Or: User clicks X → immediate removal

5. CLEANUP
   ├─ No memory leaks
   ├─ Event listeners cleaned up
   └─ DOM updated efficiently
```

## Component Hierarchy

```
RootLayout (app/layout.tsx)
│
├─ ToastProvider (Context)
│  │
│  ├─ Page/Routes
│  │  │
│  │  ├─ Product Pages
│  │  │  ├─ ProductPreview
│  │  │  │  └─ useToast() → Hook
│  │  │  │     └─ addToast("...", "success")
│  │  │  │
│  │  │  └─ Product Listing
│  │  │
│  │  └─ Account Pages
│  │     ├─ Wishlist Page
│  │     │  └─ WishlistOverview
│  │     │     ├─ WishlistCard
│  │     │     │  └─ useToast() → Hook
│  │     │     │     └─ addToast("...", "success")
│  │     │     │
│  │     │     └─ Empty State
│  │     │
│  │     └─ Dashboard
│  │        └─ WishlistWidget
│  │
│  └─ ToastContainer
│     ├─ Iterates toasts array
│     ├─ Renders each toast
│     └─ Handles dismiss
```

## API Endpoint Diagram

```
WISHLIST ENDPOINTS (/store/wishlist)

1. LIST WISHLIST ITEMS
   ├─ Method: GET
   ├─ Endpoint: /store/wishlist
   ├─ Auth: Required (Bearer token)
   ├─ Response:
   │  {
   │    "wishlist": [
   │      {
   │        "id": "wish_123",
   │        "customer_id": "cust_456",
   │        "product_id": "prod_789",
   │        "variant_id": "var_101",
   │        "product": { title, images, variants... }
   │      }
   │    ]
   │  }
   └─ Used by: Wishlist page

2. ADD TO WISHLIST
   ├─ Method: POST
   ├─ Endpoint: /store/wishlist
   ├─ Auth: Required
   ├─ Body:
   │  {
   │    "product_id": "prod_789",
   │    "variant_id": "var_101"
   │  }
   ├─ Response:
   │  {
   │    "wishlist_item": {
   │      "id": "wish_123",
   │      ...
   │    }
   │  }
   └─ Used by: Product preview heart icon

3. REMOVE FROM WISHLIST
   ├─ Method: DELETE
   ├─ Endpoint: /store/wishlist/{wishlistItemId}
   ├─ Auth: Required
   ├─ Response: { "deleted": true, "id": "wish_123" }
   └─ Used by: Product card & wishlist page
```

## Error Handling Flow

```
API CALL
│
├─ Network Offline
│  ├─ Error caught in catch block
│  ├─ State unchanged
│  └─ Toast: "Something went wrong"
│
├─ 401 Unauthorized
│  ├─ No auth headers
│  ├─ Backend returns 401
│  └─ Toast: "Unauthorized" (or redirect to login)
│
├─ 404 Not Found
│  ├─ Product/item doesn't exist
│  ├─ Backend returns null
│  └─ Toast: "Failed to add to wishlist"
│
├─ 500 Server Error
│  ├─ Backend error
│  ├─ Catch block handles
│  └─ Toast: "Something went wrong"
│
└─ Success (200)
   ├─ Data received
   ├─ Cache revalidated
   ├─ UI updated
   └─ Toast: "Success message"
```

---

These diagrams show the complete system architecture and how all components work together!
