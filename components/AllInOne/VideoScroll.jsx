"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoScroll() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate each item one by one with stagger
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      const number = item.querySelector('.number');
      const title = item.querySelector('.item-title');
      const description = item.querySelector('.description');

      gsap.fromTo(
        [number, title, description],
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const services = [
    {
      number: "01",
      title: "Brand Strategy",
      description: "We craft compelling brand narratives that resonate with your audience and establish a strong market presence."
    },
    {
      number: "02",
      title: "Digital Design",
      description: "Creating stunning digital experiences through innovative UI/UX design that captivates and converts."
    },
    {
      number: "03",
      title: "Web Development",
      description: "Building robust, scalable web applications with cutting-edge technologies and best practices."
    },
    {
      number: "04",
      title: "Content Creation",
      description: "Producing engaging content that tells your story and connects with your audience on a deeper level."
    },
    {
      number: "05",
      title: "Marketing Strategy",
      description: "Developing data-driven marketing campaigns that deliver measurable results and ROI."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 px-6">
      <section ref={sectionRef} className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="mb-20 text-center">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-4">
            What We Do
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Transforming ideas into exceptional digital experiences
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="group relative bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-8 md:p-12 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02]"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Number */}
                <div className="number flex-shrink-0">
                  <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {service.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="item-title text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="description text-lg text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow icon */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-8 h-8 text-purple-400 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-32"></div>
    </div>
  );
}