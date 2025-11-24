"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxHero() {
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const fgRef = useRef(null);

  useEffect(() => {
    const scroller =
      document.querySelector("[data-scroll-container]") || window;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          scroller: scroller,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(fgRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          scroller: scroller,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-screen overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 w-full h-full -z-10">
        <Image
          src="https://wallpapercave.com/wp/wp12649564.jpg"
          alt="bg"
          fill
        //   style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div
        ref={fgRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6"
      >
        <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-lg">
          Creative Portfolio
        </h1>
        <p className="mt-6 text-xl max-w-2xl">
          Interaction, motion, product design — animated with GSAP + Locomotive.
        </p>
      </div>
    </section>
  );
}
