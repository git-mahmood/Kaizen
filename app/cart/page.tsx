"use client";

import { motion } from "framer-motion";
import { Minus, Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-kuro">
        <Navbar />
        <div className="pt-28 pb-24 px-6 max-w-3xl mx-auto text-center min-h-[70vh] flex flex-col items-center justify-center">
          <p className="text-muted text-sm mb-6">Your cart is empty.</p>
          <Link href="/collection">
            <button className="border border-bone/20 hover:border-bone/50 text-bone text-xs tracking-widest uppercase px-6 py-3 transition-colors">
              Browse Collection
            </button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-kuro">
      <Navbar />

      <div className="pt-28 pb-24 px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/collection" className="inline-flex items-center gap-2 text-xs text-muted hover:text-bone transition-colors mb-6">
            <ArrowLeft size={12} /> Continue Browsing
          </Link>
          <div className="flex items-end justify-between mb-12">
            <h1 className="text-3xl font-light text-bone tracking-tight">Cart</h1>
            <button onClick={clearCart} className="text-[10px] tracking-widest text-muted hover:text-bone uppercase transition-colors">
              Clear All
            </button>
          </div>
        </motion.div>

        {/* Items */}
        <div className="space-y-6 mb-12">
          {items.map((item, i) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-6 py-6 border-b border-steel/20"
            >
              {/* Placeholder */}
              <div className="w-16 h-20 bg-ash border border-steel/30 rounded-sm shrink-0 flex items-center justify-center">
                <div className="w-6 h-6 border border-muted/30 rounded-full" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-bone">{item.product.name}</p>
                <p className="text-[10px] text-muted tracking-wider uppercase mt-1">{item.product.category}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-7 h-7 border border-steel/40 flex items-center justify-center text-muted hover:text-bone hover:border-bone/40 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-xs text-bone w-4 text-center font-mono">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-7 h-7 border border-steel/40 flex items-center justify-center text-muted hover:text-bone hover:border-bone/40 transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Price */}
              <p className="text-sm text-bone font-mono w-24 text-right">
                ৳{(item.product.price * item.quantity).toLocaleString()}
              </p>

              {/* Remove */}
              <button onClick={() => removeItem(item.product.id)} className="text-muted hover:text-bone transition-colors">
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border-t border-steel/30 pt-8 max-w-sm ml-auto"
        >
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-xs">
              <span className="text-muted">Subtotal</span>
              <span className="text-silver font-mono">৳{getTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted">Shipping</span>
              <span className="text-silver">Calculated at checkout</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-steel/20">
              <span className="text-sm text-bone">Total</span>
              <span className="text-sm text-bone font-mono">৳{getTotal().toLocaleString()}</span>
            </div>
          </div>

          <button className="w-full bg-bone text-kuro text-xs tracking-widest uppercase py-4 hover:bg-accent transition-colors">
            Proceed to Checkout
          </button>
          <p className="text-[10px] text-muted text-center mt-3">Cash on delivery available within Bangladesh</p>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
