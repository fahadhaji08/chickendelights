import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_BG = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=90";

const STATS = [
  { value: "40+", label: "Products" },
  { value: "500g", label: "Pack Size" },
  { value: "6", label: "Categories" },
  { value: "100%", label: "Hygienic" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="hero-section">
      {/* Parallax BG image */}
      <motion.div
        className="hero-bg-img"
        style={{ y: bgY }}
        aria-hidden
      >
        <img
          src={HERO_BG}
          alt="Sizzling grilled food"
          className="hero-bg-photo"
          loading="eager"
        />
      </motion.div>

      {/* Layered overlays */}
      <div className="hero-overlay-base" />
      <div className="hero-overlay-fire" />
      <div className="hero-overlay-vignette" />

      {/* Content */}
      <motion.div className="hero-content" style={{ y: textY, opacity }}>
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          🔥 Premium Frozen Snacks · Mira Road, Mumbai
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Chicken
          <br />
          <span className="hero-title-accent">Delights</span>
          <span className="gold-line">Restaurant Quality at Home</span>
        </motion.h1>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          500g Packs <span>·</span> Hygienic <span>·</span> Ready to Cook <span>·</span> 40+ Products
        </motion.p>

        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          We bring the taste of a restaurant straight to your kitchen. From smoky Seekh Kababs
          to golden crispy snacks — hygienically packed, ready to cook in minutes.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="hero-stat"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.82 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-stat-value">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade to dark */}
      <div className="hero-bottom-fade" />
    </section>
  );
}
