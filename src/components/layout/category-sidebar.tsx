
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as LucideIcons from 'lucide-react';

interface CategorySidebarProps {
  categories: Category[];
  currentCategoryId?: string;
}

export function CategorySidebar({ categories, currentCategoryId }: CategorySidebarProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full"> {/* Removed p-4 from ScrollArea */}
      <nav className="flex flex-col gap-1 p-2"> {/* Added p-2 to nav for overall padding */}
        <h3 className="text-md font-semibold text-primary mb-2 px-2 group-data-[collapsible=icon]:hidden">Categories</h3>
        {categories.map((category) => {
          const isActive = currentCategoryId === category.id || pathname === `/category/${category.id}`;
          const IconComponent = category.icon ? (LucideIcons[category.icon as keyof typeof LucideIcons] as React.ElementType) : null;

          return (
            <Link key={category.id} href={`/category/${category.id}`} passHref legacyBehavior>
              <a
                title={category.name} 
                className={cn(
                  'flex items-center rounded-md text-sm font-medium transition-colors',
                  'px-3 py-2 group-data-[collapsible=icon]:p-3 group-data-[collapsible=icon]:justify-center', // Adjusted padding for expanded and collapsed
                  isActive
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'text-foreground hover:bg-muted hover:text-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {IconComponent && (
                  <IconComponent 
                    className={cn(
                      "h-5 w-5 shrink-0", 
                      "mr-3 group-data-[collapsible=icon]:mr-0 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" // Icon larger when collapsed
                    )} 
                  />
                )}
                <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap overflow-hidden text-ellipsis">{category.name}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </ScrollArea>
  );
}
