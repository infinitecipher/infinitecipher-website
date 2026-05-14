"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FloatingShapesCanvas = dynamic(() => import("@/components/three/FloatingShapesCanvas"), { ssr: false });

interface Project {
  name: string;
  category: string;
  tags: string[];
  description: string;
  gradFrom: string;
  gradTo: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    name: "NexaShop",
    category: "Web App",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    description: "A full-featured e-commerce platform with real-time inventory, payments, and analytics dashboard.",
    gradFrom: "#534AB7",
    gradTo: "#3C3489",
    accentColor: "#534AB7",
  },
  {
    name: "PulseHealth",
    category: "Mobile App",
    tags: ["React Native", "iOS", "Android"],
    description: "Health tracking app with appointment booking, telemedicine, and wearable device integration.",
    gradFrom: "#5DCAA5",
    gradTo: "#0F6E56",
    accentColor: "#5DCAA5",
  },
  {
    name: "VertexCo",
    category: "Website",
    tags: ["Next.js", "Sanity CMS", "SEO"],
    description: "Polished corporate website with CMS integration and a perfect 100/100 Lighthouse performance score.",
    gradFrom: "#AFA9EC",
    gradTo: "#3C3489",
    accentColor: "#AFA9EC",
  },
  {
    name: "FlowDesk",
    category: "Web App",
    tags: ["React", "WebSockets", "Node.js"],
    description: "Real-time customer support platform with live chat, ticketing, and team collaboration features.",
    gradFrom: "#534AB7",
    gradTo: "#5DCAA5",
    accentColor: "#534AB7",
  },
  {
    name: "Nomad App",
    category: "Mobile App",
    tags: ["React Native", "Maps API", "Offline"],
    description: "Travel companion app with offline maps, trip planning, and community-driven recommendations.",
    gradFrom: "#5DCAA5",
    gradTo: "#534AB7",
    accentColor: "#5DCAA5",
  },
  {
    name: "ClarityMD",
    category: "Website",
    tags: ["Next.js", "HIPAA", "Booking"],
    description: "Healthcare provider website with HIPAA-compliant patient booking and telehealth integration.",
    gradFrom: "#AFA9EC",
    gradTo: "#0F6E56",
    accentColor: "#AFA9EC",
  },
];

const filters = ["All", "Website", "Web App", "Mobile App"];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-ic-void overflow-hidden">
      <FloatingShapesCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-3">PORTFOLIO</p>
        <h1 className="font-serif text-5xl md:text-6xl font-normal text-ic-chalk tracking-tight mb-4">
          Work we&apos;ve done
        </h1>
        <p className="text-ic-stone text-lg mb-12 max-w-xl">
          A selection of projects that showcase our range across web, mobile, and digital experiences.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-mono text-[11px] tracking-widest uppercase px-5 py-2 border transition-colors duration-200 ${
                activeFilter === f
                  ? "bg-ic-deep-cipher border-ic-deep-cipher text-purple-50"
                  : "bg-ic-surface border-ic-border text-ic-muted hover:text-ic-chalk hover:border-ic-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj, i) => (
              <motion.div
                key={proj.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Card className="group bg-ic-surface border-ic-border hover:border-ic-lavender transition-all duration-300 hover:scale-[1.02] overflow-hidden h-full">
                  <div
                    className="h-48 w-full"
                    style={{ background: `linear-gradient(135deg, ${proj.gradFrom}, ${proj.gradTo})` }}
                  />
                  <CardHeader className="pt-5 pb-2">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-serif text-xl text-ic-chalk">{proj.name}</h3>
                      <Badge
                        className="font-mono text-[9px] tracking-widest uppercase border shrink-0"
                        style={{
                          borderColor: proj.accentColor + "40",
                          color: proj.accentColor,
                          background: proj.accentColor + "15",
                        }}
                      >
                        {proj.category}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] tracking-wide text-ic-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-5">
                    <p className="text-ic-stone text-sm leading-relaxed mb-4">{proj.description}</p>
                    <Link
                      href="/contact"
                      className="text-ic-lavender font-mono text-[11px] tracking-wide hover:text-ic-chalk transition-colors"
                    >
                      View case study →
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
