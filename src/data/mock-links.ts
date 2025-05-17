
import type { Category } from '@/types';
import { Code2, Palette, BookOpenCheck, Gamepad2, BookMarked, DownloadCloud, Waypoints, Presentation, Smartphone, MonitorSmartphone, Languages, AppWindow } from 'lucide-react';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "gaming",
    name: "Gaming",
    description: "Download and play all your favourite games or emulate some old but gold ones!",
    icon: "Gamepad2",
    links: [],
  },
  {
    id: "reading",
    name: "Reading",
    description: "Whether you're a bookworm, otaku or comic book fan, you'll be able to find your favourite pieces of literature here for free!",
    icon: "BookMarked",
    links: [],
  },
  {
    id: "downloading",
    name: "Downloading",
    description: "Download all your favourite software, movies, TV shows, music, games and more!",
    icon: "DownloadCloud",
    links: [],
  },
  {
    id: "torrenting",
    name: "Torrenting",
    description: "Download your favourite media using the BitTorrent protocol.",
    icon: "Waypoints",
    links: [],
  },
  {
    id: "educational",
    name: "Educational",
    description: "Educational content for all ages.",
    icon: "Presentation",
    links: [],
  },
  {
    id: "android-ios",
    name: "Android / iOS",
    description: "All forms of content for Android and iOS.",
    icon: "Smartphone",
    links: [],
  },
  {
    id: "linux-macos",
    name: "Linux / macOS",
    description: "The $HOME of Linux and macOS.",
    icon: "MonitorSmartphone",
    links: [],
  },
  {
    id: "non-english",
    name: "Non English",
    description: "Content in languages other than English.",
    icon: "Languages",
    links: [],
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    description: "Various other resources and tools.",
    icon: "AppWindow",
    links: [],
  },
  {
    id: "dev-tools",
    name: "Developer Tools",
    description: "Essential tools for building and deploying software.",
    icon: "Code2",
    links: [
      { 
        id: "gh", 
        title: "GitHub", 
        url: "https://github.com", 
        description: "The leading platform for software development, version control, and collaboration." 
      },
      { 
        id: "vscode", 
        title: "Visual Studio Code", 
        url: "https://code.visualstudio.com/", 
        description: "A popular, free, and open-source code editor with powerful features." 
      },
    ],
  },
  {
    id: "design-resources",
    name: "Design Resources",
    description: "Inspiration, UI kits, and tools for creative projects.",
    icon: "Palette",
    links: [
      { 
        id: "figma", 
        title: "Figma", 
        url: "https://figma.com", 
        description: "A collaborative interface design tool." 
      },
    ],
  },
  {
    id: "learning-platforms",
    name: "Learning Platforms",
    description: "Online courses and educational resources to expand your skills.",
    icon: "BookOpenCheck",
    links: [
      {
        id: "coursera",
        title: "Coursera",
        url: "https://www.coursera.org/",
        description: "Online learning platform offering courses from top universities."
      }
    ]
  }
];
