"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      data-scroll-section
      className="min-h-screen flex items-center justify-center bg-gray-900 px-4"
    >
      <div ref={contentRef} className="text-center max-w-4xl">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Ready to Experience the Future?</h2>
        <p className="text-xl text-gray-300 mb-10">Join millions of satisfied customers worldwide</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
            Shop Now
          </button>
          <button className="px-10 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}