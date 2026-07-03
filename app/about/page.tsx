"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-kuro">
      <Navbar />

      <div className="pt-28 pb-24 px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[10px] tracking-ultra text-muted uppercase mb-3 font-mono">
            Brand Ethos
          </p>
          <h1 className="text-3xl sm:text-4xl font-light text-bone tracking-tight mb-12">
            The Philosophy
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-8 text-sm text-silver leading-relaxed"
        >
          <p>
            Kaizen — 改善 — means continuous improvement. It is not a destination. It is the discipline 
            of returning to the work each day, refining what was adequate into what is exceptional.
          </p>

          <p>
            Our debut collection draws its conceptual foundation from the Shinobi path: the idea that 
            true strength is cultivated in silence, that mastery is demonstrated through restraint 
            rather than spectacle.
          </p>

          <p>
            The modern professional shares more with the Shinobi than they may realize. The quiet 
            preparation before a high-stakes moment. The hidden skills that surface only when required. 
            The understanding that form — how you carry yourself — communicates more than words ever could.
          </p>

          <div className="border-l-2 border-accent/40 pl-6 py-2">
            <p className="italic text-bone">
              &ldquo;We do not dress the loudest person in the room. We dress the most capable.&rdquo;
            </p>
          </div>

          <p>
            Every piece in our collection carries a hidden detail — a mark, a seal, a symbol 
            embroidered or debossed where only the wearer encounters it. This is intentional. 
            Our garments are designed as a secret handshake: recognition without announcement, 
            belonging without performance.
          </p>

          <h3 className="text-bone text-lg font-light pt-4">Principles</h3>

          <div className="space-y-4">
            <div>
              <p className="text-bone font-medium mb-1">Discipline in Form</p>
              <p className="text-muted">Every cut, every stitch, every weight of fabric is chosen with intention. No wasted material. No unnecessary embellishment.</p>
            </div>
            <div>
              <p className="text-bone font-medium mb-1">Lineage</p>
              <p className="text-muted">We honor the source material with subtlety and respect. No faces. No bright prints. Only those who understand the reference will recognize it.</p>
            </div>
            <div>
              <p className="text-bone font-medium mb-1">Persistence</p>
              <p className="text-muted">Our garments are built to endure — in construction, in relevance, and in style. Fast fashion is antithetical to the path we walk.</p>
            </div>
            <div>
              <p className="text-bone font-medium mb-1">The Unseen</p>
              <p className="text-muted">True power is not displayed. It is carried. The hidden detail in every piece reflects this philosophy.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
