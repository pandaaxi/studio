
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
// Button import removed as we use simple anchor tags with custom styling

interface CategorySidebarProps {
  categories: Category[];
  currentCategoryId?: string;
}

export function CategorySidebar({ categories, currentCategoryId }: CategorySidebarProps) {
  const pathname = usePathname();

  // Removed w-full md:w-64 etc. and p-4, border-r, h-full
  // These are now handled by the parent <Sidebar> and <SidebarContent> components
  return (
    <ScrollArea className="h-full p-4"> {/* Added p-4 here for internal padding within the sidebar content area */}
      <nav className="flex flex-col gap-1"> {/* Reduced gap slightly */}
        <h3 className="text-md font-semibold text-primary mb-2 px-2 group-data-[collapsible=icon]:hidden">Categories</h3> {/* Adjusted styling slightly, hides on icon collapse */}
        {categories.map((category) => {
          const isActive = currentCategoryId === category.id || pathname === `/category/${category.id}`;
          return (
            <Link key={category.id} href={`/category/${category.id}`} passHref legacyBehavior>
              <a
                title={category.name} // Tooltip for collapsed state
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0', // Center icon when collapsed
                  isActive
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'text-foreground hover:bg-muted hover:text-foreground',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Icon would go here if categories had icons and we wanted to show them in collapsed state */}
                {/* For now, just text. If you add icons to categories: 
                    <CategoryIcon className="h-5 w-5 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" /> 
                */}
                <span className="group-data-[collapsible=icon]:hidden">{category.name}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </ScrollArea>
  );
}
