"use client";

import { motion } from "framer-motion";
import { Column, Heading, Icon, Row, Text } from "@once-ui-system/core";

export interface SkillItem {
  name: string;
  level: number;
  icon?: string;
  keywords?: string[];
}

interface SkillsSectionProps {
  title: string;
  subtitle?: string;
  skills: SkillItem[];
}

export function SkillsSection({ title, subtitle, skills }: SkillsSectionProps) {
  if (skills.length === 0) return null;
  return (
    <section id="skills" data-aos="fade-up" className="w-full">
      <Column fillWidth gap="xl" paddingY="64" paddingX="l">
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
        <Column gap="16" className="glass-panel rounded-3xl p-8">
          {skills.map((skill) => (
            <Column key={skill.name} gap="8">
              <Row horizontal="between" vertical="center">
                <Row gap="8" vertical="center">
                  {skill.icon ? <Icon name={skill.icon as never} size="s" /> : null}
                  <Text variant="body-strong-m">{skill.name}</Text>
                </Row>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {skill.level}%
                </Text>
              </Row>
              <div className="h-2 w-full rounded-full bg-white/10">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-accent-500 via-cyan-400 to-emerald-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
              {skill.keywords && skill.keywords.length > 0 && (
                <Row gap="8" wrap>
                  {skill.keywords.map((tag) => (
                    <span
                      key={`${skill.name}-${tag}`}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </Row>
              )}
            </Column>
          ))}
        </Column>
      </Column>
    </section>
  );
}
