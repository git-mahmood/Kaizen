"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, ShoppingCart, TrendingUp, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useAuthStore, useOrdersStore, products, Order } from "@/lib/store";

type Tab = "overview" | "products" | "orders";

export default function AdminPage() {
  const { isLoggedIn, isAdmin, userEmail, logout } = useAuthStore();
  const { orders, updateStatus } = useOrdersStore();
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      window.location.href = "/Kaizen/login";
    }
  }, [isLoggedIn, isAdmin]);

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="min-h-screen bg-kuro flex items-center justify-center">
        <p className="text-muted text-xs">Redirecting...</p>
      </div>
    );
  }

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "processing").length;

  return (
    <main className="min-h-screen bg-kuro">
      {/* Header */}
      <header className="border-b border-steel/30 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-mono text-xs tracking-ultra text-bone uppercase">Kaizen</Link>
          <span className="text-[9px] tracking-wider text-muted font-mono uppercase border border-steel/40 px-2 py-0.5">Console</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] text-muted hidden sm:block">{userEmail}</span>
          <button
            onClick={() => { logout(); window.location.href = "/Kaizen/"; }}
            className="text-muted hover:text-bone transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-6 mb-10 border-b border-steel/20 pb-4">
          {(["overview", "products", "orders"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-xs tracking-widest uppercase transition-colors ${
                tab === t ? "text-bone" : "text-muted hover:text-silver"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Revenue", value: `৳${revenue.toLocaleString()}`, icon: TrendingUp },
                { label: "Orders", value: orders.length, icon: ShoppingCart },
                { label: "Processing", value: pending, icon: Package },
              ].map((stat) => (
                <div key={stat.label} className="border border-steel/30 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-widest text-muted uppercase">{stat.label}</span>
                    <stat.icon size={14} className="text-muted" />
                  </div>
                  <p className="text-xl text-bone font-mono">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="border border-steel/30 p-6">
              <p className="text-[10px] tracking-widest text-muted uppercase mb-4">Recent Orders</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-muted border-b border-steel/20">
                      <th className="pb-3 font-normal">ID</th>
                      <th className="pb-3 font-normal">Customer</th>
                      <th className="pb-3 font-normal">Total</th>
                      <th className="pb-3 font-normal">Status</th>
                      <th className="pb-3 font-normal">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-steel/10">
                        <td className="py-3 text-silver font-mono">{o.id}</td>
                        <td className="py-3 text-silver">{o.customerName}</td>
                        <td className="py-3 text-bone font-mono">৳{o.total.toLocaleString()}</td>
                        <td className="py-3"><StatusBadge status={o.status} /></td>
                        <td className="py-3 text-muted">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products */}
        {tab === "products" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="border border-steel/30 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-muted bg-ash">
                    <th className="px-6 py-4 font-normal">Product</th>
                    <th className="px-6 py-4 font-normal">Category</th>
                    <th className="px-6 py-4 font-normal">Price</th>
                    <th className="px-6 py-4 font-normal">Stock</th>
                    <th className="px-6 py-4 font-normal">Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-steel/10 hover:bg-ash/50 transition-colors">
                      <td className="px-6 py-4 text-bone">{p.name}</td>
                      <td className="px-6 py-4 text-muted">{p.category}</td>
                      <td className="px-6 py-4 text-silver font-mono">৳{p.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={p.stock < 10 ? "text-red-400" : "text-silver"}>{p.stock}</span>
                      </td>
                      <td className="px-6 py-4 text-muted font-mono">{p.tag || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Orders */}
        {tab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-steel/30 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm text-bone font-mono">{order.id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-xs text-muted">{order.customerName} — {order.customerEmail}</p>
                    <p className="text-[10px] text-stone mt-1">
                      {order.items.map((i) => `${i.product.name} ×${i.quantity}`).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-bone font-mono">৳{order.total.toLocaleString()}</span>
                    <div className="relative">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value as Order["status"])}
                        className="bg-ash border border-steel/40 text-xs text-bone py-2 pl-3 pr-7 appearance-none cursor-pointer outline-none focus:border-bone/40 transition-colors"
                      >
                        <option value="processing">Processing</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const styles: Record<Order["status"], string> = {
    processing: "text-yellow-500 border-yellow-500/30",
    confirmed: "text-blue-400 border-blue-400/30",
    dispatched: "text-cyan-400 border-cyan-400/30",
    delivered: "text-green-400 border-green-400/30",
  };
  return (
    <span className={`text-[9px] tracking-wider uppercase border px-2 py-0.5 ${styles[status]}`}>
      {status}
    </span>
  );
}
