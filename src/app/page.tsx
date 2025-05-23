
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { CategorySection } from '@/components/category-section';
import { CATEGORIES } from '@/data/category-list';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCategories] = useState<Category[]>(CATEGORIES);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return allCategories;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allCategories.filter(
      category =>
        category.name.toLowerCase().includes(lowerSearchTerm) ||
        (category.description && category.description.toLowerCase().includes(lowerSearchTerm))
    );
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
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
        <section className="text-center pt-12 pb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">Homie Docs</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your personal collection of categorized website links, easily managed and discovered.
          </p>
        </section>

        <div className="p-0 md:p-6">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-card rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-muted-foreground mb-4">No categories found.</h2>
              <p className="text-muted-foreground">
                Try adjusting your search term or explore all categories.
              </p>
            </div>
          )}
        </div>
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
