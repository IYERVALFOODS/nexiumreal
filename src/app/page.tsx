"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Play,
  Film,
  Instagram,
  Flame,
  Clapperboard,
  Star,
  TrendingUp,
  ChevronDown,
  ArrowUpRight,
  Volume2,
  Zap,
} from "lucide-react";

/* ───────────────────────────── Data ───────────────────────────── */

const EDITS = [
  { id: 1, title: "The Dark Knight", category: "Movies", year: "2025", likes: "24.5K", gradient: "from-amber-900/80 via-red-950/60 to-black", aspect: "aspect-[9/16]" },
  { id: 2, title: "Breaking Bad", category: "Series", year: "2025", likes: "18.2K", gradient: "from-cyan-900/80 via-slate-900/60 to-black", aspect: "aspect-[9/14]" },
  { id: 3, title: "Interstellar", category: "Movies", year: "2025", likes: "31.8K", gradient: "from-orange-900/80 via-amber-950/60 to-black", aspect: "aspect-[9/16]" },
  { id: 4, title: "Peaky Blinders", category: "Series", year: "2024", likes: "15.7K", gradient: "from-stone-800/80 via-neutral-950/60 to-black", aspect: "aspect-[4/5]" },
  { id: 5, title: "Oppenheimer", category: "Movies", year: "2024", likes: "42.1K", gradient: "from-yellow-900/80 via-red-950/60 to-black", aspect: "aspect-[9/16]" },
  { id: 6, title: "The Last of Us", category: "Series", year: "2024", likes: "22.3K", gradient: "from-emerald-900/80 via-slate-950/60 to-black", aspect: "aspect-[9/14]" },
  { id: 7, title: "Dune: Part Two", category: "Movies", year: "2024", likes: "38.6K", gradient: "from-amber-800/80 via-orange-950/60 to-black", aspect: "aspect-[9/16]" },
  { id: 8, title: "Mr. Robot", category: "Series", year: "2024", likes: "19.4K", gradient: "from-gray-800/80 via-black to-black", aspect: "aspect-[4/5]" },
];

const STATS = [
  { label: "Followers", value: "2K+", icon: TrendingUp },
  { label: "Edits Created", value: "44+", icon: Film },
  { label: "Total Likes", value: "500K+", icon: Flame },
  { label: "Daily Reach", value: "50K+", icon: Zap },
];

/* ───────────────────────────── Components ───────────────────────────── */

function FilmGrainOverlay() {
  return <div className="film-grain" />;
}

function ScanlinesOverlay() {
  return <div className="scanlines" />;
}

function LetterboxBars({ active }: { active: boolean }) {
  return (
    <div className={active ? "letterbox-active" : ""}>
      <div className="letterbox-top" />
      <div className="letterbox-bottom" />
    </div>
  );
}

