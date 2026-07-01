import { createContext, useContext, useState, useMemo, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  total: number;
  totalQty: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  preOrderDate: string | null;
  setPreOrderDate: (date: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preOrderDate, setPreOrderDate] = useState<string | null>(null);

  const addToCart = (item: Omit<CartItem, "qty">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)
    );
  };

  const total = useMemo(() => cartItems.reduce((acc, i) => acc + i.price * i.qty, 0), [cartItems]);
  const totalQty = useMemo(() => cartItems.reduce((acc, i) => acc + i.qty, 0), [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, total, totalQty, isDrawerOpen, setIsDrawerOpen, preOrderDate, setPreOrderDate }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
