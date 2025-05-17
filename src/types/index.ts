
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface Category {
  id:string;
  name: string;
  description: string; // Category description
  icon?: string; // Optional: Lucide icon name for the category
  links: LinkItem[];
}

