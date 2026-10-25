// Skills grouped by category for Vaibhav Vats
export const skillCategories = [
  {
    name: "Frontend",
    color: "#61DAFB",
    items: ["React", "Next.js", "Redux", "TypeScript", "HTML5", "CSS3", "Tailwind", "MUI", "Modular CSS"],
  },
  {
    name: "Backend",
    color: "#6DB33F",
    items: ["Node.js", "Express", "Spring Boot", "REST APIs"],
  },
  {
    name: "Languages",
    color: "#E76F00",
    items: ["JavaScript", "Java", "C++", "C"],
  },
  {
    name: "Database",
    color: "#4D9FE0",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    name: "AI & System Design",
    color: "#A78BFA",
    items: ["Claude Code", "Cline", "Prompt Engineering", "AI Automation", "System Design"],
  },
  {
    name: "Tools & Cloud",
    color: "#FF9900",
    items: ["Git", "GitHub", "Docker", "AWS", "Postman", "Linux", "Maven", "VS Code", "IntelliJ IDEA"],
  },
];

export const allSkills = skillCategories.flatMap((cat) =>
  cat.items.map((label) => ({ label, category: cat.name }))
);
