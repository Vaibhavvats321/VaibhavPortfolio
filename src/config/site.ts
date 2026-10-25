import { portfolio } from "@/content/portfolio";

export const siteConfig = {
  name: portfolio.identity.displayName,
  fullName: portfolio.identity.fullName,
  title: `${portfolio.identity.fullName} — ${portfolio.identity.positioning}`,
  description:
    "Vaibhav Vats — Software Engineer · AI Engineer. A modern portfolio with interactive 3D skills globe, projects carousel, and day/night theme.",
  locale: "en",
  year: 2026,
  email: portfolio.contact.email,
  socialLinks: portfolio.contact.links,
} as const;
