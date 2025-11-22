"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProductShowcase() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const productsRef = useRef([]);

  const products = [
    { name: "SmartPhone X1", category: "Electronics", price: "$999", image: "📱" },
    { name: "EV Sedan Pro", category: "Electric Vehicle", price: "$45,000", image: "🚗" },
    { name: "Wireless Earbuds", category: "Audio", price: "$199", image: "🎧" },
    { name: "Smart Watch Ultra", category: "Wearables", price: "$499", image: "⌚" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Products stagger animation
      gsap.from(productsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      data-scroll-section
      className="min-h-screen bg-red-50 py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef}>
          <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">Featured Products</h2>
          <p className="text-xl text-center text-gray-600 mb-16">Discover our latest innovations</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={index}
              ref={el => productsRef.current[index] = el}
              className="bg-green-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-7xl">
                {product.image}
              </div>
              <div className="p-6">
                <span className="text-sm text-blue-600 font-semibold">{product.category}</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-3">{product.name}</h3>
                <p className="text-3xl font-bold text-gray-900">{product.price}</p>
                <button className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}