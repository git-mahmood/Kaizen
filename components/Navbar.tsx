"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { useCartStore, useAuthStore } from "@/lib/store";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.getCount());
  const { isLoggedIn, isAdmin, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-kuro/90 backdrop-blur-md border-b border-steel/30">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-mono text-sm tracking-ultra text-bone uppercase">
          Kaizen
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/collection" className="text-xs tracking-widest text-muted hover:text-bone transition-colors uppercase">
            Collection
          </Link>
          <Link href="/about" className="text-xs tracking-widest text-muted hover:text-bone transition-colors uppercase">
            Ethos
          </Link>
          <Link href="/cart" className="text-xs tracking-widest text-muted hover:text-bone transition-colors uppercase relative">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-4 text-[9px] bg-accent text-kuro w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {count}
              </span>
            )}
          </Link>
          {isAdmin ? (
            <>
              <Link href="/admin" className="text-xs tracking-widest text-accent hover:text-bone transition-colors uppercase">
                Console
              </Link>
              <button onClick={logout} className="text-xs tracking-widest text-muted hover:text-bone transition-colors uppercase">
                Exit
              </button>
            </>
          ) : (
            <Link href="/login" className="text-muted hover:text-bone transition-colors">
              <User size={14} />
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-bone">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-kuro border-t border-steel/30 px-6 py-6 space-y-4"
          >
            <Link href="/collection" onClick={() => setOpen(false)} className="block text-xs tracking-widest text-muted hover:text-bone uppercase">Collection</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block text-xs tracking-widest text-muted hover:text-bone uppercase">Ethos</Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="block text-xs tracking-widest text-muted hover:text-bone uppercase">Cart ({count})</Link>
            {isAdmin ? (
              <Link href="/admin" onClick={() => setOpen(false)} className="block text-xs tracking-widest text-accent hover:text-bone uppercase">Console</Link>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="block text-xs tracking-widest text-muted hover:text-bone uppercase">Login</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
