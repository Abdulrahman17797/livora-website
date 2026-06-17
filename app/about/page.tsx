"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const values = [
  {
    title: "Real Ingredients",
    body: "Every botanical, every fruit, every spice is sourced from trusted organic suppliers. If we wouldn't eat it, it won't touch our brew.",
    emoji: "🌿",
  },
  {
    title: "Live Cultures",
    body: "Our SCOBY — Symbiotic Culture of Bacteria and Yeast — has been carefully maintained for years. It's the beating heart of every bottle.",
    emoji: "🧬",
  },
  {
    title: "No Shortcuts",
    body: "Every batch is brewed fresh to order in 5–7 days. No pasteurisation, no shortcuts — just honest kombucha bottled at its peak.",
    emoji: "⏳",
  },
  {
    title: "Gut-First Philosophy",
    body: "We believe food and drink should nourish, not just fill. Everything we make is designed to support your microbiome and your wellbeing.",
    emoji: "💜",
  },
];


export default function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center py-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-widest uppercase text-[#9B5DE5] mb-4"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold"
        >
          We brew for{" "}
          <span className="gradient-text">people who care</span>
        </motion.h1>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            What we <span className="gradient-text">stand for</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map(({ title, body, emoji }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg hover:shadow-[#E8A0BF]/15 transition-shadow"
            >
              <span className="text-4xl">{emoji}</span>
              <h3 className="text-xl font-bold mt-4">{title}</h3>
              <p className="mt-3 text-gray-500 font-light leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold">
            Want to taste the{" "}
            <span className="gradient-text">difference</span>?
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="gradient-bg text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              See Our Products
            </Link>
            <Link
              href="/order"
              className="border border-gray-200 font-semibold px-8 py-4 rounded-full hover:border-[#E8A0BF] transition-colors"
            >
              Order Now
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
