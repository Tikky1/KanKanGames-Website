"use client"

import { Mail, Github, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "#",
    description: "Open source projects & engine code",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
    description: "Professional network & updates",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "#",
    description: "Dev logs & game updates",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hello@kankangames.com",
    description: "Business inquiries & collaboration",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-primary text-sm tracking-[0.3em] uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            {"LET'S BUILD"}
            <span className="text-primary"> SOMETHING</span> GREAT
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Interested in collaboration, have a question about the engine, or
            just want to talk about game dev? Reach out through any of these
            channels.
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex flex-col items-center text-center p-8 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-105 transition-all">
                <link.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-mono text-base font-bold text-foreground mb-1">
                {link.label}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {link.description}
              </p>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h3 className="font-mono text-xl font-bold text-foreground mb-6 text-center">
              Send a Message
            </h3>
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-card transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-card transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="What is this about?"
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-card transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Your message..."
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-card transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-mono text-sm font-semibold tracking-wider hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
