"use client"

import { useState, useEffect } from "react"
import { Menu, X, Gamepad2 } from "lucide-react"

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "Technical Blog", href: "#", badge: "Coming Soon" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 group">
          <Gamepad2 className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />
          <span className="font-mono text-lg font-bold tracking-tight text-foreground">
            Kankan<span className="text-primary">Games</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
              {link.badge && (
                <span className="absolute -top-2 -right-12 text-[9px] bg-accent/30 text-accent-foreground px-1.5 py-0.5 rounded-full font-mono">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border">
          <div className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[9px] bg-accent/30 text-accent-foreground px-1.5 py-0.5 rounded-full font-mono">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
