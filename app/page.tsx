"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products } from "@/lib/store";

export default function Home() {
  const featured = products.filter((p) => p.tag === "LIMITED" || p.tag === "ARCHIVE");

  return (
    <main className="min-h-screen bg-kuro">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(#e8e4e0 1px, transparent 1px), linear-gradient(90deg, #e8e4e0 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent to-steel/50 origin-top"
        />

        <div className="relative z-10 text-center max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[10px] tracking-ultra text-muted uppercase mb-8 font-mono"
          >
            Shinobi Collection — 001
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-light text-bone leading-tight tracking-tight mb-6"
          >
            Mastery is a daily process.<br />
            <span className="text-accent">Elevate your path.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-sm text-muted leading-relaxed max-w-md mx-auto mb-12"
          >
            Premium streetwear rooted in the discipline of the unseen. Each piece carries a hidden detail — 
            a mark understood only by those who walk the quiet path.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Link href="/collection">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 border border-bone/20 hover:border-bone/50 text-bone text-xs tracking-widest uppercase px-8 py-4 transition-colors"
              >
                Enter the Collection
                <ArrowRight size={14} />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 w-px h-24 bg-gradient-to-t from-transparent to-steel/50 origin-bottom"
        />
      </section>

      {/* ===== MANIFESTO ===== */}
      <section className="py-32 px-6 border-t border-steel/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-ultra text-muted uppercase mb-8 font-mono"
          >
            The Shinobi Manifesto
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-silver font-light leading-relaxed italic"
          >
            &ldquo;The world rewards those who move loudly. We dress those who move with precision.
            Your Jutsu is your craft — refined daily, executed without hesitation.
            This is not fashion. This is form. This is the quiet path to mastery.&rdquo;
          </motion.blockquote>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-16 h-px bg-accent mx-auto mt-8 origin-center"
          />
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      <section className="py-24 px-6 border-t border-steel/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[10px] tracking-ultra text-muted uppercase mb-3 font-mono">Limited Release</p>
              <h2 className="text-2xl sm:text-3xl font-light text-bone tracking-tight">
                As rare as a rank advancement.
              </h2>
            </div>
            <Link href="/collection" className="hidden sm:flex items-center gap-2 text-xs tracking-widest text-muted hover:text-bone transition-colors uppercase">
              All Pieces <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== DROP HOOK ===== */}
      <section className="py-32 px-6 border-t border-steel/20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-ultra text-muted uppercase mb-6 font-mono"
          >
            Drop Protocol
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-light text-bone mb-6 leading-relaxed"
          >
            Each piece is produced in limited quantities. When stock depletes, it does not return. 
            There are no restocks. There are no second chances.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-muted leading-relaxed max-w-md mx-auto mb-10"
          >
            Advancement is earned through presence. Those who hesitate will find empty racks. 
            This is by design — scarcity reflects the discipline required to obtain rank.
          </motion.p>
          <Link href="/collection">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-bone text-kuro text-xs tracking-widest uppercase px-8 py-4 hover:bg-accent transition-colors"
            >
              View Current Drop
            </motion.button>
          </Link>
        </div>
      </section>

      {/* ===== HIDDEN DETAIL ===== */}
      <section className="py-24 px-6 border-t border-steel/20 bg-ash">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-ultra text-muted uppercase mb-4 font-mono">The Hidden Detail</p>
            <h3 className="text-xl font-light text-bone mb-4 leading-relaxed">
              A secret handshake between you and the craft.
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Every Kaizen piece carries a concealed mark — embroidered inside the collar, 
              debossed at the wrist, or woven into the inner waistband. No loud logos. No obvious prints.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              The detail rewards the wearer for understanding what it represents, 
              without announcing it to the world. If you know, you know.
            </p>
          </div>
          <div className="aspect-square bg-smoke border border-steel/30 rounded-sm flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-30">
              {/* Abstract leaf/seal mark */}
              <circle cx="40" cy="40" r="30" stroke="#c8b8a0" strokeWidth="0.5" />
              <path d="M40 15 C48 28, 55 35, 40 55 C25 35, 32 28, 40 15Z" stroke="#c8b8a0" strokeWidth="0.7" fill="none" />
              <circle cx="40" cy="38" r="4" stroke="#c8b8a0" strokeWidth="0.5" />
              <path d="M28 40 L52 40" stroke="#c8b8a0" strokeWidth="0.3" opacity="0.5" />
            </svg>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
