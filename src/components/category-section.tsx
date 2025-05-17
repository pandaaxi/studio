import type { Category } from '@/types';
import { LinkCardItem } from './link-card-item';

interface CategorySectionProps {
  category: Category;
}

export function CategorySection({ category }: CategorySectionProps) {
  if (!category.links || category.links.length === 0) {
    return null; 
  }

  return (
    <section className="mb-12" aria-labelledby={`category-title-${category.id}`}>
      <h2 
        id={`category-title-${category.id}`} 
        className="text-3xl font-semibold mb-6 pb-2 border-b-2 border-accent text-accent-foreground"
      >
        {category.name}
      </h2>
      {category.links.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.links.map((link) => (
            <LinkCardItem key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No links in this category yet.</p>
      )}
    </section>
  );
}
