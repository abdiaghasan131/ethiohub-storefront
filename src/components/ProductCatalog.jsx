import { memo, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { normalizeProduct, SAMPLE_PRODUCTS } from "../data/products.js";
import "./ProductCatalog.css";

const money = new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB", maximumFractionDigits: 0 });
const CART_STORAGE_KEY = "ethiohub-cart-v1";
const WISHLIST_STORAGE_KEY = "ethiohub-wishlist-v1";
const DELIVERY_FEE = 120; // Demo value; replace with address-based delivery pricing.
const FREE_DELIVERY_THRESHOLD = 2500; // Demo value; configure for the real business.

const SORTS = {
  featured: { label: "Featured", compare: (a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999) },
  low: { label: "Price: low to high", compare: (a, b) => finalPrice(a) - finalPrice(b) },
  high: { label: "Price: high to low", compare: (a, b) => finalPrice(b) - finalPrice(a) },
  rating: { label: "Top rated", compare: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) },
  name: { label: "Name: A to Z", compare: (a, b) => a.name.localeCompare(b.name) },
};

function finalPrice(product) {
  return product.discountEnabled
    ? Math.max(0, Math.round(product.unitPrice * (1 - (Number(product.discountPercent) || 0) / 100)))
    : Number(product.unitPrice) || 0;
}

function stockState(product) {
  if (product.productAvailable === false) return { key: "unavailable", label: "Unavailable", canBuy: false };
  if ((Number(product.unitsInStock) || 0) <= 0) {
    return { key: "out", label: product.unitsOnOrder > 0 ? "Restocking soon" : "Out of stock", canBuy: false };
  }
  if (product.unitsInStock <= 5) return { key: "low", label: `Only ${product.unitsInStock} left`, canBuy: true };
  return { key: "in", label: "In stock", canBuy: true };
}

function safeReadStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function getColors(product) {
  const result = [];
  for (const item of product.productVariances ?? []) {
    if (item.color && !result.some((x) => x.color === item.color)) result.push(item);
  }
  return result;
}

function getSizes(product) {
  const result = [];
  for (const item of product.productVariances ?? []) {
    if (item.size && !result.some((x) => x.size === item.size)) result.push(item);
  }
  return result;
}

function chooseVariant(product, color, size) {
  return (product.productVariances ?? []).find((item) =>
    (!product.hasColorVariance || item.color === color) &&
    (!product.hasSizeVariance || item.size === size)
  ) ?? null;
}

function variantLabel(variant) {
  if (!variant) return "";
  return [variant.colorName || (variant.color ? "Selected colour" : ""), variant.size, variant.label]
    .filter(Boolean)
    .join(" · ");
}

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => safeReadStorage(key, initialValue));
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be disabled or full; the shop still works for this session.
    }
  }, [key, value]);
  return [value, setValue];
}

function ProductVisual({ product, className = "", large = false }) {
  const image = product.productImages?.find((item) => item.isActive !== false && item.imagePath)?.imagePath;
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [image]);
  return (
    <div className={`product-visual tone--${product.tone || "default"} ${large ? "product-visual--large" : ""} ${className}`} role="img" aria-label={product.name}>
      {image && !failed ? <img src={image} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} /> : null}
      <span className={`product-visual__emoji ${image && !failed ? "product-visual__emoji--hidden" : ""}`} aria-hidden="true">{product.emoji || "📦"}</span>
      <span className="product-visual__shine" aria-hidden="true" />
    </div>
  );
}

function Price({ product, compact = false }) {
  return (
    <p className={`price ${compact ? "price--compact" : ""}`}>
      <strong>{money.format(finalPrice(product))}</strong>
      {product.discountEnabled && <s>{money.format(product.unitPrice)}</s>}
      {product.unit?.name && <span className="muted price__unit">/ {product.qtyInUnit > 1 ? `${product.qtyInUnit} ` : ""}{product.unit.name}</span>}
    </p>
  );
}

