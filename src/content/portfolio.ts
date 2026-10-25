export type NavigationItem = {
  readonly label: string;
  readonly href: `#${string}`;
  readonly index: string;
};

export type CallToAction = {
  readonly label: string;
  readonly href: `#${string}`;
};

export type IdentityFact = {
  readonly label: string;
  readonly value: string;
};

export type ProjectLink = {
  readonly label: "GitHub" | "Live demo";
  readonly href: string | null;
};

export type Project = {
  readonly id: string;
  readonly index: string;
  readonly name: string;
  readonly year: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly thumbnail: {
    readonly alt: string;
    readonly src: string | null;
  };
  readonly links: readonly ProjectLink[];
  readonly status: string;
};

export type ExperienceItem = {
  readonly id: string;
  readonly index: string;
  readonly role: string;
  readonly organization: string;
  readonly location: string;
  readonly period: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly status: string;
};

export type ContactLink = {
  readonly label: string;
  readonly href: string | null;
  readonly external: boolean;
};

export type ContactContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly email: string | null;
  readonly links: readonly ContactLink[];
  readonly resume: {
    readonly label: string;
    readonly href: string | null;
  };
  readonly note: string;
};

export type PortfolioContent = {
  readonly identity: {
    readonly displayName: string;
    readonly fullName: string;
    readonly role: string;
    readonly focus: string;
    readonly positioning: string;
    readonly location: string;
  };
  readonly navigation: readonly NavigationItem[];
  readonly hero: {
    readonly eyebrow: string;
    readonly kicker: string;
    readonly statement: string;
    readonly emphasis: string;
    readonly summary: string;
    readonly primaryAction: CallToAction;
    readonly secondaryAction: CallToAction;
    readonly nextLabel: string;
  };
  readonly introduction: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lede: string;
    readonly body: string;
    readonly draftNote: string;
    readonly facts: readonly IdentityFact[];
  };
  readonly projects: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly items: readonly Project[];
    readonly footnote: string;
  };
  readonly experience: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly items: readonly ExperienceItem[];
    readonly footnote: string;
  };
  readonly contact: ContactContent;
  readonly footer: {
    readonly note: string;
    readonly backToTop: string;
    readonly builtWith: string;
  };
};

export const portfolio = {
  identity: {
    displayName: "Vaibhav",
    fullName: "Vaibhav Vats",
    role: "Software Engineer",
    focus: "AI Engineer",
    positioning: "Software Engineer · AI Engineer",
    location: "[Pending]",
  },
  navigation: [
    { index: "01", label: "Home", href: "#home" },
    { index: "02", label: "About", href: "#about" },
    { index: "03", label: "Skills", href: "#skills" },
    { index: "04", label: "Projects", href: "#work" },
    { index: "05", label: "Experience", href: "#experience" },
    { index: "06", label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Portfolio / 2026",
    kicker: "Software / AI",
    statement: "Software Engineer.",
    emphasis: "AI Engineer.",
    summary:
      "An evolving record of the work, the process, and the questions that shape it. The full body of work will appear here as it is documented.",
    primaryAction: { label: "Explore selected work", href: "#work" },
    secondaryAction: { label: "Read introduction", href: "#about" },
    nextLabel: "Next / Introduction",
  },
  introduction: {
    eyebrow: "02 / Introduction",
    title: "Engineering clarity into the work.",
    lede: "I'm Vaibhav Vats, a software engineer and AI engineer.",
    body: "The through-line is simple: build software that is dependable beneath the surface and considered on it. The longer biography, technical notes, and working principles are still being written.",
    draftNote: "Professional identity",
    facts: [
      { label: "Discipline", value: "Software engineering" },
      { label: "Current direction", value: "AI engineering" },
      { label: "Technical interests", value: "[Pending]" },
      { label: "Based in", value: "[Pending]" },
    ],
  },
  projects: {
    eyebrow: "03 / Selected work",
    title: "Selected projects",
    intro:
      "A focused set of projects, presented with context. Each entry keeps its details explicit until they are verified and approved.",
    items: [
      {
        id: "project-01",
        index: "03.01",
        name: "Project 01",
        year: "[Pending]",
        description:
          "Project name, description, role, constraints, and approach are awaiting verified details.",
        technologies: ["[Pending]"],
        thumbnail: {
          alt: "Project preview placeholder",
          src: null,
        },
        links: [
          { label: "GitHub", href: null },
          { label: "Live demo", href: null },
        ],
        status: "[Pending]",
      },
      {
        id: "project-02",
        index: "03.02",
        name: "Project 02",
        year: "[Pending]",
        description:
          "Project name, description, role, constraints, and approach are awaiting verified details.",
        technologies: ["[Pending]"],
        thumbnail: {
          alt: "Project preview placeholder",
          src: null,
        },
        links: [
          { label: "GitHub", href: null },
          { label: "Live demo", href: null },
        ],
        status: "[Pending]",
      },
    ],
    footnote:
      "Links remain disabled until verified URLs are provided. No metrics or achievements are included.",
  },
  experience: {
    eyebrow: "04 / Experience",
    title: "Experience",
    intro:
      "A factual timeline of verified roles and contributions. Unconfirmed details remain pending.",
    items: [
      {
        id: "exp-01",
        index: "04.01",
        role: "[Pending]",
        organization: "[Pending]",
        location: "[Pending]",
        period: "[Pending]",
        summary:
          "Role summary and verified contributions to be added when confirmed.",
        highlights: ["[Pending]"],
        status: "[Pending] / Details to confirm",
      },
    ],
    footnote: "No employers, dates, or accomplishments are invented.",
  },
  contact: {
    eyebrow: "05 / Contact",
    title: "Get in touch",
    body: "For collaboration or questions, use a verified channel when available. No form is included in this phase.",
    email: null,
    links: [
      { label: "GitHub", href: null, external: true },
      { label: "LinkedIn", href: null, external: true },
    ],
    resume: {
      label: "Resume",
      href: null,
    },
    note: "All contact details remain [Pending] until verified.",
  },
  footer: {
    note: "A modern developer portfolio crafted with intention.",
    backToTop: "Back to top",
    builtWith: "Next.js / Three.js / Tailwind CSS / Motion",
  },
} as const satisfies PortfolioContent;
