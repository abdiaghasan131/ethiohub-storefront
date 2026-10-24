/**
 * EthioHub sample catalog — illustrative demo data, not live inventory or market research.
 * Prices are ETB examples. Replace with verified merchant prices before launch.
 * Shape is deliberately close to the Product model used by the original catalog.
 */
const variant = (id, extra = {}) => ({ id, ...extra });

export const SAMPLE_PRODUCTS = [
  {
    id: "coffee-yirgacheffe", name: "Yirgacheffe Coffee Beans", description: "Aromatic single-origin coffee with bright citrus and floral notes. Ideal for pour-over or a traditional coffee ceremony.", unitPrice: 720, qtyInUnit: 500, unitsInStock: 42, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: true, expiryDate: "2027-03-01", discountEnabled: true, discountPercent: 12, isActive: true, category: { name: "Groceries" }, unit: { name: "g" }, hasColorVariance: false, hasSizeVariance: true, productVariances: [variant("coffee-250", { size: "250 g" }), variant("coffee-500", { size: "500 g" }), variant("coffee-1000", { size: "1 kg" })], emoji: "☕", tone: "coffee", label: "Local favourite", rating: 4.9, reviewCount: 128, featuredRank: 1,
  },
  {
    id: "raw-honey", name: "Raw Forest Honey", description: "A rich, golden honey for breakfast, tea, and home cooking. Packed in a reusable glass jar.", unitPrice: 420, qtyInUnit: 1, unitsInStock: 24, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: true, expiryDate: "2027-09-15", discountEnabled: false, isActive: true, category: { name: "Groceries" }, unit: { name: "jar" }, hasColorVariance: false, hasSizeVariance: true, productVariances: [variant("honey-small", { size: "350 g" }), variant("honey-large", { size: "700 g" })], emoji: "🍯", tone: "honey", rating: 4.7, reviewCount: 64, featuredRank: 4,
  },
  {
    id: "berbere-spice", name: "Berbere Spice Blend", description: "A fragrant Ethiopian spice blend for wot, lentils, marinades, and everyday cooking.", unitPrice: 180, qtyInUnit: 250, unitsInStock: 120, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: true, expiryDate: "2027-06-30", discountEnabled: false, isActive: true, category: { name: "Groceries" }, unit: { name: "g" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🌶️", tone: "spice", rating: 4.8, reviewCount: 91, featuredRank: 2,
  },
  {
    id: "teff-flour", name: "Teff Flour", description: "Finely milled teff flour for injera and home baking. Store sealed in a cool, dry place.", unitPrice: 260, qtyInUnit: 1, unitsInStock: 65, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: true, expiryDate: "2027-04-30", discountEnabled: false, isActive: true, category: { name: "Groceries" }, unit: { name: "kg" }, hasColorVariance: false, hasSizeVariance: true, productVariances: [variant("teff-1kg", { size: "1 kg" }), variant("teff-5kg", { size: "5 kg" })], emoji: "🌾", tone: "grain", rating: 4.6, reviewCount: 42, featuredRank: 8,
  },
  {
    id: "shiro-mix", name: "Shiro Powder Mix", description: "A convenient chickpea-based mix for a warming shiro stew. Add water and season to taste.", unitPrice: 210, qtyInUnit: 500, unitsInStock: 48, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: true, expiryDate: "2027-05-12", discountEnabled: false, isActive: true, category: { name: "Groceries" }, unit: { name: "g" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🥣", tone: "grain", rating: 4.5, reviewCount: 35, featuredRank: 11,
  },
  {
    id: "olive-oil", name: "Extra Virgin Olive Oil", description: "A versatile kitchen staple for salads, roasting, and finishing meals.", unitPrice: 980, qtyInUnit: 1, unitsInStock: 19, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: true, expiryDate: "2027-08-20", discountEnabled: true, discountPercent: 10, isActive: true, category: { name: "Groceries" }, unit: { name: "bottle" }, hasColorVariance: false, hasSizeVariance: true, productVariances: [variant("oil-500", { size: "500 ml" }), variant("oil-1000", { size: "1 L" })], emoji: "🫒", tone: "olive", rating: 4.6, reviewCount: 29, featuredRank: 14,
  },
  {
    id: "wireless-earbuds", name: "Wireless Earbuds", description: "Compact Bluetooth earbuds with a charging case for music, calls, and commuting.", unitPrice: 1850, qtyInUnit: 1, unitsInStock: 31, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: true, discountPercent: 15, isActive: true, category: { name: "Electronics" }, unit: { name: "pair" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("earbuds-black", { color: "#20252b", colorName: "Midnight" }), variant("earbuds-white", { color: "#f0eee9", colorName: "Cloud" })], emoji: "🎧", tone: "electronics", label: "Deal", rating: 4.7, reviewCount: 206, featuredRank: 3,
  },
  {
    id: "power-bank", name: "20,000 mAh Power Bank", description: "A high-capacity backup battery for compatible phones and everyday travel. Cable sold separately unless included by the seller.", unitPrice: 1450, qtyInUnit: 1, unitsInStock: 37, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Electronics" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("power-black", { color: "#262b30", colorName: "Black" }), variant("power-silver", { color: "#c7cbd0", colorName: "Silver" })], emoji: "🔋", tone: "electronics", rating: 4.6, reviewCount: 114, featuredRank: 6,
  },
  {
    id: "usb-c-charger", name: "USB-C Fast Charger", description: "Compact USB-C wall charger for compatible phones, tablets, and other USB-C devices. Check device wattage before buying.", unitPrice: 690, qtyInUnit: 1, unitsInStock: 53, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Electronics" }, unit: { name: "piece" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🔌", tone: "electronics", rating: 4.4, reviewCount: 77, featuredRank: 12,
  },
  {
    id: "smart-watch", name: "Everyday Smart Watch", description: "A lightweight smartwatch-style wearable for notifications, activity tracking, and everyday use. Confirm phone compatibility before purchase.", unitPrice: 2600, qtyInUnit: 1, unitsInStock: 15, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: true, discountPercent: 8, isActive: true, category: { name: "Electronics" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("watch-black", { color: "#272b31", colorName: "Black" }), variant("watch-rose", { color: "#c58e82", colorName: "Rose" })], emoji: "⌚", tone: "electronics", label: "New", rating: 4.3, reviewCount: 52, featuredRank: 9,
  },
  {
    id: "bluetooth-speaker", name: "Portable Bluetooth Speaker", description: "A small wireless speaker for desk, kitchen, and outdoor listening. Actual battery life varies by volume and use.", unitPrice: 1650, qtyInUnit: 1, unitsInStock: 21, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Electronics" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("speaker-black", { color: "#22272d", colorName: "Black" }), variant("speaker-green", { color: "#407565", colorName: "Green" })], emoji: "🔊", tone: "electronics", rating: 4.5, reviewCount: 66, featuredRank: 16,
  },
  {
    id: "phone-stand", name: "Foldable Phone Stand", description: "A pocket-friendly adjustable stand for video calls, streaming, and desk work.", unitPrice: 320, qtyInUnit: 1, unitsInStock: 80, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Electronics" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("stand-black", { color: "#34383d", colorName: "Graphite" }), variant("stand-white", { color: "#efeee9", colorName: "Ivory" })], emoji: "📱", tone: "electronics", rating: 4.5, reviewCount: 97, featuredRank: 17,
  },
  {
    id: "cotton-shawl", name: "Handwoven Cotton Shawl", description: "A soft, traditional netela-inspired shawl with a hand-finished woven border.", unitPrice: 1450, qtyInUnit: 1, unitsInStock: 16, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Fashion" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("shawl-cream", { color: "#eee6d7", colorName: "Cream" }), variant("shawl-red", { color: "#b94d45", colorName: "Terracotta" }), variant("shawl-green", { color: "#286956", colorName: "Forest" })], emoji: "🧣", tone: "fashion", label: "Handmade style", rating: 4.8, reviewCount: 88, featuredRank: 5,
  },
  {
    id: "running-sneakers", name: "Everyday Running Sneakers", description: "Versatile casual trainers with a cushioned sole for everyday errands and walks.", unitPrice: 2900, qtyInUnit: 1, unitsInStock: 18, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: true, discountPercent: 20, isActive: true, category: { name: "Fashion" }, unit: { name: "pair" }, hasColorVariance: true, hasSizeVariance: true, productVariances: [variant("shoe-black-40", { color: "#263039", colorName: "Black", size: "40" }), variant("shoe-black-41", { color: "#263039", colorName: "Black", size: "41" }), variant("shoe-black-42", { color: "#263039", colorName: "Black", size: "42" }), variant("shoe-white-41", { color: "#eae9e5", colorName: "White", size: "41" }), variant("shoe-white-42", { color: "#eae9e5", colorName: "White", size: "42" }), variant("shoe-white-43", { color: "#eae9e5", colorName: "White", size: "43" })], emoji: "👟", tone: "fashion", label: "Deal", rating: 4.6, reviewCount: 162, featuredRank: 7,
  },
  {
    id: "leather-tote", name: "Minimal Leather Tote", description: "A clean, everyday carry bag with room for a notebook, wallet, and daily essentials.", unitPrice: 2350, qtyInUnit: 1, unitsInStock: 8, productAvailable: true, unitsOnOrder: 4, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Fashion" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("tote-brown", { color: "#966747", colorName: "Cognac" }), variant("tote-black", { color: "#2c2c2b", colorName: "Black" })], emoji: "👜", tone: "fashion", rating: 4.6, reviewCount: 41, featuredRank: 13,
  },
  {
    id: "cotton-hoodie", name: "Cotton Everyday Hoodie", description: "A comfortable layer for cool evenings, travel, and relaxed weekends.", unitPrice: 1850, qtyInUnit: 1, unitsInStock: 24, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Fashion" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: true, productVariances: [variant("hoodie-grey-s", { color: "#b8bab7", colorName: "Grey", size: "S" }), variant("hoodie-grey-m", { color: "#b8bab7", colorName: "Grey", size: "M" }), variant("hoodie-grey-l", { color: "#b8bab7", colorName: "Grey", size: "L" }), variant("hoodie-green-m", { color: "#427466", colorName: "Green", size: "M" }), variant("hoodie-green-l", { color: "#427466", colorName: "Green", size: "L" })], emoji: "🧥", tone: "fashion", rating: 4.4, reviewCount: 39, featuredRank: 19,
  },
  {
    id: "woven-belt", name: "Woven Everyday Belt", description: "A simple woven belt designed to work with casual outfits.", unitPrice: 580, qtyInUnit: 1, unitsInStock: 44, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Fashion" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("belt-tan", { color: "#b88a5a", colorName: "Tan" }), variant("belt-black", { color: "#282828", colorName: "Black" })], emoji: "🪢", tone: "fashion", rating: 4.2, reviewCount: 27, featuredRank: 22,
  },
  {
    id: "jebena-set", name: "Ceramic Jebena Coffee Set", description: "A traditional coffee-pot-inspired set with matching cups for serving guests at home.", unitPrice: 1650, qtyInUnit: 1, unitsInStock: 12, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Home & Kitchen" }, unit: { name: "set" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🫖", tone: "home", label: "Gift idea", rating: 4.9, reviewCount: 74, featuredRank: 10,
  },
  {
    id: "injera-mitad", name: "Electric Injera Mitad", description: "A countertop cooking appliance concept listing. Verify voltage, plug, warranty, and seller specifications before purchase.", unitPrice: 6800, qtyInUnit: 1, unitsInStock: 5, productAvailable: true, unitsOnOrder: 2, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Home & Kitchen" }, unit: { name: "piece" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🍳", tone: "home", rating: 4.3, reviewCount: 16, featuredRank: 20,
  },
  {
    id: "ceramic-mugs", name: "Handmade Ceramic Mug Set", description: "Two everyday mugs with a warm, handcrafted look. Colour and finish can vary slightly.", unitPrice: 850, qtyInUnit: 2, unitsInStock: 33, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Home & Kitchen" }, unit: { name: "mugs" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("mugs-sand", { color: "#c7ab8c", colorName: "Sand" }), variant("mugs-green", { color: "#6f9588", colorName: "Sage" })], emoji: "☕", tone: "home", rating: 4.7, reviewCount: 31, featuredRank: 21,
  },
  {
    id: "bedsheet-set", name: "Cotton Bedsheet Set", description: "A simple cotton bedding set for a comfortable everyday bedroom refresh.", unitPrice: 2350, qtyInUnit: 1, unitsInStock: 14, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: true, discountPercent: 10, isActive: true, category: { name: "Home & Kitchen" }, unit: { name: "set" }, hasColorVariance: true, hasSizeVariance: true, productVariances: [variant("sheet-blue-double", { color: "#8ca6c6", colorName: "Blue", size: "Double" }), variant("sheet-blue-queen", { color: "#8ca6c6", colorName: "Blue", size: "Queen" }), variant("sheet-sand-double", { color: "#c8b59b", colorName: "Sand", size: "Double" }), variant("sheet-sand-queen", { color: "#c8b59b", colorName: "Sand", size: "Queen" })], emoji: "🛏️", tone: "home", rating: 4.5, reviewCount: 28, featuredRank: 24,
  },
  {
    id: "desk-lamp", name: "Warm LED Desk Lamp", description: "A compact lamp for a study desk, bedside table, or home office. Adapter details should be confirmed with the seller.", unitPrice: 1250, qtyInUnit: 1, unitsInStock: 17, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Home & Kitchen" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("lamp-white", { color: "#ece9df", colorName: "Warm white" }), variant("lamp-black", { color: "#333a42", colorName: "Black" })], emoji: "💡", tone: "home", rating: 4.4, reviewCount: 47, featuredRank: 25,
  },
  {
    id: "storage-baskets", name: "Woven Storage Basket Set", description: "Lightweight baskets for organising shelves, laundry, toys, or household essentials.", unitPrice: 1100, qtyInUnit: 1, unitsInStock: 22, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Home & Kitchen" }, unit: { name: "set" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🧺", tone: "home", rating: 4.6, reviewCount: 23, featuredRank: 26,
  },
  {
    id: "body-lotion", name: "Daily Moisturising Lotion", description: "An everyday body moisturiser. Check the ingredient list and seal before use; sample product details require seller verification.", unitPrice: 520, qtyInUnit: 1, unitsInStock: 38, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: true, expiryDate: "2028-02-01", discountEnabled: false, isActive: true, category: { name: "Beauty & Care" }, unit: { name: "bottle" }, hasColorVariance: false, hasSizeVariance: true, productVariances: [variant("lotion-250", { size: "250 ml" }), variant("lotion-500", { size: "500 ml" })], emoji: "🧴", tone: "beauty", rating: 4.3, reviewCount: 69, featuredRank: 15,
  },
  {
    id: "hair-oil", name: "Nourishing Hair Oil", description: "A lightweight hair-care oil for a simple grooming routine. Review ingredients and directions on the actual product label.", unitPrice: 390, qtyInUnit: 1, unitsInStock: 49, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: true, expiryDate: "2027-12-15", discountEnabled: true, discountPercent: 5, isActive: true, category: { name: "Beauty & Care" }, unit: { name: "bottle" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🌿", tone: "beauty", rating: 4.4, reviewCount: 51, featuredRank: 18,
  },
  {
    id: "sunscreen", name: "Daily Sunscreen", description: "A daily sun-care product placeholder. Verify SPF, authenticity, expiry date, and suitability on the packaging before purchase.", unitPrice: 780, qtyInUnit: 1, unitsInStock: 27, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: true, expiryDate: "2028-01-31", discountEnabled: false, isActive: true, category: { name: "Beauty & Care" }, unit: { name: "tube" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "☀️", tone: "beauty", rating: 4.2, reviewCount: 22, featuredRank: 23,
  },
  {
    id: "water-bottle", name: "Insulated Water Bottle", description: "A reusable bottle for work, study, and commuting. Capacity and insulation claims should be checked against seller specifications.", unitPrice: 890, qtyInUnit: 1, unitsInStock: 43, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Sports & Outdoors" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("bottle-blue", { color: "#78a6c8", colorName: "Blue" }), variant("bottle-green", { color: "#47826d", colorName: "Green" }), variant("bottle-black", { color: "#343a40", colorName: "Black" })], emoji: "🧴", tone: "sports", rating: 4.7, reviewCount: 83, featuredRank: 27,
  },
  {
    id: "yoga-mat", name: "Everyday Exercise Mat", description: "A cushioned mat for stretching, mobility, and home workouts. Dimensions and material should be confirmed with the seller.", unitPrice: 1350, qtyInUnit: 1, unitsInStock: 14, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Sports & Outdoors" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("mat-purple", { color: "#927eb8", colorName: "Purple" }), variant("mat-green", { color: "#5e9d81", colorName: "Green" })], emoji: "🧘", tone: "sports", rating: 4.5, reviewCount: 34, featuredRank: 28,
  },
  {
    id: "backpack", name: "Daily Commuter Backpack", description: "A practical everyday bag for a laptop, books, and daily essentials. Check dimensions against your device.", unitPrice: 1950, qtyInUnit: 1, unitsInStock: 20, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Fashion" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("bag-black", { color: "#2f3338", colorName: "Black" }), variant("bag-olive", { color: "#69745a", colorName: "Olive" })], emoji: "🎒", tone: "fashion", rating: 4.6, reviewCount: 92, featuredRank: 29,
  },
  {
    id: "notebook-pack", name: "Notebook & Pen Set", description: "A practical stationery pack for planning, school, study, and office notes.", unitPrice: 290, qtyInUnit: 1, unitsInStock: 90, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Books & Stationery" }, unit: { name: "set" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "📓", tone: "stationery", rating: 4.4, reviewCount: 43, featuredRank: 30,
  },
  {
    id: "ethiopian-cookbook", name: "Ethiopian Home Cooking Guide", description: "A sample cookbook listing for exploring familiar dishes, pantry basics, and kitchen techniques.", unitPrice: 650, qtyInUnit: 1, unitsInStock: 32, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Books & Stationery" }, unit: { name: "book" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "📚", tone: "stationery", label: "Staff pick", rating: 4.8, reviewCount: 58, featuredRank: 31,
  },
  {
    id: "kids-building-set", name: "Creative Building Blocks", description: "A colourful building set for supervised creative play. Confirm age suitability and small-parts warnings with the seller.", unitPrice: 990, qtyInUnit: 1, unitsInStock: 25, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Kids & Family" }, unit: { name: "set" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🧩", tone: "kids", rating: 4.5, reviewCount: 37, featuredRank: 32,
  },
  {
    id: "lunch-box", name: "Reusable Lunch Box", description: "A reusable container for packed lunches, snacks, and everyday meal prep.", unitPrice: 480, qtyInUnit: 1, unitsInStock: 55, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Home & Kitchen" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("lunch-green", { color: "#81a995", colorName: "Sage" }), variant("lunch-pink", { color: "#d99b9d", colorName: "Rose" })], emoji: "🍱", tone: "home", rating: 4.5, reviewCount: 33, featuredRank: 33,
  },
  {
    id: "phone-case", name: "Protective Phone Case", description: "A flexible protective case. Select your exact phone model with the seller before ordering.", unitPrice: 350, qtyInUnit: 1, unitsInStock: 70, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Electronics" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: true, productVariances: [variant("case-black-android", { color: "#34383d", colorName: "Black", size: "Android model" }), variant("case-clear-android", { color: "#e8e8e5", colorName: "Clear", size: "Android model" }), variant("case-black-iphone", { color: "#34383d", colorName: "Black", size: "iPhone model" }), variant("case-clear-iphone", { color: "#e8e8e5", colorName: "Clear", size: "iPhone model" })], emoji: "📱", tone: "electronics", rating: 4.2, reviewCount: 61, featuredRank: 34,
  },
  {
    id: "reusable-shopping-bag", name: "Reusable Shopping Bag", description: "A foldable bag for grocery runs and everyday errands.", unitPrice: 120, qtyInUnit: 1, unitsInStock: 110, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Home & Kitchen" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("shopbag-green", { color: "#477c67", colorName: "Green" }), variant("shopbag-coral", { color: "#c76f65", colorName: "Coral" })], emoji: "🛍️", tone: "home", rating: 4.1, reviewCount: 18, featuredRank: 35,
  },
  {
    id: "coffee-cups", name: "Coffee Ceremony Cup Set", description: "A set of small cups for serving coffee during a traditional gathering or everyday use.", unitPrice: 620, qtyInUnit: 1, unitsInStock: 29, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Home & Kitchen" }, unit: { name: "set" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🍵", tone: "home", rating: 4.8, reviewCount: 49, featuredRank: 36,
  },
  {
    id: "canvas-sneakers", name: "Canvas Slip-On Shoes", description: "Easy everyday slip-ons for casual outfits. Check the sizing guide before ordering.", unitPrice: 1750, qtyInUnit: 1, unitsInStock: 0, productAvailable: true, unitsOnOrder: 25, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Fashion" }, unit: { name: "pair" }, hasColorVariance: true, hasSizeVariance: true, productVariances: [variant("slip-black-40", { color: "#24282c", colorName: "Black", size: "40" }), variant("slip-black-41", { color: "#24282c", colorName: "Black", size: "41" }), variant("slip-cream-41", { color: "#e4ddcc", colorName: "Cream", size: "41" })], emoji: "👞", tone: "fashion", rating: 4.2, reviewCount: 14, featuredRank: 37,
  },
  {
    id: "desk-organizer", name: "Compact Desk Organizer", description: "A tidy home for pens, charging cables, notes, and small desk accessories.", unitPrice: 540, qtyInUnit: 1, unitsInStock: 36, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Books & Stationery" }, unit: { name: "piece" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🗂️", tone: "stationery", rating: 4.3, reviewCount: 21, featuredRank: 38,
  },
  {
    id: "coffee-gift-box", name: "Ethiopian Coffee Gift Box", description: "A sample gift bundle with coffee-themed essentials. Check the final bundle contents before fulfilment.", unitPrice: 1950, qtyInUnit: 1, unitsInStock: 11, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: true, discountPercent: 12, isActive: true, category: { name: "Gifts & Bundles" }, unit: { name: "box" }, hasColorVariance: false, hasSizeVariance: false, productVariances: [], emoji: "🎁", tone: "gift", label: "Gift idea", rating: 4.7, reviewCount: 26, featuredRank: 39,
  },
  {
    id: "travel-pouch", name: "Everyday Travel Pouch", description: "A lightweight pouch for cables, toiletries, and small essentials while travelling.", unitPrice: 430, qtyInUnit: 1, unitsInStock: 57, productAvailable: true, unitsOnOrder: 0, hasExpiryDate: false, discountEnabled: false, isActive: true, category: { name: "Fashion" }, unit: { name: "piece" }, hasColorVariance: true, hasSizeVariance: false, productVariances: [variant("pouch-blue", { color: "#5d88ad", colorName: "Blue" }), variant("pouch-olive", { color: "#7c8662", colorName: "Olive" })], emoji: "👝", tone: "fashion", rating: 4.3, reviewCount: 25, featuredRank: 40,
  },
];

// Real Unsplash CDN photos make the local demo catalogue more lifelike.
// These are illustrative category photos, not verified photos of the exact listed goods.
const SAMPLE_UNSPLASH_POOLS = {
  Electronics: ["photo-1498049794561-7780e7231661", "photo-1517336714731-489689fd1ca8", "photo-1511707171634-5f897ff02aa9"],
  Fashion: ["photo-1445205170230-053b83016050", "photo-1521572163474-6864f9cf17ab", "photo-1529139574466-a303027c1d8b"],
  Groceries: ["photo-1542838132-92c53300491e", "photo-1559056199-641a0ac8b55e", "photo-1547592180-85f173990554"],
  "Home & Kitchen": ["photo-1556909114-f6e7ad7d3136", "photo-1555041469-a586c61ea9bc", "photo-1507473885765-e6ed057f782c"],
  "Beauty & Care": ["photo-1596462502278-27bfdc403348", "photo-1608248543803-ba4f8c70ae0b", "photo-1556228720-195a672e8a03"],
  "Sports & Outdoors": ["photo-1517836357463-d25dfeac3438", "photo-1534438327276-14e5300c3a48", "photo-1574629810360-7efbbe195018"],
  "Books & Stationery": ["photo-1512820790803-83ca734da794", "photo-1544947950-fa07a98d237f", "photo-1455390582262-044cdead277a"],
  "Kids & Family": ["photo-1515488042361-ee00e0ddd4e4", "photo-1558060370-d644479cb6f7", "photo-1512820790803-83ca734da794"],
  "Bags & Accessories": ["photo-1553062407-98eeb64c6a62", "photo-1548036328-c9fa89d128fa", "photo-1565026057447-bc90a3dceb87"],
  "Gifts & Bundles": ["photo-1559056199-641a0ac8b55e", "photo-1548036328-c9fa89d128fa", "photo-1512820790803-83ca734da794"],
};

function sampleUnsplashPhoto(product, index) {
  const name = String(product.name || "").toLowerCase();
  const category = product.category?.name || "Electronics";
  const categoryPool = SAMPLE_UNSPLASH_POOLS[category] || SAMPLE_UNSPLASH_POOLS.Electronics;
  const specific = [
    [/headphone|earbud|speaker/, "photo-1505740420928-5e560c06d30e"],
    [/smart ?watch|watch strap/, "photo-1523275335684-37898b6baf30"],
    [/phone|charger|power bank|cable|webcam|keyboard|mouse|laptop|ssd/, "photo-1517336714731-489689fd1ca8"],
    [/sneaker|shoe|boots|slides|sandal/, "photo-1549298916-b41d501d3772"],
    [/backpack|daypack/, "photo-1553062407-98eeb64c6a62"],
    [/coffee|arabica|jebena/, "photo-1559056199-641a0ac8b55e"],
    [/berbere|spice|turmeric/, "photo-1547592180-85f173990554"],
    [/lamp|bulb/, "photo-1507473885765-e6ed057f782c"],
    [/sofa|chair|furniture|bedsheet|pillow/, "photo-1555041469-a586c61ea9bc"],
    [/skincare|lotion|moisturi|shampoo|soap|cosmetic|lip balm/, "photo-1608248543803-ba4f8c70ae0b"],
    [/football|soccer/, "photo-1574629810360-7efbbe195018"],
    [/book|storybook/, "photo-1512820790803-83ca734da794"],
    [/sunglasses/, "photo-1511499767150-a48a237f0083"],
    [/handbag|tote|pouch|wallet|duffel|travel bag/, "photo-1548036328-c9fa89d128fa"],
    [/baby|sippy|feeding|blanket|bib/, "photo-1515488042361-ee00e0ddd4e4"],
    [/toy|plush|blocks|puzzle|colouring|coloring/, "photo-1558060370-d644479cb6f7"],
  ];
  const match = specific.find(([pattern]) => pattern.test(name));
  return match ? match[1] : categoryPool[index % categoryPool.length];
}

SAMPLE_PRODUCTS.forEach((product, index) => {
  const photoId = sampleUnsplashPhoto(product, index);
  const imagePath = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=900&q=80`;
  product.productImages = [{
    imageId: `${product.id}-unsplash`,
    imagePath,
    description: `Illustrative catalogue photo for ${product.name}`,
    isActive: true,
  }];
});

/** Convert a PascalCase or camelCase API product into the catalog's UI shape. */
export function normalizeProduct(raw, index = 0) {
  const read = (...keys) => {
    for (const key of keys) {
      if (raw?.[key] !== undefined && raw?.[key] !== null) return raw[key];
    }
    return undefined;
  };
  const categoryRaw = read("category", "Category");
  const unitRaw = read("unit", "Unit");
  const variancesRaw = read("productVariances", "ProductVariances");
  const imagesRaw = read("productImages", "ProductImages");
  const categoryName = typeof categoryRaw === "string" ? categoryRaw : categoryRaw?.name ?? categoryRaw?.Name ?? "Other";
  const unitName = typeof unitRaw === "string" ? unitRaw : unitRaw?.name ?? unitRaw?.Name ?? "piece";
  const variances = Array.isArray(variancesRaw) ? variancesRaw.map((v, vi) => ({
    id: v.id ?? v.Id ?? v.productVarianceId ?? `api-v-${index}-${vi}`,
    color: v.color ?? v.Color,
    colorName: v.colorName ?? v.ColorName,
    size: v.size ?? v.Size,
    label: v.label ?? v.Label,
  })) : [];
  const images = Array.isArray(imagesRaw) ? imagesRaw.map((img, ii) => ({
    imageId: img.imageId ?? img.ImageId ?? `api-img-${index}-${ii}`,
    imagePath: img.imagePath ?? img.ImagePath ?? img.url ?? img.Url,
    description: img.description ?? img.Description ?? "",
    isActive: img.isActive ?? img.IsActive ?? true,
    productVarianceId: img.productVarianceId ?? img.ProductVarianceId,
  })).filter((img) => img.imagePath) : [];
  const hasColorVariance = Boolean(read("hasColorVariance", "HasColorVariance"));
  const hasSizeVariance = Boolean(read("hasSizeVariance", "HasSizeVariance"));
  return {
    id: String(read("id", "Id", "productId", "ProductId") ?? `api-product-${index}`),
    name: String(read("name", "Name") ?? "Unnamed product"),
    description: String(read("description", "Description") ?? "Product description not provided."),
    unitPrice: Number(read("unitPrice", "UnitPrice", "price", "Price") ?? 0),
    qtyInUnit: Number(read("qtyInUnit", "QtyInUnit") ?? 1),
    unitsInStock: Number(read("unitsInStock", "UnitsInStock") ?? 0),
    productAvailable: Boolean(read("productAvailable", "ProductAvailable") ?? true),
    unitsOnOrder: Number(read("unitsOnOrder", "UnitsOnOrder") ?? 0),
    hasExpiryDate: Boolean(read("hasExpiryDate", "HasExpiryDate") ?? false),
    expiryDate: read("expiryDate", "ExpiryDate"),
    discountEnabled: Boolean(read("discountEnabled", "DiscountEnabled") ?? false),
    discountPercent: Number(read("discountPercent", "DiscountPercent") ?? 0),
    isActive: Boolean(read("isActive", "IsActive") ?? true),
    category: { name: categoryName },
    unit: { name: unitName },
    hasColorVariance,
    hasSizeVariance,
    productVariances: variances,
    productImages: images,
    emoji: "📦",
    tone: "default",
    rating: 0,
    reviewCount: 0,
    featuredRank: index + 1,
    label: "",
  };
}
