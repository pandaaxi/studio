import type { LinkItem as LinkItemType } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface LinkCardItemProps {
  link: LinkItemType;
}

export function LinkCardItem({ link }: LinkCardItemProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="text-lg text-primary">{link.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-sm text-foreground/80 line-clamp-3">
          {link.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href={link.url} target="_blank" rel="noopener noreferrer">
            Visit Site <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