const ProductCard = memo(function ProductCard({ product, onOpen, onAdd, isFavorite, onToggleFavorite }) {
  const stock = stockState(product);
  const hasOptions = Boolean(product.hasColorVariance || product.hasSizeVariance || product.productVariances?.length);
  return (
    <article className={`product-card ${stock.canBuy ? "" : "product-card--muted"}`}>
      <div className="product-card__visual-wrap">
        <button className="product-card__image-button" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
          <ProductVisual product={product} />
        </button>
        {product.label && <span className={`product-label ${product.discountEnabled ? "product-label--sale" : ""}`}>{product.label}</span>}
        {product.discountEnabled && <span className="sale-pill">−{product.discountPercent}%</span>}
        <button className={`favorite-button ${isFavorite ? "is-favorite" : ""}`} onClick={() => onToggleFavorite(product.id)} aria-label={isFavorite ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={isFavorite}>
          <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
        </button>
      </div>
      <div className="product-card__body">
        <p className="eyebrow">{product.category?.name || "Everyday finds"}</p>
        <button className="product-card__title" onClick={() => onOpen(product)}>{product.name}</button>
        <div className="rating-line"><span className="rating-star" aria-hidden="true">★</span> <strong>{product.rating ? Number(product.rating).toFixed(1) : "New"}</strong><span className="muted">{product.reviewCount ? `(${product.reviewCount})` : "Demo listing"}</span></div>
        <Price product={product} compact />
        <p className={`stock stock--${stock.key}`}>{stock.label}</p>
        <button className="button button--primary product-card__action" disabled={!stock.canBuy} onClick={() => (hasOptions ? onOpen(product) : onAdd(product, 1))}>
          {stock.canBuy ? (hasOptions ? "Choose options" : "Add to cart") : "Unavailable"}
        </button>
      </div>
    </article>
  );
});

function QuickView({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  const colorOptions = useMemo(() => getColors(product), [product]);
  const sizeOptions = useMemo(() => getSizes(product), [product]);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.color ?? null);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]?.size ?? null);
  const selectedVariant = chooseVariant(product, selectedColor, selectedSize);
  const stock = stockState(product);
  const maxQuantity = Math.max(1, Math.min(Number(product.unitsInStock) || 1, 10));
  const needsSelection = Boolean(product.hasColorVariance || product.hasSizeVariance);
  const selectionIsValid = !needsSelection || Boolean(selectedVariant);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="quick-view" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
        <button className="icon-button quick-view__close" onClick={onClose} aria-label="Close product details">×</button>
        <div className="quick-view__media"><ProductVisual product={product} large /></div>
        <div className="quick-view__details">
          <p className="eyebrow">{product.category?.name || "Everyday finds"}</p>
          <h2 id="quick-view-title">{product.name}</h2>
          <div className="rating-line"><span className="rating-star" aria-hidden="true">★</span> <strong>{product.rating ? Number(product.rating).toFixed(1) : "New"}</strong><span className="muted">{product.reviewCount ? `${product.reviewCount} sample reviews` : "Sample listing"}</span></div>
          <Price product={product} />
          <p className="quick-view__description">{product.description}</p>
          {product.hasColorVariance && colorOptions.length > 0 && (
            <fieldset className="option-group">
              <legend>Colour <span className="muted">{colorOptions.find((x) => x.color === selectedColor)?.colorName}</span></legend>
              <div className="color-options">
                {colorOptions.map((option) => (
                  <button key={option.id} className={`color-option ${selectedColor === option.color ? "is-selected" : ""}`} style={{ "--swatch": option.color }} title={option.colorName || option.color} aria-label={`Choose ${option.colorName || "colour"}`} aria-pressed={selectedColor === option.color} onClick={() => setSelectedColor(option.color)} />
                ))}
              </div>
            </fieldset>
          )}
          {product.hasSizeVariance && sizeOptions.length > 0 && (
            <fieldset className="option-group">
              <legend>Size / option</legend>
              <div className="size-options">
                {sizeOptions.map((option) => (
                  <button key={option.id} className={`size-option ${selectedSize === option.size ? "is-selected" : ""}`} aria-pressed={selectedSize === option.size} onClick={() => setSelectedSize(option.size)}>{option.size}</button>
                ))}
              </div>
            </fieldset>
          )}
          {needsSelection && !selectionIsValid && <p className="inline-warning">That combination isn't listed. Choose another colour or size.</p>}
          {product.hasExpiryDate && product.expiryDate && <p className="muted small">Sample best-before date: {new Date(product.expiryDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</p>}
          <p className={`stock stock--${stock.key}`}>{stock.label}</p>
          <div className="quick-view__buy-row">
            <div className="quantity-stepper" aria-label="Quantity">
              <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity <= 1} aria-label="Decrease quantity">−</button>
              <output>{quantity}</output>
              <button onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))} disabled={quantity >= maxQuantity} aria-label="Increase quantity">+</button>
            </div>
            <button className="button button--primary" disabled={!stock.canBuy || !selectionIsValid} onClick={() => { onAdd(product, quantity, selectedVariant); onClose(); }}>Add to cart · {money.format(finalPrice(product) * quantity)}</button>
          </div>
          <p className="small muted">Demo catalog: descriptions, ratings, stock and prices are examples until connected to verified seller data.</p>
        </div>
      </section>
    </div>
  );
}

