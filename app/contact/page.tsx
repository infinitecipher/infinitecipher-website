"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail, Clock, Globe } from "lucide-react";

const ContactShapeCanvas = dynamic(() => import("@/components/three/ContactShapeCanvas"), { ssr: false });

const contactDetails = [
  { icon: Mail, label: "Email", value: "infinitecipher04@gmail.com", href: "mailto:infinitecipher04@gmail.com" },
  { icon: Clock, label: "Response time", value: "Within 24 hours" },
  { icon: Globe, label: "Location", value: "Remote-first, worldwide" },
];

export default function ContactPage() {
  return (
    <section className="relative pt-32 pb-24 bg-ic-void overflow-hidden min-h-screen">
      <ContactShapeCanvas />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-4">GET IN TOUCH</p>
          <h1 className="font-serif text-5xl font-normal text-ic-chalk tracking-tight leading-[1.1] mb-6">
            Let&apos;s build something together.
          </h1>
          <p className="text-ic-stone leading-relaxed mb-12 max-w-md">
            Whether you have a clear brief or just an idea, we&apos;re here to help you figure out the best path
            forward. Reach out and let&apos;s start the conversation.
          </p>

          <div className="space-y-6">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="flex items-center gap-4">
                <div className="p-2 rounded-md border border-ic-border bg-ic-surface">
                  <detail.icon className="h-4 w-4 text-ic-lavender" />
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted">{detail.label}</p>
                  {detail.href ? (
                    <a href={detail.href} className="text-ic-chalk text-sm hover:text-ic-lavender transition-colors">
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-ic-chalk text-sm">{detail.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
