"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product, useCartStore } from "@/lib/store";
import Link from "next/link";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <Link href={`/collection#${product.id}`}>
        {/* Image area */}
        <div className="aspect-[3/4] bg-ash border border-steel/40 rounded-sm overflow-hidden relative mb-4 group-hover:border-muted/60 transition-colors">
          {/* Minimal geometric placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20 group-hover:opacity-40 transition-opacity">
              <circle cx="24" cy="24" r="20" stroke="#6b6b6b" strokeWidth="0.5" />
              <path d="M24 8 L24 40 M8 24 L40 24" stroke="#6b6b6b" strokeWidth="0.5" />
              <circle cx="24" cy="24" r="8" stroke="#6b6b6b" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Tag */}
          {product.tag && (
            <span className="absolute top-3 left-3 text-[9px] tracking-widest text-muted font-mono uppercase">
              {product.tag}
            </span>
          )}

          {/* Add to cart */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="absolute bottom-3 right-3 w-8 h-8 bg-bone text-kuro rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Plus size={14} />
          </motion.button>
        </div>
      </Link>

      {/* Info */}
      <div>
        <p className="text-[10px] tracking-widest text-muted uppercase mb-1">{product.category}</p>
        <h3 className="text-sm text-bone font-light mb-2">{product.name}</h3>
        <p className="text-xs text-silver font-mono">৳{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}
