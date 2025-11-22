"use client"; // required for Next.js 13+

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxHero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const fgRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    const fg = fgRef.current;

    // Background moves slower
    gsap.to(bg, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Foreground moves faster
    gsap.to(fg, {
      y: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29saXR1ZGV8ZW58MHx8MHx8fDA%3D"
          alt="Background"
          width={1000}
          height={1000}
          priority
          className="w-full h-full"
        />
      </div>

      {/* Foreground Content */}
      <div
        ref={fgRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
      >
        <h2 className="text-5xl font-bold mb-4">Welcome to DX High Tech</h2>
        <p className="text-5xl max-w-xl">
          Leading electronics, EVs, and innovative solutions for Bangladesh.
        </p>
        <button className="mt-8 px-6 py-3 bg-red-600 rounded-lg text-white hover:bg-red-700 transition">
          Explore Products
        </button>
      </div>
    </section>
  );
}
