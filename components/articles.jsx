import { useEffect, useRef, useState } from "react";

export default function InfiniteCarousel() {
  // داده‌ی تستی مقالات
  const articles = [
    { id: 1, title: "مقاله شماره ۱" },
    { id: 2, title: "مقاله شماره ۲" },
    { id: 3, title: "مقاله شماره ۳" },
    { id: 4, title: "مقاله شماره ۴" },
    { id: 5, title: "مقاله شماره ۵" },
    { id: 6, title: "مقاله شماره ۶" },
    { id: 7, title: "مقاله شماره ۷" },
    { id: 8, title: "مقاله شماره ۸" },
  ];
  const ITEM_WIDTH = 340; // (به پیکسل) باکس + گپ
  const VISIBLE = 3;

  // لیست تکرارشده برای اینفینیت (دوتا لیست پشت هم)
  const infiniteList = [...articles, ...articles];
  const [index, setIndex] = useState(0);
  const [isTransition, setIsTransition] = useState(true);
  const sliderRef = useRef();

  // حرکت خودکار
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1); // هر بار یکی اضافه
      setIsTransition(true);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // برگشت سریع (بدون انیمیشن) اگر رسید به انتها
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
    <div className="w-full min-h-screen flex justify-center items-center py-20">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl relative ">
        <div
          ref={sliderRef}
          className="flex"
          style={{
            width: `${ITEM_WIDTH * infiniteList.length}px`,
            transform: `translateX(-${index * ITEM_WIDTH}px)`,
            transition: isTransition ? "transform 0.5s cubic-bezier(.74,.55,.62,1.17)" : "none",
          }}
        >
          {infiniteList.map((item, idx) => (
            <div
              key={idx}
              className="mx-4 w-[320px] bg-white rounded-2xl shadow-md flex flex-col items-center overflow-hidden"
            >
              <div className="bg-gray-300 w-full h-40 rounded-t-2xl" />
              <div className="px-5 py-6 text-center flex flex-col flex-1">
                <span className="font-bold text-base text-black leading-7">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      
      </div>
    </div>
  );
}
