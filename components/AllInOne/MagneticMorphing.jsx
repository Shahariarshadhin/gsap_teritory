"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Service 1: Web Development
      const service1 = container.querySelector("#service1");
      const particles1 = service1.querySelectorAll(".particle");
      const image1 = service1.querySelector(".service-image");
      const content1 = service1.querySelector(".service-content");

      gsap.fromTo(
        image1,
        { scale: 0, rotation: 45, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: service1,
            start: "top 80%",
            end: "top 40%",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        particles1,
        {
          x: (i) => gsap.utils.random(-800, 800),
          y: (i) => gsap.utils.random(-600, 600),
          scale: 0,
          opacity: 0,
        },
        {
          x: (i) => Math.cos((i / particles1.length) * Math.PI * 2) * 320,
          y: (i) => Math.sin((i / particles1.length) * Math.PI * 2) * 320,
          scale: 1,
          opacity: 0.6,
          ease: "elastic.out(1, 0.4)",
          stagger: 0.02,
          scrollTrigger: {
            trigger: service1,
            start: "top 70%",
            end: "top 30%",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        content1,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: service1,
            start: "top 50%",
            end: "center center",
            scrub: 2,
          },
        }
      );

      ScrollTrigger.create({
        trigger: service1,
        start: "center center",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
      });

      // Service 2: UI/UX Design
      const service2 = container.querySelector("#service2");
      const layers = service2.querySelectorAll(".design-layer");
      const content2 = service2.querySelector(".service-content");

      gsap.fromTo(
        layers,
        {
          x: (i) => (i % 2 === 0 ? -600 : 600),
          rotation: (i) => (i % 2 === 0 ? -45 : 45),
          opacity: 0,
        },
        {
          x: 0,
          rotation: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: service2,
            start: "top 70%",
            end: "top 20%",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        content2,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: service2,
            start: "top 50%",
            end: "center center",
            scrub: 2,
          },
        }
      );

      ScrollTrigger.create({
        trigger: service2,
        start: "center center",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
      });

      // Service 3: Mobile Development
      const service3 = container.querySelector("#service3");
      const phones = service3.querySelectorAll(".phone");
      const content3 = service3.querySelector(".service-content");

      gsap.fromTo(
        phones,
        {
          y: (i) => 200 + i * 100,
          rotation: (i) => (i % 2 === 0 ? -180 : 180),
          opacity: 0,
        },
        {
          y: 0,
          rotation: 0,
          opacity: 1,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: service3,
            start: "top 70%",
            end: "top 20%",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        content3,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: service3,
            start: "top 50%",
            end: "center center",
            scrub: 2,
          },
        }
      );

      ScrollTrigger.create({
        trigger: service3,
        start: "center center",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
      });

      // Service 4: Digital Marketing
      const service4 = container.querySelector("#service4");
      const circles = service4.querySelectorAll(".growth-circle");
      const chart = service4.querySelector(".chart-container");
      const content4 = service4.querySelector(".service-content");

      gsap.fromTo(
        circles,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.3,
          ease: "elastic.out(1, 0.5)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: service4,
            start: "top 70%",
            end: "top 30%",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        chart,
        { scale: 0, rotation: -90 },
        {
          scale: 1,
          rotation: 0,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: service4,
            start: "top 50%",
            end: "center center",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        content4,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: service4,
            start: "top 40%",
            end: "center center",
            scrub: 2,
          },
        }
      );

      ScrollTrigger.create({
        trigger: service4,
        start: "center center",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
      });

      // Service 5: Cloud Solutions
      const service5 = container.querySelector("#service5");
      const cloudLayers = service5.querySelectorAll(".cloud-layer");
      const content5 = service5.querySelector(".service-content");

      gsap.fromTo(
        cloudLayers,
        {
          y: (i) => -200 - i * 50,
          scale: 0.5,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: service5,
            start: "top 70%",
            end: "top 20%",
            scrub: 2,
          },
        }
      );

      gsap.fromTo(
        content5,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: service5,
            start: "top 50%",
            end: "center center",
            scrub: 2,
          },
        }
      );

      ScrollTrigger.create({
        trigger: service5,
        start: "center center",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: "service1",
      title: "Web Development",
      tagline: "Building Digital Experiences",
      description:
        "We craft high-performance websites and web applications using cutting-edge technologies. From responsive design to complex backend systems, we deliver solutions that scale with your business.",
      features: [
        "React & Next.js",
        "Node.js Backend",
        "API Integration",
        "Performance Optimization",
      ],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      gradient: "from-purple-900 via-indigo-900 to-blue-900",
      particleCount: 20,
    },
    {
      id: "service2",
      title: "UI/UX Design",
      tagline: "Designing User-Centric Interfaces",
      description:
        "Our design team creates intuitive and visually stunning interfaces that engage users. We focus on user research, wireframing, prototyping, and creating design systems that maintain consistency across your platform.",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "Design Systems",
        "Accessibility",
      ],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      gradient: "from-blue-900 via-purple-900 to-pink-900",
      layers: 4,
    },
    {
      id: "service3",
      title: "Mobile Development",
      tagline: "Apps That Move Your Business",
      description:
        "Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android. We build apps that are fast, secure, and designed to delight your users.",
      features: [
        "iOS & Android",
        "React Native",
        "Flutter",
        "App Store Optimization",
      ],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      gradient: "from-pink-900 via-orange-900 to-yellow-900",
      phones: 3,
    },
    {
      id: "service4",
      title: "Digital Marketing",
      tagline: "Grow Your Digital Presence",
      description:
        "Data-driven marketing strategies that drive results. From SEO and content marketing to social media campaigns and PPC, we help you reach your target audience and convert them into loyal customers.",
      features: [
        "SEO & SEM",
        "Social Media Marketing",
        "Content Strategy",
        "Analytics & Reporting",
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      gradient: "from-yellow-900 via-green-900 to-teal-900",
      circles: 5,
    },
    {
      id: "service5",
      title: "Cloud Solutions",
      tagline: "Scalable Infrastructure",
      description:
        "Enterprise-grade cloud infrastructure and DevOps solutions. We help you migrate, optimize, and manage your cloud infrastructure on AWS, Azure, or Google Cloud with automated CI/CD pipelines.",
      features: [
        "Cloud Migration",
        "DevOps & CI/CD",
        "Infrastructure as Code",
        "24/7 Monitoring",
      ],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      gradient: "from-teal-900 via-cyan-900 to-blue-900",
      cloudLayers: 4,
    },
  ];

  return (
    <div ref={containerRef} className="bg-black">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div className="text-center relative z-10 px-4">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6">
            Our Services
          </h1>
          <p className="text-gray-300 text-2xl mb-8 max-w-2xl mx-auto">
            Transforming ideas into exceptional digital experiences
          </p>
          <div className="flex items-center justify-center gap-3 text-gray-400 animate-bounce">
            <span className="text-lg">Scroll to explore</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Service 1: Web Development */}
      <section
        id="service1"
        className={`h-screen flex items-center justify-between px-20 relative overflow-hidden bg-gradient-to-br ${services[0].gradient}`}
      >
        <div className="service-content max-w-xl z-10">
          <div className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full mb-4">
            <span className="text-purple-300 text-sm font-semibold tracking-wider">
              01 / SERVICE
            </span>
          </div>
          <h2 className="text-7xl font-black text-white mb-4">
            {services[0].title}
          </h2>
          <p className="text-purple-300 text-2xl font-semibold mb-6">
            {services[0].tagline}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {services[0].description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {services[0].features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {[...Array(services[0].particleCount)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-3 h-3 bg-purple-400 rounded-full"
              style={{ boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)" }}
            />
          ))}
          <div className="service-image w-[500px] h-[500px] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.5)]">
            <img
              src={services[0].image}
              alt={services[0].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Service 2: UI/UX Design */}
      <section
        id="service2"
        className={`h-screen flex items-center justify-between px-20 relative overflow-hidden bg-gradient-to-br ${services[1].gradient}`}
      >
        <div className="relative flex gap-6">
          {[...Array(services[1].layers)].map((_, i) => (
            <div
              key={i}
              className="design-layer w-64 h-80 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                transform: `translateY(${i * 30}px)`,
                boxShadow: `0 0 ${60 - i * 10}px rgba(236, 72, 153, ${
                  0.6 - i * 0.1
                })`,
              }}
            >
              <img
                src={services[1].image}
                alt="Design"
                className="w-full h-full object-cover"
                style={{ filter: `hue-rotate(${i * 20}deg)` }}
              />
            </div>
          ))}
        </div>

        <div className="service-content max-w-xl z-10">
          <div className="inline-block px-4 py-2 bg-pink-500/20 backdrop-blur-sm rounded-full mb-4">
            <span className="text-pink-300 text-sm font-semibold tracking-wider">
              02 / SERVICE
            </span>
          </div>
          <h2 className="text-7xl font-black text-white mb-4">
            {services[1].title}
          </h2>
          <p className="text-pink-300 text-2xl font-semibold mb-6">
            {services[1].tagline}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {services[1].description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {services[1].features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
              >
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 3: Mobile Development */}
      <section
        id="service3"
        className={`h-screen flex items-center justify-between px-20 relative overflow-hidden bg-gradient-to-br ${services[2].gradient}`}
      >
        <div className="service-content max-w-xl z-10">
          <div className="inline-block px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full mb-4">
            <span className="text-orange-300 text-sm font-semibold tracking-wider">
              03 / SERVICE
            </span>
          </div>
          <h2 className="text-7xl font-black text-white mb-4">
            {services[2].title}
          </h2>
          <p className="text-orange-300 text-2xl font-semibold mb-6">
            {services[2].tagline}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {services[2].description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {services[2].features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
              >
                <div className="w-2 h-2 bg-orange-400 rounded-full" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex gap-8">
          {[...Array(services[2].phones)].map((_, i) => (
            <div
              key={i}
              className="phone w-56 h-[450px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-gray-800"
              style={{
                transform: `rotate(${(i - 1) * 8}deg) translateY(${
                  Math.abs(i - 1) * 20
                }px)`,
                boxShadow: `0 0 60px rgba(251, 146, 60, ${0.7 - i * 0.2})`,
              }}
            >
              <img
                src={services[2].image}
                alt="Mobile"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Service 4: Digital Marketing */}
      <section
        id="service4"
        className={`h-screen flex items-center justify-between px-20 relative overflow-hidden bg-gradient-to-br ${services[3].gradient}`}
      >
        <div className="relative">
          {[...Array(services[3].circles)].map((_, i) => (
            <div
              key={i}
              className="growth-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-green-400"
              style={{
                width: `${150 + i * 100}px`,
                height: `${150 + i * 100}px`,
              }}
            />
          ))}
          <div className="chart-container w-[450px] h-[450px] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.5)]">
            <img
              src={services[3].image}
              alt="Marketing"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent" />
          </div>
        </div>

        <div className="service-content max-w-xl z-10">
          <div className="inline-block px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full mb-4">
            <span className="text-green-300 text-sm font-semibold tracking-wider">
              04 / SERVICE
            </span>
          </div>
          <h2 className="text-7xl font-black text-white mb-4">
            {services[3].title}
          </h2>
          <p className="text-green-300 text-2xl font-semibold mb-6">
            {services[3].tagline}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {services[3].description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {services[3].features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 5: Cloud Solutions */}
      <section
        id="service5"
        className={`h-screen flex items-center justify-between px-20 relative overflow-hidden bg-gradient-to-br ${services[4].gradient}`}
      >
        <div className="service-content max-w-xl z-10">
          <div className="inline-block px-4 py-2 bg-cyan-500/20 backdrop-blur-sm rounded-full mb-4">
            <span className="text-cyan-300 text-sm font-semibold tracking-wider">
              05 / SERVICE
            </span>
          </div>
          <h2 className="text-7xl font-black text-white mb-4">
            {services[4].title}
          </h2>
          <p className="text-cyan-300 text-2xl font-semibold mb-6">
            {services[4].tagline}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {services[4].description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {services[4].features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {[...Array(services[4].cloudLayers)].map((_, i) => (
            <div
              key={i}
              className="cloud-layer absolute w-[400px] h-[120px] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md"
              style={{
                top: `${i * 80}px`,
                left: `${(i % 2) * 50}px`,
                boxShadow: `0 0 40px rgba(6, 182, 212, ${0.4 - i * 0.08})`,
              }}
            />
          ))}
          <div className="relative w-[450px] h-[450px] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.5)] mt-32">
            <img
              src={services[4].image}
              alt="Cloud"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-t from-black via-purple-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
        <div className="text-center relative z-10 px-4">
          <h2 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 text-2xl mb-12 max-w-2xl mx-auto">
            Let&apos;s transform your vision into reality with our expertise
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-full hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 transform hover:scale-105">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}
