export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface Category {
  id:string;
  name: string;
  links: LinkItem[];
}
