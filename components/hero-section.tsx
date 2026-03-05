"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background" />
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#c49a6c 1px, transparent 1px), linear-gradient(90deg, #c49a6c 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-mono text-primary text-sm tracking-[0.3em] uppercase mb-6">
            Performance-First Game Development
          </p>
        </div>

        <h1
          className={`font-mono text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-foreground transition-all duration-1000 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-balance">
            DEEP<span className="text-primary">BOUND</span>
          </span>
        </h1>

        <p
          className={`mt-4 font-mono text-lg md:text-xl text-muted-foreground transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          A 2D Modular Sandbox Engine & Game
        </p>

        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-3 transition-all duration-1000 delay-400 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            "High-performance ECS Architecture",
            "Zero-allocation Memory Management",
            "Data-Oriented Design (DOD)",
          ].map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm text-xs font-mono text-foreground shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>

        <p
          className={`mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Built from the ground up with a custom C# engine core, DeepBound
          pushes the boundaries of what a 2D sandbox can achieve.
        </p>

        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#"
            className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-mono text-sm font-semibold tracking-wider hover:bg-primary/90 transition-colors overflow-hidden"
          >
            <span className="absolute inset-0 bg-accent/10 animate-glow-pulse rounded-lg" />
            <svg className="relative h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span className="relative">Wishlist on Steam</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 border border-border bg-card/80 text-foreground px-8 py-3.5 rounded-xl font-mono text-sm font-semibold tracking-wider hover:border-primary/40 hover:text-primary transition-colors shadow-sm"
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
