
import type { Category } from '@/types';
// LinkCardItem is no longer used here for the homepage display

interface CategorySectionProps {
  category: Category;
}

export function CategorySection({ category }: CategorySectionProps) {
  return (
    <section className="mb-12" aria-labelledby={`category-title-${category.id}`}>
      <h2 
        id={`category-title-${category.id}`} 
        className="text-3xl font-semibold mb-2 pb-2 border-b-2 border-accent text-accent"
      >
        {category.name}
      </h2>
      <p className="text-muted-foreground mt-2 mb-6 text-base">
        {category.description}
      </p>
      {/* The grid of LinkCardItems has been removed from here */}
    </section>
  );
}
