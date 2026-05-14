"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, Globe, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactShapeCanvas = dynamic(() => import("@/components/three/ContactShapeCanvas"), { ssr: false });

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  service?: string;
}

const contactDetails = [
  { icon: Mail, label: "Email", value: "hello@infinitecipher.com" },
  { icon: Clock, label: "Response time", value: "Within 24 hours" },
  { icon: Globe, label: "Location", value: "Remote-first, worldwide" },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    if (!form.service) errs.service = "Please select a service";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
  };

  const inputBase = "bg-ic-void border-ic-border text-ic-chalk placeholder:text-ic-muted focus:border-ic-lavender";
  const inputError = "border-[#E24B4A] focus:border-[#E24B4A]";

  return (
    <section className="relative pt-32 pb-24 bg-ic-void overflow-hidden min-h-screen">
      <ContactShapeCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
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
                    <p className="text-ic-chalk text-sm">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Card className="bg-ic-surface border-ic-border">
              <CardHeader className="pb-4">
                <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted">SEND A MESSAGE</p>
              </CardHeader>
              <CardContent>
                {success ? (
                  <div className="py-16 text-center">
                    <CheckCircle2 className="h-12 w-12 text-ic-teal mx-auto mb-4" />
                    <h3 className="font-serif text-2xl text-ic-chalk mb-2">Message sent!</h3>
                    <p className="text-ic-stone">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <Label
                        htmlFor="name"
                        className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-1.5 block"
                      >
                        Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`${inputBase} ${errors.name ? inputError : ""}`}
                      />
                      {errors.name && <p className="text-[#E24B4A] text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-1.5 block"
                      >
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`${inputBase} ${errors.email ? inputError : ""}`}
                      />
                      {errors.email && <p className="text-[#E24B4A] text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label
                        htmlFor="company"
                        className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-1.5 block"
                      >
                        Company
                      </Label>
                      <Input
                        id="company"
                        placeholder="Your company (optional)"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={inputBase}
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="service"
                        className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-1.5 block"
                      >
                        Service *
                      </Label>
                      <Select
                        value={form.service}
                        onValueChange={(v) => setForm({ ...form, service: v ?? "" })}
                      >
                        <SelectTrigger
                          id="service"
                          className={`bg-ic-void border-ic-border text-ic-chalk ${errors.service ? "border-[#E24B4A]" : ""}`}
                        >
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-ic-surface border-ic-border">
                          <SelectItem value="website" className="text-ic-chalk focus:bg-ic-border">
                            Website Profile
                          </SelectItem>
                          <SelectItem value="webapp" className="text-ic-chalk focus:bg-ic-border">
                            Web Application
                          </SelectItem>
                          <SelectItem value="mobile" className="text-ic-chalk focus:bg-ic-border">
                            Mobile App
                          </SelectItem>
                          <SelectItem value="other" className="text-ic-chalk focus:bg-ic-border">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.service && <p className="text-[#E24B4A] text-xs mt-1">{errors.service}</p>}
                    </div>

                    <div>
                      <Label
                        htmlFor="message"
                        className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-1.5 block"
                      >
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project..."
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputBase} ${errors.message ? inputError : ""}`}
                      />
                      {errors.message && <p className="text-[#E24B4A] text-xs mt-1">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-ic-deep-cipher hover:bg-ic-cipher-core text-purple-50 font-mono text-[12px] tracking-widest uppercase py-6"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Send message"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
