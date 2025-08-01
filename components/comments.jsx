// CardProfile.jsx
export default function CardProfile() {
  return (
    <div className="w-full flex justify-center items-center  min-h-screen py-10">
      <div className="w-[700px] flex flex-row-reverse items-center bg-white rounded-2xl shadow-md px-10 py-7 gap-9">
        {/* پروفایل آواتار (سمت راست) */}
        <div className="flex-shrink-0">
          <div className="w-36 h-36 rounded-2xl bg-[#999] flex items-center justify-center">
            {/* آیکون پیش‌فرض کاربر */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="28" r="16" fill="#DDD" />
              <rect
                x="17"
                y="46"
                width="46"
                height="24"
                rx="12"
                fill="#DDD"
              />
            </svg>
          </div>
        </div>
        {/* متن کارت */}
        <div className="flex-1">
          <p className="text-gray-700 text-base mb-5 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla
          </p>
          <div className="mt-2">
            <span className="text-gray-800 font-bold text-sm">Lorem ipsum</span>
            <span className="text-gray-400 text-sm ml-2">Lorem ipsum Lorem ipsum</span>
          </div>
        </div>
      </div>
    </div>
  );
}
