"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Column, Heading, Row, Text } from "@once-ui-system/core";

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
}

interface TestimonialsSectionProps {
  title: string;
  subtitle?: string;
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({
  title,
  subtitle,
  testimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="testimonials" data-aos="fade-up" className="w-full">
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
        <div className="glass-panel overflow-hidden rounded-3xl p-8">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((item) => (
                <div key={item.name} className="min-w-0 flex-[0_0_100%] px-4">
                  <Column gap="16">
                    <Text variant="heading-default-m" className="text-balance">
                      “{item.quote}”
                    </Text>
                    <Row gap="8" vertical="center">
                      <div className="h-2 w-2 rounded-full bg-accent-500" />
                      <Text variant="body-strong-m">{item.name}</Text>
                      <Text onBackground="neutral-weak" variant="body-default-s">
                        {item.role}
                      </Text>
                    </Row>
                  </Column>
                </div>
              ))}
            </div>
          </div>
          <Row gap="8" marginTop="24" horizontal="center">
            {testimonials.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={`h-2 w-6 rounded-full transition ${
                  index === selectedIndex ? "bg-accent-500" : "bg-white/20"
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </Row>
        </div>
      </Column>
    </section>
  );
}
