// No 'use client' here

import type { Metadata } from 'next';
import { CATEGORIES } from '@/data/category-list';
import { CategoryPageContent } from '@/components/category-page-content';

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    categoryId: category.id,
  }));
}

interface CategoryPageProps {
  params: {
    categoryId?: string;
  };
}

// Function to generate metadata dynamically
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryId = params.categoryId;
  const category = CATEGORIES.find(cat => cat.id === categoryId);

  if (!category) {
    return {
      title: 'Category Not Found - Homie Docs',
      description: 'The requested category could not be found.',
    };
  }

  return {
    title: `${category.name} - Homie Docs`,
    description: `Explore links related to ${category.name}. ${category.description}`,
  };
}


export default function CategoryPage({ params }: CategoryPageProps) {
  // This component is now a Server Component wrapper.
  // It passes params.categoryId to the actual client component responsible for rendering.
  return <CategoryPageContent categoryId={params.categoryId} />;
}
