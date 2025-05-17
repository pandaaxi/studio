
import type { Category } from '@/types';

interface CategorySectionProps {
  category: Category;
}

export function CategorySection({ category }: CategorySectionProps) {
  return (
    <div
      className="aspect-square flex flex-col items-center justify-center p-4 border-2 border-accent rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
      aria-labelledby={`category-title-${category.id}`}
    >
      <h2 
        id={`category-title-${category.id}`} 
        className="text-2xl font-semibold mb-2 text-accent text-center"
      >
        {category.name}
      </h2>
      <p className="text-muted-foreground mt-1 text-sm text-center line-clamp-3">
        {category.description}
      </p>
    </div>
  );
}
