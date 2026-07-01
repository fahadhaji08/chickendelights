import { useState } from "react";
import { EmberBackground } from "../components/EmberBackground";
import { SiteHeader } from "../components/SiteHeader";
import { Hero } from "../components/Hero";
import { BestSellers } from "../components/BestSellers";
import { HowToOrder } from "../components/HowToOrder";
import { FilterBar } from "../components/FilterBar";
import { MenuSection } from "../components/MenuSection";
import { CartDrawer } from "../components/CartDrawer";
import { CartFab } from "../components/CartFab";
import { ShareMenuFab } from "../components/ShareMenuFab";
import { PincodeChecker } from "../components/PincodeChecker";
import { PreOrderBanner } from "../components/PreOrderBanner";
import { AboutSection } from "../components/AboutSection";
import { OrderFooter } from "../components/OrderFooter";
import { CartProvider } from "../context/CartContext";

// ─────────────────────────────────────────────────────────────────
//  PRODUCT IMAGES
//  Drop a .jpg file into  public/products/  to swap any image.
//  File must match the exact name used below.
//  See public/products/HOW-TO-ADD-IMAGES.txt for full guide.
// ─────────────────────────────────────────────────────────────────
const IMG = {
  seekh:      "/products/seekh.jpg",
  kababs:     "/products/kababs.jpg",
  mutton:     "/products/mutton.jpg",
  fried:      "/products/fried.jpg",
  samosa:     "/products/samosa.jpg",
  additional: "/products/additional.jpg",
};

