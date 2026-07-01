import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

function getUpcomingWeekends(): { label: string; short: string; value: string }[] {
  const slots: { label: string; short: string; value: string }[] = [];
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun, 6=Sat

  // Find next Saturday
  const daysToSat = (6 - dayOfWeek + 7) % 7 || 7;
  const sat = new Date(now);
  sat.setDate(now.getDate() + daysToSat);

  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);

  const nextSat = new Date(sat);
  nextSat.setDate(sat.getDate() + 7);
  const nextSun = new Date(sun);
  nextSun.setDate(sun.getDate() + 7);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
  const fmtShort = (d: Date) =>
    d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  const fmtVal = (d: Date) =>
    d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  [sat, sun, nextSat, nextSun].forEach((d) => {
    slots.push({ label: fmt(d), short: fmtShort(d), value: fmtVal(d) });
  });

  return slots;
}

export function PreOrderBanner() {
  const { preOrderDate, setPreOrderDate } = useCart();
  const slots = getUpcomingWeekends();

  return (
    <motion.section
      className="preorder-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="preorder-header">
        <span className="preorder-badge">📅 Pre-Order</span>
        <h3 className="preorder-title">Order for the Weekend</h3>
        <p className="preorder-sub">
          Pick your preferred delivery date — we'll confirm via WhatsApp after you send your order.
        </p>
      </div>

      <div className="preorder-slots">
        {slots.map((slot) => {
          const selected = preOrderDate === slot.value;
          return (
            <motion.button
              key={slot.value}
              className={`preorder-slot ${selected ? "selected" : ""}`}
              onClick={() => setPreOrderDate(selected ? null : slot.value)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="slot-icon">{slot.label.startsWith("Sat") ? "🟠" : "🟡"}</span>
              <span className="slot-label">{slot.short}</span>
              {selected && <span className="slot-check">✓</span>}
            </motion.button>
          );
        })}
      </div>

      {preOrderDate && (
        <motion.div
          className="preorder-confirm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          📅 Pre-order set for <strong>{preOrderDate}</strong>.
          Your WhatsApp order will include this date.
          <button className="preorder-clear" onClick={() => setPreOrderDate(null)}>Clear</button>
        </motion.div>
      )}
    </motion.section>
  );
}
