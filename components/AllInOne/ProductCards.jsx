"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ProductCards() {
  const rootRef = useRef(null);

  useEffect(() => {
    const scroller = document.querySelector("[data-scroll-container]") || window;
    const cards = rootRef.current.querySelectorAll(".product-card");

    gsap.from(cards, {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: rootRef.current,
        scroller: scroller,
        start: "top 80%",
      },
    });

    // simple hover tilt (mouse)
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotationY: x * 8, rotationX: -y * 8, transformPerspective: 800, transformOrigin: "center", duration: 0.4 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6 });
      });
    });
  }, []);

  const products = [
    { title: "Product A", img: "/images/product-1.jpg", desc: "Feature packed." },
    { title: "Product B", img: "/images/product-1.jpg", desc: "High performance." },
    { title: "Product C", img: "/images/product-1.jpg", desc: "Eco friendly." },
  ];

  return (
    <section ref={rootRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p, i) => (
          <div key={i} className="product-card bg-gray-50 rounded-lg overflow-hidden shadow-lg p-4 cursor-pointer">
            <div className="h-48 w-full relative">
              <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover" }} />
            </div>
            <h3 className="mt-4 font-bold text-xl">{p.title}</h3>
            <p className="mt-2 text-gray-600">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
