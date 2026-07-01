import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ShareMenuFab() {
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    const msg =
      `🍢 *Chicken Delights* — Premium Frozen Snacks 🍢\n` +
      `Mira Road, Mumbai\n\n` +
      `40+ products — Seekh Kababs, Momos, Samosas, Nuggets & more!\n` +
      `📦 Hygienic · Ready to Cook · Restaurant Quality\n\n` +
      `Browse & order here 👇\n${url}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <motion.button
      className="share-fab"
      onClick={handleShare}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.4, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      title="Share this menu"
    >
      <AnimatePresence mode="wait">
        {shared ? (
          <motion.span
            key="sent"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="share-fab-inner"
          >
            ✅ Shared!
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="share-fab-inner"
          >
            <span>🔗</span> Share Menu
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
