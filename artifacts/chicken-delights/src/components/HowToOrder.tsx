import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    icon: "🍢",
    title: "Browse the Menu",
    desc: "Explore 40+ premium frozen snacks across 6 categories. Filter by type to find what you love.",
  },
  {
    number: "02",
    icon: "🛒",
    title: "Build Your Cart",
    desc: "Tap + Add on any item. Adjust quantities with the stepper. Your total updates in real time.",
  },
  {
    number: "03",
    icon: "💬",
    title: "Send on WhatsApp",
    desc: "Hit \"Send Order\" and your full itemized order flies straight to us on WhatsApp. Done!",
  },
];

export function HowToOrder() {
  return (
    <motion.section
      className="how-to-order"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hto-header">
        <div className="hto-label">Simple as 1 · 2 · 3</div>
        <h2 className="hto-title">How to Order</h2>
      </div>

      <div className="hto-steps">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            className="hto-step"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Connector line (between steps) */}
            {i < STEPS.length - 1 && <div className="hto-connector" />}

            <div className="hto-step-number">{step.number}</div>
            <div className="hto-step-icon">{step.icon}</div>
            <div className="hto-step-title">{step.title}</div>
            <div className="hto-step-desc">{step.desc}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="hto-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        🚀 Average response time under 5 minutes · Available 9 AM – 9 PM
      </motion.div>
    </motion.section>
  );
}