function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHidden(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? 0 : -100 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center">
            <Clapperboard className="w-4 h-4 text-white" />
          </div>
          <span className="font-mono text-sm tracking-[0.3em] text-amber-400 uppercase">
            Nexium
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/nexiumreal/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-amber-400 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span className="hidden sm:inline">@nexiumreal</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0505] to-black" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-red-500/5 blur-[120px]" />
        {/* VHS tracking line */}
        <div className="vhs-line" />
        <div className="vhs-line" style={{ animationDelay: "2s" }} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-title tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-12 h-px bg-amber-500/50" />
          <span className="font-mono text-xs tracking-[0.4em] text-amber-400/80 uppercase">
            Cinematic Portfolio
          </span>
          <div className="w-12 h-px bg-amber-500/50" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85]"
        >
          <span className="block text-glow bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
            NEXIUM
          </span>
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="block text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.2em] text-amber-400/90 mt-4"
          >
            MOVIE EDITS
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-8 text-base sm:text-lg text-white/40 max-w-xl mx-auto leading-relaxed font-light"
        >
          Daily cinematic edits from the most iconic scenes in movies &amp; series.
          <br />
          <span className="text-amber-400/60">Your daily dose of viral content.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://www.instagram.com/nexiumreal/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-3.5 bg-amber-500 text-black font-medium text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:bg-amber-400"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              Watch on Instagram
            </span>
          </a>
          <button
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 border border-white/20 text-white/70 text-sm tracking-wider uppercase hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300"
          >
            View Gallery
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-amber-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────── Edit Card ──────── */
function EditCard({ edit, index }: { edit: (typeof EDITS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
      className={`cinematic-card group relative rounded-xl overflow-hidden cursor-pointer ${edit.aspect}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient background simulating cinematic frame */}
      <div className={`absolute inset-0 bg-gradient-to-br ${edit.gradient}`} />
      
      {/* Simulated film frame elements */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 2 : 0 }}
          transition={{ duration: 0.4 }}
          className="w-16 h-16 rounded-full border-2 border-amber-400/30 flex items-center justify-center backdrop-blur-sm bg-black/20 mb-4"
        >
          <Play className="w-6 h-6 text-amber-400 ml-1" fill="currentColor" />
        </motion.div>
        <div className="text-center">
          <h3 className="text-white font-bold text-lg tracking-wide">{edit.title}</h3>
          <p className="text-white/50 text-xs font-mono mt-1 tracking-wider">{edit.category} &middot; {edit.year}</p>
        </div>
      </div>

      {/* Bottom info overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black via-black/80 to-transparent"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flame className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-white">{edit.likes} likes</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-amber-400" />
        </div>
      </motion.div>

      {/* Film perforations left side */}
      <div className="absolute left-0 top-0 bottom-0 w-3 z-20 flex flex-col justify-evenly">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="mx-auto w-1.5 h-2 rounded-sm bg-black/40" />
        ))}
      </div>
      {/* Film perforations right side */}
      <div className="absolute right-0 top-0 bottom-0 w-3 z-20 flex flex-col justify-evenly">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="mx-auto w-1.5 h-2 rounded-sm bg-black/40" />
        ))}
      </div>

      {/* Top-left category badge */}
      <div className="absolute top-3 left-7 z-20">
        <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-sm text-amber-400 rounded-full border border-amber-400/20">
          {edit.category}
        </span>
      </div>
    </motion.div>
  );
}

/* ──────── Gallery Section ──────── */
function GallerySection() {
  const [filter, setFilter] = useState<"All" | "Movies" | "Series">("All");
  const filtered = filter === "All" ? EDITS : EDITS.filter((e) => e.category === filter);

  return (
    <section id="gallery" className="relative py-32 px-6">
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="font-mono text-xs tracking-[0.4em] text-amber-400/60 uppercase block mb-3">
              Featured Work
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              The <span className="text-amber-400">Gallery</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {(["All", "Movies", "Series"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-300 rounded-full border ${
                  filter === cat
                    ? "bg-amber-500 text-black border-amber-500"
                    : "bg-transparent text-white/50 border-white/10 hover:border-amber-500/30 hover:text-amber-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Masonry-like grid */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            {filtered.map((edit, i) => (
              <div key={edit.id} className="break-inside-avoid">
                <EditCard edit={edit} index={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ──────── Stats Section ──────── */
function StatsSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-8 sm:p-12 backdrop-blur-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-5 h-5 text-amber-400/60 mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-mono tracking-wider text-white/40 uppercase mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────── About Section ──────── */
function AboutSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Visual element */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/40 via-black to-red-950/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl sm:text-9xl font-bold text-white/[0.03] tracking-tighter leading-none select-none">
                  NX
                </div>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <Film className="w-6 h-6 text-amber-400/40" />
                  <Volume2 className="w-6 h-6 text-amber-400/40" />
                  <Star className="w-6 h-6 text-amber-400/40" />
                </div>
              </div>
            </div>
            {/* Film strip decoration */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-8 h-1 rounded-full bg-amber-400/10" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="font-mono text-xs tracking-[0.4em] text-amber-400/60 uppercase block mb-3">
            About
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            The Art of
            <br />
            <span className="text-amber-400">Cinematic Editing</span>
          </h2>
          <div className="space-y-4 text-white/50 leading-relaxed">
            <p>
              NEXIUM is a creative hub dedicated to crafting breathtaking cinematic edits from
              the most iconic moments in film and television. Every edit is a carefully composed
              visual narrative — blending sound design, color grading, and precise timing to
              deliver an immersive emotional experience.
            </p>
            <p>
              From the neon-lit streets of Blade Runner to the explosive landscapes of Dune,
              each piece is designed to make you feel the scene — not just watch it. We believe
              cinema is the ultimate art form, and every frame deserves to be celebrated.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {["Color Grading", "Sound Design", "Motion Graphics", "VFX", "Storytelling"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[11px] font-mono tracking-wider text-amber-400/70 border border-amber-400/15 rounded-full bg-amber-400/5"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Partner mention */}
          <div className="mt-10 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <span className="text-xs font-mono tracking-wider text-white/30 uppercase block mb-2">
              In Partnership With
            </span>
            <a
              href="https://www.instagram.com/thenovaflix/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-white hover:text-amber-400 transition-colors inline-flex items-center gap-2"
            >
              @thenovaflix
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────── CTA Section ──────── */
function CTASection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full" />

          <div className="relative z-10">
            <span className="font-mono text-xs tracking-[0.4em] text-amber-400/60 uppercase block mb-6">
              Join the Community
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Never Miss
              <br />
              <span className="flicker text-amber-400">An Edit</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto mb-10 leading-relaxed">
              Follow @nexiumreal on Instagram for daily cinematic edits from the greatest
              movies and series. Viral scenes, every single day.
            </p>
            <a
              href="https://www.instagram.com/nexiumreal/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-sm tracking-wider uppercase hover:from-amber-400 hover:to-amber-500 transition-all duration-300 rounded-lg"
            >
              <Instagram className="w-5 h-5" />
              Follow @nexiumreal
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────── Footer ──────── */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Clapperboard className="w-4 h-4 text-amber-400/60" />
          <span className="font-mono text-xs tracking-[0.2em] text-white/30 uppercase">
            NEXIUM &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/nexiumreal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-amber-400 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────────── Page ───────────────────────────── */

export default function Home() {
  const [letterboxActive, setLetterboxActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setLetterboxActive(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col overflow-x-hidden bg-[#050505]">
      <FilmGrainOverlay />
      <ScanlinesOverlay />
      <LetterboxBars active={letterboxActive} />
      <Navbar />
      <HeroSection />
      <GallerySection />
      <StatsSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  );
}
