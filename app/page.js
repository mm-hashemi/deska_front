// 'use client'
// import Articles from '@/components/articles';
// import CardProfile from '@/components/comments';
// import DashboardNav from '@/components/dashboard';
// import AwardsAndFeatures from '@/components/features';
// import ThemeToggle from '@/components/themeToggle';
// import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen flex flex-col font-sans dark:bg-[#181a24]">
//       {/* Header */}
//       <header className="container mx-auto  px-6 py-4 flex items-center justify-between">
//         {/* Logo+Brand */}
//         <div className="flex items-center gap-2">
//           {/* Replace with your actual SVG logo */}
         
//          <img src="/assets/images/logo.png" alt="" className='w-32' />
//         </div>
//         {/* Nav */}
//         <nav className="flex items-center gap-8 font-medium text-gray-600">
//           <a href="#" className="hover:text-[#32B9FF] transition">Services</a>
//           <a href="#" className="hover:text-[#32B9FF] transition">Pricing</a>
//           <a href="#" className="hover:text-[#32B9FF] transition">Blog</a>
//             <ThemeToggle />
//           <button className="ml-6 bg-[#32B9FF] hover:bg-[#2292cc] transition text-white font-semibold px-5 py-2 rounded-lg shadow-sm">
//             Sign up
//           </button>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="w-full bg-[#21A1F3] min-h-[550px] flex flex-col justify-start items-center relative">
       
//         {/* Headline */}
//         <div className="max-w-2xl w-full flex flex-col items-center pt-12 z-10">
//           <p className="font-bold text-white text-2xl mb-1">
//             With <span className="text-white text-7xl font-extrabold tracking-wide">Deska</span>
//           </p>
//           <h1 className="text-white text-[1.5rem] md:text-5xl font-medium mb-4">Everyone knows what to do</h1>
//         </div>
//         {/* Chair Image */}
       
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src="/assets/images/chair.png" // Place your chair image under `public/chair.png` or change this path
//             alt="Chair"
//             className="w-44 md:w-[30rem] absolute z-40 top-28"
//           />
       
//         {/* Semi-circle bg */}
//         <div className="absolute left-1/2 -translate-x-1/2 top-[380px] w-[310px] h-[310px] bg-zinc-100 dark:bg-[#181a24] rounded-t-full "></div>
//         <div className="absolute left-1/2 -translate-x-1/2 top-[340px] w-[360px] h-[360px] bg-transparent border-t-2 border-white rounded-full"></div>
//           <div className="absolute left-1/2 -translate-x-1/2 top-[300px] w-[450px] h-[450px] bg-transparent border-t-2 border-white rounded-full"></div>
//             <div className="absolute left-1/2 -translate-x-1/2 top-[260px] w-[550px] h-[550px] bg-transparent border-t-2 border-white rounded-full"></div>

//       </section>

//       {/* (Empty steps/feature section here, as in provided design) */}
//       <div className="  w-full mt-44">
//         <CardProfile/>
//         <Articles/>
//         <AwardsAndFeatures/>
//       </div>

//       {/* Footer */}
//       <footer className="w-full dark:bg-[#181a24] min-h-[160px] flex flex-col md:flex-row items-center md:items-start px-7 py-8 gap-10 text-white">
//         {/* Left */}
//         <div className="flex-1 flex flex-col items-start gap-5 min-w-[180px]">
//           <div className="flex gap-2 items-center">
//             <span className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">S</span>
//             <span className="font-extrabold text-xl">DESKA</span>
//           </div>
//           {/* Socials */}
//           <div className="flex gap-3 mt-2">
//             <a href="#" className="bg-white text-gray-900 p-2 rounded-md flex items-center justify-center hover:scale-105 transition">
//               <FaGithub size={22} />
//             </a>
//             <a href="#" className="bg-white text-gray-900 p-2 rounded-md flex items-center justify-center hover:scale-105 transition">
//               <FaInstagram size={22} />
//             </a>
//             <a href="#" className="bg-white text-gray-900 p-2 rounded-md flex items-center justify-center hover:scale-105 transition">
//               <FaLinkedin size={22} />
//             </a>
//           </div>
//         </div>
//         {/* Footer Links */}
//         <div className="flex-1 flex gap-12 justify-end">
//           {[1, 2].map(i => (
//             <div className="min-w-[120px]" key={i}>
//               <h5 className="font-bold mb-2 text-white">Lorem</h5>
//               <ul className="space-y-1 text-gray-200 text-sm">
//                 <li>Lorem ipsum</li>
//                 <li>Lorem ipsum</li>
//                 <li>Lorem ipsum</li>
//               </ul>
//             </div>
//           ))}
//         </div>
//       </footer>
//     </div>
//   );
// }
import ArticleCarousel from '@/components/articles'
import ProjectUseCases from '@/components/cases'
import TestimonialStack from '@/components/comments'
import DeskaFooter from '@/components/footer'
import IntegrationsSection from '@/components/integration'
import HeroSection from '@/components/Landing'
import React from 'react'

export default function page() {
  return (
    <div>
      <HeroSection/>
      <ProjectUseCases/>
      <IntegrationsSection/>
      <TestimonialStack/>
      <ArticleCarousel/>
      <DeskaFooter/>
    </div>
  )
}
