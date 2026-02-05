"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";

export interface ProjectItem {
  name: string;
  description: string;
  summary: string;
  role?: string;
  technologies?: string[];
  images: string[];
  links?: { label: string; url: string }[];
}

interface ProjectsSectionProps {
  title: string;
  subtitle?: string;
  projects: ProjectItem[];
}

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  // Modal + carousel to explore project details without leaving the page.
  const [emblaRef] = useEmblaCarousel({ loop: true });

  if (!project) return null;
  const images = project.images.length
    ? project.images
    : ["/images/projects/project-01/cover-01.jpg"];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-panel relative mx-4 max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-3xl p-8"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:text-white"
          >
            Close
          </button>
          <Row gap="32" s={{ direction: "column" }}>
            <Column gap="16" maxWidth="m">
              <Heading as="h3" variant="display-strong-s">
                {project.name}
              </Heading>
              <Text onBackground="neutral-weak" variant="heading-default-m">
                {project.summary}
              </Text>
              {project.role && (
                <Text variant="body-default-m">Role: {project.role}</Text>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <Row gap="8" wrap>
                  {project.technologies.map((tech) => (
                    <span
                      key={`${project.name}-${tech}`}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </Row>
              )}
              {project.links && project.links.length > 0 && (
                <Row gap="12" wrap>
                  {project.links.map((link) => (
                    <Button
                      key={link.url}
                      href={link.url}
                      variant="secondary"
                      size="s"
                      data-border="rounded"
                    >
                      {link.label}
                    </Button>
                  ))}
                </Row>
              )}
            </Column>
            <div className="w-full overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex">
                {images.map((image, idx) => (
                  <div key={`${image}-${idx}`} className="relative min-w-0 flex-[0_0_100%]">
                    <div className="relative h-[320px] w-full">
                      <Image
                        src={image}
                        alt={`${project.name} screenshot ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 900px) 90vw, 720px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Row>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ProjectsSection({ title, subtitle, projects }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  if (projects.length === 0) return null;

  return (
    <section id="projects" data-aos="fade-up" className="w-full">
      <Column fillWidth gap="xl" paddingY="72" paddingX="l">
        <Column gap="12" maxWidth="m">
          <Heading as="h2" variant="display-strong-s">
            {title}
          </Heading>
          {subtitle && (
            <Text onBackground="neutral-weak" variant="heading-default-m" className="text-balance">
              {subtitle}
            </Text>
          )}
        </Column>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const coverImage = project.images.length
              ? project.images[0]
              : "/images/projects/project-01/cover-01.jpg";
            return (
              <motion.button
                key={project.name}
                onClick={() => setActiveProject(project)}
                whileHover={{ y: -6 }}
                className="glass-panel group flex h-full flex-col rounded-3xl p-6 text-left transition"
              >
                <div className="relative mb-4 h-44 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={coverImage}
                    alt={project.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 900px) 90vw, 420px"
                  />
                </div>
                <Heading as="h3" variant="heading-strong-l">
                  {project.name}
                </Heading>
                <Text onBackground="neutral-weak" variant="body-default-m" className="mt-2">
                  {project.description}
                </Text>
                <span className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60">
                  View project
                </span>
              </motion.button>
            );
          })}
        </div>
      </Column>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
