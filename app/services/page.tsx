"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Code2, Smartphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IcosahedronCanvas = dynamic(() => import("@/components/three/IcosahedronCanvas"), { ssr: false });

const services = [
  {
    id: "websites",
    icon: Globe,
    title: "Website Profiles",
    accent: "#534AB7",
    description:
      "Your website is your most powerful sales tool. We design and build fast, SEO-optimized, and visually compelling websites that leave a lasting impression on every visitor.",
    included: [
      "Business sites & landing pages",
      "Portfolio sites",
      "CMS integration (Sanity, Contentful)",
      "SEO optimization & structured data",
      "Performance tuning (95+ Lighthouse)",
      "Responsive across all devices",
    ],
    useCases: ["Agencies", "SaaS Startups", "E-commerce", "Personal Brand", "Nonprofits"],
  },
  {
    id: "webapps",
    icon: Code2,
    title: "Web Applications",
    accent: "#5DCAA5",
    description:
      "From SaaS platforms to internal tools, we architect and build web applications that scale with your business — engineered for reliability, security, and real-world performance.",
    included: [
      "SaaS platforms & dashboards",
      "Admin panels & back-office tools",
      "Third-party API integrations",
      "Authentication & authorization",
      "Real-time features (WebSockets)",
      "Database design & optimization",
    ],
    useCases: ["SaaS Products", "Fintech", "Healthtech", "Marketplaces", "Internal Tools"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Apps",
    accent: "#AFA9EC",
    description:
      "We build iOS and Android apps using React Native — cross-platform, high-performance, and shipped to both app stores. Your users deserve a native-quality experience.",
    included: [
      "iOS & Android development",
      "React Native cross-platform",
      "Push notifications",
      "Offline support & sync",
      "In-app payments",
      "App Store & Play Store deployment",
    ],
    useCases: ["Consumer Apps", "B2B Tools", "Fitness", "On-demand", "Healthcare"],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discover",
    description:
      "We start by deeply understanding your business, your users, and your goals. Discovery shapes every decision that follows.",
  },
  {
    num: "02",
    title: "Design",
    description:
      "From wireframes to high-fidelity UI, we design with your brand and your users in mind — before a single line of code is written.",
  },
  {
    num: "03",
    title: "Build",
    description:
      "Our engineers write clean, tested, production-ready code. We move fast without sacrificing quality or security.",
  },
  {
    num: "04",
    title: "Launch",
    description:
      "We handle deployment, QA, and post-launch monitoring so you can launch with confidence and iterate quickly.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-ic-void overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96">
          <IcosahedronCanvas opacity={0.6} scale={2.4} className="w-full h-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-4">OUR SERVICES</p>
          <h1 className="font-serif text-5xl md:text-6xl font-normal text-ic-chalk tracking-tight leading-[1.1] max-w-3xl mb-6">
            Everything you need to build and grow online.
          </h1>
          <p className="text-ic-stone text-lg max-w-xl leading-relaxed">
            We cover the full spectrum of digital product development — from your first website to complex
            cross-platform applications.
          </p>
        </div>
      </section>

      {/* SERVICE DETAIL SECTIONS */}
      {services.map((svc, i) => (
        <section
          key={svc.id}
          id={svc.id}
          className={`py-20 ${i % 2 === 0 ? "bg-ic-void" : "bg-ic-surface"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div
                  className="p-3 rounded-lg border w-fit mb-6"
                  style={{ borderColor: svc.accent + "40", color: svc.accent, background: svc.accent + "15" }}
                >
                  <svc.icon className="h-12 w-12" />
                </div>
                <h2 className="font-serif text-4xl font-normal text-ic-chalk mb-4 tracking-tight">{svc.title}</h2>
                <p className="text-ic-stone leading-relaxed mb-6">{svc.description}</p>
                <div className="flex flex-wrap gap-2">
                  {svc.useCases.map((uc) => (
                    <Badge
                      key={uc}
                      className="font-mono text-[9px] tracking-widest uppercase border"
                      style={{ borderColor: svc.accent + "40", color: svc.accent, background: svc.accent + "12" }}
                    >
                      {uc}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <h3 className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-5">
                  WHAT&apos;S INCLUDED
                </h3>
                <ul className="space-y-3">
                  {svc.included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: svc.accent }} />
                      <span className="text-ic-chalk text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* PROCESS */}
      <section className="py-24 bg-ic-void">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-3">HOW WE WORK</p>
          <h2 className="font-serif text-4xl font-normal text-ic-chalk tracking-tight mb-16">Our process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-mono text-3xl font-bold text-ic-lavender mb-3">{step.num}</p>
                <h3 className="font-serif text-xl text-ic-chalk mb-2">{step.title}</h3>
                <p className="text-ic-stone text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ic-surface">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Card className="bg-ic-void border-ic-border p-10">
            <h2 className="font-serif text-3xl font-normal text-ic-chalk mb-4">
              Ready to start your project?
            </h2>
            <p className="text-ic-stone mb-8">
              Tell us what you&apos;re building and we&apos;ll put together a tailored proposal.
            </p>
            <Link href="/contact">
              <Button className="bg-ic-deep-cipher hover:bg-ic-cipher-core text-purple-50 font-mono text-[12px] tracking-widest uppercase px-8 py-5">
                Start a project
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </>
  );
}
