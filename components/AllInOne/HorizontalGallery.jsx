"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const cards = track.querySelectorAll(".gallery-card");

      // Calculate total scroll distance
      const scrollDistance = track.scrollWidth - section.offsetWidth;

      // Main horizontal scroll animation
      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance + window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Parallax effect on images
      cards.forEach((card, i) => {
        const img = card.querySelector("img");

        gsap.fromTo(
          img,
          { scale: 1.2, x: -50 },
          {
            scale: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${scrollDistance + window.innerHeight}`,
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress;
                const cardProgress = Math.max(
                  0,
                  Math.min(1, (progress - i * 0.2) * 2)
                );
                gsap.to(img, {
                  scale: 1.2 - cardProgress * 0.2,
                  x: -50 + cardProgress * 50,
                  duration: 0,
                });
              },
            },
          }
        );

        // Fade and scale animation for cards
        gsap.fromTo(
          card,
          { opacity: 0.7, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${scrollDistance + window.innerHeight}`,
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress;
                const cardStart = i * 0.15;
                const cardEnd = cardStart + 0.3;

                if (progress >= cardStart && progress <= cardEnd) {
                  const localProgress = (progress - cardStart) / 0.3;
                  gsap.to(card, {
                    opacity: 0.7 + localProgress * 0.3,
                    scale: 0.9 + localProgress * 0.1,
                    duration: 0,
                  });
                } else if (progress > cardEnd) {
                  gsap.to(card, { opacity: 1, scale: 1, duration: 0 });
                }
              },
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      title: "Mountain Vista",
      desc: "Majestic peaks at dawn",
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Forest Path",
      desc: "Lost in the wilderness",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Desert Dreams",
      desc: "Golden hour magic",
    },
    {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Misty Valley",
      desc: "Nature's tranquility",
    },
    {
      src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      title: "Alpine Heights",
      desc: "Where earth meets sky",
    },
  ];

  return (
    <div className="bg-black">
      {/* <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center px-8">
          <h1 className="text-6xl font-bold text-white mb-4">Scroll Down</h1>
          <p className="text-gray-400 text-xl">Experience the journey</p>
        </div>
      </div> */}

      <section
        ref={sectionRef}
        className="h-screen overflow-hidden relative bg-black"
      >
        <div
          ref={trackRef}
          className="horizontal-track flex gap-8 items-center absolute left-0 top-1/2 -translate-y-1/2 px-[10vw]"
          style={{ willChange: "transform" }}
        >
          {images.map((item, i) => (
            <div
              key={i}
              className="gallery-card flex-shrink-0 w-[70vw] md:w-[50vw] h-[70vh] rounded-2xl overflow-hidden relative group"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-3xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg">{item.desc}</p>
                </div>
              </div>
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <div className="h-screen flex items-center justify-center bg-gradient-to-t from-gray-900 to-black">
        <div className="text-center px-8">
          <h2 className="text-5xl font-bold text-white mb-4">The End</h2>
          <p className="text-gray-400 text-xl">Thanks for scrolling</p>
        </div>
      </div> */}
    </div>
  );
}
