import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ICLogo } from "@/components/ICLogo";
import { Mail, MapPin } from "lucide-react";

const serviceLinks = [
  { href: "/services#websites", label: "Website Profiles" },
  { href: "/services#webapps", label: "Web Applications" },
  { href: "/services#mobile", label: "Mobile Apps" },
];

const companyLinks = [
  { href: "/work", label: "Our Work" },
  { href: "/#about", label: "About" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-ic-void border-t border-ic-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div className="space-y-4">
            <ICLogo size={26} />
            <p className="text-ic-stone text-sm leading-relaxed max-w-[200px]">
              Web and mobile development studio helping businesses build digital products that perform.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ic-stone hover:text-ic-chalk transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ic-stone hover:text-ic-chalk transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest uppercase text-ic-muted mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-ic-stone">
                <Mail className="h-3.5 w-3.5 text-ic-lavender flex-shrink-0" />
                hello@infinitecipher.com
              </li>
              <li className="flex items-center gap-2 text-sm text-ic-stone">
                <MapPin className="h-3.5 w-3.5 text-ic-lavender flex-shrink-0" />
                Remote-first, worldwide
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-ic-border" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted-2">
            © 2026 InfiniteCipher. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase text-ic-muted-2">
            ENCODE · BUILD · SECURE
          </p>
        </div>
      </div>
    </footer>
  );
}
