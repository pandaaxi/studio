
import Link from 'next/link';
import { Input } from '@/components/ui/input';
// Removed Button import as it's no longer used directly if SuggestDescriptionDialog is the only button
import { Search } from 'lucide-react'; 
import type { Dispatch, SetStateAction } from 'react';
// Removed SuggestDescriptionDialog import

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-3xl font-bold text-primary hover:opacity-80 transition-opacity">
            Link Oasis
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

        {/* SuggestDescriptionDialog component removed from here */}
      </div>
    </header>
  );
}
