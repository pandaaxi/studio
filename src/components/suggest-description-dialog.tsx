"use client";

import { useState, type FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";
import { getAISuggestedDescription } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";

export function SuggestDescriptionDialog() {
  const [url, setUrl] = useState('');
  const [suggestedDescription, setSuggestedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!url) {
      setError('Please enter a URL.');
      return;
    }
    setError('');
    setSuggestedDescription('');
    setIsLoading(true);

    const result = await getAISuggestedDescription({ url });

    setIsLoading(false);
    if ('error' in result) {
      setError(result.error);
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setSuggestedDescription(result.description);
      toast({
        title: "Suggestion Ready!",
        description: "AI has generated a description for your link.",
      });
    }
  };

  const resetForm = () => {
    setUrl('');
    setSuggestedDescription('');
    setError('');
    setIsLoading(false);
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          Suggest Description
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-primary">AI Link Describer</DialogTitle>
          <DialogDescription>
            Enter a URL and let AI suggest a concise description for it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right text-foreground/80">
                URL
              </Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="col-span-3 bg-input focus:bg-background"
                required
              />
            </div>
            {error && (
              <p className="col-span-4 text-sm text-destructive text-center">{error}</p>
            )}
            {suggestedDescription && (
               <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right text-foreground/80 pt-2">
                  Suggestion
                </Label>
                <Textarea
                  id="description"
                  value={suggestedDescription}
                  readOnly
                  className="col-span-3 min-h-[80px] bg-muted/50 border-dashed"
                  rows={3}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Suggest"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
