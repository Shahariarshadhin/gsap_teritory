"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const isEven = index % 2 === 0;

        // Create timeline for each item (image + text together)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            // markers: true, // Uncomment for debugging
          },
        });

        if (isEven) {
          // Left bottom → Center → Left top
          tl.fromTo(
            item,
            {
              x: "-50vw",
              y: "30vh",
              opacity: 0,
              scale: 0.7,
              rotation: -10,
            },
            {
              x: "0vw",
              y: "0vh",
              opacity: 1,
              scale: 1,
              rotation: 0,
              ease: "power1.out",
            }
          ).to(item, {
            x: "-50vw",
            y: "-30vh",
            opacity: 0,
            scale: 0.7,
            rotation: 10,
            ease: "power1.in",
          });
        } else {
          // Right bottom → Center → Right top
          tl.fromTo(
            item,
            {
              x: "50vw",
              y: "30vh",
              opacity: 0,
              scale: 0.7,
              rotation: 10,
            },
            {
              x: "0vw",
              y: "0vh",
              opacity: 1,
              scale: 1,
              rotation: 0,
              ease: "power1.out",
            }
          ).to(item, {
            x: "50vw",
            y: "-30vh",
            opacity: 0,
            scale: 0.7,
            rotation: -10,
            ease: "power1.in",
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const texts = [
    { 
      text: "Innovation", 
      gradient: "from-blue-400 to-cyan-400",
      bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
    },
    { 
      text: "Creativity", 
      gradient: "from-purple-400 to-pink-400",
      bgImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80"
    },
    { 
      text: "Excellence", 
      gradient: "from-green-400 to-emerald-400",
      bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80"
    },
    { 
      text: "Passion", 
      gradient: "from-orange-400 to-red-400",
      bgImage: "https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?w=1200&q=80"
    },
    { 
      text: "Quality", 
      gradient: "from-indigo-400 to-purple-400",
      bgImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80"
    },
    { 
      text: "Vision", 
      gradient: "from-pink-400 to-rose-400",
      bgImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80"
    },
  ];

  return (
    <div ref={containerRef} className="relative bg-black overflow-hidden">
      {/* Top spacer */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6">
            Our Core Values
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            Scroll down to see our principles come to life
          </p>
        </div>
      </div>

      {/* Animation section */}
      <section className="relative">
        {texts.map((item, index) => (
          <div
            key={index}
            className="h-[100vh] flex items-center justify-center relative overflow-hidden"
          >
            {/* Animated Item (Image + Text together) */}
            <div
              ref={(el) => (itemsRef.current[index] = el)}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image - Full Width */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
                style={{ backgroundImage: `url(${item.bgImage})` }}
              >
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-4">
                <h2
                  className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent drop-shadow-2xl leading-tight mb-4 md:mb-8`}
                >
                  {item.text}
                </h2>
                <div className="flex items-center justify-center gap-2">
                  <div
                    className={`h-0.5 md:h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r ${item.gradient} rounded-full`}
                  ></div>
                  <div
                    className={`h-0.5 md:h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r ${item.gradient} rounded-full opacity-50`}
                  ></div>
                  <div
                    className={`h-0.5 md:h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r ${item.gradient} rounded-full opacity-25`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom spacer */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black px-4">
        <div className="text-center max-w-4xl">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6">
            That&apos;s What Drives Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Each value represents our commitment to excellence and innovation in
            everything we do.
          </p>
        </div>
      </div>
    </div>
  );
}