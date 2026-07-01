import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

// ─────────────────────────────────────────────────────────────────
//  BEST SELLER IMAGES
//  Drop a .jpg into  public/products/  to swap any image.
//  Each item first tries its specific image (bs-*.jpg), then falls
//  back to the category image if that file isn't there yet.
//  See public/products/HOW-TO-ADD-IMAGES.txt for full guide.
// ─────────────────────────────────────────────────────────────────
const BEST_SELLERS = [
  {
    id: "s7",
    name: "Chicken Turkish Seekh Kabab",
    price: 290,
    tag: "Fan Favourite",
    image: "/products/bs-turkish-seekh.jpg",
    fallback: "/products/seekh.jpg",
  },
  {
    id: "a7",
    name: "Chicken Momos",
    price: 270,
    tag: "Trending",
    image: "/products/bs-momos.jpg",
    fallback: "/products/additional.jpg",
  },
  {
    id: "a8",
    name: "Chicken Samosa",
    price: 280,
    tag: "Classic",
    image: "/products/bs-samosa.jpg",
    fallback: "/products/additional.jpg",
  },
  {
    id: "f1",
    name: "Fried Chicken Boneless",
    price: 280,
    tag: "Most Loved",
    image: "/products/bs-fried-boneless.jpg",
    fallback: "/products/fried.jpg",
  },
  {
    id: "a1",
    name: "Chicken Nuggets",
    price: 260,
    tag: "Kids Fave",
    image: "/products/bs-nuggets.jpg",
    fallback: "/products/additional.jpg",
  },
  {
    id: "a6",
    name: "Chicken Popcorn",
    price: 280,
    tag: "Crispy Pick",
    image: "/products/bs-popcorn.jpg",
    fallback: "/products/additional.jpg",
  },
];

type BestSellerItem = typeof BEST_SELLERS[0];

function BestSellerCard({ item, index }: { item: BestSellerItem; index: number }) {
  const { cartItems, addToCart, updateQty } = useCart();
  const [imgSrc, setImgSrc] = useState(item.image);
  const [imgFailed, setImgFailed] = useState(false);
  const cartItem = cartItems.find((i) => i.id === item.id);
  const qty = cartItem?.qty || 0;

  const handleError = () => {
    if (imgSrc !== item.fallback) {
      setImgSrc(item.fallback);
    } else {
      setImgFailed(true);
    }
  };

  return (
    <motion.div
      className={`bs-card ${qty > 0 ? "bs-card-added" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="bs-img-wrap">
        {!imgFailed ? (
          <img
            src={imgSrc}
            alt={item.name}
            className="bs-img"
            onError={handleError}
            loading="lazy"
          />
        ) : (
          <div className="product-placeholder">
            <div className="product-placeholder-inner">
              <span className="product-placeholder-icon">🍽️</span>
              <span className="product-placeholder-text">Photo Coming Soon</span>
            </div>
          </div>
        )}
        <div className="bs-tag">{item.tag}</div>
        <div className="bs-badge">⭐ Best Seller</div>
        {qty > 0 && <div className="bs-cart-glow" />}
      </div>

      <div className="bs-body">
        <div className="bs-name">{item.name}</div>
        <div className="bs-footer">
          <div className="bs-price">₹{item.price}</div>
          <AnimatePresence mode="wait">
            {qty > 0 ? (
              <motion.div
                key="stepper"
                className="cart-stepper"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button className="stepper-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                <motion.div key={qty} className="stepper-num" initial={{ scale: 1.4 }} animate={{ scale: 1 }} transition={{ duration: 0.18 }}>
                  {qty}
                </motion.div>
                <button className="stepper-btn" onClick={() => updateQty(item.id, 1)}>+</button>
              </motion.div>
            ) : (
              <motion.button
                key="add"
                className="add-btn"
                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: imgSrc })}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.88 }}
              >
                + Add
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function BestSellers() {
  return (
    <motion.section
      className="best-sellers-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bs-header">
        <motion.div
          className="bs-header-tag"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          ⭐ Customer Favourites
        </motion.div>
        <motion.h2
          className="bs-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 0.6 }}
        >
          Best Sellers
        </motion.h2>
        <motion.p
          className="bs-subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32, duration: 0.6 }}
        >
          Our most-ordered products — loved by hundreds of happy customers
        </motion.p>
      </div>

      <div className="bs-grid">
        {BEST_SELLERS.map((item, i) => (
          <BestSellerCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
