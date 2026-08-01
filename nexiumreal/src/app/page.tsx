"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ─────────── REAL REEL DATA ─────────── */
const REELS = [
  {
    id: "DZ-Sa86BHkw",
    title: "KINGSMAN: THE SECRET SERVICE",
    genre: "Action / Comedy / Spy",
    year: "2014",
    rating: "7.7",
    thumb: "/reels/kingsman.jpg",
    url: "https://www.instagram.com/nexiumreal/reel/DZ-Sa86BHkw/",
  },
  {
    id: "DZ-SuIABZOq",
    title: "THE VAMPIRE'S ASSISTANT",
    genre: "Fantasy / Adventure / Horror",
    year: "2009",
    rating: "5.8",
    thumb: "/reels/vampire-assistant.jpg",
    url: "https://www.instagram.com/nexiumreal/reel/DZ-SuIABZOq/",
  },
  {
    id: "DZ7f-DiBt3i",
    title: "BULLET TRAIN",
    genre: "Action / Comedy / Thriller",
    year: "2022",
    rating: "7.3",
    thumb: "/reels/bullet-train.jpg",
    url: "https://www.instagram.com/nexiumreal/reel/DZ7f-DiBt3i/",
  },
  {
    id: "DaqacEakU-N",
    title: "THE FLASH",
    genre: "Action / Adventure / Sci-Fi",
    year: "2014–2023",
    rating: "7.5",
    thumb: "/reels/the-flash.jpg",
    url: "https://www.instagram.com/nexiumreal/reel/DaqacEakU-N/",
  },
  {
    id: "Dar7YY-BZD4",
    title: "MISSION: IMPOSSIBLE",
    genre: "Action / Adventure / Spy",
    year: "1996–Now",
    rating: "8.0",
    thumb: "/reels/mission-impossible.jpg",
    url: "https://www.instagram.com/nexiumreal/reel/Dar7YY-BZD4/",
  },
];

/* ─────────── LOADING SCREEN ─────────── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="loader-text">NEXIUM</div>
    </motion.div>
  );
}

/* ─────────── PARALLAX HERO (Alps-style) ─────────── */
function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.15]);

  return (
    <motion.div
      ref={containerRef}
      className="parallax-scene"
      style={{ opacity: heroOpacity }}
    >
      {/* Layer 1: Nebula background */}
      <motion.div
        className="nebula"
        style={{
          x: mouse.x * -20,
          y: mouse.y * -20,
          scale: heroScale,
        }}
      />

      {/* Layer 2: Decorative film strips */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${mouse.x * -10}px, ${mouse.y * -10}px)`,
        }}
      >
        <div className="absolute top-[15%] left-[5%] w-px h-[30vh] bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />
        <div className="absolute top-[10%] right-[8%] w-px h-[40vh] bg-gradient-to-b from-transparent via-amber-500/8 to-transparent" />
        <div className="absolute bottom-[20%] left-[12%] w-[25vw] h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
        <div className="absolute top-[40%] right-[15%] w-[20vw] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Layer 3: Light leaks */}
      <div
        className="light-leak"
        style={{
          top: "10%",
          left: "60%",
          transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
        }}
      />
      <div
        className="light-leak"
        style={{
          bottom: "15%",
          right: "65%",
          transform: `translate(${mouse.x * -25}px, ${mouse.y * -25}px)`,
        }}
      />

      {/* Layer 4: Main text */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{
          x: mouse.x * 15,
          y: mouse.y * 15,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-amber-500/80 tracking-[0.3em] uppercase text-xs sm:text-sm font-medium mb-6"
        >
          Cinematic Movie Edits
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 3.0,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-[var(--font-heading)] text-6xl sm:text-8xl md:text-9xl font-extralight tracking-tight leading-none"
        >
          NEXIUM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 3.4,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-white/40 text-sm sm:text-base mt-6 tracking-wide"
        >
          Movies &bull; Series &bull; Iconic Scenes
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.0, duration: 1 }}
          className="mt-10"
        >
          <a
            href="https://www.instagram.com/nexiumreal/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-amber-500/30 text-amber-500/80 px-8 py-3 text-sm tracking-widest uppercase hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Follow on Instagram
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────── REEL CARD ─────────── */
function ReelCard({
  reel,
  index,
}: {
  reel: (typeof REELS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="reel-card block"
      >
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={reel.thumb}
            alt={reel.title}
            className="reel-thumb"
            loading="lazy"
          />
          <div className="reel-overlay" />
          <div className="play-icon">
            <svg
              className="w-6 h-6 text-black ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          {/* Bottom gradient - always visible */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <p className="text-amber-500 text-[10px] tracking-[0.2em] uppercase font-medium">
              {reel.genre}
            </p>
            <h3 className="text-white font-semibold text-sm sm:text-base mt-1 leading-tight">
              {reel.title}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-white/50 text-xs">{reel.year}</span>
              <span className="text-amber-500/60 text-xs">
                IMDb {reel.rating}
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* ─────────── GALLERY ─────────── */
function Gallery() {
  return (
    <section className="relative py-24 sm:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-amber-500/60 tracking-[0.3em] uppercase text-xs mb-4">
            Selected Works
          </p>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-5xl font-extralight">
            Reels
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {REELS.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <a
            href="https://www.instagram.com/nexiumreal/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 text-sm tracking-wider uppercase hover:text-amber-500 transition-colors duration-300"
          >
            View All Reels on Instagram
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── FOOTER ─────────── */
function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/20 text-xs tracking-wider">
          &copy; {new Date().getFullYear()} NEXIUM
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/nexiumreal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 hover:text-amber-500 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@NexiumReal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 hover:text-amber-500 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── MAIN PAGE ─────────── */
export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={
          loading
            ? { opacity: 0, scale: 0.95, filter: "blur(10px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <ParallaxHero />
        <Gallery />
        <Footer />
      </motion.main>

      {/* Film grain overlay */}
      <svg className="film-grain" width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Vignette */}
      <div className="vignette" />
    </>
  );
}
