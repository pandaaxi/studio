
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CategorySidebar } from '@/components/layout/category-sidebar';
import { CATEGORIES } from '@/data/category-list';
import type { Category as CategoryType } from '@/types';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = typeof params.categoryId === 'string' ? params.categoryId : undefined;

  const [category, setCategory] = useState<CategoryType | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setCategory(null);
    setMarkdownContent(null);

    if (!categoryId) {
      setError("Category ID is missing.");
      setIsLoading(false);
      return;
    }

    const foundCategory = CATEGORIES.find(cat => cat.id === categoryId);

    if (!foundCategory) {
      setError("Category not found. It may have been removed or the link is incorrect.");
      setIsLoading(false);
      return;
    }

    setCategory(foundCategory);

    async function fetchMarkdown() {
      try {
        const sourceUrl = foundCategory.source.startsWith('/')
          ? `${window.location.origin}${foundCategory.source}`
          : foundCategory.source;
        
        const response = await fetch(sourceUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        setMarkdownContent(text);
      } catch (err: any) {
        console.error(`Error fetching markdown from ${foundCategory.source}:`, err);
        setError(`Could not load category content: ${err.message}. Please check the source or network connection.`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMarkdown();

  }, [categoryId]);

  const mainContentArea = () => {
    if (isLoading && !category && !markdownContent) { 
      return (
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading category...</p>
        </div>
      );
    }

    if (error && !category) { 
      return (
        <div className="flex-grow p-8">
          <div className="mb-8">
             <Link href="/" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </div>
          <div className="bg-destructive/10 border border-destructive text-destructive p-6 rounded-lg shadow text-center">
            <h1 className="text-2xl font-bold mb-2">Error</h1>
            <p>{error}</p>
          </div>
        </div>
      );
    }

    if (category) { 
      return (
        <ScrollArea className="h-full flex-grow p-4 md:p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center text-primary hover:underline text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-primary mb-2">{category.name}</h1>
          <p className="text-lg text-muted-foreground mb-6">{category.description}</p>

          {isLoading && markdownContent === null && ( 
            <div className="flex flex-col items-center justify-center bg-card p-6 rounded-lg shadow mt-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading content...</p>
            </div>
          )}

          {error && markdownContent === null && !isLoading && ( 
            <div className="bg-destructive/10 border border-destructive text-destructive p-6 rounded-lg shadow mt-6">
              <h2 className="text-xl font-semibold mb-2">Content Error</h2>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && markdownContent !== null && markdownContent !== "" && (
            <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none bg-card p-6 rounded-lg shadow mt-6">
              <ReactMarkdown
                components={{
                  a: ({node, ...props}) => <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-2" {...props} />,
                  li: ({node, ...props}) => <li className="my-1" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-3 text-primary" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-5 mb-2 text-primary/90" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-4 mb-1 text-primary/80" {...props} />,
                  p: ({node, ...props}) => <p className="my-3 leading-relaxed" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4" {...props} />,
                  code: ({node, inline, className, children, ...props}) => {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <div className="my-4 rounded bg-muted/50 p-4 overflow-x-auto">
                          <pre className={`language-${match[1]}`}><code {...props}>{children}</code></pre>
                        </div>
                      ) : (
                        <code className="px-1 py-0.5 bg-muted rounded text-accent-foreground" {...props}>
                          {children}
                        </code>
                      )
                    }
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </article>
          )}

          {!isLoading && !error && markdownContent === "" && ( 
             <div className="bg-card p-6 rounded-lg shadow mt-6">
              <p className="text-muted-foreground">No content available for this category. The file might be empty.</p>
            </div>
          )}
        </ScrollArea>
      );
    }

    return (
       <div className="flex-grow p-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </div>
          <div className="bg-card p-6 rounded-lg shadow text-center">
            <h1 className="text-2xl font-bold mb-2 text-destructive">Page Error</h1>
            <p className="text-muted-foreground">An unexpected error occurred. Please try again or return to the homepage.</p>
          </div>
        </div>
    );
  };

  return (
    <SidebarProvider className="flex flex-col min-h-screen bg-background text-foreground">
      <Header
        searchTerm={headerSearchTerm}
        setSearchTerm={setHeaderSearchTerm}
        showSidebarToggle={true}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          side="left" 
          collapsible="icon" 
          className="hidden md:flex bg-card border-r top-[88px] h-[calc(100svh-88px)]"
        > 
          <SidebarContent className="p-0 pt-[88px]"> {/* Added pt-[88px] */}
            <CategorySidebar categories={CATEGORIES} currentCategoryId={categoryId} />
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex flex-col overflow-hidden h-full min-h-0"> {/* Added h-full min-h-0 */}
          {mainContentArea()}
        </SidebarInset>
      </div>
      <Footer />
    </SidebarProvider>
  );
}
