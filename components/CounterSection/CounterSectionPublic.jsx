"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CounterSection() {
  const countersRef = useRef([]); // Do NOT reset in render

  const addToRefs = (el) => {
    if (el && !countersRef.current.includes(el)) {
      countersRef.current.push(el); // Add only if not already added
    }
  };

  useEffect(() => {
    countersRef.current.forEach((counter) => {
      const target = +counter.dataset.target;

      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power1.out",
          snap: { innerText: 1 },
          modifiers: {
            innerText: (value) => Math.floor(value).toLocaleString(),
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
          },
        }
      );

      gsap.from(counter, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
        },
      });
      
      
    });
  }, []);

  const stats = [
    { label: "EV Bikes Sold", value: 1240 },
    { label: "Products Available", value: 320 },
    { label: "Dealers Nationwide", value: 85 },
    { label: "Happy Customers", value: 5600 },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
            <span
              ref={addToRefs}  // Use the callback ref
              data-target={stat.value}
              className="text-4xl font-bold block text-red-600"
            >
              0
            </span>
            <span className="mt-2 text-gray-700">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
