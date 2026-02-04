import { z } from "zod";

export const cvLocaleSchema = z.enum(["en", "id"]);

const periodSchema = z
  .object({
    start: z.string().min(3),
    end: z.string().min(3)
  })
  .superRefine((period, ctx) => {
    const re = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}|Present$/;
    if (!re.test(period.start)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "start must use `MMM YYYY` format"
      });
    }
    if (!(re.test(period.end) || /^\d{4}$/.test(period.end))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "end must use `MMM YYYY`, `YYYY`, or `Present`"
      });
    }
  });

const identitySchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8)
});

const linksSchema = z.object({
  product: z.string().url(),
  portfolio: z.string().url(),
  github: z.string().url(),
  linkedin: z.string().url().optional()
});

const experienceSchema = z.object({
  role: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  period: periodSchema,
  employmentType: z.string().optional(),
  bullets: z.array(z.string().min(1)).min(1)
});

const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  location: z.string().min(1),
  period: periodSchema
});

const languageSchema = z.object({
  name: z.string().min(1),
  proficiency: z.string().min(1)
});

const skillsSchema = z.object({
  backend: z.array(z.string().min(1)).min(1),
  frontend: z.array(z.string().min(1)).min(1),
  architecture: z.array(z.string().min(1)).min(1),
  tooling: z.array(z.string().min(1)).min(1)
});

export const cvProfileSchema = z.object({
  identity: identitySchema,
  links: linksSchema,
  summary: z.string().min(1),
  experience: z.array(experienceSchema).min(1),
  education: z.array(educationSchema).min(1),
  languages: z.array(languageSchema).min(1),
  skills: skillsSchema
});

export type CVLocale = z.infer<typeof cvLocaleSchema>;
export type CVProfile = z.infer<typeof cvProfileSchema>;
