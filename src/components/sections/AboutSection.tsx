import { Column, Heading, Row, Text } from "@once-ui-system/core";

export interface TimelineItem {
  title: string;
  timeframe: string;
  description: string;
}

interface AboutSectionProps {
  title: string;
  description: string;
  timeline: TimelineItem[];
}

export function AboutSection({ title, description, timeline }: AboutSectionProps) {
  return (
    <section id="about" data-aos="fade-up" className="w-full">
      <Column fillWidth gap="xl" paddingY="72" paddingX="l">
        <Row fillWidth s={{ direction: "column" }} gap="24" horizontal="between">
          <Column gap="16" maxWidth="m">
            <Heading as="h2" variant="display-strong-s" className="text-balance">
              {title}
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" className="text-balance">
              {description}
            </Text>
          </Column>
          <Column className="relative" gap="24" maxWidth="m">
            <div className="absolute left-4 top-3 h-full w-px bg-white/10" />
            {timeline.map((item) => (
              <Row key={`${item.title}-${item.timeframe}`} gap="16" align="flex-start">
                <div className="mt-2 h-3 w-3 rounded-full bg-white/80 shadow-glow" />
                <Column gap="8" className="glass-panel rounded-2xl px-5 py-4">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {item.timeframe}
                  </Text>
                  <Heading as="h3" variant="heading-strong-m">
                    {item.title}
                  </Heading>
                  <Text onBackground="neutral-weak" variant="body-default-m" className="text-balance">
                    {item.description}
                  </Text>
                </Column>
              </Row>
            ))}
          </Column>
        </Row>
      </Column>
    </section>
  );
}
