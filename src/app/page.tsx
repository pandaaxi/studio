"use client";

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CategorySection } from '@/components/category-section';
import { MOCK_CATEGORIES } from '@/data/mock-links';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const GITHUB_REPO_URL = "https://github.com/your-username/your-repo-name"; // Replace with actual repo URL
const MARKDOWN_FILE_PATH = "edit/main/LINKS.md"; // Path to your markdown file

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const githubEditUrl = `${GITHUB_REPO_URL}/${MARKDOWN_FILE_PATH}`;

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
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        githubEditUrl={githubEditUrl}
      />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <CategorySection key={category.id} category={category} />
          ))
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">No links found.</h2>
            <p className="text-muted-foreground">
              Try adjusting your search term or{" "}
              <a 
                href={githubEditUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline"
              >
                add new links on GitHub
              </a>.
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
