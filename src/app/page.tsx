import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import portfolioData from "@/data/portfolio";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import resume from "@/data/resume";

export async function generateMetadata() {
  const title = `${resume.basics.name} Portfolio`;
  return Meta.generate({
    title,
    description: resume.basics.summary,
    baseURL,
    path: "/",
    image: "/images/og/home.jpg",
  });
}

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" horizontal="center" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/"
        title={`${resume.basics.name} Portfolio`}
        description={resume.basics.summary}
        image={`/api/og/generate?title=${encodeURIComponent(resume.basics.name)}`}
        author={{
          name: resume.basics.name,
          url: baseURL,
          image: `${baseURL}${resume.basics.avatar}`,
        }}
      />
      <HeroSection {...portfolioData.hero} />
      <AboutSection {...portfolioData.about} />
      <SkillsSection
        title={portfolioData.skills.title}
        subtitle={portfolioData.skills.subtitle}
        skills={portfolioData.skills.items}
      />
      <ProjectsSection
        title={portfolioData.projects.title}
        subtitle={portfolioData.projects.subtitle}
        projects={portfolioData.projects.items}
      />
      <TestimonialsSection
        title={portfolioData.testimonials.title}
        subtitle={portfolioData.testimonials.subtitle}
        testimonials={portfolioData.testimonials.items}
      />
      <ContactSection
        title={portfolioData.contact.title}
        subtitle={portfolioData.contact.subtitle}
        email={portfolioData.contact.email}
      />
    </Column>
  );
}