const PRODUCTS = {
  seekh: {
    title: "Chicken Seekh Kabab Range",
    subtitle: "Premium Seekh Selection",
    emoji: "🔥",
    filter: "seekh",
    items: [
      { id: "s1",  name: "Special Chicken Seekh Kabab",    price: 270, image: IMG.seekh },
      { id: "s2",  name: "Chicken Achari Seekh Kabab",     price: 280, image: IMG.seekh },
      { id: "s3",  name: "Chicken Pudina Seekh Kabab",     price: 280, image: IMG.seekh },
      { id: "s4",  name: "Chicken Reshmi Kabab",           price: 280, image: IMG.seekh },
      { id: "s5",  name: "Chicken Galouti Seekh Kabab",    price: 280, image: IMG.seekh },
      { id: "s6",  name: "Chicken Lucknowi Seekh Kabab",   price: 300, image: IMG.seekh },
      { id: "s7",  name: "Chicken Turkish Seekh Kabab",    price: 290, image: IMG.seekh },
      { id: "s8",  name: "Chicken Cheese Seekh Kabab",     price: 300, image: IMG.seekh },
      { id: "s9",  name: "Chicken Schezwan Seekh Kabab",   price: 290, image: IMG.seekh },
      { id: "s10", name: "Chicken Afghani Seekh Kabab",    price: 300, image: IMG.seekh },
    ],
  },
  kababs: {
    title: "Kababs, Patties & Cutlets",
    subtitle: "Handcrafted & Flavorful",
    emoji: "🍢",
    filter: "kababs",
    items: [
      { id: "k1",  name: "Chicken Kofta",             price: 270, image: IMG.kababs },
      { id: "k2",  name: "Chicken Shami Kabab",       price: 270, image: IMG.kababs },
      { id: "k3",  name: "Chicken Shahi Kabab",       price: 280, image: IMG.kababs },
      { id: "k4",  name: "Chicken Hara Bhara Kabab",  price: 270, image: IMG.kababs },
      { id: "k5",  name: "Chicken Chutney Kabab",     price: 270, image: IMG.kababs },
      { id: "k6",  name: "Chicken Kulfi Kabab",       price: 280, image: IMG.kababs },
      { id: "k7",  name: "Chicken Cutlet",            price: 270, image: IMG.kababs },
      { id: "k8",  name: "Chicken Burger Patty",      price: 260, image: IMG.kababs },
      { id: "k9",  name: "Schezwan Cheese Cutlet",    price: 300, image: IMG.kababs },
      { id: "k10", name: "Mint Cutlet",               price: 280, image: IMG.kababs },
    ],
  },
  mutton: {
    title: "Mutton Items",
    subtitle: "Premium Mutton Selection",
    emoji: "🥩",
    filter: "mutton",
    items: [
      { id: "m1", name: "Mutton Seekh Kabab", price: 440, image: IMG.mutton },
      { id: "m2", name: "Mutton Momos",       price: 300, image: IMG.mutton },
    ],
  },
  fried: {
    title: "Fried & Snack Chicken",
    subtitle: "Crispy, Crunchy & Golden",
    emoji: "🍗",
    filter: "fried",
    items: [
      { id: "f1", name: "Fried Chicken Boneless", price: 280, image: IMG.fried },
      { id: "f2", name: "Chicken Breast Strips",  price: 290, image: IMG.fried },
      { id: "f3", name: "Chicken Lollipops",      price: 300, image: IMG.fried },
    ],
  },
  samosa: {
    title: "Chicken Samosas",
    subtitle: "Crispy Golden Samosas",
    emoji: "🥟",
    filter: "samosa",
    items: [
      { id: "cs1", name: "Chicken Samosa",          price: 280, image: IMG.samosa },
      { id: "cs2", name: "Chicken Tandoori Samosa", price: 280, image: IMG.samosa },
      { id: "cs3", name: "Chicken Malai Samosa",    price: 280, image: IMG.samosa },
    ],
  },
  additional: {
    title: "Additional Chicken Snacks",
    subtitle: "More Crunchy Favorites",
    emoji: "🍟",
    filter: "additional",
    items: [
      { id: "a1",  name: "Chicken Nuggets",              price: 260, image: IMG.additional },
      { id: "a2",  name: "Chicken Cheese Balls",          price: 280, image: IMG.additional },
      { id: "a3",  name: "Chicken Cheese Roll",           price: 300, image: IMG.additional },
      { id: "a4",  name: "Chicken Chilli Cheese Coin",    price: 280, image: IMG.additional },
      { id: "a5",  name: "Chicken Oregano Cheese Patty",  price: 290, image: IMG.additional },
      { id: "a6",  name: "Chicken Popcorn",               price: 280, image: IMG.additional },
      { id: "a7",  name: "Chicken Momos",                 price: 270, image: IMG.additional },
      { id: "a11", name: "Chicken Spicy Fingers",         price: 280, image: IMG.additional },
      { id: "a12", name: "Chicken Chilly Garlic Finger",  price: 290, image: IMG.additional },
      { id: "a13", name: "Chicken Cheese Nuggets",        price: 300, image: IMG.additional },
      { id: "a14", name: "Chicken Pizza Pocket",          price: 290, image: IMG.additional },
      { id: "a15", name: "Crispy Chicken Tender",         price: 300, image: IMG.additional },
      { id: "a16", name: "Chicken Crispy",                price: 280, image: IMG.additional },
      { id: "a17", name: "Chicken Spicy Wings",           price: 300, image: IMG.additional },
    ],
  },
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleSections = Object.values(PRODUCTS).filter(
    (s) => activeFilter === "all" || s.filter === activeFilter
  );

  return (
    <CartProvider>
      <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--dark)", color: "var(--cream)" }}>
        <EmberBackground />
        <SiteHeader />

        <Hero />

        <main className="container-main">
          <div className="divider">
            <span className="divider-icon">⭐</span>
          </div>

          {activeFilter === "all" && <BestSellers />}

          <div className="divider" style={{ marginTop: "56px" }}>
            <span className="divider-icon">🍢</span>
          </div>

          <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

          <div className="menu-sections">
            {visibleSections.map((section) => (
              <MenuSection key={section.filter} section={section} />
            ))}
          </div>

          <PreOrderBanner />
          <HowToOrder />
          <PincodeChecker />
          <AboutSection />
          <OrderFooter />
        </main>

        <CartDrawer />
        <CartFab />
        <ShareMenuFab />
      </div>
    </CartProvider>
  );
}
