
import type { Category } from '@/types';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

interface CategorySectionProps {
  category: Category;
}

export function CategorySection({ category }: CategorySectionProps) {
  const IconComponent = category.icon ? (LucideIcons[category.icon as keyof typeof LucideIcons] as React.ElementType) : null;

  return (
    <Link href={`/category/${category.id}`} className="block h-full text-current no-underline rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
      <div
        className="bg-card rounded-lg shadow-md p-4 md:p-6 hover:shadow-xl transition-shadow duration-200 flex flex-col h-full"
        aria-labelledby={`category-title-${category.id}`}
      >
        {IconComponent && (
          <div className="mb-4">
            <div className="bg-muted p-3 rounded-md inline-block">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
          </div>
        )}
        <h2 
          id={`category-title-${category.id}`} 
          className="text-lg font-semibold mb-1 text-card-foreground"
        >
          {category.name}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
