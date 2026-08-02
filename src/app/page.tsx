"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Instagram, Play, ExternalLink, ChevronDown } from "lucide-react";

/* ────────────── Your Real Instagram Reels ────────────── */

const REELS = [
  { title: "BACK TO THE FUTURE", year: "1985", genre: "Sci-Fi", url: "https://www.instagram.com/reel/DZpX2FOh6TK/", gradient: "from-amber-900/60 via-orange-950/40 to-black" },
  { title: "THE BEST OF ME", year: "2014", genre: "Romance", url: "https://www.instagram.com/reel/DZxbxY7huUx/", gradient: "from-rose-900/60 via-red-950/40 to-black" },
  { title: "THE DICTATOR", year: "2012", genre: "Comedy", url: "https://www.instagram.com/reel/DZr72LgBRLz/", gradient: "from-emerald-900/60 via-teal-950/40 to-black" },
  { title: "THE MAGICIANS", year: "Series", genre: "Fantasy", url: "https://www.instagram.com/reel/DbV9NbQhqfT/", gradient: "from-violet-900/60 via-purple-950/40 to-black" },
  { title: "LOVE STORY", year: "1970", genre: "Drama", url: "https://www.instagram.com/reel/DZ-haZBBduO/", gradient: "from-pink-900/60 via-rose-950/40 to-black" },
  { title: "CROWN FOR CHRISTMAS", year: "2015", genre: "Romance", url: "https://www.instagram.com/reel/DaArbXKBN61/", gradient: "from-sky-900/60 via-blue-950/40 to-black" },
  { title: "POLICE ACADEMY", year: "1984", genre: "Comedy", url: "https://www.instagram.com/nexiumreal/reels/", gradient: "from-yellow-900/60 via-amber-950/40 to-black" },
  { title: "GOOD TIME", year: "2017", genre: "Thriller", url: "https://www.instagram.com/p/DbJe1saIzKI/", gradient: "from-red-900/70 via-orange-950/50 to-black" },
];

/* ────────────── Loading Screen ────────────── */

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="loading-screen fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center">
      <div className="loading-text-reveal text-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white">
          NEXIUM
        </h1>
        <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      </div>
    </div>
  );
}

/* ────────────── Multiplane Parallax Hero (Alps-style) ────────────── */

