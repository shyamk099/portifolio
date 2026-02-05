"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";

const contactSchema = z.object({
  name: z.string().min(2, "Please add your name."),
  email: z.string().email("Please use a valid email."),
  message: z.string().min(10, "Tell me a bit more about your project."),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactSectionProps {
  title: string;
  subtitle?: string;
  email: string;
}

export function ContactSection({ title, subtitle, email }: ContactSectionProps) {
  // Contact form with client-side validation and API submission.
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <section id="contact" data-aos="fade-up" className="w-full">
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
        <Row gap="32" s={{ direction: "column" }}>
          <Column className="glass-panel w-full rounded-3xl p-8" gap="16">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">Name</label>
                <input
                  {...register("name")}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent-500"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">Email</label>
                <input
                  {...register("email")}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent-500"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-white/60">Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-accent-500"
                  placeholder="Tell me about your project goals."
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>
              <Row gap="12" vertical="center">
                <Button
                  type="submit"
                  variant="primary"
                  size="m"
                  data-border="rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  Or email me directly at {email}
                </Text>
              </Row>
              {status === "success" && (
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Thanks! I will reply within 1-2 business days.
                </Text>
              )}
              {status === "error" && (
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Something went wrong. Please email me directly.
                </Text>
              )}
            </form>
          </Column>
        </Row>
      </Column>
    </section>
  );
}
