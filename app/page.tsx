"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const lineReveal = {
  hidden: { x: -60, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function Home() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  function playSound(freq: number, dur: number, type: OscillatorType = "square") {
    if (!audioEnabled) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + dur);
    } catch (e) {}
  }

  const products = [
    { name: "GHOST PROTOCOL TEE", category: "TOPS", price: 2200, tag: "NEW", color: "#FF006E" },
    { name: "NEON DISTRICT HOODIE", category: "OUTERWEAR", price: 4800, tag: "LIMITED", color: "#00D4FF" },
    { name: "VOID CARGO PANTS", category: "BOTTOMS", price: 3600, tag: null, color: "#6B6B8A" },
    { name: "CYBER TRACK JACKET", category: "OUTERWEAR", price: 5400, tag: "HOT", color: "#FFB86C" },
  ];

  return (
    <main style={{ background: "#06060A", minHeight: "100vh", color: "#F0F0F8" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(6,6,10,0.9)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1E1E35",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: "60px",
      }}>
        <div style={{ fontFamily: "Orbitron, monospace", fontSize: "20px", fontWeight: 900, color: "#00D4FF", letterSpacing: "4px" }}>
          KAI<span style={{ color: "#FF006E" }}>ZEN</span>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {["SHOP", "STORY", "WORLD"].map((item) => (
            <button key={item} onClick={() => playSound(520, 0.08)}
              style={{ background: "none", border: "none", color: "#6B6B8A", fontFamily: "Orbitron, monospace", fontSize: "10px", letterSpacing: "2px", cursor: "pointer" }}>
              {item}
            </button>
          ))}
          <button onClick={() => playSound(880, 0.06)}
            style={{ background: "none", border: "1px solid #1E1E35", color: "#F0F0F8", fontFamily: "Orbitron, monospace", fontSize: "10px", letterSpacing: "2px", cursor: "pointer", padding: "6px 12px", position: "relative" }}>
            CART
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "#FF006E", color: "#fff", fontSize: "8px", width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => { setAudioEnabled(!audioEnabled); playSound(660, 0.1, "sine"); }}
            style={{ background: audioEnabled ? "rgba(0,212,255,0.1)" : "none", border: `1px solid ${audioEnabled ? "#00D4FF" : "#1E1E35"}`, color: audioEnabled ? "#00D4FF" : "#6B6B8A", fontFamily: "Orbitron, monospace", fontSize: "9px", letterSpacing: "2px", cursor: "pointer", padding: "6px 10px" }}>
            {audioEnabled ? "SFX ON" : "SFX OFF"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: "60px" }}>
        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(#1E1E35 1px, transparent 1px), linear-gradient(90deg, #1E1E35 1px, transparent 1px)",
          backgroundSize: "40px 40px", opacity: 0.4,
        }} />
        {/* Scanline */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, #00D4FF, transparent)",
          animation: "scan 3s linear infinite",
        }} />
        {/* Corner decorations */}
        <div style={{ position: "absolute", top: "80px", left: "24px", width: "30px", height: "30px", borderTop: "2px solid #00D4FF", borderLeft: "2px solid #00D4FF" }} />
        <div style={{ position: "absolute", bottom: "24px", right: "24px", width: "30px", height: "30px", borderBottom: "2px solid #FF006E", borderRight: "2px solid #FF006E" }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "40px 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "Share Tech Mono, monospace", fontSize: "11px", color: "#FF006E", letterSpacing: "4px", marginBottom: "16px" }}>
            // KAIZEN × SS26 DROP_001 — DHAKA DISTRICT
          </motion.div>

          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ fontFamily: "Orbitron, monospace", fontSize: "clamp(40px, 10vw, 80px)", fontWeight: 900, lineHeight: 0.95, marginBottom: "24px" }}>
            {[
              { text: "WEAR THE", color: "#F0F0F8" },
              { text: "FUTURE", color: "transparent", stroke: true },
              { text: "NOW.", color: "#FF006E" },
            ].map((line) => (
              <motion.span key={line.text} variants={lineReveal}
                style={{
                  display: "block",
                  color: line.color,
                  WebkitTextStroke: line.stroke ? "1px #00D4FF" : "none",
                }}>
                {line.text}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show"
            style={{ fontFamily: "Share Tech Mono, monospace", fontSize: "12px", color: "#6B6B8A", letterSpacing: "3px", marginBottom: "32px" }}>
            OPEN WORLD · STREETWEAR RPG · 2026
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show"
            style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => { playSound(880, 0.06); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                padding: "14px 32px", background: "#FF006E", color: "#fff",
                fontFamily: "Orbitron, monospace", fontSize: "10px", letterSpacing: "3px",
                border: "none", cursor: "pointer",
                clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
              }}>
              SHOP DROP_001
            </button>
            <button
              onClick={() => playSound(440, 0.08, "sine")}
              style={{
                padding: "14px 32px", background: "transparent", color: "#00D4FF",
                fontFamily: "Orbitron, monospace", fontSize: "10px", letterSpacing: "3px",
                border: "1px solid #00D4FF", cursor: "pointer",
                clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
              }}>
              OUR STORY
            </button>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="shop" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "40px" }}>
          <div style={{ fontFamily: "Orbitron, monospace", fontSize: "10px", color: "#00D4FF", letterSpacing: "3px", marginBottom: "8px" }}>
            // DROP_001
          </div>
          <h2 style={{ fontFamily: "Orbitron, monospace", fontSize: "32px", fontWeight: 700 }}>
            FEATURED <span style={{ color: "#FF006E" }}>PIECES</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          {products.map((product, i) => (
            <motion.div key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, borderColor: "#00D4FF" }}
              onClick={() => { playSound(660, 0.12, "triangle"); setCartCount(c => c + 1); }}
              style={{
                background: "#12121C", border: "1px solid #1E1E35",
                cursor: "pointer", overflow: "hidden", transition: "border-color 0.2s",
              }}>
              {/* Product Image Placeholder */}
              <div style={{ height: "200px", background: "#1A1A2E", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {product.tag && (
                  <div style={{ position: "absolute", top: "10px", left: "10px", background: "#FF006E", color: "#fff", fontFamily: "Orbitron, monospace", fontSize: "8px", letterSpacing: "2px", padding: "3px 8px" }}>
                    {product.tag}
                  </div>
                )}
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="20" y="10" width="40" height="50" rx="2" stroke={product.color} strokeWidth="1.5" />
                  <path d="M20 20 L5 30 L5 45 L20 40" stroke={product.color} strokeWidth="1.5" />
                  <path d="M60 20 L75 30 L75 45 L60 40" stroke={product.color} strokeWidth="1.5" />
                  <line x1="30" y1="25" x2="50" y2="25" stroke={product.color} strokeWidth="1" opacity="0.5" />
                  <line x1="30" y1="32" x2="50" y2="32" stroke={product.color} strokeWidth="1" opacity="0.5" />
                </svg>
              </div>
              {/* Product Info */}
              <div style={{ padding: "16px" }}>
                <div style={{ fontFamily: "Share Tech Mono, monospace", fontSize: "9px", color: "#6B6B8A", letterSpacing: "2px", marginBottom: "4px" }}>
                  {product.category}
                </div>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: "13px", fontWeight: 700, marginBottom: "10px", letterSpacing: "1px" }}>
                  {product.name}
                </div>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: "18px", fontWeight: 900, color: "#00D4FF" }}>
                  <span style={{ fontSize: "11px", color: "#6B6B8A" }}>৳</span>
                  {product.price.toLocaleString()}
                </div>
              </div>
              {/* Hover CTA */}
              <div style={{ padding: "10px 16px", borderTop: "1px solid #1E1E35", background: "rgba(0,212,255,0.05)", fontFamily: "Orbitron, monospace", fontSize: "9px", letterSpacing: "3px", color: "#00D4FF", textAlign: "center" }}>
                + ADD TO CART
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1E1E35", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "Orbitron, monospace", fontSize: "24px", fontWeight: 900, color: "#00D4FF", letterSpacing: "6px", marginBottom: "8px" }}>
          KAI<span style={{ color: "#FF006E" }}>ZEN</span>
        </div>
        <div style={{ fontFamily: "Share Tech Mono, monospace", fontSize: "10px", color: "#6B6B8A", letterSpacing: "2px" }}>
          © 2026 KAIZEN. DHAKA, BANGLADESH. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </main>
  );
}
