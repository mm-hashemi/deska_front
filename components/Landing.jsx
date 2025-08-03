'use client';
import { HiOutlineMoon } from 'react-icons/hi';
import { useState } from "react";
import {
  HiOutlineViewGrid, HiOutlineSearch,
  HiOutlineViewBoards, HiOutlineUserGroup,
  HiOutlineCalendar, HiOutlineTable, HiChartBar
} from "react-icons/hi";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { useRouter } from 'next/navigation';

const tabs = [
  { label: "dashboard", icon: HiOutlineViewGrid, content: "/assets/images/dash.jpg" },
  { label: "gantt", icon: MdAlignHorizontalLeft, content: "/assets/images/gantt.jpg" },
  { label: "project", icon: HiOutlineSearch, content: "/assets/images/projects.jpg" },
  { label: "kanban", icon: HiOutlineViewBoards, content: "/assets/images/kanban.jpg" },
  { label: "teams", icon: HiOutlineUserGroup, content: "/assets/images/teams.jpg" },
  { label: "calander", icon: HiOutlineCalendar, content: "/assets/images/cal.jpg" },
  { label: "table", icon: HiOutlineTable, content: "/assets/images/tasks.jpg" },
  { label: "analytics", icon: HiChartBar, content: "/assets/images/analytics.jpg" },
];

