"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { GraduationCap, Code2, Gauge } from "lucide-react"

export function AboutSection() {
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
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-sm">
              <Image
                src="/images/founder.jpg"
                alt="Founder of KankanGames"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/30 to-transparent" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary/15 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-accent/15 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <p className="font-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
              About the Founder
            </p>
            <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
              PERFORMANCE-FIRST
              <span className="text-primary"> GAME DEV</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              KankanGames was founded by a Computer Science student at{" "}
              <span className="text-foreground font-medium">
                Bilkent University
              </span>
              , driven by a deep passion for performance-first game development
              and systems programming.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every line of code is written with performance in mind. From
              custom engine architectures to low-level optimizations, the goal
              is always the same: build software that runs as fast as
              theoretically possible.
            </p>

            {/* Key Points */}
            <div className="mt-10 flex flex-col gap-5">
              {[
                {
                  icon: GraduationCap,
                  title: "Bilkent University",
                  desc: "Computer Science student with focus on systems programming",
                },
                {
                  icon: Gauge,
                  title: "Performance Obsessed",
                  desc: "Zero-allocation patterns, SIMD optimizations, data-oriented design",
                },
                {
                  icon: Code2,
                  title: "Systems Programmer",
                  desc: "Custom engines, low-level C# and C++, real-time systems",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 transition-all duration-700 ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${600 + i * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
