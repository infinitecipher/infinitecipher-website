"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Code2, Smartphone, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const services = [
  {
    icon: Globe,
    title: "Website Profiles",
    description: "Professional websites and digital profiles that make your brand unforgettable online.",
    accent: "#534AB7",
    tag: "WEB",
  },
  {
    icon: Code2,
    title: "Web Applications",
    description: "Custom web apps built for performance, scale, and real business outcomes.",
    accent: "#5DCAA5",
    tag: "APP",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "iOS and Android apps your users will actually love using.",
    accent: "#AFA9EC",
    tag: "MOBILE",
  },
];

const stats = [
  { value: "99.9%", label: "UPTIME SLA" },
  { value: "2ms", label: "AVG RESPONSE" },
  { value: "50+", label: "PROJECTS DELIVERED" },
  { value: "100%", label: "CLIENT RETENTION" },
];

const projects = [
  {
    name: "NexaShop",
    category: "E-commerce Web App",
    description: "A full-featured e-commerce platform with real-time inventory, payments, and analytics.",
    accent: "#534AB7",
    gradFrom: "#534AB7",
    gradTo: "#3C3489",
  },
  {
    name: "PulseHealth",
    category: "Mobile App (iOS & Android)",
    description: "Health tracking app with appointment booking, telemedicine, and wearable integration.",
    accent: "#5DCAA5",
    gradFrom: "#5DCAA5",
    gradTo: "#0F6E56",
  },
  {
    name: "VertexCo",
    category: "Corporate Website",
    description: "Polished corporate site with CMS, SEO optimization, and a 99/100 Lighthouse score.",
    accent: "#AFA9EC",
    gradFrom: "#AFA9EC",
    gradTo: "#3C3489",
  },
];

const testimonials = [
  {
    quote:
      "InfiniteCipher delivered our web app two weeks early and exceeded every spec. Their attention to performance and UX was exceptional.",
    name: "Marcus Reid",
    company: "Nexaflow Inc.",
    initials: "MR",
  },
  {
    quote:
      "We went from idea to live mobile app in 8 weeks. The team was communicative, skilled, and genuinely invested in our product.",
    name: "Priya Nair",
    company: "PulseHealth",
    initials: "PN",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ic-void">
        <HeroCanvas />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="max-w-3xl">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <Badge
                className="mb-8 border border-ic-cipher-core bg-ic-deep-cipher/20 text-ic-lavender font-mono text-[10px] tracking-widest uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-ic-teal mr-2 inline-block" />
                NOW IN PUBLIC BETA
              </Badge>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-serif text-5xl md:text-7xl font-normal leading-[1.1] tracking-tight text-ic-chalk mb-6"
            >
              We build digital
              <br />
              <em className="italic text-ic-lavender">products</em> that work.
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-ic-stone text-lg leading-relaxed max-w-lg mb-10"
            >
              InfiniteCipher is a web and mobile development studio helping businesses launch
              websites, web applications, and mobile apps that perform.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              <Link href="/contact">
                <Button className="bg-ic-deep-cipher hover:bg-ic-cipher-core text-purple-50 font-mono text-[12px] tracking-widest uppercase px-7 py-6">
                  Start a project
                </Button>
              </Link>
              <Link href="/work">
                <Button
                  variant="outline"
                  className="border-ic-muted-2 text-ic-muted hover:text-ic-chalk hover:border-ic-muted font-mono text-[12px] tracking-widest uppercase px-7 py-6 bg-transparent"
                >
                  View our work
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-ic-void">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-3">OUR SERVICES</p>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-ic-chalk tracking-tight">What we build</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Card className="group bg-ic-surface border-ic-border hover:border-ic-lavender transition-all duration-300 hover:scale-[1.02] overflow-hidden h-full">
                  <div className="h-1 w-full" style={{ backgroundColor: svc.accent }} />
                  <CardHeader className="pb-3 pt-6">
                    <div
                      className="p-2.5 rounded-md border border-ic-border w-fit mb-4"
                      style={{ color: svc.accent }}
                    >
                      <svc.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-normal text-ic-chalk">{svc.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ic-stone text-sm leading-relaxed">{svc.description}</p>
                    <Badge
                      className="mt-4 font-mono text-[9px] tracking-widest uppercase border border-ic-cipher-core bg-ic-deep-cipher/15 text-ic-lavender"
                    >
                      {svc.tag}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY INFINITECIPHER */}
      <section id="about" className="py-24 bg-ic-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-ic-chalk leading-[1.15] tracking-tight mb-6">
                We don&apos;t just write code. We build things that last.
              </h2>
              <Separator className="mb-6 bg-ic-border" />
              <p className="text-ic-stone leading-relaxed">
                Every project we take on is treated as a long-term investment in your business. We obsess over
                performance, scalability, and maintainability — so your product grows with you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="bg-ic-void border-ic-border p-6">
                  <p className="font-serif text-4xl text-ic-chalk mb-1">{stat.value}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-ic-muted">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-24 bg-ic-void">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-3">SELECTED WORK</p>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-ic-chalk tracking-tight">
              Projects we&apos;re proud of
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((proj, i) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="group bg-ic-surface border-ic-border hover:border-ic-lavender transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                  <div
                    className="h-48 w-full"
                    style={{ background: `linear-gradient(135deg, ${proj.gradFrom}, ${proj.gradTo})` }}
                  />
                  <CardHeader className="pt-5 pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-xl text-ic-chalk">{proj.name}</h3>
                      <Badge
                        className="font-mono text-[9px] tracking-widest uppercase border shrink-0"
                        style={{
                          borderColor: proj.accent + "40",
                          color: proj.accent,
                          background: proj.accent + "15",
                        }}
                      >
                        {proj.category.split(" ")[0]}
                      </Badge>
                    </div>
                    <p className="text-ic-muted text-xs font-mono tracking-wide">{proj.category}</p>
                  </CardHeader>
                  <CardContent className="pb-5">
                    <p className="text-ic-stone text-sm leading-relaxed mb-4">{proj.description}</p>
                    <Link
                      href="/work"
                      className="text-ic-lavender font-mono text-[11px] tracking-wide hover:text-ic-chalk transition-colors"
                    >
                      View project →
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-ic-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-3">CLIENT FEEDBACK</p>
            <h2 className="font-serif text-4xl font-normal text-ic-chalk tracking-tight">What our clients say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="bg-ic-void border-ic-border p-8">
                <Quote className="h-5 w-5 text-ic-lavender mb-4 opacity-60" />
                <p className="text-ic-chalk leading-relaxed mb-6 font-serif text-lg italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-ic-cipher-core">
                    <AvatarFallback className="bg-ic-deep-cipher text-purple-50 font-mono text-xs">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-ic-chalk text-sm font-medium">{t.name}</p>
                    <p className="text-ic-muted font-mono text-[10px] tracking-wide">{t.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section id="pricing" className="py-24 bg-ic-deep-cipher">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-white mb-4 tracking-tight">
            Ready to build something infinite?
          </h2>
          <p className="text-purple-50/80 mb-10 text-lg max-w-xl mx-auto">
            Let&apos;s talk about your project. We&apos;ll turn your idea into a product that performs.
          </p>
          <Link href="/contact">
            <Button
              variant="secondary"
              className="bg-white text-ic-deep-cipher hover:bg-purple-50 font-mono text-[12px] tracking-widest uppercase px-10 py-6 text-base font-bold"
            >
              Start a project today
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
