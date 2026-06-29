"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage, type Lang } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const SIZES = [
  { label: "500ml", labelAr: "500 مل", oldPrice: "5.000", price: "3.500" },
  { label: "1 Litre", labelAr: "1 لتر", oldPrice: "7.000", price: "5.000" },
] as const;

const DELIVERY_CHARGES = { muharraq: 2.0, rest: 1.0 } as const;
const FREE_DELIVERY_THRESHOLD = 25.0;
const TRAVEL_PACKING = 4.0;

type SizeLabel = typeof SIZES[number]["label"];
type AreaKey = keyof typeof DELIVERY_CHARGES | "gcc";
type Selection = Record<string, number>;
type SizeChoice = Record<string, SizeLabel>;

function bottleCount(n: number, lang: Lang): string {
  if (lang === "ar") {
    if (n === 1) return "زجاجة واحدة";
    if (n === 2) return "زجاجتان";
    return `${n} زجاجات`;
  }
  return `${n} bottle${n !== 1 ? "s" : ""}`;
}

export default function OrderPage() {
  const { lang } = useLanguage();
  const tx = translations[lang];
  const o = tx.order;

  const flavours = tx.flavours;
  const defaultSizeChoice: SizeChoice = Object.fromEntries(
    flavours.map((f) => [f.id, "500ml" as SizeLabel])
  );

  const [selection, setSelection] = useState<Selection>({});
  const [sizeChoice, setSizeChoice] = useState<SizeChoice>(defaultSizeChoice);
  const [area, setArea] = useState<AreaKey | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });

  const totalBottles = Object.values(selection).reduce((a, b) => a + b, 0);

  const subtotal = Object.entries(selection).reduce((sum, [id, qty]) => {
    const size = SIZES.find((s) => s.label === (sizeChoice[id] ?? "500ml"))!;
    return sum + parseFloat(size.price) * qty;
  }, 0);

  const isGcc = area === "gcc";

  const deliveryCharge: number | null = !area
    ? null
    : isGcc
    ? 0
    : subtotal >= FREE_DELIVERY_THRESHOLD
    ? 0
    : DELIVERY_CHARGES[area as keyof typeof DELIVERY_CHARGES];

  const travelPackingCharge = isGcc ? TRAVEL_PACKING : 0;
  const grandTotal = subtotal + (deliveryCharge ?? 0) + travelPackingCharge;

  const adjust = (id: string, delta: number) => {
    setSelection((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalBottles === 0 || !area) return;

    const areaLabel = o.areaOptions.find((a) => a.value === area)?.label ?? area;
    const deliveryDisplay =
      deliveryCharge === 0
        ? o.deliveryFree
        : `BHD ${deliveryCharge!.toFixed(3)}`;

    const lines: string[] = [o.waHeader, ""];

    Object.entries(selection).forEach(([id, qty]) => {
      const f = flavours.find((fl) => fl.id === id)!;
      const size = SIZES.find((s) => s.label === (sizeChoice[id] ?? "500ml"))!;
      const sizeDisplay = lang === "ar" ? size.labelAr : size.label;
      lines.push(
        `• ${f.name} — ${sizeDisplay} — BHD ${size.price}${qty > 1 ? ` × ${qty}` : ""}`
      );
    });

    lines.push("");
    lines.push(`${o.waSubtotal} BHD ${subtotal.toFixed(3)}`);
    lines.push(`${o.waArea} ${areaLabel}`);
    if (isGcc) {
      lines.push(`${o.waTravel} BHD ${TRAVEL_PACKING.toFixed(3)}`);
    } else {
      lines.push(`${o.waDelivery} ${deliveryDisplay}`);
    }
    lines.push(`${o.waTotal} BHD ${grandTotal.toFixed(3)}`);
    lines.push("");
    lines.push(`${o.waName} ${form.name}`);
    lines.push(`${o.waPhone} ${form.phone}`);
    lines.push(`${o.waAddress} ${form.address}`);
    if (form.notes) lines.push(`${o.waNotes} ${form.notes}`);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/97338388211?text=${message}`, "_blank");

    setSubmitted(true);
  };

  const [succBefore, succGrad] = o.successH1;
  const [h1Before, h1Grad] = o.h1;

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
            {succBefore && <>{succBefore}{" "}</>}
            <span className="gradient-text">{succGrad}</span>
          </h1>
          <p className="mt-4 text-gray-500 font-light text-lg">
            {lang === "en" ? (
              <>
                Thank you, {form.name}! We&apos;ll reach out to you at{" "}
                <span className="text-[#9B5DE5] font-medium">{form.phone}</span>{" "}
                to confirm your order and arrange delivery.
              </>
            ) : (
              <>
                شكراً، {form.name}! سنتواصل معك على{" "}
                <span className="text-[#9B5DE5] font-medium">{form.phone}</span>{" "}
                لتأكيد طلبك وترتيب التوصيل.
              </>
            )}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            {bottleCount(totalBottles, lang)} — BHD {grandTotal.toFixed(3)} —{" "}
            {lang === "en"
              ? "freshly brewed to order — please allow 5–7 days for preparation."
              : "تُحضَّر طازجة عند الطلب — يُرجى السماح بـ 5–7 أيام للتحضير."}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelection({});
              setSizeChoice(defaultSizeChoice);
              setForm({ name: "", phone: "", address: "", notes: "" });
              setArea("");
            }}
            className="mt-8 gradient-bg text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
          >
            {o.anotherOrder}
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
          {o.badge}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold">
          {h1Before && <>{h1Before}{" "}</>}
          <span className="gradient-text">{h1Grad}</span>
        </h1>
        <p className="mt-4 text-gray-500 font-light text-lg">{o.sub}</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Flavour picker */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{o.chooseFlavours}</h2>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                totalBottles > 0
                  ? "bg-[#F5D0E4]/50 text-[#9B5DE5]"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {bottleCount(totalBottles, lang)}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {flavours.map(({ id, name, image }) => {
              const qty = selection[id] ?? 0;
              const selectedSize = sizeChoice[id] ?? "500ml";
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
                      <div className="flex gap-1.5 mt-1.5">
                        {SIZES.map((s) => {
                          const displayLabel = lang === "ar" ? s.labelAr : s.label;
                          return (
                            <button
                              key={s.label}
                              type="button"
                              onClick={() =>
                                setSizeChoice((prev) => ({ ...prev, [id]: s.label }))
                              }
                              className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                                selectedSize === s.label
                                  ? "gradient-bg text-white"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              {displayLabel}{" "}
                              <span
                                className={`line-through ${
                                  selectedSize === s.label ? "opacity-60" : "opacity-50"
                                }`}
                              >
                                {s.oldPrice}
                              </span>{" "}
                              {s.price} BHD
                            </button>
                          );
                        })}
                      </div>
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
          <h2 className="text-xl font-bold mb-6">{o.yourDetails}</h2>
          <div className="space-y-4">
            {/* Delivery area */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {o.deliveryAreaLabel}
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                {o.areaOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setArea(opt.value as AreaKey)}
                    className={`flex-1 text-sm py-3 rounded-xl font-medium border transition-all ${
                      area === opt.value
                        ? "gradient-bg text-white border-transparent"
                        : "border-gray-200 text-gray-600 hover:border-[#E8A0BF]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {isGcc ? (
                <p className="mt-2 text-xs text-gray-500 font-light">{o.gccPickupNote}</p>
              ) : (
                <p className="mt-2 text-xs text-gray-400 font-light">{o.freeDeliveryNote}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{o.fullName}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={o.namePlaceholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8A0BF] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{o.phone}</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={o.phonePlaceholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8A0BF] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{o.address}</label>
              <textarea
                required
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder={o.addressPlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E8A0BF] transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {o.notes}{" "}
                <span className="text-gray-400 font-normal">({o.notesOptional})</span>
              </label>
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder={o.notesPlaceholder}
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
            <h3 className="font-semibold mb-3">{o.summary}</h3>
            <ul className="space-y-1.5">
              {Object.entries(selection).map(([id, qty]) => {
                const f = flavours.find((fl) => fl.id === id)!;
                const size = SIZES.find(
                  (s) => s.label === (sizeChoice[id] ?? "500ml")
                )!;
                const displayLabel = lang === "ar" ? size.labelAr : size.label;
                const lineTotal = (parseFloat(size.price) * qty).toFixed(3);
                return (
                  <li key={id} className="flex justify-between text-sm">
                    <span>
                      {f.name}{" "}
                      <span className="text-gray-400">({displayLabel})</span>
                    </span>
                    <span className="font-medium">× {qty} — BHD {lineTotal}</span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-[#E8A0BF]/30 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{o.subtotalLabel}</span>
                <span className="font-medium">BHD {subtotal.toFixed(3)}</span>
              </div>
              {!isGcc && deliveryCharge !== null && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{o.deliveryLabel}</span>
                  <span
                    className={`font-medium ${
                      deliveryCharge === 0 ? "text-green-600" : ""
                    }`}
                  >
                    {deliveryCharge === 0
                      ? o.deliveryFree
                      : `BHD ${deliveryCharge.toFixed(3)}`}
                  </span>
                </div>
              )}
              {isGcc && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{o.travelPackingLabel}</span>
                  <span className="font-medium">BHD {TRAVEL_PACKING.toFixed(3)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-[#E8A0BF]/20">
                <span>{o.total}</span>
                <span className="gradient-text">BHD {grandTotal.toFixed(3)}</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400 font-light">{o.brewNote}</p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={totalBottles === 0 || !area}
          className="w-full gradient-bg text-white font-semibold py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {totalBottles === 0
            ? o.disabledBtn
            : !area
            ? o.disabledAreaBtn
            : `${o.submitBtnPrefix} ${grandTotal.toFixed(3)}`}
        </button>
      </form>
    </div>
  );
}
