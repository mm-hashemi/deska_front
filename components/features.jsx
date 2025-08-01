import { FaCrown, FaDollarSign, FaShieldAlt } from "react-icons/fa";

// عکس‌های بالا (badgeها) - آدرس تصاویرت رو جایگزین کن
const badges = [
  { src: "/assets/images/icons.png", alt: "Best Meets Requirements" },
  { src: "/assets/images/icons.png", alt: "Best Est. ROI" },
  { src: "/assets/images/icons.png", alt: "Easiest To Use" },
  { src: "/assets/images/icons.png", alt: "Best Results" },
  { src: "/assets/images/icons.png", alt: "Momentum Leader" },
  { src: "/assets/images/icons.png", alt: "High Performer" },
  { src: "/assets/images/icons.png", alt: "Highest User Adoption" },
  { src: "/assets/images/icons.png", alt: "Easiest To Do Business With" },
];

// کارت‌های ویژگی پایین
const features = [
  {
    icon: <FaCrown className="text-3xl text-black" />,
    title: "Best in Class",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    icon: <FaDollarSign className="text-3xl text-black" />,
    title: "Best value",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    icon: <FaShieldAlt className="text-3xl text-black" />,
    title: "Zero risk",
    desc: "Lorem ipsum dolor sit amet, consectetur",
  },
];

export default function AwardsAndFeatures() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center pt-16 pb-14">
      {/* ردیف badgeها */}
      <div className="bg-white rounded-2xl shadow-md flex flex-row flex-wrap gap-4 px-8 py-6 max-w-max mx-auto">
        {badges.map((b, i) => (
          <img
            key={i}
            src={b.src}
            alt={b.alt}
            className="w-[110px] h-[130px] object-contain"
            draggable={false}
          />
        ))}
      </div>

      {/* ردیف کارت‌های ویژگی */}
      <div className="w-full flex flex-wrap justify-center gap-6 mt-10">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md flex items-center px-7 py-6 min-w-[290px] max-w-[330px] gap-5"
          >
            {item.icon}
            <div>
              <div className="font-bold text-lg text-black mb-1">{item.title}</div>
              <div className="text-gray-400 text-sm">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
