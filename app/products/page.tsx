"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BREW_NOTE =
  "1 Liter | Handcrafted in Bahrain. No preservatives. No shortcuts. Raw. Alive. Delicious. Freshly brewed to order — please allow 5–7 days for preparation before delivery.";

const products = [
  {
    name: "Orange Ginger Kombucha",
    price: "BHD 7.000",
    tagline: "Sun-ripened orange and fresh ginger. Vibrant and gut-loving.",
    image: "/orange-ginger.jpeg",
  },
  {
    name: "Ginger Lime Kombucha",
    price: "BHD 7.000",
    tagline: "Zesty lime meets warming ginger. Spicy-citrus balance.",
    image: "/ginger-lime.png.jpeg",
  },
  {
    name: "Berry Hibiscus Kombucha",
    price: "BHD 7.000",
    tagline: "Bold mixed berries and hibiscus. Rich and tangy.",
    image: "/berry.hebiscus.jpeg.jpeg",
  },
];

export default function ProductsPage() {
  return (
    <div className="pt-24 pb-32 px-6 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="text-center mb-16 pt-12"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-[#9B5DE5] mb-4">
          The Range
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Our <span className="gradient-text">Kombucha</span>
        </h1>
        <p className="mt-5 text-lg text-gray-500 font-light max-w-md mx-auto">
          Three flavours. Freshly brewed to order in Bahrain. Nothing artificial.
        </p>
      </motion.div>

      {/* 3-card grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {products.map(({ name, price, tagline, image }, i) => (
          <motion.article
            key={name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" as const }}
            className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-[#E8A0BF]/15 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Photo */}
            <div className="px-4 pt-4">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="text-base font-semibold leading-snug">{name}</h2>
                <span className="text-sm font-semibold text-[#9B5DE5] whitespace-nowrap">
                  {price}
                </span>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {tagline}
              </p>
              <p className="text-xs text-gray-400 font-light mt-4 leading-relaxed border-t border-gray-100 pt-4">
                {BREW_NOTE}
              </p>
              <Link
                href="/order"
                className="mt-6 block text-center gradient-bg text-white text-sm font-semibold py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Order Now
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20 text-center bg-gradient-to-br from-[#F5D0E4]/30 to-[#C49CF0]/20 rounded-3xl p-12"
      >
        <h2 className="text-3xl font-bold">
          Ready to <span className="gradient-text">taste the difference</span>?
        </h2>
        <p className="text-gray-500 font-light mt-3 max-w-md mx-auto">
          Place your order and we&apos;ll brew it fresh. Delivered within 5–7 days.
        </p>
        <Link
          href="/order"
          className="mt-8 inline-block gradient-bg text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
        >
          Place an Order
        </Link>
      </motion.div>
    </div>
  );
}
