'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Generate stable values outside component
const particles = [...Array(50)].map((_, i) => ({
  size: (i * 11 % 40) + 5,
  left: (i * 19 % 100),
  top: (i * 31 % 100),
  duration: (i * 17 % 20) + 10,
  delay: (i * 13 % 10),
  opacity: ((i * 7 % 5) + 1) / 10
}));

const projects = [
  {
    id: 1,
    title: "Brand Identity Redesign",
    category: "Branding",
    year: "2024",
    description: "Complete brand overhaul for a Fortune 500 company, including logo design, color palette, and brand guidelines.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    color: "#FF6B6B",
    gradient: "from-red-500 to-pink-500",
    stats: { clients: "50K+", revenue: "$2M", duration: "6 months" }
  },
  {
    id: 2,
    title: "FinTech Mobile Experience",
    category: "App Design",
    year: "2024",
    description: "Revolutionary mobile banking app with biometric security and AI-powered financial insights.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    color: "#4ECDC4",
    gradient: "from-cyan-500 to-blue-500",
    stats: { users: "100K+", rating: "4.9★", downloads: "500K" }
  },
  {
    id: 3,
    title: "E-Learning Platform",
    category: "Web Platform",
    year: "2023",
    description: "Interactive learning platform with live streaming, gamification, and progress tracking for 10,000+ students.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    color: "#FFE66D",
    gradient: "from-yellow-500 to-orange-500",
    stats: { students: "10K+", courses: "500+", satisfaction: "98%" }
  },
  {
    id: 4,
    title: "Smart Home IoT Dashboard",
    category: "IoT & UI/UX",
    year: "2023",
    description: "Centralized control system for smart home devices with voice control and automation features.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    color: "#A8E6CF",
    gradient: "from-green-500 to-emerald-500",
    stats: { devices: "50+", users: "25K", uptime: "99.9%" }
  },
  {
    id: 5,
    title: "Healthcare Portal",
    category: "Enterprise",
    year: "2023",
    description: "HIPAA-compliant patient management system with telemedicine capabilities and EHR integration.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    color: "#95A5F8",
    gradient: "from-purple-500 to-indigo-500",
    stats: { hospitals: "100+", patients: "1M+", appointments: "5M+" }
  }
];

