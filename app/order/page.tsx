"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const flavours = [
  { id: "orange-ginger", name: "Orange Ginger Kombucha", image: "/orange-ginger.jpeg", price: "BHD 7.000" },
  { id: "ginger-lime", name: "Ginger Lime Kombucha", image: "/ginger-lime.png.jpeg", price: "BHD 7.000" },
  { id: "berry-hibiscus", name: "Berry Hibiscus Kombucha", image: "/berry.hebiscus.jpeg.jpeg", price: "BHD 7.000" },
];

type Selection = Record<string, number>;

const initialSelection: Selection = {};

export default function OrderPage() {
  const [selection, setSelection] = useState<Selection>(initialSelection);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });

  const totalBottles = Object.values(selection).reduce((a, b) => a + b, 0);

  const adjust = (id: string, delta: number) => {
    setSelection((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalBottles === 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold">
            Order{" "}
            <span className="gradient-text">Received!</span>
          </h1>
          <p className="mt-4 text-gray-500 font-light text-lg">
            Thank you, {form.name}! We&apos;ll reach out to you at{" "}
            <span className="text-[#9B5DE5] font-medium">{form.phone}</span>{" "}
            to confirm your order and arrange delivery.
          </p>
          <p className="mt-3 text-sm text-gray-400">
            {totalBottles} bottle{totalBottles !== 1 ? "s" : ""} freshly brewed to order — please allow 5–7 days for preparation.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelection(initialSelection);
              setForm({ name: "", phone: "", address: "", notes: "" });
            }}
            className="mt-8 gradient-bg text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Place Another Order
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-6 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-[#9B5DE5] mb-3">
          Place Your Order
        </p>
        <h1 className="text-5xl md:text-6xl font-bold">
          Place Your <span className="gradient-text">Order</span>
        </h1>
        <p className="mt-4 text-gray-500 font-light text-lg">
          Pick your flavours, fill in your details, and we&apos;ll brew it fresh for you.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Flavour picker */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Choose Your Flavours</h2>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                totalBottles > 0
                  ? "bg-[#F5D0E4]/50 text-[#9B5DE5]"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {totalBottles} {totalBottles === 1 ? "bottle" : "bottles"}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {flavours.map(({ id, name, image, price }) => {
              const qty = selection[id] ?? 0;
              return (
                <div
                  key={id}
                  className={`flex items-center justify-between border rounded-2xl px-5 py-4 transition-all ${
                    qty > 0
                      ? "border-[#E8A0BF] bg-[#F5D0E4]/20"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={image}
                        alt={name}
                        width={0}
                        height={0}
                        sizes="48px"
                        className="w-full h-auto"
                      />
                    </div>
                    <div>
                      <span className="font-medium text-sm block">{name}</span>
                      <span className="text-xs text-[#9B5DE5] font-medium">{price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => adjust(id, -1)}
                      disabled={qty === 0}
                      className="w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:border-[#E8A0BF] hover:text-[#9B5DE5] disabled:opacity-30 transition-colors flex items-center justify-center font-bold"
                    >
                      −
                    </button>
                    <span className="w-4 text-center font-semibold text-sm">{qty}</span>
                    <button
                      type="button"
                      onClick={() => adjust(id, 1)}
                      className="w-8 h-8 rounded-full gradient-bg text-white hover:opacity-90 transition-opacity flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact & delivery */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-6">Your Details</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Smith"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8A0BF] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+973 XXXX XXXX"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8A0BF] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Delivery Address</label>
              <textarea
                required
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Street, area, city"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8A0BF] transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Notes{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Gifting, specific instructions, etc."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8A0BF] transition-colors resize-none"
              />
            </div>
          </div>
        </motion.section>

        {/* Order summary */}
        {totalBottles > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-gradient-to-br from-[#F5D0E4]/30 to-[#C49CF0]/10 rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <ul className="space-y-1.5">
              {Object.entries(selection).map(([id, qty]) => {
                const f = flavours.find((fl) => fl.id === id)!;
                return (
                  <li key={id} className="flex justify-between text-sm">
                    <span>{f.name}</span>
                    <span className="font-medium">× {qty}</span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-[#E8A0BF]/30 mt-4 pt-4 flex justify-between text-sm font-semibold">
              <span>Total bottles</span>
              <span className="gradient-text">{totalBottles}</span>
            </div>
            <p className="mt-3 text-xs text-gray-400 font-light">
              Freshly brewed to order — please allow 5–7 days for preparation before delivery.
            </p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={totalBottles === 0}
          className="w-full gradient-bg text-white font-semibold py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {totalBottles === 0
            ? "Select at least one bottle to continue"
            : `Place Order — ${totalBottles} bottle${totalBottles !== 1 ? "s" : ""}`}
        </button>
      </form>
    </div>
  );
}
