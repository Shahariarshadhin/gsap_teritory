"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  const stats = [
    { number: "500K+", label: "Happy Customers" },
    { number: "50+", label: "Countries Served" },
    { number: "1000+", label: "Products Sold Daily" },
    { number: "98%", label: "Satisfaction Rate" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      statsRef.current.forEach((stat, index) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      data-scroll-section
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20 px-4 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-5xl font-bold text-center mb-4 text-white">Our Impact</h2>
        <p className="text-xl text-center text-white/80 mb-16">Numbers that speak for themselves</p>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              ref={el => statsRef.current[index] = el}
              className="text-center"
            >
              <div className="text-6xl font-bold text-white mb-4">{stat.number}</div>
              <div className="text-xl text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

