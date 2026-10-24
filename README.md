# EthioHub Storefront Foundation

A lightweight, responsive React 18 + Vite storefront prototype for an Ethiopia-focused marketplace. It extends the original `ProductCatalog.jsx` / `ProductCatalog.css` idea with richer product data, responsive browsing, wishlist, a persistent cart, product options, and a demo checkout UI.

> **Prototype notice:** Product prices, stock, ratings, review counts, discount percentages, delivery fees, delivery thresholds, and sample checkout confirmations are fictional demonstration values. They are not verified prices, inventory, customer reviews, or market research. No real payment is processed, no order is sent to a merchant, and checkout information is not submitted to a server.

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). Open it in your browser. To create and preview a production build:

```bash
npm run build
npm run preview
```

## Workflow diagram

The storefront workflow is included in `docs/workflow/`:

- `ethiohub-workflow.png` — viewable diagram image.
- `ethiohub-workflow.svg` — scalable vector version for zooming and sharing.
- `ethiohub-workflow.mmd` — editable Mermaid flowchart source.
- `ethiohub-workflow.dot` — Graphviz source for generating PNG/SVG diagrams.

The diagram covers API loading with sample-catalog fallback, browsing and filtering, product variants, wishlist and cart persistence, the demo checkout path, and the production integration boundary. Payment choices and order confirmation are prototype-only; the template does not make real payments or submit orders to a server.

## What's included

- 35+ sample products spanning electronics, fashion, groceries, home and kitchen, beauty and care, sports and outdoors, books and stationery, kids and family, and gift bundles.
- Responsive layout for phones, tablets, laptops, and desktop browsers.
- Live search (press `/` to focus the search box), category filters, price bands, sale and in-stock toggles, and sorting.
- Product quick view with quantity stepper and supported colour/size selection.
- Wishlist and cart state persisted locally in `localStorage`.
- Cart quantity editing, line removal, cart clearing, subtotal, and demo delivery estimate.
- Checkout form UI with Telebirr, Chapa, and cash-on-delivery preference choices. These are visual placeholders only—not integrations.
- Optional `GET /api/products` integration point with a fallback to sample products if the API cannot be reached.
- Accessible labels, keyboard Escape-to-close modals, reduced-motion support, lazy product-image loading, direct Unsplash CDN photos for the sample catalogue, and no third-party UI framework.

## Connect your API

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_API_BASE_URL` to the backend origin, for example `http://localhost:4000` when using the included EthioHub JSON API.
3. Ensure the backend exposes `GET {VITE_API_BASE_URL}/api/products` and allows the frontend origin using appropriate CORS settings.
4. Restart `npm run dev` after changing environment variables.

The normalizer in `src/data/products.js` accepts common camelCase and PascalCase property names, including `Id`/`id`, `Name`/`name`, `UnitPrice`/`unitPrice`, `UnitsInStock`/`unitsInStock`, `Category`/`category`, `Unit`/`unit`, `ProductImages`/`productImages`, and `ProductVariances`/`productVariances`. It accepts either a JSON array or an object containing `products`, `items`, `data`, or `$values` arrays.

### Product image fields

If the API returns active product image paths in `ProductImages` or `productImages`, the quick view and cards display them. The expected image entry supports `ImagePath`/`imagePath` or `Url`/`url` and optional active flags. The built-in sample products now use direct `images.unsplash.com` CDN URLs. The photos are illustrative catalogue imagery, not verified photos of the exact listed goods. Product photos load over the internet; if a photo fails, the UI falls back to the existing emoji illustration. No image assets are bundled locally.

### Category and variant expectations

Each product should provide a category name. For variants, use the model flags `HasColorVariance` and `HasSizeVariance`, alongside `ProductVariances` containing `Id`/`id`, `Color`/`color`, `ColorName`/`colorName`, `Size`/`size`, or `Label`/`label`. For multi-dimensional variants, the API should return real valid combinations and stock per combination; this demo uses product-level stock as a simple cap.

## Connect Telebirr or Chapa safely

The payment choices deliberately stop at a **demo confirmation**. A production integration should:

- Create the order on a trusted backend and calculate prices, discounts, shipping, and inventory on the server.
- Integrate Telebirr or Chapa from the backend using the provider's current official merchant/API documentation and credentials.
- Never place merchant secrets, API private keys, or payment signing credentials in React code or `VITE_*` variables (Vite exposes these values in the browser bundle).
- Verify payment status through trusted server-side provider callbacks/webhooks before marking an order paid.
- Validate contact and delivery details, protect endpoints from abuse, define order states, and implement idempotency and audit logging.
- Publish clear return, refund, delivery, privacy, and customer-support policies before launch.

The selected payment preference is captured in the local demo form only. No payment call is made.

## Configuration notes

- Delivery estimate constants are at the top of `src/components/ProductCatalog.jsx`: `DELIVERY_FEE` and `FREE_DELIVERY_THRESHOLD`.
- Mock products and the API normalizer live in `src/data/products.js`.
- Catalog interactions and UI live in `src/components/ProductCatalog.jsx`.
- Responsive visual styling lives in `src/components/ProductCatalog.css`.
- Cart and wishlist browser storage keys are `ethiohub-cart-v1` and `ethiohub-wishlist-v1`.

## Suggested next production steps

1. Replace demo values with a validated product/merchant feed and product detail endpoint.
2. Add backend-owned cart and checkout APIs, order history, inventory reservation, and address-specific delivery estimates.
3. Add authentication only where needed, with server-side authorization and secure session handling.
4. Integrate and test real Telebirr/Chapa payments in a sandbox before production credentials are enabled.
5. Add automated tests for stock limits, variant combinations, API errors, cart persistence, checkout validation, and accessibility.
6. Test performance on entry-level Android devices and slow connections; compress real product images to WebP/AVIF and serve appropriately sized images.

## Compatibility

The project uses standard React, CSS Grid/Flexbox, `fetch`, and browser `localStorage`, with no component framework or state-management package. Recent versions of Chrome, Edge, Firefox, and Safari are targeted. Browser storage may be unavailable in private or restricted sessions, in which case the cart still works for the current session but may not persist after reload. The app is a responsive web template, not a native Android/iOS package or an offline-first PWA.
