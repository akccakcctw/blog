import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "爲了可能的聲音",
  DESCRIPTION: "爲了可能的聲音",
  EMAIL: "rex@rex-tsou.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 0,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Astro Micro is an accessible theme for Astro.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "爲了可能的聲音",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X (formerly Twitter)",
    HREF: "https://twitter.com/akccakcctw",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/akccakcctw",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/鄒適齊-rex",
  },
];
