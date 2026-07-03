"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-steel/30 bg-kuro">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-mono text-xs tracking-ultra text-bone uppercase mb-4">Kaizen</p>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              Premium streetwear rooted in the Shinobi path. Discipline in form. Mastery in silence. Dhaka, Bangladesh.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[10px] tracking-widest text-muted uppercase mb-4">Navigate</p>
            <div className="space-y-2">
              <Link href="/collection" className="block text-xs text-silver hover:text-bone transition-colors">Collection</Link>
              <Link href="/about" className="block text-xs text-silver hover:text-bone transition-colors">Ethos</Link>
              <Link href="/cart" className="block text-xs text-silver hover:text-bone transition-colors">Cart</Link>
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] tracking-widest text-muted uppercase mb-4">Protocol</p>
            <div className="space-y-2">
              <p className="text-xs text-silver">Shipping: 3-5 days (BD) / 10-14 intl</p>
              <p className="text-xs text-silver">Returns: 7-day exchange policy</p>
              <p className="text-xs text-silver">Contact: ops@kaizen.com.bd</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-steel/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted tracking-wider">
            © 2026 KAIZEN. All rights reserved.
          </p>
          <p className="text-[10px] text-stone font-mono">
            改善 — continuous improvement
          </p>
        </div>
      </div>
    </footer>
  );
}
