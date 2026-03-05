"use client"

import { useEffect, useRef, useState } from "react"
import { Cpu, HardDrive, Zap, Puzzle } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "Custom C# Engine Core",
    description:
      "Handcrafted game engine optimized for raw performance. Built without unnecessary abstractions, every component is designed for speed.",
  },
  {
    icon: HardDrive,
    title: "Hybrid Serialization",
    description:
      "Fast save/load systems using a custom hybrid serialization approach. Minimizes I/O overhead while maintaining data integrity.",
  },
  {
    icon: Zap,
    title: "SIMD & AVX Optimizations",
    description:
      "Low-level performance tuning leveraging SIMD and AVX instruction sets for parallel data processing and computational efficiency.",
  },
  {
    icon: Puzzle,
    title: "Modular Modding API",
    description:
      "Community-driven expansion through a modular modding API. Designed for extensibility, enabling players to create and share content.",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative bg-card border border-border rounded-2xl p-8 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
        <feature.icon className="h-6 w-6 text-primary" />
      </div>

      <h3 className="font-mono text-lg font-bold text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>

      {/* Subtle grid pattern in corner */}
      <div
        className="absolute bottom-0 right-0 w-20 h-20 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#c49a6c 1px, transparent 1px), linear-gradient(90deg, #c49a6c 1px, transparent 1px)`,
          backgroundSize: "8px 8px",
        }}
      />
    </div>
  )
}

export function TechSection() {
  return (
    <section id="tech" className="relative py-24 lg:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
            Engineering
          </p>
          <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            TECHNICAL DEEP DIVE
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Systems programming at its core. Every decision is driven by
            performance metrics and engineering excellence.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
