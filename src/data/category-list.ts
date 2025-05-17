
import type { Category } from '@/types';

export const CATEGORIES: Category[] = [
  {
    id: "dev-tools",
    name: "Developer Tools",
    description: "Essential tools for building and deploying software.",
    icon: "Code2",
    source: "/dev-tools.md", // Path relative to public directory
  },
  {
    id: "design-resources",
    name: "Design Resources",
    description: "Inspiration, UI kits, and tools for creative projects.",
    icon: "Palette",
    source: "/design-resources.md", // Path relative to public directory
  },
  {
    id: "learning-platforms",
    name: "Learning Platforms",
    description: "Online courses and educational resources to expand your skills.",
    icon: "BookOpenCheck",
    source: "/learning-platforms.md", // Path relative to public directory
  }
];
