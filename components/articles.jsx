'use client'
import { useEffect, useRef, useState } from "react";

export default function ArticleCarousel() {
  const articles = [
    {
      id: 1,
      title: "5 Golden Tips for Boosting Remote Team Productivity",
      summary: "Discover practical tricks and strategies to manage remote teams and maximize productivity.",
      tag: "Productivity",
      date: "2024-07-31",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      link: "#"
    },
    {
      id: 2,
      title: "Getting Started with React & Next.js: A Guide for Juniors",
      summary: "A step-by-step guide for beginners to jump into React and Next.js and land your first front-end job.",
      tag: "Frontend Tutorial",
      date: "2024-07-19",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      link: "#"
    },
    {
      id: 3,
      title: "Top Free Project Management Tools in 2024",
      summary: "A comparison of the best free project management tools for startups and small teams.",
      tag: "Project Management",
      date: "2024-07-22",
      image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=400&q=80",
      link: "#"
    },
    {
      id: 4,
      title: "10 Tips for Writing an Eye-Catching Global Resume",
      summary: "How to build a professional English CV and get hired remotely.",
      tag: "Resume",
      date: "2024-07-26",
      image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=400&q=80",
      link: "#"
    },
    {
      id: 5,
      title: "Building Clean & Modern UI with Tailwind CSS",
      summary: "Tips, resources, and hands-on techniques to upgrade your Tailwind design game.",
      tag: "Frontend",
      date: "2024-07-07",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      link: "#"
    },
    {
      id: 6,
      title: "7 Useful Libraries for Your Next React Project",
      summary: "Explore libraries that speed up development and boost your React workflow.",
      tag: "React",
      date: "2024-07-29",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
      link: "#"
    },
    {
      id: 7,
      title: "Job Hunting Remotely from Iran: Real Stories & Challenges",
      summary: "Experiences and tips from Iranian remote job seekers in international teams.",
      tag: "Remote Work",
      date: "2024-07-20",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      link: "#"
    },
    {
      id: 8,
      title: "Quick Comparison: Next.js vs. Remix vs. Nuxt",
      summary: "Which framework is best for your next project? Side-by-side comparison.",
      tag: "Frameworks",
      date: "2024-07-23",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      link: "#"
    },
  ];
  const ITEM_WIDTH = 340;
  const VISIBLE = 3;

  const infiniteList = [...articles, ...articles];
  const [index, setIndex] = useState(0);
  const [isTransition, setIsTransition] = useState(true);
  const sliderRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
      setIsTransition(true);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === articles.length) {
      setTimeout(() => {
        setIsTransition(false);
        setIndex(0);
      }, 2000);
    } else {
      setIsTransition(true);
    }
  }, [index, articles.length]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center py-20 bg-zinc-100 dark:bg-[#181a24] transition-colors">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl relative">
        <div
          ref={sliderRef}
          className="flex"
          style={{
            width: `${ITEM_WIDTH * infiniteList.length}px`,
            transform: `translateX(-${index * ITEM_WIDTH}px)`,
            transition: isTransition
              ? "transform 0.5s cubic-bezier(.74,.55,.62,1.17)"
              : "none",
          }}
        >
          {infiniteList.map((item, idx) => (
            <div
              key={idx}
              className="mx-4 w-[320px] bg-white dark:bg-[#232433] rounded-2xl shadow-md flex flex-col items-center overflow-hidden transition-colors"
            >
              <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-t-2xl">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="px-5 py-4 flex flex-col flex-1 text-left">
                <span className="font-semibold text-base text-black dark:text-gray-100 mb-1">{item.tag}</span>
                <span className="font-bold text-lg text-primary-800 dark:text-primary-300 mb-2">{item.title}</span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.summary}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-400">{item.date}</span>
                  <a href={item.link} className="hover:underline text-blue-600 dark:text-blue-400 text-sm">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
