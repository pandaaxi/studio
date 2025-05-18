
'use client';

import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-8 px-4 md:px-8 border-t border-border mt-12">
      <div className="container mx-auto text-center text-muted-foreground">
        {currentYear !== null ? (
          <p>&copy; {currentYear} Homie Docs. All rights reserved.</p>
        ) : (
          <p>&copy; Homie Docs. All rights reserved.</p> 
        )}
        <p className="text-sm mt-1">
          Discover and share amazing web resources.
        </p>
      </div>
    </footer>
  );
}
