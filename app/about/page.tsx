"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { lang } = useLanguage();
  const tx = translations[lang];
  const a = tx.about;

  const [h1Before, h1Grad] = a.h1;
  const [valBefore, valGrad] = a.valuesH2;
  const [ctaBefore, ctaGrad] = a.ctaH2;

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
          {a.badge}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold"
        >
          {h1Before && <>{h1Before}{" "}</>}
          <span className="gradient-text">{h1Grad}</span>
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
            {valBefore && <>{valBefore}{" "}</>}
            <span className="gradient-text">{valGrad}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {a.values.map(({ title, body, emoji }, i) => (
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
            {ctaBefore && <>{ctaBefore}{" "}</>}
            <span className="gradient-text">{ctaGrad}</span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="gradient-bg text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              {a.seeProducts}
            </Link>
            <Link
              href="/order"
              className="border border-gray-200 font-semibold px-8 py-4 rounded-full hover:border-[#E8A0BF] transition-colors"
            >
              {a.orderNow}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
