
import type { Category } from '@/types';

interface CategorySectionProps {
  category: Category;
  isLastItem: boolean; // To conditionally add the bottom border
}

export function CategorySection({ category, isLastItem }: CategorySectionProps) {
  return (
    <div
      className={`px-6 py-8 ${!isLastItem ? 'border-b-2 border-accent' : ''}`}
      aria-labelledby={`category-title-${category.id}`}
    >
      <h2 
        id={`category-title-${category.id}`} 
        className="text-3xl font-semibold mb-2 text-accent"
      >
        {category.name}
      </h2>
      <p className="text-muted-foreground mt-2 text-base">
        {category.description}
      </p>
    </div>
  );
}
