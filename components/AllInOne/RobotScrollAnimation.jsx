'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RobotScrollAnimation() {
  const containerRef = useRef(null);
  const robotRef = useRef(null);
  const headRef = useRef(null);
  const eyeLeftRef = useRef(null);
  const eyeRightRef = useRef(null);
  const armLeftRef = useRef(null);
  const armRightRef = useRef(null);
  const legLeftRef = useRef(null);
  const legRightRef = useRef(null);
  const antennaRef = useRef(null);
  const sparkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating idle animation
      gsap.to(robotRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Blinking eyes
      gsap.to([eyeLeftRef.current, eyeRightRef.current], {
        scaleY: 0.1,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 3,
        yoyo: true
      });

      // Antenna wobble
      gsap.to(antennaRef.current, {
        rotation: 15,
        transformOrigin: 'bottom center',
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Section 1: Robot waves hello
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-1',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      })
      .to(armRightRef.current, {
        rotation: -120,
        transformOrigin: 'top left',
        duration: 1
      })
      .to(armRightRef.current, {
        rotation: -90,
        duration: 0.3,
        repeat: 3,
        yoyo: true
      });

      // Section 2: Robot does a spin dance
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-2',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      })
      .to(robotRef.current, {
        rotation: 360,
        scale: 1.2,
        duration: 2
      })
      .to([armLeftRef.current, armRightRef.current], {
        rotation: 180,
        transformOrigin: 'top center',
        duration: 1
      }, '<');

      // Section 3: Robot jumps excitedly
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-3',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      })
      .to(robotRef.current, {
        y: -150,
        duration: 0.5
      })
      .to([legLeftRef.current, legRightRef.current], {
        scaleY: 0.7,
        duration: 0.3
      }, '<')
      .to(robotRef.current, {
        y: 0,
        duration: 0.5
      })
      .to([legLeftRef.current, legRightRef.current], {
        scaleY: 1,
        duration: 0.3
      }, '<');

      // Section 4: Robot grows bigger and sparks fly
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-4',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      })
      .to(robotRef.current, {
        scale: 2,
        duration: 1
      })
      .to(eyeLeftRef.current, {
        backgroundColor: '#ff0000',
        scale: 1.5,
        duration: 0.5
      }, '<')
      .to(eyeRightRef.current, {
        backgroundColor: '#ff0000',
        scale: 1.5,
        duration: 0.5
      }, '<')
      .to(sparkRef.current, {
        opacity: 1,
        scale: 2,
        rotation: 360,
        duration: 1
      }, '<');

      // Section 5: Robot does the splits
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-5',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      })
      .to(legLeftRef.current, {
        rotation: -45,
        x: -30,
        transformOrigin: 'top center',
        duration: 1
      })
      .to(legRightRef.current, {
        rotation: 45,
        x: 30,
        transformOrigin: 'top center',
        duration: 1
      }, '<')
      .to(robotRef.current, {
        y: 50,
        duration: 1
      }, '<');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900">
      {/* Fixed Robot */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div ref={robotRef} className="relative">
          {/* Spark Effect */}
          <div ref={sparkRef} className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0">
            <div className="text-6xl">⚡</div>
          </div>

          {/* Antenna */}
          <div ref={antennaRef} className="absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-12 bg-gray-400">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          </div>

          {/* Head */}
          <div ref={headRef} className="w-32 h-32 bg-gradient-to-b from-gray-300 to-gray-400 rounded-3xl relative border-4 border-gray-500 shadow-2xl">
            {/* Eyes */}
            <div className="flex gap-6 justify-center mt-8">
              <div ref={eyeLeftRef} className="w-8 h-8 bg-cyan-400 rounded-full border-2 border-gray-600 shadow-inner" />
              <div ref={eyeRightRef} className="w-8 h-8 bg-cyan-400 rounded-full border-2 border-gray-600 shadow-inner" />
            </div>
            {/* Mouth */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-2 bg-gray-600 rounded-full" />
          </div>

          {/* Body */}
          <div className="w-28 h-36 bg-gradient-to-b from-gray-400 to-gray-500 rounded-2xl mx-auto border-4 border-gray-600 shadow-2xl relative">
            {/* Control Panel */}
            <div className="flex gap-2 justify-center mt-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
            </div>
          </div>

          {/* Arms */}
          <div ref={armLeftRef} className="absolute top-32 -left-8 w-6 h-24 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full border-2 border-gray-600 shadow-lg origin-top" />
          <div ref={armRightRef} className="absolute top-32 -right-8 w-6 h-24 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full border-2 border-gray-600 shadow-lg origin-top" />

          {/* Legs */}
          <div ref={legLeftRef} className="absolute -bottom-24 left-6 w-8 h-28 bg-gradient-to-b from-gray-500 to-gray-600 rounded-lg border-2 border-gray-700 shadow-lg origin-top">
            <div className="absolute -bottom-2 -left-2 w-12 h-6 bg-gray-700 rounded-lg border-2 border-gray-800" />
          </div>
          <div ref={legRightRef} className="absolute -bottom-24 right-6 w-8 h-28 bg-gradient-to-b from-gray-500 to-gray-600 rounded-lg border-2 border-gray-700 shadow-lg origin-top">
            <div className="absolute -bottom-2 -left-2 w-12 h-6 bg-gray-700 rounded-lg border-2 border-gray-800" />
          </div>
        </div>
      </div>

      {/* Scroll Sections */}
      <div className="relative z-0">
        <section className="section-1 h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-6xl font-bold mb-4">👋 Hello!</h2>
            <p className="text-2xl">Scroll to see me perform!</p>
          </div>
        </section>

        <section className="section-2 h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-6xl font-bold mb-4">💃 Spin Dance!</h2>
            <p className="text-2xl">Watch me twirl around!</p>
          </div>
        </section>

        <section className="section-3 h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-6xl font-bold mb-4">🚀 Super Jump!</h2>
            <p className="text-2xl">I can jump so high!</p>
          </div>
        </section>

        <section className="section-4 h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-6xl font-bold mb-4">⚡ Power Mode!</h2>
            <p className="text-2xl">Feel my energy!</p>
          </div>
        </section>

        <section className="section-5 h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-6xl font-bold mb-4">🤸 The Splits!</h2>
            <p className="text-2xl">I&apos;m so flexible!</p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-6xl font-bold mb-4">🎉 Thanks for Watching!</h2>
            <p className="text-2xl">Scroll back up to see it again!</p>
          </div>
        </section>
      </div>
    </div>
  );
}