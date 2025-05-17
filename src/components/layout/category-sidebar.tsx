
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as LucideIcons from 'lucide-react';
// SidebarTrigger is no longer imported here

interface CategorySidebarProps {
  categories: Category[];
  currentCategoryId?: string;
  className?: string; // Added className prop
}

export function CategorySidebar({ categories, currentCategoryId, className }: CategorySidebarProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className={cn("h-full", className)}> {/* Applied className prop */}
      <nav className="flex flex-col gap-1 p-2">
        {/* The div for internal sidebar header with toggle has been removed */}
        
        {categories.map((category) => {
          const isActive = currentCategoryId === category.id || pathname === `/category/${category.id}`;
          const IconComponent = category.icon ? (LucideIcons[category.icon as keyof typeof LucideIcons] as React.ElementType) : null;

          return (
            <Link key={category.id} href={`/category/${category.id}`} passHref legacyBehavior>
              <a
                title={category.name} 
                className={cn(
                  'flex items-center rounded-md text-sm font-medium transition-colors',
                  'px-3 py-2 group-data-[collapsible=icon]:p-3 group-data-[collapsible=icon]:justify-center', 
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
                      "mr-3 group-data-[collapsible=icon]:mr-0 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" 
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
