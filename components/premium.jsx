'use client'
import { useState } from "react"
import { FaCheck, FaMinus, FaStar, FaCrown } from "react-icons/fa"
import { motion } from "framer-motion"
import clsx from "clsx"

const plans = [
  {
    name: "Starter",
    price: { monthly: 0, annual: 0 },
    description: "Best for individuals & trial usage.",
    features: [
      { text: "Up to 2 active projects", enabled: true },
      { text: "5 team members", enabled: true },
      { text: "Board & Kanban views", enabled: true },
      { text: "Basic analytics", enabled: true },
      { text: "Custom domain", enabled: false },
      { text: "Priority support", enabled: false },
    ],
    cta: "Start For Free",
    highlight: false,
    badge: null,
  },
  {
    name: "Team",
    price: { monthly: 12, annual: 108 }, // 12 -> 9/mo on annual
    description: "Perfect for small teams and startups.",
    features: [
      { text: "Unlimited projects", enabled: true },
      { text: "20 team members", enabled: true },
      { text: "Timeline & Gantt charts", enabled: true },
      { text: "Advanced analytics", enabled: true },
      { text: "Custom domain", enabled: true },
      { text: "Priority support", enabled: true },
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Business",
    price: { monthly: 29, annual: 264 }, // 22/mo on annual
    description: "For larger teams needing advanced security & control.",
    features: [
      { text: "Everything in Team", enabled: true },
      { text: "SSO & SCIM", enabled: true },
      { text: "Custom roles & permissions", enabled: true },
      { text: "Advanced integrations", enabled: true },
      { text: "Audit logs", enabled: true },
      { text: "24/7 priority support", enabled: true },
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: "Premium",
  },
]

export default function PricingPlans() {
  const [billing, setBilling] = useState("monthly") // or 'annual'
  return (
    <section className="relative z-10 flex flex-col gap-8 px-6 py-16 max-w-6xl mx-auto font-vazirmatn min-h-screen">
      {/* BG Blur */}
      <div aria-hidden className="absolute inset-0  opacity-80 -z-10" />
      {/* Title + Billing Switch */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.7 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2"
      >
       
        {/* Switch */}
        <div className="flex items-center bg-zinc-100/60 dark:bg-[#181a24]/95 rounded-full shadow border border-zinc-300 dark:border-zinc-700 px-2 py-1">
          <button className={clsx(
            "text-sm font-bold px-4 py-1 rounded-full transition",
            billing === "monthly" ? "bg-white dark:bg-zinc-900/60 text-indigo-700 shadow" : "text-zinc-500 hover:text-indigo-600"
          )}
            onClick={() => setBilling("monthly")}
          >Monthly</button>
          <button className={clsx(
            "text-sm font-bold px-4 py-1 rounded-full transition",
            billing === "annual" ? "bg-white dark:bg-zinc-900/60 text-indigo-700 shadow" : "text-zinc-500 hover:text-indigo-600"
          )}
            onClick={() => setBilling("annual")}
          >Annual <span className="text-xs ml-1 font-semibold text-green-600">Save 25%</span></button>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ scale: 0.93, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.54 + i*0.07, type: "spring", bounce: 0.18 }}
            className={clsx(
              "relative px-6 py-9 rounded-[2rem] backdrop-blur-lg border border-indigo-100/50 dark:border-zinc-800 shadow-xl flex flex-col gap-3 group bg-white/70 dark:bg-[#181a24]/95",
              plan.highlight && "ring-2 ring-indigo-400 !shadow-2xl scale-[1.05] z-10",
              "transition hover:-translate-y-1"
            )}
            tabIndex={0}
          >
            {/* Most popular badge */}
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-lg z-20 drop-shadow">
                <FaStar className="mr-1 text-yellow-300" /> {plan.badge}
              </div>
            )}
            {!plan.highlight && plan.badge && (
              <div className="absolute top-4 right-5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 shadow">{plan.badge}</div>
            )}
            <h3 className="text-2xl font-black mb-1 text-indigo-900 dark:text-indigo-200">{plan.name}</h3>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                {plan.price[billing] === 0 ? "Free" : `$${plan.price[billing]}`}
              </span>
              {plan.price[billing] > 0 && (
                <span className="text-lg font-semibold text-zinc-500 dark:text-zinc-200">
                  /mo
                </span>
              )}
              {billing === "annual" && plan.price[billing] > 0 && (
                <span className="ml-2 text-xs font-bold px-2.5 py-0.5 bg-green-50 text-green-700 rounded-2xl">Billed yearly</span>
              )}
            </div>
            <div className="text-zinc-600 dark:text-zinc-300 mb-4">{plan.description}</div>
            {/* Features */}
            <ul className="flex flex-col gap-2 mb-7">
              {plan.features.map((f, idx) => (
                <li key={idx} className={clsx("flex items-center gap-2 text-base", f.enabled ? "text-green-700" : "text-zinc-300 dark:text-zinc-600")}>
                  {f.enabled ? <FaCheck className="text-xl text-green-500" /> : <FaMinus className="text-lg" />}
                  {f.text}
                </li>
              ))}
            </ul>
            <button className={clsx(
              "mt-auto rounded-2xl px-6 py-3 text-base font-bold transition shadow outline-none focus:ring-2 focus:ring-indigo-500 ring-offset-1",
              plan.highlight
                ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:scale-105"
                : "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 hover:scale-102"
            )}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
      {/* Trust bar / FAQ */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-300 text-sm font-semibold">
          <FaCrown className="text-amber-400" />
          No credit card required
        </div>
        <div className="h-4 w-px bg-zinc-300/50" />
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-300 text-sm font-semibold">
          <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs mr-1">24/7</span>
          Priority Support
        </div>
        <div className="h-4 w-px bg-zinc-300/50" />
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-300 text-sm font-semibold">
          Cancel anytime
        </div>
      </div>
    </section>
  )
}
