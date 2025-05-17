export function Footer() {
  return (
    <footer className="py-8 px-4 md:px-8 border-t border-border mt-12">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Link Oasis. All rights reserved.</p>
        <p className="text-sm mt-1">
          Discover and share amazing web resources.
        </p>
      </div>
    </footer>
  );
}
