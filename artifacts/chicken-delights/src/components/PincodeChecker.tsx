import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FREE_DELIVERY_PINCODES = new Set(["401107"]);

type Result = "free" | "paid" | null;

export function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<Result>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const check = () => {
    const clean = pincode.trim();
    if (clean.length !== 6 || !/^\d{6}$/.test(clean)) return;
    setResult(FREE_DELIVERY_PINCODES.has(clean) ? "free" : "paid");
  };

  const reset = () => {
    setPincode("");
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <motion.section
      className="pincode-section"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pincode-icon">📍</div>
      <h3 className="pincode-title">Check Delivery</h3>
      <p className="pincode-subtitle">Enter your pincode to check delivery charges</p>

      <div className="pincode-input-row">
        <input
          ref={inputRef}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          placeholder="Enter 6-digit pincode"
          className="pincode-input"
          value={pincode}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(0, 6);
            setPincode(v);
            if (result) setResult(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
        <button
          className="pincode-btn"
          onClick={check}
          disabled={pincode.length !== 6}
        >
          Check
        </button>
      </div>

      <AnimatePresence mode="wait">
        {result === "free" && (
          <motion.div
            key="free"
            className="pincode-result pincode-result--free"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="pincode-result-icon">🎉</span>
            <div>
              <div className="pincode-result-heading">Free Delivery!</div>
              <div className="pincode-result-body">
                We deliver to your area ({pincode}) at no extra charge.
              </div>
            </div>
            <button className="pincode-reset" onClick={reset} title="Check another">×</button>
          </motion.div>
        )}

        {result === "paid" && (
          <motion.div
            key="paid"
            className="pincode-result pincode-result--paid"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="pincode-result-icon">📦</span>
            <div>
              <div className="pincode-result-heading">Shipping Applicable</div>
              <div className="pincode-result-body">
                Delivery charges apply for {pincode}. WhatsApp us for exact rates.
              </div>
            </div>
            <button className="pincode-reset" onClick={reset} title="Check another">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