export default function VerticalScrollWork() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const projectsRef = useRef([]);
  const cursorRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Magnetic cursor effect on cards
      projectsRef.current.forEach((project) => {
        if (!project) return;
        
        project.addEventListener('mouseenter', () => {
          gsap.to(cursorRef.current, {
            scale: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            duration: 0.3
          });
        });
        
        project.addEventListener('mouseleave', () => {
          gsap.to(cursorRef.current, {
            scale: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            duration: 0.3
          });
        });
      });

      // Explosive header animation
      const headerChars = headerRef.current.querySelector('h1');
      const text = headerChars.textContent;
      headerChars.innerHTML = text.split('').map((char, i) => 
        `<span style="display: inline-block; transform-origin: center;">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      gsap.from(headerChars.querySelectorAll('span'), {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
        opacity: 0,
        scale: 3,
        rotation: () => gsap.utils.random(-360, 360),
        y: () => gsap.utils.random(-200, 200),
        x: () => gsap.utils.random(-200, 200),
        stagger: 0.02,
      });

      // Subtitle wave animation
      gsap.from(headerRef.current.querySelector('p'), {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        rotationX: 90,
      });

      // Create main timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          scrub: 1.5,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.floor(progress * projects.length);
            setActiveIndex(Math.min(index, projects.length - 1));
          }
        }
      });

      // Animate each project with extreme dynamics
      projectsRef.current.forEach((project, index) => {
        if (!project) return;

        const card = project.querySelector('.project-card');
        const image = project.querySelector('.project-image');
        const imageOverlay = project.querySelector('.image-overlay');
        const content = project.querySelector('.project-content');
        const title = project.querySelector('.project-title');
        const category = project.querySelector('.category-badge');
        const description = project.querySelector('.description');
        const stats = project.querySelector('.project-stats');
        const buttons = project.querySelector('.project-buttons');

        // Initial state - cards start off-screen at different angles
        gsap.set(project, { 
          y: '150%',
          rotation: index % 2 === 0 ? 45 : -45,
          scale: 0.5,
          opacity: 0
        });

        // Entry animation - card flies in with rotation
        mainTimeline.to(project, {
          y: '0%',
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'back.out(1.7)',
        }, index * 1.2);

        // Active state - card is centered
        mainTimeline.to(project, {
          scale: 1.05,
          duration: 1,
        }, index * 1.2 + 0.5);

        // Exit animation - card flies out opposite direction
        mainTimeline.to(project, {
          y: '-150%',
          rotation: index % 2 === 0 ? -45 : 45,
          scale: 0.5,
          opacity: 0,
          duration: 1.5,
          ease: 'back.in(1.7)',
        }, index * 1.2 + 1.5);

        // Image zoom and rotation
        gsap.to(image, {
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
          scale: 1.5,
          rotation: 10,
        });

        // Image overlay color shift
        gsap.to(imageOverlay, {
          scrollTrigger: {
            trigger: project,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
          opacity: 0.3,
        });

        // Card 3D rotation effect - REMOVE ALL BLUR
        ScrollTrigger.create({
          trigger: project,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
          onUpdate: (self) => {
            const progress = self.progress;
            const rotateX = (progress - 0.5) * 8;
            const rotateY = (progress - 0.5) * -5;
            
            gsap.to(card, {
              rotateX: rotateX,
              rotateY: rotateY,
              duration: 0.1,
            });
          }
        });

        // Content animations - staggered entrance
        gsap.from(category, {
          scrollTrigger: {
            trigger: project,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
          scale: 0,
          rotation: 720,
          opacity: 0,
        });

        // Title split animation
        const titleText = title.textContent;
        title.innerHTML = titleText.split(' ').map(word => 
          `<span style="display: inline-block; margin-right: 0.3em;">${word}</span>`
        ).join('');

        gsap.from(title.querySelectorAll('span'), {
          scrollTrigger: {
            trigger: project,
            start: 'top 65%',
            end: 'top 35%',
            scrub: 1,
          },
          y: 100,
          opacity: 0,
          rotationX: -90,
          transformOrigin: 'top center',
          stagger: 0.1,
        });

        // Description fade and slide
        gsap.from(description, {
          scrollTrigger: {
            trigger: project,
            start: 'top 60%',
            end: 'top 35%',
            scrub: 1,
          },
          x: -150,
          opacity: 0,
        });

        // Stats explosion animation
        gsap.from(stats.querySelectorAll('.stat-item'), {
          scrollTrigger: {
            trigger: project,
            start: 'top 55%',
            end: 'top 30%',
            scrub: 1,
          },
          scale: 0,
          rotation: () => gsap.utils.random(-180, 180),
          y: () => gsap.utils.random(-100, 100),
          opacity: 0,
          stagger: 0.05,
        });

        // Buttons bounce in
        gsap.from(buttons.children, {
          scrollTrigger: {
            trigger: project,
            start: 'top 50%',
            end: 'top 30%',
            scrub: 1,
          },
          y: 100,
          opacity: 0,
          scale: 0.5,
          rotation: () => gsap.utils.random(-45, 45),
          stagger: 0.1,
        });
      });

      // Extreme parallax for particles
      particles.forEach((_, i) => {
        gsap.to(`.particle-${i}`, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
          y: () => gsap.utils.random(-500, 500),
          x: () => gsap.utils.random(-300, 300),
          rotation: () => gsap.utils.random(-360, 360),
          scale: () => gsap.utils.random(0.5, 2),
        });
      });

      // Background color morph
      const colors = projects.map(p => p.color);
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.floor(progress * (colors.length - 1));
          const localProgress = (progress * (colors.length - 1)) - index;
          
          if (index < colors.length - 1) {
            const color1 = colors[index];
            const color2 = colors[index + 1];
            containerRef.current.style.background = `linear-gradient(135deg, ${color1} ${(1 - localProgress) * 100}%, ${color2} ${localProgress * 100}%)`;
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden transition-colors duration-1000" style={{ background: projects[0].color }}>
      
      {/* Custom cursor */}
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 rounded-full bg-white/30 pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Dynamic particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`particle-${i} absolute rounded-full transition-all duration-300`}
            style={{
              width: p.size + 'px',
              height: p.size + 'px',
              left: p.left + '%',
              top: p.top + '%',
              background: `radial-gradient(circle, rgba(255,255,255,${p.opacity}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${p.size}px rgba(255,255,255,${p.opacity})`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: p.delay + 's',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div ref={headerRef} className="absolute top-0 left-0 right-0 z-20 text-center pt-12 sm:pt-20 px-4">
        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-white mb-4 perspective-1000">
          Featured Work
        </h1>
        <p className="text-lg sm:text-2xl text-white/90 font-light">
          {activeIndex + 1} / {projects.length} — Scroll to explore magic
        </p>
      </div>

      {/* Projects container */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
        <div className="relative w-full max-w-7xl h-full">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectsRef.current[index] = el}
              className="absolute inset-0 flex items-center justify-center"
              style={{ 
                zIndex: activeIndex === index ? 10 : 5 - Math.abs(activeIndex - index),
              }}
            >
              <div className="project-card w-full max-w-6xl" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
                <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30">
                  <div className="grid lg:grid-cols-5 gap-0">
                    
                    {/* Image Side */}
                    <div className="lg:col-span-3 relative h-80 lg:h-auto overflow-hidden group">
                      <div className="project-image w-full h-full relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div 
                          className="image-overlay absolute inset-0 mix-blend-multiply opacity-30"
                          style={{ 
                            background: `linear-gradient(135deg, ${project.color} 0%, transparent 100%)`
                          }}
                        />
                      </div>
                      
                      {/* Year badge */}
                      <div className="absolute top-6 right-6 bg-white px-6 py-3 rounded-full border-2 border-gray-900 shadow-lg">
                        <span className="text-gray-900 font-bold text-lg">{project.year}</span>
                      </div>

                      {/* Floating shapes */}
                      <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md animate-pulse" />
                      <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white/10 backdrop-blur-md animate-bounce" style={{ animationDuration: '3s' }} />
                    </div>

                    {/* Content Side - NO BACKDROP BLUR */}
                    <div className="lg:col-span-2 project-content p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-gray-900">
                      <div>
                        <div 
                          className="category-badge inline-block px-5 py-2 rounded-full border-2 mb-6 shadow-lg"
                          style={{
                            backgroundColor: project.color,
                            borderColor: project.color,
                          }}
                        >
                          <span className="text-white text-sm font-bold uppercase tracking-widest">
                            {project.category}
                          </span>
                        </div>
                        
                        <h2 className="project-title text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                          {project.title}
                        </h2>
                        
                        <p className="description text-gray-100 text-base sm:text-lg mb-8 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="project-stats grid grid-cols-3 gap-4 mb-8">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div 
                            key={key} 
                            className="stat-item text-center rounded-2xl p-4 border-2"
                            style={{
                              backgroundColor: `${project.color}20`,
                              borderColor: project.color,
                            }}
                          >
                            <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                              {value}
                            </div>
                            <div className="text-xs text-gray-200 uppercase tracking-wider font-semibold">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="project-buttons flex flex-col sm:flex-row gap-4">
                        <button 
                          className="flex-1 px-6 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                          View Case Study
                        </button>
                        <button 
                          className="px-6 py-4 border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <span>Live Demo</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-center">
        <div className="animate-bounce">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <span className="text-sm uppercase tracking-widest font-bold">Keep Scrolling</span>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.1);
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}