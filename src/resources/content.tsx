import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import resume from "@/data/resume";
import { IconName } from "@/resources/icons";

const person: Person = {
  firstName: resume.basics.name.split(" ")[0] ?? resume.basics.name,
  lastName: resume.basics.name.split(" ").slice(1).join(" "),
  name: resume.basics.name,
  role: resume.basics.label,
  avatar: resume.basics.avatar,
  email: resume.basics.email,
  location: (resume.basics.timezone ?? resume.basics.location) as Person["location"],
  languages: [],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe</>,
  description: <>Get occasional updates.</>,
};

const social: Social = resume.social.map((item) => ({
  name: item.name,
  icon: item.icon as IconName,
  link: item.url,
  essential: true,
}));

const featuredProject = resume.projects[0];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: resume.basics.summary,
  headline: <>{resume.basics.headline}</>,
  featured: {
    display: Boolean(featuredProject),
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          {featuredProject?.name}
        </Text>
      </Row>
    ),
    href: featuredProject ? "#projects" : "/",
  },
  subline: <>{resume.basics.subline}</>,
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: <>{resume.about.description}</>,
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: resume.work.map((item) => ({
      company: item.company,
      timeframe: `${item.startDate} - ${item.endDate ?? "Present"}`,
      role: item.position,
      achievements: [<>{item.summary}</>, ...(item.highlights ?? []).map((h) => <>{h}</>)],
      images: [],
    })),
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: resume.education.map((item) => ({
      name: item.institution,
      description: <>{`${item.studyType ?? ""} ${item.area ?? ""}`.trim()}</>,
    })),
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: resume.skills.map((skill) => ({
      title: skill.name,
      description: skill.keywords ? <>{skill.keywords.join(" · ")}</> : undefined,
      tags: [{ name: skill.name }],
      images: [],
    })),
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
