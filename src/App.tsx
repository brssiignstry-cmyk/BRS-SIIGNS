/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle, Mail, ArrowRight, Sparkles } from 'lucide-react';
import ImageGenerator from './components/ImageGenerator';

const INITIAL_SLIDES = [
  {
    id: 1,
    category: "LED & NEON SIGNS",
    title: "What if your sign never went dark again?",
    description: "IP65 weatherproof LED & Neon signs that glow brightly even during TNEB power cuts.",
    image: "https://images.unsplash.com/photo-1563245332-692546984721?q=80&w=1000&auto=format&fit=crop",
    color: "#ff2d55",
    ctaColor: "bg-[#ff2d55]",
    shadowColor: "shadow-[#ff2d55]/40",
    link: "https://brssiigns.blogspot.com/2026/04/led-neon-signs-trichy-2026-best-designs.html",
    frameClass: "border-[12px] border-black rounded-[40px] shadow-[0_0_40px_rgba(255,45,85,0.4)]",
  },
  {
    id: 2,
    category: "3D METAL LETTERS",
    title: "Want a sign that still looks premium in 15 years?",
    description: "3D Stainless Steel Metal Letters that never rust, never fade. Zero maintenance forever.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
    color: "#00d4ff",
    ctaColor: "bg-[#00d4ff]",
    shadowColor: "shadow-[#00d4ff]/40",
    link: "https://brssiigns.blogspot.com/2026/04/the-future-of-3d-metal-letters-trichy.html",
    frameClass: "border-[8px] border-slate-700 rounded-lg shadow-2xl",
  },
  {
    id: 3,
    category: "ACRYLIC EDGE LIT",
    title: "The sign that looks like pure magic at night?",
    description: "Elegant Acrylic Edge Lit signs with soft, even glow. Modern, slim and stunning.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    color: "#00d4ff",
    ctaColor: "bg-[#00d4ff]",
    shadowColor: "shadow-[#00d4ff]/40",
    link: "https://brssiigns.blogspot.com/2026/04/modern-acrylic-edge-lit-signs-trichy.html",
    frameClass: "border-[4px] border-white/20 backdrop-blur-md rounded-3xl shadow-xl",
  },
  {
    id: 4,
    category: "LED RUNNING DISPLAY",
    title: "Change your offer in just 10 seconds?",
    description: "LED Running Display — update messages instantly from your phone. Tamil & English supported.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
    color: "#f5c842",
    ctaColor: "bg-[#f5c842]",
    shadowColor: "shadow-[#f5c842]/40",
    link: "https://brssiigns.blogspot.com/2026/04/how-led-sign-boards-trichy-can.html",
    frameClass: "border-[16px] border-[#1a1a1a] rounded-sm shadow-2xl",
  },
  {
    id: 5,
    category: "MODULAR SYSTEMS",
    title: "One frame. Unlimited events?",
    description: "Modular Systems — build once, reuse forever. No carpenter. No tools needed.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    color: "#00ff88",
    ctaColor: "bg-[#00ff88]",
    shadowColor: "shadow-[#00ff88]/40",
    link: "https://brssiigns.blogspot.com/",
    frameClass: "border-[10px] border-slate-300 rounded-xl shadow-lg",
  },
  {
    id: 6,
    category: "VINYL & FLEX SHIELD",
    title: "Tired of banners fading in just 3 months?",
    description: "Vinyl & Flex with Shield protection — 3x longer life in Tamil Nadu sun and rain.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
    color: "#ff6b35",
    ctaColor: "bg-[#ff6b35]",
    shadowColor: "shadow-[#ff6b35]/40",
    link: "https://brssiigns.blogspot.com/2026/04/how-to-choose-weather-proof-vinyl-flex.html",
    frameClass: "border-[20px] border-slate-800 rounded-none shadow-2xl",
  },
  {
    id: 7,
    category: "CUSTOM MEMENTOS",
    title: "The one thing they keep forever?",
    description: "Premium Custom Mementos & Trophies with velvet gift box. Perfect for schools, corporates & temples.",
    image: "https://images.unsplash.com/photo-1579546673173-c3ff1c876d56?q=80&w=1000&auto=format&fit=crop",
    color: "#a855f7",
    ctaColor: "bg-[#a855f7]",
    shadowColor: "shadow-[#a855f7]/40",
    link: "https://brssiigns.blogspot.com/",
    frameClass: "border-[14px] border-[#4c1d95] rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.3)]",
  },
];

export default function App() {
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDesignerOpen, setIsDesignerOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const applyCustomImage = (imageUrl: string) => {
    const newSlides = [...slides];
    newSlides[current] = { ...newSlides[current], image: imageUrl };
    setSlides(newSlides);
    setIsDesignerOpen(false);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-[#010409] flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] bg-[#030a1a] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,212,255,0.15)] border border-white/5">
        
        {/* Magic Designer Button */}
        <button
          onClick={() => setIsDesignerOpen(true)}
          className="absolute top-6 right-6 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles size={14} className="text-[#00d4ff]" />
          Magic Designer
        </button>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 md:gap-16"
          >
            {/* Content Side */}
            <div className="flex-1 z-10 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ backgroundColor: `${slide.color}20`, borderColor: `${slide.color}40`, color: slide.color }}
                className="inline-block border rounded-full px-4 py-1 text-xs font-bold tracking-[0.2em] mb-6"
              >
                {slide.category}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ color: slide.color, textShadow: `0 0 30px ${slide.color}60` }}
                className="text-3xl md:text-5xl font-bold leading-tight mb-4"
              >
                {slide.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#8aadcc] text-base md:text-lg leading-relaxed mb-8 max-w-xl"
              >
                {slide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center md:justify-start gap-4"
              >
                <a
                  href="https://wa.link/a8cb8a"
                  className="bg-[#25d366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)]"
                >
                  <MessageCircle size={18} />
                  Bennir Raja
                </a>
                <a
                  href="https://wa.link/4gbxl4"
                  className="bg-[#25d366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)]"
                >
                  <MessageCircle size={18} />
                  Johni Beski
                </a>
                <a
                  href="mailto:brssiigns.try@gmail.com"
                  className="bg-[#00d4ff] hover:bg-[#00c2e8] text-[#030a1a] px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,212,255,0.4)]"
                >
                  <Mail size={18} />
                  Email Us
                </a>
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-bold text-sm transition-all hover:opacity-70"
                  style={{ color: slide.color }}
                >
                  Read More
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>

            {/* Image Side */}
            <div className="flex-1 relative w-full h-full min-h-[200px] md:min-h-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 blur-[80px] opacity-30 rounded-full"
                  style={{ backgroundColor: slide.color }}
                />
                
                <img
                  src={slide.image}
                  alt={slide.category}
                  referrerPolicy="no-referrer"
                  className={`relative z-10 w-full h-full object-cover transition-all duration-500 ${slide.frameClass}`}
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === current ? 'w-8 bg-[#00d4ff]' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isDesignerOpen && (
          <ImageGenerator 
            onClose={() => setIsDesignerOpen(false)} 
            onApply={applyCustomImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
