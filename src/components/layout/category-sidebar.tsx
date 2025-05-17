
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button'; // For styling links like buttons

interface CategorySidebarProps {
  categories: Category[];
  currentCategoryId?: string;
}

export function CategorySidebar({ categories, currentCategoryId }: CategorySidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 lg:w-72 xl:w-80 p-4 border-r border-border h-full">
      <ScrollArea className="h-full pr-2">
        <nav className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-primary mb-3 px-2">Categories</h3>
          {categories.map((category) => {
            const isActive = currentCategoryId === category.id || pathname === `/category/${category.id}`;
            return (
              <Link key={category.id} href={`/category/${category.id}`} passHref legacyBehavior>
                <a
                  className={cn(
                    'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'text-foreground hover:bg-muted hover:text-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {category.name}
                </a>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
