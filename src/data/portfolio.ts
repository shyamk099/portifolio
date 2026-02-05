import resume from "./resume";

export const portfolioData = {
  hero: {
    name: resume.basics.name,
    role: resume.basics.label,
    headline: resume.basics.headline,
    subline: resume.basics.subline,
    location: resume.basics.locationLabel ?? resume.basics.location,
    avatar: resume.basics.avatar,
    highlights: resume.basics.highlights ?? [],
    resumeUrl: resume.basics.resumeUrl,
  },
  about: {
    title: resume.about.title,
    description: resume.about.description,
    timeline: resume.work.map((item) => ({
      title: `${item.position} · ${item.company}`,
      timeframe: `${item.startDate} - ${item.endDate ?? "Present"}`,
      description: item.summary,
    })),
  },
  skills: {
    title: "Skills",
    subtitle: "A blend of design, engineering, and product craft.",
    items: resume.skills,
  },
  projects: {
    title: "Selected Work",
    subtitle: "Deep dives into the projects and product systems I have shipped.",
    items: resume.projects,
  },
  testimonials: {
    title: "Testimonials",
    subtitle: "What collaborators and clients say about working together.",
    items: resume.testimonials,
  },
  contact: {
    title: "Let’s connect",
    subtitle: "Have a project in mind? Let’s talk about the next build.",
    email: resume.basics.email,
  },
};

export default portfolioData;
