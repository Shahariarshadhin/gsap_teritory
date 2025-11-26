"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Heart, Star, ArrowRight, Zap, Shield, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductCards = () => {
  const rootRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;

    // Initial card animation
    gsap.from(cards, {
      y: 100,
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: rootRef.current,
        start: "top 75%",
        end: "top 25%",
        toggleActions: "play none none reverse",
      },
    });

    // Floating animation for cards
    cards.forEach((card, index) => {
      gsap.to(card, {
        y: -10,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });

    // 3D tilt effect on mouse move
    cards.forEach((card) => {
      if (!card) return;

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(card, {
          rotationY: x * 15,
          rotationX: -y * 15,
          transformPerspective: 1000,
          transformOrigin: "center",
          duration: 0.5,
          ease: "power2.out",
        });

        // Animate the image
        const img = card.querySelector('.product-image');
        gsap.to(img, {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out",
        });

        // Glow effect
        const glow = card.querySelector('.card-glow');
        gsap.to(glow, {
          opacity: 0.4,
          duration: 0.3,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.7,
          ease: "power2.out",
        });

        const img = card.querySelector('.product-image');
        gsap.to(img, {
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        });

        const glow = card.querySelector('.card-glow');
        gsap.to(glow, {
          opacity: 0,
          duration: 0.3,
        });
      });

      // Button hover animations
      const btn = card.querySelector('.add-to-cart-btn');
      const heartBtn = card.querySelector('.heart-btn');

      if (btn) {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: "back.out(2)",
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { scale: 1, duration: 0.3 });
        });
      }

      if (heartBtn) {
        heartBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          gsap.to(heartBtn, {
            scale: [1, 1.5, 1],
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      price: "$299",
      originalPrice: "$399",
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      desc: "Premium sound quality with active noise cancellation",
      rating: 4.8,
      reviews: 234,
      badge: "Best Seller",
      color: "from-purple-500 to-pink-500",
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 2,
      title: "Smart Watch Pro",
      price: "$449",
      originalPrice: "$599",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      desc: "Track your fitness goals with advanced sensors",
      rating: 4.9,
      reviews: 567,
      badge: "New Arrival",
      color: "from-blue-500 to-cyan-500",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 3,
      title: "Camera Lens Kit",
      price: "$799",
      originalPrice: "$999",
      img: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80",
      desc: "Professional photography made easy and portable",
      rating: 4.7,
      reviews: 189,
      badge: "Top Rated",
      color: "from-orange-500 to-red-500",
      icon: <Award className="w-5 h-5" />
    },
  ];

  return (
    <section ref={rootRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Discover our handpicked collection of premium products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="product-card relative group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow Effect */}
              <div 
                className={`card-glow absolute -inset-1 bg-gradient-to-r ${product.color} rounded-3xl blur-xl opacity-0 transition-opacity duration-300`}
              ></div>

              {/* Card Content */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                {/* Badge */}
                <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${product.color} flex items-center gap-1`}>
                  {product.icon}
                  {product.badge}
                </div>

                {/* Wishlist Button */}
                <button className="heart-btn absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Heart className="w-5 h-5 text-white" />
                </button>

                {/* Product Image */}
                <div className="relative h-72 overflow-hidden bg-slate-700/30">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="product-image w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-20`}></div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 mb-4 line-clamp-2">
                    {product.desc}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-white">
                      {product.price}
                    </span>
                    <span className="text-lg text-slate-500 line-through">
                      {product.originalPrice}
                    </span>
                    <span className={`ml-auto px-2 py-1 rounded text-sm font-semibold bg-gradient-to-r ${product.color} text-white`}>
                      Save {Math.round((1 - parseInt(product.price.slice(1)) / parseInt(product.originalPrice.slice(1))) * 100)}%
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button className={`add-to-cart-btn w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${product.color} flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all`}>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;