function CartDrawer({ cart, products, onClose, onQuantity, onRemove, onClear, onAddMore, onPlaceOrder }) {
  const [stage, setStage] = useState("cart");
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState({ fullName: "", phone: "", city: "Addis Ababa", address: "", payment: "telebirr", notes: "" });
  const validItems = cart.map((line) => ({ ...line, product: products.find((item) => item.id === line.productId) })).filter((line) => line.product);
  const subtotal = validItems.reduce((total, line) => total + finalPrice(line.product) * line.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const updateCustomer = (event) => setCustomer((value) => ({ ...value, [event.target.name]: event.target.value }));
  const submitOrder = (event) => {
    event.preventDefault();
    const created = { id: `EH-${Date.now().toString().slice(-8)}`, customer: { ...customer }, lines: validItems, subtotal, delivery, total };
    setOrder(created);
    onPlaceOrder(created);
    setStage("success");
  };

  return (
    <div className="drawer-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart-drawer__header">
          <div><p className="eyebrow">YOUR BAG</p><h2 id="cart-title">{stage === "success" ? "Order received" : stage === "checkout" ? "Checkout" : `Your cart (${validItems.reduce((sum, line) => sum + line.quantity, 0)})`}</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close cart">×</button>
        </header>

        {stage === "success" ? (
          <div className="order-success">
            <div className="success-icon" aria-hidden="true">✓</div>
            <p className="eyebrow">DEMO ORDER CREATED</p>
            <h3>Thank you, {order?.customer.fullName.split(" ")[0] || "shopper"}.</h3>
            <p>Your example order <strong>{order?.id}</strong> is ready for the next integration step.</p>
            <div className="notice notice--warning">No payment was processed and no real order was sent to a merchant. Connect a secure backend before launch.</div>
            <button className="button button--primary button--full" onClick={onClose}>Continue shopping</button>
          </div>
        ) : stage === "checkout" ? (
          <form className="checkout-form" onSubmit={submitOrder}>
            <button type="button" className="back-link" onClick={() => setStage("cart")}>← Back to cart</button>
            <div className="checkout-summary"><span>{validItems.reduce((sum, line) => sum + line.quantity, 0)} item(s)</span><strong>{money.format(total)}</strong></div>
            <label>Full name<input name="fullName" value={customer.fullName} onChange={updateCustomer} placeholder="Your full name" autoComplete="name" required /></label>
            <label>Phone number<input name="phone" type="tel" value={customer.phone} onChange={updateCustomer} placeholder="09… or +251…" autoComplete="tel" required /></label>
            <label>City / area<input name="city" value={customer.city} onChange={updateCustomer} placeholder="e.g. Addis Ababa" autoComplete="address-level2" required /></label>
            <label>Delivery address<textarea name="address" value={customer.address} onChange={updateCustomer} placeholder="Sub-city, woreda, building, nearby landmark" autoComplete="street-address" rows="3" required /></label>
            <fieldset className="payment-options">
              <legend>Payment preference</legend>
              <label className={customer.payment === "telebirr" ? "payment-option is-selected" : "payment-option"}><input type="radio" name="payment" value="telebirr" checked={customer.payment === "telebirr"} onChange={updateCustomer} /><span><strong>Telebirr</strong><small>Connect a merchant payment flow</small></span></label>
              <label className={customer.payment === "chapa" ? "payment-option is-selected" : "payment-option"}><input type="radio" name="payment" value="chapa" checked={customer.payment === "chapa"} onChange={updateCustomer} /><span><strong>Chapa</strong><small>Connect hosted checkout / API</small></span></label>
              <label className={customer.payment === "cash" ? "payment-option is-selected" : "payment-option"}><input type="radio" name="payment" value="cash" checked={customer.payment === "cash"} onChange={updateCustomer} /><span><strong>Cash on delivery</strong><small>Merchant fulfilment option</small></span></label>
            </fieldset>
            <label>Delivery note <span className="muted">(optional)</span><textarea name="notes" value={customer.notes} onChange={updateCustomer} placeholder="Anything the delivery team should know?" rows="2" /></label>
            <div className="notice notice--warning">Prototype only: this form creates a local demo confirmation. It does not charge customers or send personal data to a server.</div>
            <button className="button button--primary button--full" type="submit" disabled={validItems.length === 0}>Place demo order · {money.format(total)}</button>
          </form>
        ) : (
          <>
            <div className="cart-drawer__body">
              {validItems.length === 0 ? (
                <div className="cart-empty"><div aria-hidden="true">🛍️</div><h3>Your cart is waiting</h3><p className="muted">Add a few everyday finds and they’ll show up here.</p><button className="button button--primary" onClick={onClose}>Explore products</button></div>
              ) : validItems.map((line) => (
                <article className="cart-line" key={line.key}>
                  <ProductVisual product={line.product} />
                  <div className="cart-line__details">
                    <strong>{line.product.name}</strong>
                    {line.variantLabel && <span className="muted small">{line.variantLabel}</span>}
                    <span className="cart-line__price">{money.format(finalPrice(line.product) * line.quantity)}</span>
                    <div className="cart-line__controls">
                      <div className="quantity-stepper quantity-stepper--small"><button onClick={() => onQuantity(line.key, line.quantity - 1)} disabled={line.quantity <= 1} aria-label={`Decrease ${line.product.name} quantity`}>−</button><output>{line.quantity}</output><button onClick={() => onQuantity(line.key, line.quantity + 1)} disabled={line.quantity >= Math.max(1, line.product.unitsInStock)} aria-label={`Increase ${line.product.name} quantity`}>+</button></div>
                      <button className="text-button" onClick={() => onRemove(line.key)}>Remove</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {validItems.length > 0 && <footer className="cart-drawer__footer">
              <div className="shipping-hint">{subtotal >= FREE_DELIVERY_THRESHOLD ? "You unlocked sample free delivery." : `Add ${money.format(FREE_DELIVERY_THRESHOLD - subtotal)} more for sample free delivery.`}</div>
              <div className="summary-row"><span>Subtotal</span><strong>{money.format(subtotal)}</strong></div>
              <div className="summary-row"><span>Delivery <small className="muted">(demo estimate)</small></span><strong>{delivery === 0 ? "Free" : money.format(delivery)}</strong></div>
              <div className="summary-row summary-row--total"><span>Total</span><strong>{money.format(total)}</strong></div>
              <button className="button button--primary button--full" onClick={() => setStage("checkout")}>Continue to checkout <span aria-hidden="true">→</span></button>
              <button className="text-button text-button--center" onClick={onClear}>Clear cart</button>
            </footer>}
          </>
        )}
      </aside>
    </div>
  );
}

export default function ProductCatalog() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [catalogSource, setCatalogSource] = useState("sample");
  const [apiMessage, setApiMessage] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [dealsOnly, setDealsOnly] = useState(false);
  const [priceBand, setPriceBand] = useState("any");
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [cart, setCart] = usePersistentState(CART_STORAGE_KEY, []);
  const [wishlist, setWishlist] = usePersistentState(WISHLIST_STORAGE_KEY, []);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, "");
    if (!baseUrl) return;
    const controller = new AbortController();
    async function loadCatalog() {
      try {
        const response = await fetch(`${baseUrl}/api/products`, { signal: controller.signal, headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`Products API returned HTTP ${response.status}`);
        const payload = await response.json();
        const rows = Array.isArray(payload) ? payload : (payload.products ?? payload.items ?? payload.data ?? payload.$values ?? []);
        if (!Array.isArray(rows)) throw new Error("Expected an array of products from /api/products");
        setProducts(rows.map(normalizeProduct).filter((product) => product.isActive));
        setCatalogSource("api");
        setApiMessage("");
      } catch (error) {
        if (error.name === "AbortError") return;
        setProducts(SAMPLE_PRODUCTS);
        setCatalogSource("sample");
        setApiMessage("Couldn't reach the products API, so the demo catalog is shown instead.");
      }
    }
    loadCatalog();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        event.preventDefault();
        document.getElementById("product-search")?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const visibleProducts = useMemo(() => products.filter((product) => product.isActive !== false), [products]);
  const categories = useMemo(() => ["All", ...new Set(visibleProducts.map((p) => p.category?.name || "Other"))], [visibleProducts]);
  const results = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLocaleLowerCase();
    return visibleProducts.filter((product) => {
      const matchesQuery = !normalizedQuery || `${product.name} ${product.description} ${product.category?.name ?? ""}`.toLocaleLowerCase().includes(normalizedQuery);
      const matchesCategory = category === "All" || (product.category?.name || "Other") === category;
      const matchesStock = !inStockOnly || stockState(product).canBuy;
      const matchesDeal = !dealsOnly || product.discountEnabled;
      const matchesWishlist = !wishlistOnly || wishlist.includes(product.id);
      const amount = finalPrice(product);
      const matchesPrice = priceBand === "any" || (priceBand === "under500" && amount < 500) || (priceBand === "500to1500" && amount >= 500 && amount <= 1500) || (priceBand === "1500to3000" && amount > 1500 && amount <= 3000) || (priceBand === "over3000" && amount > 3000);
      return matchesQuery && matchesCategory && matchesStock && matchesDeal && matchesWishlist && matchesPrice;
    }).sort(SORTS[sort].compare);
  }, [visibleProducts, deferredQuery, category, inStockOnly, dealsOnly, wishlistOnly, wishlist, priceBand, sort]);

  const openQuickView = useCallback((product) => setActiveProduct(product), []);
  const closeQuickView = useCallback(() => setActiveProduct(null), []);

  const addToCart = useCallback((product, quantity = 1, selectedVariant = null) => {
    const stock = stockState(product);
    if (!stock.canBuy) return;
    const key = `${product.id}::${selectedVariant?.id ?? "default"}`;
    const label = variantLabel(selectedVariant);
    setCart((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) return current.map((line) => line.key === key ? { ...line, quantity: Math.min(Math.max(1, Number(product.unitsInStock) || 1), line.quantity + quantity) } : line);
      return [...current, { key, productId: product.id, quantity: Math.min(Math.max(1, Number(product.unitsInStock) || 1), quantity), variantId: selectedVariant?.id ?? null, variantLabel: label }];
    });
    setToast(`${quantity} × ${product.name} added to your cart`);
  }, [setCart]);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
    setToast(wishlist.includes(productId) ? "Removed from wishlist" : "Saved to your wishlist");
  }, [setWishlist, wishlist]);

  const updateCartQuantity = useCallback((key, quantity) => {
    setCart((current) => {
      if (quantity < 1) return current.filter((line) => line.key !== key);
      const line = current.find((item) => item.key === key);
      const product = products.find((item) => item.id === line?.productId);
      const max = Math.max(1, Number(product?.unitsInStock) || 1);
      return current.map((item) => item.key === key ? { ...item, quantity: Math.min(quantity, max) } : item);
    });
  }, [products, setCart]);

  const removeCartLine = useCallback((key) => setCart((current) => current.filter((line) => line.key !== key)), [setCart]);
  const resetFilters = () => { setQuery(""); setCategory("All"); setInStockOnly(false); setDealsOnly(false); setPriceBand("any"); setWishlistOnly(false); setSort("featured"); };
  const cartCount = cart.reduce((sum, line) => sum + (Number(line.quantity) || 0), 0);
  const featuredProducts = useMemo(() => visibleProducts.filter((product) => product.featuredRank <= 8 && stockState(product).canBuy).slice(0, 4), [visibleProducts]);

  return (
    <div className="shop-shell">
      <div className="announcement-bar"><span>Made for everyday life in Ethiopia</span><span className="announcement-bar__dot" aria-hidden="true">•</span><span>Prices shown in ETB</span><span className="announcement-bar__right">Demo delivery estimate · Addis Ababa first</span></div>
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="EthioHub home" onClick={(event) => { event.preventDefault(); resetFilters(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="brand-mark" aria-hidden="true">e</span><span className="brand-word">ethio<span>hub</span><small>LOCAL FINDS. EVERYDAY VALUE.</small></span>
        </a>
        <label className="site-search"><span aria-hidden="true">⌕</span><input id="product-search" type="search" placeholder="Search products, categories…" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search products" /><kbd>/</kbd></label>
        <div className="header-actions">
          <button className={`header-action ${wishlistOnly ? "header-action--active" : ""}`} onClick={() => { setWishlistOnly((current) => !current); setCategory("All"); }} aria-pressed={wishlistOnly} aria-label={`Wishlist, ${wishlist.length} saved products`}><span className="header-action__icon" aria-hidden="true">♡</span><span className="header-action__text">Wishlist</span>{wishlist.length > 0 && <span className="tiny-count">{wishlist.length}</span>}</button>
          <button className="header-cart" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><span aria-hidden="true">▢</span><span>Cart</span><strong>{cartCount}</strong></button>
        </div>
      </header>

      <main id="top">
        <section className="hero wrap-wide">
          <div className="hero__copy">
            <span className="hero-kicker"><span className="hero-kicker__dot" /> YOUR EVERYDAY MARKETPLACE</span>
            <h1>Good finds.<br /><em>Right around</em> your day.</h1>
            <p>Explore practical essentials, local-inspired picks, and little upgrades for home, work, and everything in between.</p>
            <div className="hero__actions"><button className="button button--primary" onClick={() => { setCategory("All"); setWishlistOnly(false); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the shop <span aria-hidden="true">↘</span></button><span className="hero-note"><span aria-hidden="true">✓</span> Demo storefront · ETB pricing</span></div>
            <div className="hero-trust"><div><strong>{visibleProducts.length}+</strong><span>sample products</span></div><i /><div><strong>8+</strong><span>shop categories</span></div><i /><div><strong>1 tap</strong><span>to save favourites</span></div></div>
          </div>
          <div className="hero__art" aria-label="Featured product illustrations">
            <div className="hero-art-orbit hero-art-orbit--one" /><div className="hero-art-orbit hero-art-orbit--two" />
            <div className="hero-product hero-product--coffee"><span>☕</span><small>LOCAL ROAST</small></div>
            <div className="hero-product hero-product--tech"><span>🎧</span><small>DAILY TECH</small></div>
            <div className="hero-product hero-product--home"><span>🫖</span><small>HOME PICKS</small></div>
            <div className="hero-note-card"><span>✦</span><div><strong>Find your next favourite</strong><small>Browse by category or search</small></div></div>
            <span className="hero-art-spark hero-art-spark--a">✳</span><span className="hero-art-spark hero-art-spark--b">✦</span>
          </div>
        </section>

        <section className="category-section wrap-wide" aria-label="Shop by category">
          <div className="section-heading"><div><p className="eyebrow">A GOOD PLACE TO START</p><h2>Shop by category</h2></div><button className="text-link" onClick={() => { setCategory("All"); setWishlistOnly(false); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}>View all products <span aria-hidden="true">→</span></button></div>
          <div className="category-tiles">
            {[{ name: "Electronics", emoji: "🎧", tone: "tile-tech" }, { name: "Fashion", emoji: "🧥", tone: "tile-fashion" }, { name: "Groceries", emoji: "☕", tone: "tile-grocery" }, { name: "Home & Kitchen", emoji: "🫖", tone: "tile-home" }, { name: "Beauty & Care", emoji: "🌿", tone: "tile-beauty" }, { name: "Sports & Outdoors", emoji: "🧘", tone: "tile-sports" }].map((tile) => (
              <button className={`category-tile ${tile.tone} ${category === tile.name ? "is-selected" : ""}`} key={tile.name} onClick={() => { setCategory(tile.name); setWishlistOnly(false); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}><span className="category-tile__emoji" aria-hidden="true">{tile.emoji}</span><span className="category-tile__name">{tile.name}</span><span className="category-tile__arrow" aria-hidden="true">↗</span></button>
            ))}
          </div>
        </section>

        {featuredProducts.length > 0 && !query && category === "All" && !wishlistOnly && (
          <section className="featured-section wrap-wide"><div className="section-heading"><div><p className="eyebrow">HAND-PICKED FOR THE DEMO</p><h2>Popular picks</h2></div><button className="text-link" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>Shop everything <span aria-hidden="true">→</span></button></div><div className="featured-row">{featuredProducts.map((product) => <button className="featured-mini" key={product.id} onClick={() => openQuickView(product)}><ProductVisual product={product} /><span className="featured-mini__meta"><strong>{product.name}</strong><small>{money.format(finalPrice(product))}</small></span><span className="featured-mini__arrow" aria-hidden="true">↗</span></button>)}</div></section>
        )}

        <section className="catalog-section wrap-wide" id="catalog">
          <div className="section-heading catalog-heading"><div><p className="eyebrow">THE ETHIOHUB EDIT</p><h2>{wishlistOnly ? "Your wishlist" : dealsOnly ? "Deals worth a look" : category === "All" ? "Browse all products" : category}</h2><p className="section-subtitle">Thoughtful everyday picks. Sample listings — actual stock and prices depend on your connected sellers.</p></div><div className="catalog-summary"><strong>{results.length}</strong><span>{results.length === 1 ? "item" : "items"} found</span></div></div>
          {apiMessage && <div className="notice notice--warning api-notice">{apiMessage}</div>}
          <div className="filter-panel">
            <div className="category-chips" role="group" aria-label="Filter category">
              {categories.map((name) => <button key={name} className={`category-chip ${category === name ? "is-active" : ""}`} onClick={() => { setCategory(name); setWishlistOnly(false); }} aria-pressed={category === name}>{name}</button>)}
            </div>
            <div className="filter-controls">
              <label className="filter-select-label"><span>Price</span><select value={priceBand} onChange={(event) => setPriceBand(event.target.value)} aria-label="Filter by price"><option value="any">Any price</option><option value="under500">Under ETB 500</option><option value="500to1500">ETB 500–1,500</option><option value="1500to3000">ETB 1,500–3,000</option><option value="over3000">Over ETB 3,000</option></select></label>
              <label className="filter-select-label"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">{Object.entries(SORTS).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}</select></label>
              <label className="filter-toggle"><input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} /><span className="toggle-track" /><span>In stock</span></label>
              <label className="filter-toggle"><input type="checkbox" checked={dealsOnly} onChange={(event) => setDealsOnly(event.target.checked)} /><span className="toggle-track" /><span>On sale</span></label>
              {(query || category !== "All" || inStockOnly || dealsOnly || priceBand !== "any" || wishlistOnly || sort !== "featured") && <button className="clear-filters" onClick={resetFilters}>Clear filters ×</button>}
            </div>
          </div>

          {results.length > 0 ? <div className="product-grid">{results.map((product) => <ProductCard key={product.id} product={product} onOpen={openQuickView} onAdd={addToCart} isFavorite={wishlist.includes(product.id)} onToggleFavorite={toggleWishlist} />)}</div> : (
            <div className="empty-state"><div className="empty-state__icon" aria-hidden="true">⌕</div><h3>Nothing matched that search</h3><p>Try a different word or clear a filter to explore the full sample catalog.</p><button className="button button--primary" onClick={resetFilters}>Clear filters</button></div>
          )}
          <div className="catalog-footnote"><span aria-hidden="true">ⓘ</span><p>EthioHub prototype catalog: sample names, prices, stock, ratings, discount details, and delivery charges are illustrative only. Verify all information with merchants before accepting real orders.</p><span className="catalog-source">{catalogSource === "api" ? "Connected to API" : "Sample data"}</span></div>
        </section>

        <section className="newsletter-band wrap-wide"><div><p className="eyebrow">BUILDING SOMETHING LOCAL</p><h2>Everyday shopping, made simpler.</h2><p>A lightweight storefront foundation designed to connect with a product API and local checkout services.</p></div><button className="button button--light" onClick={() => { setQuery(""); setCategory("All"); setWishlistOnly(false); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}>Start exploring <span aria-hidden="true">→</span></button></section>
      </main>

      <footer className="site-footer wrap-wide"><a className="brand-lockup brand-lockup--footer" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}><span className="brand-mark" aria-hidden="true">e</span><span className="brand-word">ethio<span>hub</span><small>LOCAL FINDS. EVERYDAY VALUE.</small></span></a><p>Built as a lightweight, responsive storefront foundation.</p><div className="footer-links"><span>ETB pricing demo</span><span>•</span><span>Telebirr / Chapa-ready UI</span><span>•</span><span>React + Vite</span></div></footer>

      {activeProduct && <QuickView key={activeProduct.id} product={activeProduct} onClose={closeQuickView} onAdd={addToCart} />}
      {cartOpen && <CartDrawer cart={cart} products={visibleProducts} onClose={() => setCartOpen(false)} onQuantity={updateCartQuantity} onRemove={removeCartLine} onClear={() => setCart([])} onAddMore={() => { setCartOpen(false); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }} onPlaceOrder={(createdOrder) => { setOrderCount((count) => count + 1); setToast(`Demo order ${createdOrder.id} created`); setCart([]); }} />}
      {toast && <div className="toast" role="status" aria-live="polite"><span aria-hidden="true">✓</span>{toast}<button onClick={() => setToast("")} aria-label="Dismiss notification">×</button></div>}
      <div className="sr-only" aria-live="polite">{orderCount > 0 ? `${orderCount} demo order confirmation(s) created this session.` : ""}</div>
    </div>
  );
}
