"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  function playSound(type: string) {
    if (!audioEnabled) return;
    try {
      const ctx = new AudioContext();
      const sounds: Record<string, () => void> = {
        swoosh: () => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          osc.start(); osc.stop(ctx.currentTime + 0.15);
        },
        blade: () => {
          const bufferSize = ctx.sampleRate * 0.1;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
          const source = ctx.createBufferSource();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          filter.type = "highpass"; filter.frequency.value = 3000;
          source.buffer = buffer;
          source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
          source.start(); source.stop(ctx.currentTime + 0.1);
        },
        click: () => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain); gain.connect(ctx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(1200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.start(); osc.stop(ctx.currentTime + 0.08);
        },
      };
      sounds[type]?.();
    } catch (e) {}
  }

  const products = [
    { name: "GHOST PROTOCOL TEE", category: "TOPS", price: 2200, tag: "NEW", color: "#FF006E" },
    { name: "NEON DISTRICT HOODIE", category: "OUTERWEAR", price: 4800, tag: "LIMITED", color: "#C0392B" },
    { name: "VOID CARGO PANTS", category: "BOTTOMS", price: 3600, tag: null, color: "#922B21" },
    { name: "CYBER TRACK JACKET", category: "OUTERWEAR", price: 5400, tag: "HOT", color: "#FF006E" },
  ];

  return (
    <main style={{ background: "#0A0000", minHeight: "100vh", color: "#F0F0F8", overflowX: "hidden" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,0,0,0.7)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(180,0,0,0.3)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: "64px",
      }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "Orbitron, monospace", fontSize: "22px", fontWeight: 900, letterSpacing: "6px" }}>
          <span style={{ color: "#FF006E" }}>KAI</span>
          <span style={{ color: "#F0F0F8" }}>ZEN</span>
        </motion.div>

        {/* Nav Links */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["PLAY", "STORY", "WORLD", "NEWS", "COMMUNITY"].map((item) => (
            <button key={item}
              onMouseEnter={() => playSound("click")}
              style={{ background: "none", border: "none", color: "rgba(240,240,248,0.7)", fontFamily: "Orbitron, monospace", fontSize: "10px", letterSpacing: "2px", cursor: "pointer", transition: "color 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.color = "#FF006E")}
              onMouseOut={e => (e.currentTarget.style.color = "rgba(240,240,248,0.7)")}>
              {item}
            </button>
          ))}
          <button
            onClick={() => { setAudioEnabled(!audioEnabled); playSound("blade"); }}
            style={{ background: audioEnabled ? "rgba(255,0,110,0.15)" : "none", border: `1px solid ${audioEnabled ? "#FF006E" : "rgba(255,255,255,0.2)"}`, color: audioEnabled ? "#FF006E" : "rgba(240,240,248,0.5)", fontFamily: "Orbitron, monospace", fontSize: "9px", letterSpacing: "2px", cursor: "pointer", padding: "6px 12px" }}>
            {audioEnabled ? "SFX ON" : "SFX OFF"}
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound("click")}
            style={{ background: "#FF006E", border: "none", color: "#fff", fontFamily: "Orbitron, monospace", fontSize: "10px", letterSpacing: "2px", cursor: "pointer", padding: "10px 20px", clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)", position: "relative" }}>
            SHOP NOW
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "#fff", color: "#FF006E", fontSize: "8px", width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>
                {cartCount}
              </span>
            )}
          </motion.button>
        </motion.div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight: "100vh",
        background: `
          radial-gradient(ellipse at 60% 50%, rgba(180,0,0,0.85) 0%, rgba(120,0,0,0.6) 30%, rgba(10,0,0,0.95) 70%),
          radial-gradient(ellipse at 100% 50%, rgba(140,0,0,0.4) 0%, transparent 60%),
          linear-gradient(135deg, #0A0000 0%, #1a0000 40%, #0d0000 100%)
        `,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingTop: "64px",
      }}>

        {/* Vignette overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none",
        }} />

        {/* Fog/smoke layers */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }} />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div key={i}
            style={{
              position: "absolute",
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              borderRadius: "50%",
              background: i % 3 === 0 ? "#FF006E" : i % 3 === 1 ? "#fff" : "#C0392B",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.6 + 0.1,
              zIndex: 2,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Diagonal lines decoration */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: `${15 + i * 18}%`,
              width: "1px",
              background: "linear-gradient(180deg, transparent, rgba(255,0,110,0.1), transparent)",
              transform: "skewX(-15deg)",
            }} />
          ))}
        </div>

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 3, padding: "0 60px", maxWidth: "900px" }}>

          {/* Eyebrow text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "40px", height: "2px", background: "#FF006E" }} />
            <span style={{ fontFamily: "Orbitron, monospace", fontSize: "10px", color: "#FF006E", letterSpacing: "4px" }}>
              OPEN WORLD · STREETWEAR RPG · 2026
            </span>
          </motion.div>

          {/* MAIN TITLE */}
          <div style={{ overflow: "hidden", marginBottom: "8px" }}>
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "Orbitron, monospace",
                fontSize: "clamp(56px, 10vw, 120px)",
                fontWeight: 900,
                lineHeight: 0.9,
                color: "#F0F0F8",
                letterSpacing: "-2px",
                textShadow: "0 0 80px rgba(255,0,110,0.3)",
              }}>
              WEAR THE
            </motion.h1>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "32px" }}>
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "Orbitron, monospace",
                fontSize: "clamp(56px, 10vw, 120px)",
                fontWeight: 900,
                lineHeight: 0.9,
                color: "#FF006E",
                letterSpacing: "-2px",
                textShadow: "0 0 80px rgba(255,0,110,0.5)",
              }}>
              FUTURE.
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "16px", color: "rgba(240,240,248,0.6)", letterSpacing: "1px", marginBottom: "40px", maxWidth: "500px", lineHeight: 1.6 }}>
            12 drops. Infinite factions. The city that never sleeps — and never forgives. Your choices collapse everything.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,0,110,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { playSound("blade"); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                background: "#FF006E",
                border: "none", color: "#fff",
                fontFamily: "Orbitron, monospace",
                fontSize: "11px", letterSpacing: "3px",
                cursor: "pointer", padding: "16px 36px",
                clipPath: "polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
              ▶ PLAY FREE NOW
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playSound("swoosh")}
              style={{
                background: "transparent",
                border: "none", color: "rgba(240,240,248,0.8)",
                fontFamily: "Orbitron, monospace",
                fontSize: "11px", letterSpacing: "2px",
                cursor: "pointer", padding: "16px 20px",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
              ▶ Watch the Trailer
            </motion.button>
          </motion.div>

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            style={{ display: "flex", gap: "32px", marginTop: "60px" }}>
            {[
              { val: "12", label: "DROPS" },
              { val: "∞", label: "FACTIONS" },
              { val: "2026", label: "SEASON" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: "24px", fontWeight: 900, color: "#F0F0F8" }}>{stat.val}</div>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: "8px", color: "rgba(240,240,248,0.4)", letterSpacing: "3px" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right side gradient glow */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: "50%", zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse at right center, rgba(180,0,0,0.3) 0%, transparent 70%)",
        }} />
      </section>

      {/* PRODUCTS SECTION */}
      <section id="shop" style={{
        padding: "100px 60px",
        background: "linear-gradient(180deg, #0A0000 0%, #0d0000 100%)",
        maxWidth: "1400px", margin: "0 auto",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <div style={{ width: "40px", height: "2px", background: "#FF006E" }} />
            <span style={{ fontFamily: "Orbitron, monospace", fontSize: "10px", color: "#FF006E", letterSpacing: "4px" }}>// DROP_001</span>
          </div>
          <h2 style={{ fontFamily: "Orbitron, monospace", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, color: "#F0F0F8", letterSpacing: "-1px" }}>
            FEATURED <span style={{ color: "#FF006E" }}>PIECES</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {products.map((product, i) => (
            <motion.div key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => playSound("click")}
              onClick={() => { playSound("blade"); setCartCount(c => c + 1); }}
              style={{
                background: "linear-gradient(135deg, #120000, #1a0000)",
                border: "1px solid rgba(180,0,0,0.3)",
                cursor: "pointer", overflow: "hidden",
                transition: "border-color 0.3s",
              }}
              onMouseOver={e => (e.currentTarget.style.borderColor = "#FF006E")}
              onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(180,0,0,0.3)")}>

              {/* Product image area */}
              <div style={{ height: "220px", background: "linear-gradient(135deg, #1a0000, #0d0000)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                {/* Glow effect */}
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${product.color}22 0%, transparent 70%)` }} />
                {product.tag && (
                  <div style={{ position: "absolute", top: "12px", left: "12px", background: "#FF006E", color: "#fff", fontFamily: "Orbitron, monospace", fontSize: "8px", letterSpacing: "2px", padding: "4px 10px", clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)" }}>
                    {product.tag}
                  </div>
                )}
                <svg width="90" height="90" viewBox="0 0 80 80" fill="none">
                  <rect x="20" y="10" width="40" height="50" rx="2" stroke={product.color} strokeWidth="1.5" />
                  <path d="M20 20 L5 30 L5 45 L20 40" stroke={product.color} strokeWidth="1.5" />
                  <path d="M60 20 L75 30 L75 45 L60 40" stroke={product.color} strokeWidth="1.5" />
                  <line x1="30" y1="25" x2="50" y2="25" stroke={product.color} strokeWidth="1" opacity="0.5" />
                  <line x1="30" y1="32" x2="50" y2="32" stroke={product.color} strokeWidth="1" opacity="0.5" />
                </svg>
              </div>

              {/* Product info */}
              <div style={{ padding: "20px" }}>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: "9px", color: "rgba(240,240,248,0.4)", letterSpacing: "3px", marginBottom: "6px" }}>{product.category}</div>
                <div style={{ fontFamily: "Orbitron, monospace", fontSize: "14px", fontWeight: 700, color: "#F0F0F8", marginBottom: "12px", letterSpacing: "1px" }}>{product.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontFamily: "Orbitron, monospace", fontSize: "20px", fontWeight: 900, color: "#FF006E" }}>
                    <span style={{ fontSize: "11px", color: "rgba(240,240,248,0.4)" }}>৳</span>
                    {product.price.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: "Orbitron, monospace", fontSize: "8px", color: "#FF006E", letterSpacing: "2px", border: "1px solid #FF006E", padding: "4px 10px", clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)" }}>
                    ADD +
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(180,0,0,0.3)",
        padding: "40px 60px",
        background: "#0A0000",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
      }}>
        <div style={{ fontFamily: "Orbitron, monospace", fontSize: "20px", fontWeight: 900, letterSpacing: "6px" }}>
          <span style={{ color: "#FF006E" }}>KAI</span>
          <span style={{ color: "#F0F0F8" }}>ZEN</span>
        </div>
        <div style={{ fontFamily: "Orbitron, monospace", fontSize: "9px", color: "rgba(240,240,248,0.3)", letterSpacing: "2px" }}>
          © 2026 KAIZEN. DHAKA, BANGLADESH.
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["INSTAGRAM", "FACEBOOK", "DISCORD"].map((s) => (
            <button key={s} onMouseEnter={() => playSound("click")}
              style={{ background: "none", border: "none", color: "rgba(240,240,248,0.3)", fontFamily: "Orbitron, monospace", fontSize: "9px", letterSpacing: "2px", cursor: "pointer" }}
              onMouseOver={e => (e.currentTarget.style.color = "#FF006E")}
              onMouseOut={e => (e.currentTarget.style.color = "rgba(240,240,248,0.3)")}>
              {s}
            </button>
          ))}
        </div>
      </footer>

    </main>
  );
}
