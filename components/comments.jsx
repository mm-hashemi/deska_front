'use client'
import { useState, useRef, useEffect } from 'react'

const CARDS = [
  {
    company: "Datacamp",
    companyLogo: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=facearea&w=48&h=48",
    text: "Working with this team was an outstanding experience. Their dedication and attention to detail truly set them apart.",
    author: "Saeid Neysi",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    authorTitle: "Product Manager",
    linkedin: "#"
  },
  {
    company: "VisionX",
    companyLogo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=48&h=48",
    text: "The professionalism, quality, and collaboration demonstrated by this team were truly commendable.",
    author: "Elham Tabatabaei",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    authorTitle: "CEO",
    linkedin: "#"
  },
  {
    company: "Strongbox",
    companyLogo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=48&h=48",
    text: "The results of our collaboration greatly exceeded my expectations. I look forward to future projects together.",
    author: "Armin Akbari",
    authorAvatar: "https://randomuser.me/api/portraits/men/11.jpg",
    authorTitle: "Founder",
    linkedin: "#"
  }
];

// Animation durations (ms)
const DURATION1 = 1400; // Move left, slooow
const DURATION2 = 400;  // Quick fade right

export default function SlidingStackTestimonials() {
  const [cards, setCards] = useState(CARDS);
  const [slideStage, setSlideStage] = useState(0); // 0=center, 1=left, 2=right/fade
  const [lock, setLock] = useState(false);

  useEffect(() => {
    if (lock) return;
    const t = setTimeout(() => handleSlide(), 5200);
    return () => clearTimeout(t);
  }, [cards, lock]);

  function handleSlide() {
    if (lock) return;
    setLock(true);

    setSlideStage(1); // go left
    setTimeout(() => {
      setSlideStage(2); // go right+fade
      setTimeout(() => {
        setCards((prev) => [...prev.slice(1), prev[0]]);
        setSlideStage(0);
        setLock(false);
      }, 250);
    }, 290);
  }

  function getCardMotion(i) {
    if (i === 0) {
      if (slideStage === 1)
        return `-translate-x-[320px] opacity-100 z-30 scale-100`;
      if (slideStage === 2)
        return `translate-x-[370px] opacity-90 z-30 scale-100`;
      return `translate-x-0 opacity-100 z-30 scale-100`;
    }
    if (i === 1) {
      if (slideStage === 2)
        return `translate-x-0 opacity-100 z-20 scale-100 top-0`;
      return `translate-x-0 opacity-85 z-20 scale-[.96]  rotate-2 top-0`;
    }
    return `translate-x-0 opacity-65 z-10 scale-[.92] rotate-5 top-0`;
  }

  function getCardTransition(i) {
    if (i === 0 && slideStage === 1) return `transition-all duration-[250ms] ease-[cubic-bezier(.49,.22,0,1.01)]`;
    if (i === 0 && slideStage === 2) return `transition-all duration-[250ms] ease-in`;
    if (i === 1 && slideStage === 2) return `transition-all duration-[400ms] ease-in`;
    return `transition-all duration-700`;
  }

  return (
    <div className="relative mb-20 w-[97vw] max-w-[510px] h-[288px] sm:h-[340px] mx-auto flex items-center justify-center overflow-visible px-1">
      {[2, 1, 0].map((i) => {
        const card = cards[i];
        return (
          <div
            key={card.company + card.author}
            className={`absolute left-0 right-0 mx-auto
                w-[97%] max-w-[490px] h-[260px] sm:h-[320px]
                ${getCardTransition(i)} ${getCardMotion(i)}
                pointer-events-${i === 0 ? 'auto' : 'none'}
                `}
            style={{
              transitionProperty: 'all'
            }}
          >
            <TestimonialCard {...card} />
          </div>
        );
      })}
    </div>
  );
}

function TestimonialCard({ company, companyLogo, text, author, authorAvatar, authorTitle, linkedin }) {
  return (
    <div className="rounded-xl sm:rounded-2xl border bg-white border-zinc-100 dark:border-zinc-800 shadow-2xl flex flex-col h-full justify-between px-10 sm:px-12 py-7 transition-colors">
      <div className="flex items-center justify-between gap-3 mb-4">
        <img className="w-7 h-7 rounded-md" src={companyLogo}  />
        <span className="font-bold text-zinc-700 dark:text-white text-lg">{company}</span>
      </div>
      <div className="flex-1 flex items-center mb-4">
        <blockquote className="text-zinc-700 dark:text-zinc-100 text-[18px] sm:text-[20px] leading-8 font-medium">
          <span className="text-3xl font-serif select-none text-zinc-400 dark:text-zinc-500 align-sub">
            &ldquo;
          </span>
          {text}
        </blockquote>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <img src={authorAvatar} className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700 shadow" alt={author} />
        <div>
          <div className="font-semibold text-zinc-800 dark:text-white text-[15px]">{author}</div>
          <div className="text-xs text-zinc-400 dark:text-zinc-400">{authorTitle}</div>
        </div>
        <a href={linkedin} target="_blank" rel="noreferrer" className="ml-auto text-sky-500 hover:text-sky-700 transition">
          <svg width="19" height="19" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#e7f3fb" />
            <path d="M12.734 14.486V22.035H9.982V14.486H12.734ZM11.357 13.323C10.444 13.323 9.7 12.573 9.7 11.668C9.7 10.762 10.447 10.017 11.363 10.017C12.278 10.017 13.018 10.763 13.018 11.668C13.018 12.573 12.271 13.323 11.357 13.323ZM23.001 17.967C23.001 15.456 21.569 14.313 19.784 14.313C18.708 14.313 18.032 14.799 17.726 15.322V14.514H14.97C15.003 15.187 14.97 22.034 14.97 22.034H17.726V18.111C17.726 17.909 17.74 17.706 17.799 17.563C17.957 17.168 18.321 16.75 18.899 16.75C19.663 16.75 19.979 17.343 19.979 18.203V22.033H22.734V18.111C22.734 16.13 21.952 15.11 20.376 15.11C19.486 15.11 18.969 15.634 18.75 16.051C18.723 16.102 18.713 16.169 18.713 16.244V14.513H14.97C15.003 15.186 14.97 22.033 14.97 22.033H17.726V18.111V18.111Z" fill="#0077B5"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
