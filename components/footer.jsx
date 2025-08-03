// HiveFooter.jsx
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaApple, FaWindows, FaGooglePlay } from "react-icons/fa6";

export default function DeskaFooter() {
  return (
    <footer className="bg-[#232324] text-[#dadada] pt-10 pb-4 text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left: Logo & Social */}
          <div className="flex-1 min-w-[210px] flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
               <img src="/assets/images/logo.png" alt="" className="w-32" />
              </div>
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Facebook" className="hover:text-white transition"><FaFacebookF size={18} /></a>
                <a href="#" aria-label="X / Twitter" className="hover:text-white transition"><FaXTwitter size={18} /></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-white transition"><FaLinkedinIn size={18} /></a>
              </div>
            </div>

            {/* Language */}
            <div>
              <button className="flex items-center gap-2 border border-zinc-600/40 rounded-full px-3 py-1 text-white shadow-sm hover:bg-zinc-700/20 transition">
                <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 22 22">
                  <circle cx="11" cy="11" r="10" stroke="#bdbdbd" strokeWidth="1.2" />
                  <path d="M7 11a4 4 0 108 0 4 4 0 00-8 0z" stroke="#bdbdbd" strokeWidth="1.2" />
                  <path d="M11 1v20M1 11h20" stroke="#bdbdbd" strokeWidth="1.2" />
                </svg>
                <span>English</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="#bdbdbd" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="font-semibold text-white mb-4">Company</div>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact us</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
               
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Features</div>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-white">Project Management</a></li>
                <li><a href="#" className="hover:text-white">Time Management</a></li>
                <li><a href="#" className="hover:text-white">Team Collaboration</a></li>
                <li><a href="#" className="hover:text-white">Automations</a></li>
                <li><a href="#" className="hover:text-white">Gantt Charts</a></li>
                <li><a href="#" className="hover:text-white">Kanban Boards</a></li>
                <li><a href="#" className="hover:text-white">Project Templates</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-4">Resources</div>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-white">Import work</a></li>
                <li><a href="#" className="hover:text-white">Changelog</a></li>
                <li><a href="#" className="hover:text-white">Platform status</a></li>
                <li><a href="#" className="hover:text-white">Security overview</a></li>
                <li><a href="#" className="hover:text-white">Google API policy</a></li>
                <li><a href="#" className="hover:text-white">Project Management Guide</a></li>
              </ul>
            </div>
           
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-zinc-700"></div>

        {/* Download bar & legal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Download buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded shadow hover:bg-zinc-700 transition">
              <FaApple size={18} /> <span>Download on <strong>Mac</strong></span>
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded shadow hover:bg-zinc-700 transition">
              <FaWindows size={16} /> <span>Get it on <strong>Windows</strong></span>
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded shadow hover:bg-zinc-700 transition">
              <FaApple size={18} /> <span>Download on <strong>App Store</strong></span>
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded shadow hover:bg-zinc-700 transition">
              <FaGooglePlay size={17} /> <span>Get it on <strong>Google Play</strong></span>
            </a>
          </div>
          {/* Legal */}
          <div className="text-xs text-zinc-500 text-center md:text-right flex-1 pt-2 md:pt-0">
            <a href="#" className="hover:underline mr-2">Terms of Service</a>
            <a href="#" className="hover:underline mr-2">Privacy Policy</a>
            <span className="ml-2">&copy; 2015 – 2025 Hive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
