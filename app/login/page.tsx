"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (locked) {
      setError("Access temporarily restricted. Wait 30 seconds.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Invalid email format.");
      return;
    }

    const success = login(email, password);
    if (success) {
      router.push("/admin");
    } else {
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 5) {
        setLocked(true);
        setError("Too many failed attempts. Locked for 30 seconds.");
        setTimeout(() => { setLocked(false); setAttempts(0); }, 30000);
      } else {
        setError(`Invalid credentials. ${5 - next} attempts remaining.`);
      }
    }
  };

  return (
    <main className="min-h-screen bg-kuro flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Link href="/" className="block text-center mb-12">
          <span className="font-mono text-sm tracking-ultra text-bone uppercase">Kaizen</span>
          <p className="text-[10px] text-muted mt-2 tracking-wider">Administrative Console</p>
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] tracking-widest text-muted uppercase block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full bg-transparent border-b border-steel/50 focus:border-bone/60 text-sm text-bone py-3 outline-none transition-colors placeholder:text-stone"
              placeholder="admin@kaizen.com.bd"
            />
          </div>

          <div>
            <label className="text-[10px] tracking-widest text-muted uppercase block mb-2">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full bg-transparent border-b border-steel/50 focus:border-bone/60 text-sm text-bone py-3 outline-none transition-colors placeholder:text-stone pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-bone transition-colors"
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xs text-red-400"
            >
              <AlertCircle size={12} />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={locked}
            className={`w-full text-xs tracking-widest uppercase py-4 transition-colors ${
              locked
                ? "bg-steel/30 text-muted cursor-not-allowed"
                : "bg-bone text-kuro hover:bg-accent"
            }`}
          >
            {locked ? "Locked" : "Authenticate"}
          </button>
        </form>

        <p className="text-center text-[10px] text-stone mt-8">
          Restricted access. Authorized personnel only.
        </p>

        <p className="text-center mt-6">
          <Link href="/" className="text-xs text-muted hover:text-bone transition-colors">← Return</Link>
        </p>
      </motion.div>
    </main>
  );
}
