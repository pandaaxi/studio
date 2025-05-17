
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, PanelLeft } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { SuggestDescriptionDialog } from '@/components/suggest-description-dialog';
import { SidebarTrigger } from '@/components/ui/sidebar'; // Added for sidebar toggle

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  showSidebarToggle?: boolean; // New optional prop
}

export function Header({ searchTerm, setSearchTerm, showSidebarToggle }: HeaderProps) {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4"> {/* Wrapper for toggle and title */}
          {showSidebarToggle && (
            <SidebarTrigger className="md:hidden"> {/* Hidden on md and up by default by ui/sidebar logic, trigger for mobile sheet */}
              <PanelLeft className="h-5 w-5" />
            </SidebarTrigger>
          )}
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

        <div className="flex items-center gap-2">
          <SuggestDescriptionDialog />
        </div>
      </div>
    </header>
  );
}
