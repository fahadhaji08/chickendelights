import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, cartItems, total, totalQty, updateQty, removeFromCart } = useCart();

  const handleWhatsAppOrder = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
    let msg = `🍢 *Chicken Delights — New Order* 🍢\n`;
    msg += `─────────────────────\n`;
    cartItems.forEach(item => {
      msg += `• ${item.name} × ${item.qty}  →  ₹${item.price * item.qty}\n`;
    });
    msg += `─────────────────────\n`;
    msg += `*Total: ₹${total}*\n\n`;
    msg += `📦 500g frozen packs | Ready to cook\n`;
    msg += `🕐 Ordered at ${time}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919373295037?text=${encoded}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
          />
          <motion.div 
            className="cart-drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="cart-handle" />
            <div className="cart-header">
              <div className="cart-title">
                🛒 Your Order
                <span className="cart-count-badge">{totalQty}</span>
              </div>
              <button className="cart-close" onClick={() => setIsDrawerOpen(false)}>×</button>
            </div>
            
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div style={{ color: "var(--smoke)", textAlign: "center", padding: "40px 0", fontSize: "0.9rem" }}>
                  Your cart is empty. Add some delicious snacks!
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-white/5 gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[0.9rem] text-[#FFF8EE] leading-tight truncate">{item.name}</div>
                      <div className="font-['Bebas_Neue'] text-[1.1rem] text-[#FFB800] mt-1">₹{item.price * item.qty}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="cart-stepper">
                        <button className="stepper-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                        <div className="stepper-num">{item.qty}</div>
                        <button className="stepper-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[1.2rem] text-[#9B856A] hover:text-[#FF4500]"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-white/10 bg-[rgba(13,5,0,0.4)] pb-8">
                <div className="flex justify-between items-end mb-4">
                  <div className="text-[0.8rem] text-[#9B856A] tracking-[1px] uppercase">Grand Total</div>
                  <div className="font-['Bebas_Neue'] text-[1.8rem] text-[#FFB800] leading-none">₹{total}</div>
                </div>
                <button className="whatsapp-btn" onClick={handleWhatsAppOrder}>
                  Send Order on WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