function ParallaxHero({ loaded }: { loaded: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Smooth animation loop for parallax
  useEffect(() => {
    const layerFar = document.getElementById("layer-far");
    const layerMid = document.getElementById("layer-mid");
    const layerNear = document.getElementById("layer-near");
    const layerText = document.getElementById("layer-text");
    const glow = document.getElementById("lens-glow");

    const animate = () => {
      const { x, y } = mouseRef.current;
      if (layerFar) layerFar.style.transform = `translate(${x * -8}px, ${y * -5}px) scale(1.05)`;
      if (layerMid) layerMid.style.transform = `translate(${x * -15}px, ${y * -10}px) scale(1.1)`;
      if (layerNear) layerNear.style.transform = `translate(${x * -25}px, ${y * -15}px) scale(1.15)`;
      if (layerText) layerText.style.transform = `translate(${x * -5}px, ${y * -3}px) scale(${loaded ? 1 : 0.6})`;
      if (glow) glow.style.transform = `translate(${x * 20}px, ${y * 15}px) scale(1)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded, handleMouseMove]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity: heroOpacity }}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Layer 0: Deep background — dark sky gradient */}
      <div
        id="layer-far"
        className="parallax-layer absolute inset-[-10%] z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0510] via-[#0d0808] to-[#050505]" />
        {/* Abstract nebula / atmosphere */}
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-red-500/[0.03] blur-[100px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/[0.02] blur-[150px]" />
      </div>

      {/* Layer 1: Mid — film strip silhouette shapes */}
      <div
        id="layer-mid"
        className="parallax-layer absolute inset-[-15%] z-1"
      >
        {/* Horizontal film strip lines */}
        <div className="absolute top-[15%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        <div className="absolute top-[35%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute top-[60%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
        {/* Film sprocket holes left */}
        <div className="absolute left-[5%] top-0 bottom-0 flex flex-col justify-around opacity-[0.04]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-3 h-5 rounded-sm bg-white" />
          ))}
        </div>
        {/* Film sprocket holes right */}
        <div className="absolute right-[5%] top-0 bottom-0 flex flex-col justify-around opacity-[0.04]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-3 h-5 rounded-sm bg-white" />
          ))}
        </div>
      </div>

      {/* Layer 2: Near — abstract geometric shapes / light leaks */}
      <div
        id="layer-near"
        className="parallax-layer absolute inset-[-20%] z-2"
      >
        {/* Light leak top-right */}
        <div className="absolute top-0 right-[10%] w-[300px] h-[600px] bg-gradient-to-b from-amber-500/[0.06] to-transparent rotate-12 blur-[60px]" />
        {/* Light leak bottom-left */}
        <div className="absolute bottom-0 left-[5%] w-[250px] h-[500px] bg-gradient-to-t from-red-500/[0.04] to-transparent -rotate-6 blur-[50px]" />
      </div>

      {/* Vignette overlay */}
      <div className="vignette absolute inset-0 z-[4]" />

      {/* Lens flare glow */}
      <div
        id="lens-glow"
        className="lens-glow absolute top-[20%] right-[20%] w-[300px] h-[300px] z-[3] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(232,168,73,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Center Text — scales in like The Alps */}
      <div
        id="layer-text"
        className={`hero-text absolute inset-0 z-10 flex flex-col items-center justify-center ${loaded ? "visible" : ""}`}
      >
        <h1 className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-bold tracking-[-0.04em] leading-[0.85] text-center select-none">
          <span className="bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent">
            NEXIUM
          </span>
        </h1>
        <p className="mt-6 text-sm sm:text-base tracking-[0.35em] uppercase text-white/30 font-light">
          Cinematic Edits
        </p>
        <div className="mt-8 flex items-center gap-3">
          <div className="w-8 h-px bg-white/10" />
          <a
            href="https://www.instagram.com/nexiumreal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.3em] uppercase text-white/40 hover:text-amber-400 transition-colors duration-300 inline-flex items-center gap-2"
          >
            <Instagram className="w-3.5 h-3.5" />
            @nexiumreal
          </a>
          <div className="w-8 h-px bg-white/10" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-light">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ────────────── Reels Gallery ────────────── */

function ReelCard({ reel, index }: { reel: (typeof REELS)[number]; index: number }) {
  return (
    <motion.a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="reel-card group block aspect-[9/16] cursor-pointer"
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${reel.gradient} transition-transform duration-700 ease-out group-hover:scale-110`} />

      {/* Film perforations */}
      <div className="absolute left-0 top-0 bottom-0 w-2.5 z-20 flex flex-col justify-evenly opacity-30">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="mx-auto w-1 h-1.5 rounded-sm bg-white/60" />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-2.5 z-20 flex flex-col justify-evenly opacity-30">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="mx-auto w-1 h-1.5 rounded-sm bg-white/60" />
        ))}
      </div>

      {/* Play icon — center */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-black/10 transition-all duration-500 group-hover:scale-110 group-hover:border-amber-400/50 group-hover:bg-black/20">
          <Play className="w-5 h-5 text-white/70 ml-0.5 transition-colors group-hover:text-amber-400" fill="currentColor" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-400/70 font-light">
          {reel.genre} &middot; {reel.year}
        </p>
        <h3 className="text-white font-semibold text-base tracking-wide mt-1">
          {reel.title}
        </h3>
        <div className="mt-3 flex items-center gap-1.5 text-white/30 group-hover:text-amber-400 transition-colors duration-300">
          <ExternalLink className="w-3 h-3" />
          <span className="text-[10px] tracking-wider uppercase">Watch on Instagram</span>
        </div>
      </div>
    </motion.a>
  );
}

function Gallery() {
  return (
    <section className="relative px-4 sm:px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-24 pb-12 text-center"
        >
          <p className="text-[11px] tracking-[0.4em] uppercase text-white/25 font-light">
            Reels
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {REELS.map((reel, i) => (
            <ReelCard key={reel.title} reel={reel} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────── Footer ────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-[11px] tracking-[0.2em] text-white/20 uppercase">
          NEXIUM &copy; {new Date().getFullYear()}
        </span>
        <a
          href="https://www.instagram.com/nexiumreal/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/20 hover:text-amber-400 transition-colors"
        >
          <Instagram className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}

/* ────────────── Page ────────────── */

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col bg-[#050505]">
      <div className="film-grain" />

      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <ParallaxHero loaded={loaded} />
      <Gallery />
      <Footer />
    </main>
  );
}
