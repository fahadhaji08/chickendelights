import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    note?: string;
    image: string;
  };
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function MenuItem({ item }: MenuItemProps) {
  const { cartItems, addToCart, updateQty } = useCart();
  const cartItem = cartItems.find((i) => i.id === item.id);
  const qty = cartItem?.qty || 0;

  // Only try the per-item image — if missing, show placeholder.
  // Drop  public/products/items/<slug>.jpg  to add a photo for any product.
  const [imgFailed, setImgFailed] = useState(false);
  const perItemSrc = `/products/items/${toSlug(item.name)}.jpg`;

  return (
    <motion.div
      className={`menu-item ${qty > 0 ? "item-added" : ""}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`card-product-${item.id}`}
    >
      <div className="item-img-wrap">
        {!imgFailed ? (
          <img
            src={perItemSrc}
            alt={item.name}
            className="item-photo"
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="product-placeholder">
            <div className="product-placeholder-inner">
              <span className="product-placeholder-icon">📦</span>
              <span className="product-placeholder-text">Photo Coming Soon</span>
            </div>
          </div>
        )}
        <div className="item-price-badge">₹{item.price}</div>
        {qty > 0 && <div className="item-in-cart-glow" />}
      </div>

      <div className="item-body">
        <div className="item-left">
          <div className="item-name">{item.name}</div>
          {item.note && <div className="item-note">{item.note}</div>}
        </div>

        <div className="item-right">
          <AnimatePresence mode="wait">
            {qty > 0 ? (
              <motion.div
                key="stepper"
                className="cart-stepper"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  className="stepper-btn"
                  onClick={() => updateQty(item.id, -1)}
                  data-testid={`button-decrement-${item.id}`}
                >
                  −
                </button>
                <motion.div
                  key={qty}
                  className="stepper-num"
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {qty}
                </motion.div>
                <button
                  className="stepper-btn"
                  onClick={() => updateQty(item.id, 1)}
                  data-testid={`button-increment-${item.id}`}
                >
                  +
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="add"
                className="add-btn"
                onClick={() => addToCart(item)}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.88 }}
                data-testid={`button-add-${item.id}`}
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
