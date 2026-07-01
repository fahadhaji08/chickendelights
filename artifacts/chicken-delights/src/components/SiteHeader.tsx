import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { totalQty, setIsDrawerOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-brand">
        <div className="header-logo-mark">🍢</div>
        <div className="header-name">
          Chicken Delights
          <span>Premium Frozen Snacks</span>
        </div>
      </div>
      
      <button 
        className={`header-cart-pill ${totalQty > 0 ? 'visible' : ''}`}
        onClick={() => setIsDrawerOpen(true)}
      >
        <span>🛒 Cart</span>
        {totalQty > 0 && <span className="header-cart-count">{totalQty}</span>}
      </button>
    </header>
  );
}
