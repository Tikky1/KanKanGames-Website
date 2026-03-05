"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, ExternalLink } from "lucide-react"

function AnimatedCard({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode
  index: number
  className?: string
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
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {children}
    </div>
  )
}

export function GamesSection() {
  return (
    <section id="projects" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
            Portfolio
          </p>
          <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            PROJECTS
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Crafted with performance in mind, every project is built to push
            technical boundaries.
          </p>
        </div>

        {/* Project 1: DeepBound - Full Width */}
        <AnimatedCard index={0} className="mb-8">
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                <Image
                  src="/images/deepbound.jpg"
                  alt="DeepBound Engine & Game"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/30 lg:bg-gradient-to-r lg:from-transparent lg:to-card" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                    Featured
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-secondary text-secondary-foreground border border-border">
                    In Development
                  </span>
                </div>

                <h3 className="font-mono text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  DeepBound
                </h3>
                <p className="font-mono text-sm text-primary mb-4">
                  2D Modular Sandbox Engine & Game
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  A high-performance 2D modular sandbox engine built from scratch in C#.
                  Featuring Entity Component System architecture, zero-allocation memory
                  management, and Data-Oriented Design for maximum performance.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["ECS Architecture", "Zero-alloc", "DOD", "Custom Engine", "C#"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md text-xs font-mono bg-secondary text-secondary-foreground border border-border"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:gap-3 transition-all"
                >
                  Wishlist on Steam
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Project 2: Shadow of Roles */}
        <AnimatedCard index={1}>
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden lg:order-2">
                <Image
                  src="/images/shadow-of-roles.jpg"
                  alt="Shadow of Roles"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/30 lg:bg-gradient-to-l lg:from-transparent lg:to-card" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                    Published
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-secondary text-secondary-foreground border border-border">
                    Google Play
                  </span>
                </div>

                <h3 className="font-mono text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Shadow of Roles
                </h3>
                <p className="font-mono text-sm text-primary mb-4">
                  Turn-Based Social Deduction RPG
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  A turn-based social deduction RPG where trust is your greatest weapon
                  and betrayal lurks in every shadow. Published on Google Play Store,
                  Shadow of Roles blends strategic card play with hidden role mechanics.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Turn-Based", "Social Deduction", "RPG", "Mobile", "Multiplayer"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md text-xs font-mono bg-secondary text-secondary-foreground border border-border"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:gap-3 transition-all"
                >
                  View on Google Play
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  )
}
