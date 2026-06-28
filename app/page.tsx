"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Home() {
  const { lang } = useLanguage();
  const tx = translations[lang];
  const h = tx.home;

  const [heroBefore, heroGrad] = h.heroH1;
  const [flavBefore, flavGrad] = h.flavoursH2;
  const [brewBefore, brewGrad] = h.brewH2;
  const [ctaBefore, ctaGrad] = h.ctaH2;

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-sm font-semibold tracking-widest uppercase text-[#9B5DE5] mb-4"
        >
          {h.heroBadge}
        </motion.p>
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-7xl font-bold leading-tight max-w-3xl"
        >
          {heroBefore && <>{heroBefore}{" "}</>}
          <span className="gradient-text">{heroGrad}</span>
        </motion.h1>
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 text-lg text-gray-500 max-w-xl font-light"
        >
          {h.heroSub}
        </motion.p>
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/order"
            className="gradient-bg text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            {h.heroPrimary}
          </Link>
          <Link
            href="/about"
            className="border border-gray-200 text-[#1a1a1a] font-semibold px-8 py-4 rounded-full hover:border-[#E8A0BF] transition-colors"
          >
            {h.heroSecondary}
          </Link>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
          className="mt-16 inline-flex items-center gap-2 bg-[#F5D0E4]/40 rounded-full px-5 py-2.5 text-sm font-medium text-[#9B5DE5]"
        >
          <span className="w-2 h-2 rounded-full bg-[#9B5DE5] animate-pulse" />
          {h.liveBadge}
        </motion.div>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {flavBefore && <>{flavBefore} </>}
            <span className="gradient-text">{flavGrad}</span>
          </h2>
          <p className="mt-3 text-gray-500 font-light">{h.flavoursSub}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tx.flavours.map(({ id, shortName, note, image }, i) => (
            <motion.div
              key={id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-[#E8A0BF]/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="px-4 pt-4">
                <div className="rounded-2xl overflow-hidden">
                  <Image
                    src={image}
                    alt={shortName}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold">{shortName}</h3>
                <p className="mt-2 text-sm text-gray-400 font-light">{note}</p>
                <Link
                  href="/products"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#9B5DE5] group-hover:gap-2 transition-all"
                >
                  {h.viewDetails}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Livora */}
      <section className="bg-gradient-to-br from-[#F5D0E4]/30 to-[#C49CF0]/20 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold"
          >
            {brewBefore && <>{brewBefore}{" "}</>}
            <span className="gradient-text">{brewGrad}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-gray-600 font-light text-lg max-w-2xl mx-auto"
          >
            {h.brewBody}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {h.stats.map(({ stat, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold gradient-text">{stat}</p>
                <p className="text-sm text-gray-500 mt-1 font-light">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {ctaBefore && <>{ctaBefore}{" "}</>}
            <span className="gradient-text">{ctaGrad}</span>
          </h2>
          <p className="mt-4 text-gray-500 font-light">{h.ctaSub}</p>
          <Link
            href="/order"
            className="mt-8 inline-block gradient-bg text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            {h.ctaBtn}
          </Link>
        </motion.div>
      </section>
    </>
  );
}
