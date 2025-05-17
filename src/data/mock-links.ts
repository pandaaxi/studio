
import type { Category } from '@/types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "dev-tools",
    name: "Developer Tools",
    description: "Essential tools, platforms, and services for building, testing, and deploying software projects efficiently.",
    links: [
      { 
        id: "gh", 
        title: "GitHub", 
        url: "https://github.com", 
        description: "The leading platform for software development, version control, and collaboration. Host and review code, manage projects, and build software alongside millions of developers." 
      },
      { 
        id: "vscode", 
        title: "Visual Studio Code", 
        url: "https://code.visualstudio.com/", 
        description: "A popular, free, and open-source code editor with powerful features like IntelliSense, debugging, Git integration, and a vast ecosystem of extensions." 
      },
      {
        id: "docker",
        title: "Docker",
        url: "https://www.docker.com/",
        description: "A platform for developing, shipping, and running applications in containers, ensuring consistency across different environments."
      }
    ],
  },
  {
    id: "design-resources",
    name: "Design Resources",
    description: "Find inspiration, UI kits, stock photos, and collaborative tools for your creative design projects.",
    links: [
      { 
        id: "figma", 
        title: "Figma", 
        url: "https://figma.com", 
        description: "A collaborative interface design tool that allows teams to design, prototype, and gather feedback all in one place. Browser-based and feature-rich." 
      },
      { 
        id: "dribbble", 
        title: "Dribbble", 
        url: "https://dribbble.com", 
        description: "A vibrant online community for designers to showcase their work, discover inspiration, and connect with creative professionals from around the world." 
      },
      {
        id: "unsplash",
        title: "Unsplash",
        url: "https://unsplash.com/",
        description: "A source of freely-usable high-resolution images contributed by photographers worldwide."
      }
    ],
  },
  {
    id: "learning-platforms",
    name: "Learning Platforms",
    description: "Expand your knowledge and acquire new skills with a wide range of online courses and educational resources.",
    links: [
      {
        id: "coursera",
        title: "Coursera",
        url: "https://www.coursera.org/",
        description: "Online learning platform offering courses, Specializations, and degrees from top universities and institutions."
      },
      {
        id: "freecodecamp",
        title: "freeCodeCamp",
        url: "https://www.freecodecamp.org/",
        description: "A non-profit organization that helps people learn to code for free through an interactive curriculum and community."
      }
    ]
  }
];
