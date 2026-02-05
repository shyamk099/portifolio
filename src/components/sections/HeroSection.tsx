"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Badge, Button, Column, Heading, Row, Text } from "@once-ui-system/core";

interface HeroSectionProps {
  name: string;
  role: string;
  headline: string;
  subline: string;
  location: string;
  avatar: string;
  highlights?: string[];
  resumeUrl?: string;
  contactHref?: string;
}

export function HeroSection({
  name,
  role,
  headline,
  subline,
  location,
  avatar,
  highlights = [],
  resumeUrl,
  contactHref = "#contact",
}: HeroSectionProps) {
  // Hero with parallax mesh background and motion-based intro copy.
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section id="home" data-aos="fade-up" className="relative w-full">
      <motion.div
        style={{ y: parallaxY }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
      >
        <div className="hero-mesh h-full w-full" />
      </motion.div>
      <Column
        fillWidth
        gap="xl"
        paddingY="80"
        paddingX="l"
        className="relative"
      >
        <Row gap="xl" s={{ direction: "column" }} vertical="center" horizontal="between">
          <Column gap="24" maxWidth="m">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Badge
                background="brand-alpha-weak"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                className="w-fit"
              >
                {location} · {role}
              </Badge>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Heading as="h1" variant="display-strong-xl" className="text-balance">
                <span className="text-gradient">{headline}</span>
              </Heading>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Text variant="heading-default-xl" onBackground="neutral-weak" className="text-balance">
                {subline}
              </Text>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Row gap="12" wrap>
                <Button
                  href={contactHref}
                  variant="primary"
                  size="l"
                  data-border="rounded"
                  className="transition-transform hover:-translate-y-1"
                >
                  Let’s build together
                </Button>
                {resumeUrl && (
                  <Button
                    href={resumeUrl}
                    variant="secondary"
                    size="l"
                    data-border="rounded"
                    className="transition-transform hover:-translate-y-1"
                  >
                    Download resume
                  </Button>
                )}
              </Row>
            </motion.div>
            {highlights.length > 0 && (
              <Row gap="8" wrap>
                {highlights.map((item) => (
                  <Badge
                    key={item}
                    background="neutral-alpha-weak"
                    onBackground="neutral-strong"
                    textVariant="label-default-s"
                  >
                    {item}
                  </Badge>
                ))}
              </Row>
            )}
          </Column>
          <Column
            className="relative"
            gap="12"
            horizontal="center"
            vertical="center"
          >
            <div className="glass-panel rounded-[28px] p-4 shadow-glass">
              <div className="relative h-[320px] w-[260px] overflow-hidden rounded-[22px]">
                <Image
                  src={avatar}
                  alt={`${name} portrait`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 220px, 260px"
                  priority
                />
              </div>
            </div>
            <Text onBackground="neutral-weak" variant="body-default-s">
              {name}
            </Text>
          </Column>
        </Row>
      </Column>
    </section>
  );
}
