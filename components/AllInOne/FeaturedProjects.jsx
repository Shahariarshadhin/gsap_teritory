"use client"

import React, { useEffect, useRef } from 'react';
// import { Play } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const projectRefs = useRef([]);
  
  useEffect(() => {
    // Animate each project
    projectRefs.current.forEach((project, index) => {
      if (!project) return;
      
      const media = project.querySelector('.project-media');
      const content = project.querySelector('.project-content');
      const title = project.querySelector('.project-title');
      const desc = project.querySelector('.project-desc');
      const tags = project.querySelectorAll('.project-tag');
      const button = project.querySelector('.project-button');
      
      // Create timeline for this project
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        }
      });
      
      // Media animation - scale and fade in
      tl.fromTo(media, 
        { 
          scale: 0.8, 
          opacity: 0,
          rotateY: index % 2 === 0 ? -15 : 15
        },
        { 
          scale: 1, 
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out'
        }
      );
      
      // Content stagger animation
      tl.fromTo([title, desc], 
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out'
        },
        '-=0.8'
      );
      
      // Tags animation
      tl.fromTo(tags,
        { 
          scale: 0, 
          opacity: 0 
        },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        },
        '-=0.4'
      );
      
      // Button animation
      tl.fromTo(button,
        { 
          y: 20, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          ease: 'power2.out'
        },
        '-=0.3'
      );
      
      // Parallax effect on scroll
      gsap.to(media, {
        scrollTrigger: {
          trigger: project,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
        ease: 'none'
      });
      
      // Hover animations
      media.addEventListener('mouseenter', () => {
        gsap.to(media, { 
          scale: 1.05, 
          duration: 0.4, 
          ease: 'power2.out' 
        });
      });
      
      media.addEventListener('mouseleave', () => {
        gsap.to(media, { 
          scale: 1, 
          duration: 0.4, 
          ease: 'power2.out' 
        });
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with Next.js, featuring real-time inventory management, secure payments, and an intuitive shopping experience.',
      mediaType: 'image',
      mediaSrc: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
      tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      title: 'AI Dashboard',
      description: 'Comprehensive analytics dashboard with AI-powered insights, real-time data visualization, and predictive analytics for business intelligence.',
      mediaType: 'video',
      mediaSrc: 'https://cdn.pixabay.com/video/2023/12/06/192229-893969765_tiny.mp4',
      tags: ['React', 'D3.js', 'TensorFlow', 'WebSocket'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Social Media App',
      description: 'A feature-rich social networking platform with real-time messaging, story features, and advanced content discovery algorithms.',
      mediaType: 'image',
      mediaSrc: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      tags: ['Next.js', 'Firebase', 'Socket.io', 'Redis'],
      color: 'from-orange-500 to-red-500'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Showcasing our best work with cutting-edge technologies and stunning designs
          </p>
        </div>
        
        {/* Projects */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 items-center`}
            >
              {/* Media */}
              <div className="lg:w-1/2 w-full">
                <div className="project-media relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 z-10`}></div>
                  
                  {project.mediaType === 'image' && (
                    <img
                      src={project.mediaSrc}
                      alt={project.title}
                      className="w-full h-[500px] object-cover"
                    />
                  )}
                  
                  {project.mediaType === 'video' && (
                    <video
                      src={project.mediaSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[500px] object-cover"
                    />
                  )}
                  
                  {/* Play overlay for videos */}
                  {project.mediaType === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {/* <Play className="w-10 h-10 text-white ml-1" /> */}Play
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:w-1/2 w-full project-content">
                <h2 className="project-title text-5xl font-bold text-white mb-6">
                  {project.title}
                </h2>
                
                <p className="project-desc text-lg text-slate-300 mb-8 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`project-tag px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${project.color} text-white`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button className={`project-button px-8 py-4 rounded-full text-white font-semibold bg-gradient-to-r ${project.color} shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}>
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;