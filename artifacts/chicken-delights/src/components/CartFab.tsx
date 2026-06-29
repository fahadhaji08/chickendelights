import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export function CartFab() {
  const { totalQty, setIsDrawerOpen, isDrawerOpen } = useCart();

  if (totalQty === 0 || isDrawerOpen) return null;

  return (
    <AnimatePresence>
      <motion.button
        className="floating-cart"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        onClick={() => setIsDrawerOpen(true)}
      >
        <span>🛒 View Cart</span>
        <span className="bg-white text-[var(--fire)] text-xs font-bold px-2 py-0.5 rounded-full">{totalQty}</span>
      </motion.button>
    </AnimatePresence>
  );
}
