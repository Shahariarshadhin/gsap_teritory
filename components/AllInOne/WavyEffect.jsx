"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WavyImageGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll(".image-card");

      cards.forEach((card, i) => {
        const imgWrapper = card.querySelector(".img-wrapper");
        const img = card.querySelector("img");
        
        // Scroll reveal animation
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 100,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );

        let hoverTimeline = null;
        
        card.addEventListener("mouseenter", () => {
          if (hoverTimeline) hoverTimeline.kill();
          
          hoverTimeline = gsap.timeline();
          
          // Horror movie distortion - image warps and glitches
          hoverTimeline
            .to(img, {
              scaleX: 1.15,
              scaleY: 0.95,
              duration: 0.1,
              ease: "power4.inOut",
            })
            .to(img, {
              scaleX: 0.92,
              scaleY: 1.18,
              skewX: -8,
              duration: 0.15,
              ease: "power4.inOut",
            })
            .to(img, {
              scaleX: 1.08,
              scaleY: 0.98,
              skewX: 5,
              skewY: -3,
              duration: 0.12,
              ease: "power4.inOut",
            })
            .to(img, {
              scaleX: 0.96,
              scaleY: 1.12,
              skewX: -3,
              skewY: 4,
              duration: 0.1,
              ease: "power4.inOut",
            })
            .to(img, {
              scaleX: 1.05,
              scaleY: 1.05,
              skewX: 0,
              skewY: 0,
              duration: 0.2,
              ease: "elastic.out(1, 0.3)",
            });

          // Continuous wave distortion while hovering
          gsap.to(img, {
            scaleX: 1.08,
            scaleY: 1.08,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          // Subtle rotation wave
          gsap.to(img, {
            rotation: 2,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          // Optical illusion - pulsing scale
          gsap.to(imgWrapper, {
            scale: 1.02,
            duration: 1,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });

          // Color glitch effect
          gsap.to(img, {
            filter: "contrast(1.2) saturate(1.3) hue-rotate(5deg)",
            duration: 0.3,
            ease: "steps(5)",
            repeat: -1,
            yoyo: true,
          });
        });

        card.addEventListener("mouseleave", () => {
          if (hoverTimeline) hoverTimeline.kill();
          gsap.killTweensOf([img, imgWrapper]);
          
          gsap.to(img, {
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            rotation: 0,
            filter: "contrast(1) saturate(1) hue-rotate(0deg)",
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(imgWrapper, {
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        });

        // Mouse move creates ripple distortion
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const deltaX = (x - centerX) / centerX;
          const deltaY = (y - centerY) / centerY;

          // Create distortion based on mouse position
          gsap.to(img, {
            x: deltaX * 25,
            y: deltaY * 25,
            skewX: deltaX * 8,
            skewY: deltaY * 8,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      title: "Mountain Peak",
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Forest Trail",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Desert Sunset",
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Misty Lake",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Distortion Gallery
          </h1>
          <p className="text-gray-400 text-xl">
            Hover to experience the illusion
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {images.map((item, i) => (
            <div
              key={i}
              className="image-card relative h-96 rounded-2xl overflow-hidden cursor-pointer group bg-black"
            >
              <div className="img-wrapper absolute inset-0 overflow-hidden rounded-2xl">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Dark vignette overlay for horror effect */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glitch lines overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                <div className="absolute top-1/4 left-0 right-0 h-px bg-white animate-pulse" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white animate-pulse" style={{ animationDelay: "0.3s" }} />
                <div className="absolute top-3/4 left-0 right-0 h-px bg-white animate-pulse" style={{ animationDelay: "0.6s" }} />
              </div>
              
              {/* Title overlay */}
              <div className="absolute inset-0 flex items-end p-8 pointer-events-none">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Warning indicator */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-red-600/20 backdrop-blur-sm border border-red-500/50 rounded-lg px-3 py-1">
                  <span className="text-red-500 text-xs font-bold tracking-wider">DISTORTION</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 text-gray-500">
          <p className="text-sm">⚠️ Contains optical distortion effects</p>
        </div>
      </div>
    </div>
  );
}