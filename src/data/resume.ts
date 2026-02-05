import resumeJson from "./resume.json";

export interface ResumeBasics {
  name: string;
  label: string;
  email: string;
  location: string;
  timezone?: string;
  locationLabel?: string;
  summary: string;
  headline: string;
  subline: string;
  avatar: string;
  highlights?: string[];
  resumeUrl?: string;
}

export interface ResumeSkill {
  name: string;
  level: number;
  icon?: string;
  keywords?: string[];
}

export interface ResumeWorkItem {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  summary: string;
  highlights?: string[];
}

export interface ResumeEducationItem {
  institution: string;
  studyType?: string;
  area?: string;
  endDate?: string;
}

export interface ResumeProjectItem {
  name: string;
  description: string;
  summary: string;
  role?: string;
  technologies?: string[];
  images: string[];
  links?: { label: string; url: string }[];
}

export interface ResumeTestimonial {
  name: string;
  role: string;
  quote: string;
}

export interface ResumeSocial {
  name: string;
  icon: string;
  url: string;
}

export interface ResumeData {
  basics: ResumeBasics;
  about: {
    title: string;
    description: string;
  };
  skills: ResumeSkill[];
  work: ResumeWorkItem[];
  education: ResumeEducationItem[];
  projects: ResumeProjectItem[];
  testimonials: ResumeTestimonial[];
  social: ResumeSocial[];
}

const resume = resumeJson as ResumeData;

export default resume;