export default function DeskaLandingLight() {
  const [active, setActive] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
  const signupUrl = `${API_BASE}/auth/users/`;
  const loginUrl = `${API_BASE}/auth/jwt/create/`;

  const openModal = (login = false) => {
    setShowModal(true);
    setIsLogin(login);
    setForm({ name: '', email: '', password: '' });
    setError('');
  };
  const closeModal = () => setShowModal(false);
  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!form.email || !form.password || (!isLogin && !form.name)) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      if (isLogin) {
        // --------- LOGIN -------
        const res = await fetch(loginUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        });
        const data = await res.json();
        if (res.ok && data.access) {
          localStorage.setItem('access', data.access);
          localStorage.setItem('refresh', data.refresh);
          closeModal();
          router.push('/dashboard');
        } else {
          setError(data.detail || "Login failed!");
        }
      } else {
        // --------- SIGN UP -------
        const res = await fetch(signupUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            // اگر مدل User فیلد name داشته باشه:
            // name: form.name,
          })
        });
        const data = await res.json();
        if (res.ok) {
          // auto-login after signup
          const loginRes = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
            })
          });
          const loginData = await loginRes.json();
          if (loginRes.ok && loginData.access) {
            localStorage.setItem('access', loginData.access);
            localStorage.setItem('refresh', loginData.refresh);
            closeModal();
            router.push('/dashboard');
          } else {
            setError("Registration succeeded, but login failed!");
          }
        } else {
          let msg = '';
          if (data.email) msg += `Email: ${data.email}
`
          if (data.password) msg += `Password: ${data.password}
`
          setError(msg || "Sign up failed!");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-center">
          <img src="/assets/images/logo.png" alt="Deska Logo" className='w-38' />
        </div>
        <nav className="flex items-center gap-10 font-medium text-gray-500 text-lg">
          <a href="#" className="hover:text-gray-900 transition">Services</a>
          <a href="#" className="hover:text-gray-900 transition">Pricing</a>
          <a href="#" className="hover:text-gray-900 transition">Blog</a>
          <button
            onClick={() => openModal(false)}
            className="px-6 py-2 rounded-lg bg-gray-400 text-white font-bold shadow hover:bg-cyan-400 hover:text-white transition"
          >Sign up</button>
        </nav>
      </header>

      <main className="flex flex-1 justify-center items-start py-4 mb-28">
        <div className="rounded-3xl max-w-7xl w-full grid md:grid-cols-2 px-8 py-10 relative border border-gray-100">
          <div className="flex flex-col justify-center gap-7">
            <h1 className="text-5xl font-extrabold text-gray-900 ">Here</h1>
            <h2 className="text-4xl font-semibold text-gray-800 leading-0">Everyone Knows What To Do</h2>
            <p className="text-gray-500">
              - Experience a smoother, more mindful approach to productivity.
            </p>
            <button
              className="w-fit rounded-xl px-7 py-2 bg-gray-900 text-white hover:bg-cyan-400 hover:text-white font-bold shadow transition"
              onClick={() => openModal(false)}
            >
              Join Now
            </button>
            <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl shadow-xl w-72 mt-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Micheal Smith" className='w-16 rounded-2xl'/>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-base text-gray-700">Micheal Smith</span>
                <span className="text-sm text-gray-400">manager</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src="/assets/images/stone.png"
              alt="Zen Stone Stack"
              className="w-64 md:w-[400px] mx-auto mb-4"
              style={{objectFit:"contain"}}
            />
          </div>
        </div>
      </main>

      <section className="flex flex-col items-center w-full mt-10 mb-12">
        <div className="flex gap-4 mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              className={`w-24 h-24 flex flex-col items-center px-4 py-3 rounded-xl shadow 
                bg-white transition border  cursor-pointer
                ${active === idx 
                  ? "border-gray-300 shadow-lg"
                  : "border-transparent opacity-70 hover:bg-gray-100"
                }`}
              onClick={() => setActive(idx)}
            >
              <tab.icon 
                className={`text-3xl mb-1 
                  ${active === idx ? "text-gray-700" : "text-gray-400"}`} 
              />
              <span className={`text-sm font-medium 
                ${active === idx ? "text-gray-800" : "text-gray-400"}`}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
        <div className="w-[400px] sm:w-[500px] min-h-[220px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <img src={tabs[active].content} alt={tabs[active].label} />   
        </div>
      </section>

      {/* ========== MODAL ========== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-all duration-300">
          <div className="relative w-[92vw] max-w-md rounded-3xl 
            p-8 sm:p-10 flex flex-col bg-white/90 dark:bg-zinc-900/80 
            shadow-xl shadow-zinc-300/50 dark:shadow-zinc-900/60 
            border border-zinc-100 dark:border-zinc-800
            backdrop-blur-xl animate-fadeInUp">

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center group transition"
              tabIndex="0"
              aria-label="Close Modal"
            >
              <span className="block w-5 h-5 text-gray-500 group-hover:text-red-500 text-2xl">
                &times;
              </span>
            </button>

            <div className="mx-auto -mt-6 mb-5 flex items-center justify-center w-16 h-16">
              <img src="/assets/images/logo.png" alt="Logo" className="w-16 h-16 rounded-full object-contain" />
            </div>
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{isLogin ? "Welcome Back" : "Create your account"}</h2>
            <div className="text-center mb-6 text-gray-500 text-base">
              {isLogin ? "Log in to access your dashboard" : "Sign up and start collaborating today"}
            </div>
            <button
              onClick={() => alert("Google Auth isn’t implemented yet.")}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-xl font-medium border border-gray-200 dark:border-zinc-700 bg-white/95 hover:bg-gray-50 dark:bg-zinc-800/70 transition text-gray-700 dark:text-zinc-200 shadow"
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.8 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.8l6.1-6.1C34.4 5.8 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11.4 0 19.5-8 19.5-19.5 0-1.3-.2-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 17.1 19.4 14 24 14c3.1 0 5.9 1.1 8.1 2.8l6.1-6.1C34.4 5.8 29.5 4 24 4 15.1 4 7.5 9.8 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c5.3 0 9.9-1.8 13.3-4.8l-6.3-5.2C29.5 35.2 26.9 36 24 36c-6.1 0-10.8-3.4-12.3-8.2l-7 5.1C7.5 38.2 15.1 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C35.6 33.3 30.4 36 24 36c-6.1 0-11.2-4.1-12.9-9.6l-7 5.1C7.5 38.2 15.1 44 24 44c5.3 0 9.9-1.8 13.3-4.8l-6.3-5.2C29.5 35.2 26.9 36 24 36c-6.1 0-10.8-3.4-12.3-8.2l-7 5.1C7.5 38.2 15.1 44 24 44z"/></g></svg>
              Continue with Google
            </button>

            <div className="flex items-center my-5">
              <div className="flex-1 h-[1.5px] bg-zinc-200 dark:bg-zinc-700 rounded" />
              <span className="mx-2 text-zinc-400">or</span>
              <div className="flex-1 h-[1.5px] bg-zinc-200 dark:bg-zinc-700 rounded" />
            </div>
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 text-red-600 mb-3 rounded-lg text-center text-sm">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-zinc-200 mb-1" htmlFor="name">Name</label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInput}
                      autoFocus
                      required
                      className="peer w-full rounded-lg bg-white/90 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 pr-10 focus:ring-2 focus:ring-zinc-400 outline-none transition-all text-gray-900 dark:text-white placeholder:text-zinc-400"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-zinc-200 mb-1" htmlFor="email">Email</label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="username"
                    value={form.email}
                    onChange={handleInput}
                    required
                    className="peer w-full rounded-lg bg-white/90 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 pr-10 focus:ring-2 focus:ring-zinc-400 outline-none transition-all text-gray-900 dark:text-white placeholder:text-zinc-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 dark:text-zinc-200 mb-1" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    value={form.password}
                    onChange={handleInput}
                    required
                    className="peer w-full rounded-lg bg-white/90 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 px-4 py-2.5 pr-10 focus:ring-2 focus:ring-zinc-400 outline-none transition-all text-gray-900 dark:text-white placeholder:text-zinc-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl px-6 py-2 mt-1 bg-gradient-to-br from-cyan-600 to-blue-600 text-white font-bold shadow-md hover:scale-[1.02] hover:shadow-xl active:scale-100 transition"
              >
                {loading ? (isLogin ? "Logging In..." : "Signing Up...") : (isLogin ? "Log In" : "Sign Up")}
              </button>
            </form>
            <div className="mt-6 text-center text-zinc-500">
              {isLogin
                ? <>
                    Don't have an account?{' '}
                    <button
                      onClick={() => { setIsLogin(false); setError('') }}
                      className="text-cyan-600 font-semibold hover:underline"
                    >Sign Up</button>
                  </>
                : <>
                    Already have an account?{' '}
                    <button
                      onClick={() => { setIsLogin(true); setError('') }}
                      className="text-cyan-600 font-semibold hover:underline"
                    >Log In</button>
                  </>
              }
            </div>
          </div>
          <style>{`
            .glass-effect {
              background: linear-gradient(120deg,rgba(255,255,255,0.85) 65%,rgba(200,225,255,0.22) 100%);
              backdrop-filter: blur(16px) saturate(170%);
              border: 1.5px solid rgba(255,255,255,0.55);
              box-shadow: 0 4px 24px 0 rgba(60,60,120,0.02);
            }
            @keyframes fadeInUp {
              to { opacity: 1; transform: none; }
            }
            .animate-fadeInUp {
              opacity: 0;
              transform: translateY(40px) scale(.98);
              animation: fadeInUp .38s cubic-bezier(.4,.7,.2,1.15) .03s 1 forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
