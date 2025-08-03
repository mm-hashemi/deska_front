// ProjectUseCases.jsx
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

const cards = [
  {
    title: "Project management",
    desc: "Align on project goals, timeline, scope and objectives in one central location.",
    color: "bg-transparent",
    highlight: false,
  },
  {
    title: "Marketing",
    desc: "Align on marketing goals, programs and campaigns across the organization.",
    color: "bg-violet-600 text-white",
    highlight: true,
  },
  {
    title: "Agencies",
    desc: "Streamline client intake, requests, campaigns, and reporting with Hive.",
    color: "bg-transparent",
    highlight: false,
  },
  {
    title: "Operations",
    desc: "Plan and track goals across your company in Hive.",
    color: "bg-transparent",
    highlight: false,
  },
  {
    title: "Enterprise",
    desc: "Track big-picture goals, export data, and analyze progress.",
    color: "bg-transparent",
    highlight: false,
  },
];

export default function ProjectUseCases() {
  return (
    <div className="min-h-screen dark:bg-neutral-900 flex flex-col items-center justify-center py-12 px-2">
      <button className="mb-8 px-5 py-2 rounded-lg font-semibold bg-blue-200 text-neutral-900 hover:bg-orange-300 transition">
        Explore Use Cases
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {cards.map((c, i) => {
          // Ordering for grid layout
          let orderClass = '';
          // Desktop grid: manually position to match screenshot
          if (i === 3) orderClass = "sm:col-start-1 sm:row-start-2";
          if (i === 1) orderClass = "sm:col-start-2 sm:row-span-2 sm:row-start-1";
          if (i === 4) orderClass = "sm:col-start-3 sm:row-start-2";

          return (
            <div
              key={c.title}
              className={`
              rounded-xl p-6 flex flex-col justify-between min-h-[170px] 
              dark:border-neutral-700
              shadow-sm relative overflow-hidden transition 
              ${c.highlight
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-neutral-800/80 text-black'
              }
              hover:ring-2 hover:ring-violet-400/50
              ${orderClass}
              `}
            >
              <div>
                <div className="font-bold text-lg mb-2 flex items-center gap-2">
                  {c.title}
                  <HiArrowNarrowRight className={`${c.highlight ? "text-white" : "text-cyan-400"} ml-1`} />
                </div>
                <div className="text-sm opacity-80">
                  {c.desc}
                </div>
              </div>
              {c.highlight && (
                <div className="absolute right-4 bottom-2">
                  {/* Example analytics image placeholder */}
                  <div className="w-32 h-20 bg-white/90 rounded-xl flex items-center justify-center overflow-hidden mt-4 shadow-md">
                    {/* you can use an SVG, chart, or image here */}
                    <svg width="56" height="56" fill="none">
                      <circle cx="28" cy="28" r="26" stroke="#a78bfa" strokeWidth="4" fill="#f3f0ff" />
                      <text x="28" y="34" textAnchor="middle" fontSize="16" fill="#7c3aed">32.5</text>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
