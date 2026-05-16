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
];

export const filters = ["All", "Website", "Web App", "Mobile App"] as const;

export function filterProjects(list: Project[], category: string): Project[] {
  return category === "All" ? list : list.filter((p) => p.category === category);
}
