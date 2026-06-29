import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

interface SectionItem {
  id: string;
  name: string;
  price: number;
  note?: string;
  image: string;
}

interface MenuSectionProps {
  section: {
    title: string;
    subtitle: string;
    emoji: string;
    filter: string;
    items: SectionItem[];
  };
}

export function MenuSection({ section }: MenuSectionProps) {
  return (
    <motion.div
      className="menu-section"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-header">
        <motion.div
          className="section-emoji"
          whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {section.emoji}
        </motion.div>
        <div>
          <h2 className="section-title">{section.title}</h2>
          <div className="section-subtitle">{section.subtitle}</div>
        </div>
      </div>

      <div className="menu-grid">
        {section.items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              delay: (idx % 6) * 0.07,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <MenuItem item={item} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
