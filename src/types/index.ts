
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface Category {
  id:string;
  name: string;
  description: string; // Added category description
  links: LinkItem[];
}
