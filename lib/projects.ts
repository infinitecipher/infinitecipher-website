export interface Project {
  name: string;
  category: string;
  tags: string[];
  description: string;
  gradFrom: string;
  gradTo: string;
  accentColor: string;
  url?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    name: "Elite Global Workforce",
    category: "Website",
    tags: ["Next.js", "CMS", "WhatsApp API"],
    description: "International manpower and recruitment agency website connecting skilled workers from Asia and Africa with verified employers across Kuwait, Croatia, and Albania.",
    gradFrom: "#0C4A6E",
    gradTo: "#082F49",
    accentColor: "#38BDF8",
    url: "https://www.eliteglobalworkforce.com",
    image: "/work/elite-global-workforce.png",
  },
  {
    name: "AI SaaS Template",
    category: "Web App",
    tags: ["Next.js", "AI", "SaaS"],
    description: "A production-ready AI SaaS starter template with authentication, billing, and a clean dashboard — built to ship fast.",
    gradFrom: "#534AB7",
    gradTo: "#3C3489",
    accentColor: "#AFA9EC",
    url: "https://ai-saas-template.infinitecipher.com/",
    image: "/work/ai-saas-template.png",
  },
];

export const filters = ["All", "Website", "Web App", "Mobile App"] as const;

export function filterProjects(list: Project[], category: string): Project[] {
  return category === "All" ? list : list.filter((p) => p.category === category);
}
