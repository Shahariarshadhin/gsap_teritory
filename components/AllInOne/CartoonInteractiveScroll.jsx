'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Generate stable random values outside component
const backgroundElements = [...Array(20)].map((_, i) => ({
  width: (i * 37 % 50) + 50,
  height: (i * 43 % 50) + 50,
  left: (i * 17 % 100),
  top: (i * 23 % 100),
  duration: (i * 13 % 10) + 10,
  delay: (i * 7 % 5)
}));

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce solution with seamless checkout and inventory management.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    color: "#FF6B6B"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    category: "Mobile Design",
    description: "Intuitive banking experience with advanced security features and real-time transactions.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    color: "#4ECDC4"
  },
  {
    id: 3,
    title: "AI Dashboard",
    category: "Data Visualization",
    description: "Powerful analytics dashboard with machine learning insights and predictive modeling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    color: "#FFE66D"
  },
  {
    id: 4,
    title: "Social Media Platform",
    category: "Full Stack",
    description: "Next-generation social network with real-time messaging and content sharing.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    color: "#A8E6CF"
  }
];

export default function PreviousWork() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: -45,
      });

      // Split text animation for title
      const titleText = titleRef.current.querySelector('h2');
      const chars = titleText.textContent.split('');
      titleText.innerHTML = chars.map(char => 
        `<span style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      gsap.from(titleText.querySelectorAll('span'), {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger: 0.02,
      });

      // Cards animations
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Card entrance animation
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
          opacity: 0,
          y: 150,
          rotationY: index % 2 === 0 ? -45 : 45,
          scale: 0.7,
        });

        // Image parallax effect
        const img = card.querySelector('.project-image');
        gsap.to(img, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -50,
          scale: 1.1,
        });

        // Content reveal animation
        const content = card.querySelector('.project-content');
        gsap.from(content, {
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 1,
          },
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
        });

        // Floating animation on scroll
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
          y: -30,
        });

        // Category badge animation
        const badge = card.querySelector('.category-badge');
        gsap.from(badge, {
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            end: 'top 55%',
            scrub: 1,
          },
          scale: 0,
          rotation: 360,
        });
      });

      // Background gradient animation
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        backgroundPosition: '50% 100%',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '200% 200%',
        backgroundPosition: '50% 0%',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {backgroundElements.map((el, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: el.width + 'px',
              height: el.height + 'px',
              left: el.left + '%',
              top: el.top + '%',
              animation: `float ${el.duration}s ease-in-out infinite`,
              animationDelay: el.delay + 's',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-20 perspective-1000">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Our Previous Work
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Transforming ideas into exceptional digital experiences
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => cardsRef.current[index] = el}
              className="relative group"
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center`}
              >
                {/* Image Container */}
                <div className="w-full lg:w-1/2 relative overflow-hidden rounded-3xl shadow-2xl">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-40"
                      style={{ backgroundColor: project.color }}
                    />
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      View Project
                    </button>
                  </div>
                </div>

                {/* Content Container */}
                <div className="w-full lg:w-1/2 project-content">
                  <div
                    className="category-badge inline-block px-6 py-2 rounded-full text-sm font-semibold mb-6"
                    style={{
                      backgroundColor: project.color,
                      color: '#fff',
                    }}
                  >
                    {project.category}
                  </div>
                  
                  <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-white/80 mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                      Learn More
                    </button>
                    <button className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                      Live Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}