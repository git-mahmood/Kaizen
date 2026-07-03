import { create } from "zustand";

// ===== TYPES =====
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  philosophy: string;
  detail: string;
  fabric: string;
  tag?: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "processing" | "confirmed" | "dispatched" | "delivered";
  customerName: string;
  customerEmail: string;
  date: string;
}

// ===== AUTH =====
interface AuthState {
  isLoggedIn: boolean;
  userEmail: string | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const ADMIN_EMAIL = "mahmudur.ft@gmail.com";
const ADMIN_PASS = "kaizen2026";

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userEmail: null,
  isAdmin: false,
  login: (email: string, password: string) => {
    const clean = email.trim().toLowerCase();
    if (clean === ADMIN_EMAIL && password === ADMIN_PASS) {
      set({ isLoggedIn: true, userEmail: clean, isAdmin: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isLoggedIn: false, userEmail: null, isAdmin: false }),
}));

// ===== CART =====
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) =>
    set((s) => {
      const existing = s.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) }
              : i
          ),
        };
      }
      return { items: [...s.items, { product, quantity: 1 }] };
    }),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
  updateQuantity: (id, qty) => {
    if (qty <= 0) {
      set((s) => ({ items: s.items.filter((i) => i.product.id !== id) }));
    } else {
      set((s) => ({
        items: s.items.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i)),
      }));
    }
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

// ===== PRODUCTS =====
export const products: Product[] = [
  {
    id: "shb-001",
    name: "Shadow Operative Tee",
    category: "Tees",
    price: 3200,
    description: "Heavyweight 280gsm cotton. Dropped shoulder silhouette. Hidden leaf seal embroidered inside the collar — visible only to the wearer.",
    philosophy: "Designed for those who train in silence.",
    detail: "Interior collar: minimalist leaf seal in tonal thread",
    fabric: "100% combed cotton, 280gsm, enzyme-washed for matte finish",
    tag: "CORE",
    stock: 40,
  },
  {
    id: "shb-002",
    name: "Anbu Division Hoodie",
    category: "Outerwear",
    price: 6800,
    description: "380gsm heavyweight fleece. Oversized hood with concealed drawcord. Abstract tactical insignia on the lower back hem — a nod to those who operate from the shadows.",
    philosophy: "The unseen carry the heaviest burdens.",
    detail: "Back hem: abstract ANBU-inspired geometric mark, tone-on-tone",
    fabric: "380gsm French terry, brushed interior, reinforced seams",
    tag: "LIMITED",
    stock: 12,
  },
  {
    id: "shb-003",
    name: "Will of Fire Longsleeve",
    category: "Tees",
    price: 3800,
    description: "Slim-fit ribbed cuffs. Minimalist flame motif debossed at the wrist — an oath carried quietly.",
    philosophy: "Persistence outlasts talent.",
    detail: "Inner wrist: debossed flame seal, subtle to the eye",
    fabric: "220gsm organic cotton jersey, preshrunk",
    stock: 30,
  },
  {
    id: "shb-004",
    name: "Scroll Cargo Pant",
    category: "Bottoms",
    price: 7200,
    description: "Tapered utility silhouette. Six-pocket construction with hidden interior zip pocket. Woven scroll-pattern ribbon on inner waistband.",
    philosophy: "Carry your tools. Reveal nothing.",
    detail: "Inner waistband: woven kanji ribbon — 忍 (Shinobi)",
    fabric: "Ripstop cotton-nylon blend, 240gsm, water-resistant DWR coating",
    tag: "LIMITED",
    stock: 8,
  },
  {
    id: "shb-005",
    name: "Seal Master Bomber",
    category: "Outerwear",
    price: 12500,
    description: "MA-1 silhouette in matte nylon shell. Lined with custom seal-pattern jacquard. Every stitch is intentional — no wasted movement.",
    philosophy: "Form is discipline made visible.",
    detail: "Interior lining: custom fuinjutsu-inspired jacquard pattern",
    fabric: "Matte nylon shell, satin jacquard lining, YKK zippers throughout",
    tag: "ARCHIVE",
    stock: 5,
  },
  {
    id: "shb-006",
    name: "Genin Cap",
    category: "Accessories",
    price: 2400,
    description: "Unstructured six-panel. Tonal embroidered forehead protector slash mark on the rear — a symbol understood only by those who have walked the path.",
    philosophy: "Every rank is earned. Never given.",
    detail: "Rear panel: tonal slash-mark embroidery",
    fabric: "Washed cotton twill, brass clasp closure",
    stock: 50,
  },
];

// ===== ORDERS =====
interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: Order["status"]) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [
    {
      id: "KZN-0001",
      items: [{ product: products[0], quantity: 2 }],
      total: 6400,
      status: "confirmed",
      customerName: "R. Takahashi",
      customerEmail: "r.takahashi@mail.com",
      date: "2026-07-01",
    },
    {
      id: "KZN-0002",
      items: [{ product: products[1], quantity: 1 }, { product: products[5], quantity: 1 }],
      total: 9200,
      status: "dispatched",
      customerName: "K. Müller",
      customerEmail: "k.muller@mail.com",
      date: "2026-07-02",
    },
    {
      id: "KZN-0003",
      items: [{ product: products[4], quantity: 1 }],
      total: 12500,
      status: "processing",
      customerName: "A. Rahman",
      customerEmail: "a.rahman@mail.com",
      date: "2026-07-03",
    },
  ],
  addOrder: (order) => set((s) => ({ orders: [...s.orders, order] })),
  updateStatus: (id, status) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    })),
}));
