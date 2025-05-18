
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mail } from 'lucide-react'; 
import type { Dispatch, SetStateAction } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  const mailtoHref = `mailto:admin@gmail.com?subject=${encodeURIComponent(
    "Link Suggestion for Homie Docs"
  )}&body=${encodeURIComponent(
    "Hello Homie Docs Team,\\n\\nI'd like to suggest the following:\\n\\nLink URL (if applicable):\\nSuggested Category:\\nBrief Description/Reason for suggestion:\\n\\nThanks,\\n"
  )}`;

  return (
    <header className="py-6 px-4 md:px-8 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-3xl font-bold text-primary hover:opacity-80 transition-opacity">
            Homie Docs
          </Link>
        </div>
        
        <div className="flex-grow w-full md:w-auto md:max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full bg-input focus:bg-background"
            aria-label="Search categories"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="rounded-full">
            <a href={mailtoHref}>
              <Mail className="mr-2 h-4 w-4" />
              Suggest a Link
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
