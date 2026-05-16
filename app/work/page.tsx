"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, filters, filterProjects } from "@/lib/projects";

const FloatingShapesCanvas = dynamic(() => import("@/components/three/FloatingShapesCanvas"), { ssr: false });

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = filterProjects(projects, activeFilter);

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
                  {proj.image ? (
                    <div className="h-48 w-full overflow-hidden">
                      <Image
                        src={proj.image}
                        alt={proj.name}
                        width={1911}
                        height={913}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-48 w-full"
                      style={{ background: `linear-gradient(135deg, ${proj.gradFrom}, ${proj.gradTo})` }}
                    />
                  )}
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
                    {proj.url ? (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ic-lavender font-mono text-[11px] tracking-wide hover:text-ic-chalk transition-colors"
                      >
                        Visit site →
                      </a>
                    ) : (
                      <Link
                        href="/contact"
                        className="text-ic-lavender font-mono text-[11px] tracking-wide hover:text-ic-chalk transition-colors"
                      >
                        View case study →
                      </Link>
                    )}
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
