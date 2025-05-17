
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Footer } from '@/components/layout/footer';
import { CategorySection } from '@/components/category-section';
import { MOCK_CATEGORIES } from '@/data/mock-links';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, Search } from 'lucide-react';
import { SuggestDescriptionDialog } from '@/components/suggest-description-dialog';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return allCategories;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allCategories
      .map(category => ({
        ...category,
        links: category.links.filter(
          link =>
            link.title.toLowerCase().includes(lowerSearchTerm) ||
            link.description.toLowerCase().includes(lowerSearchTerm) ||
            link.url.toLowerCase().includes(lowerSearchTerm)
        ),
      }))
      .filter(category => category.links.length > 0 || category.name.toLowerCase().includes(lowerSearchTerm));
  }, [searchTerm, allCategories]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header component removed from here */}
      
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
        {/* New Intro Section */}
        <section className="text-center pt-12 pb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">Link Oasis</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your personal oasis of categorized website links, easily managed and discovered.
          </p>
          <div className="max-w-xl mx-auto mb-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search links or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-full bg-input focus:bg-background text-base shadow-sm"
              aria-label="Search links or categories"
            />
          </div>
          <div className="flex justify-center">
             <SuggestDescriptionDialog />
          </div>
        </section>

        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <CategorySection key={category.id} category={category} />
          ))
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">No links or categories found.</h2>
            <p className="text-muted-foreground">
              Try adjusting your search term.
            </p>
          </div>
        )}
      </main>
      <Footer />
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full p-3 h-12 w-12 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
