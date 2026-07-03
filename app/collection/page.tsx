"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/lib/store";

const categories = ["All", "Tees", "Outerwear", "Bottoms", "Accessories"];

export default function CollectionPage() {
  const [category, setCategory] = useState("All");

  const filtered = category === "All"
    ? products
    : products.filter((p) => p.category === category);

  return (
    <main className="min-h-screen bg-kuro">
      <Navbar />

      <div className="pt-28 pb-24 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-ultra text-muted uppercase mb-3 font-mono">
            Shinobi Collection — Full Archive
          </p>
          <h1 className="text-3xl sm:text-4xl font-light text-bone tracking-tight">
            The Collection
          </h1>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-14 border-b border-steel/20 pb-6"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs tracking-widest uppercase transition-colors ${
                category === cat
                  ? "text-bone border-b border-bone pb-1"
                  : "text-muted hover:text-silver"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Product detail sections */}
        <div className="mt-32 space-y-24 border-t border-steel/20 pt-24">
          {products.map((product) => (
            <div key={product.id} id={product.id} className="max-w-2xl">
              <p className="text-[10px] tracking-ultra text-muted uppercase mb-2 font-mono">
                {product.category} — {product.tag || "CORE"}
              </p>
              <h3 className="text-xl font-light text-bone mb-4">{product.name}</h3>
              <p className="text-sm text-silver leading-relaxed mb-6">{product.description}</p>

              <div className="space-y-3 text-xs">
                <div className="flex gap-4">
                  <span className="text-muted tracking-wider uppercase w-20 shrink-0">Fabric</span>
                  <span className="text-silver">{product.fabric}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted tracking-wider uppercase w-20 shrink-0">Detail</span>
                  <span className="text-silver">{product.detail}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted tracking-wider uppercase w-20 shrink-0">Ethos</span>
                  <span className="text-accent italic">{product.philosophy}</span>
                </div>
              </div>

              <p className="text-lg text-bone font-mono mt-6">৳{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
