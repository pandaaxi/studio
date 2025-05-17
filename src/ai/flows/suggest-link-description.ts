// src/ai/flows/suggest-link-description.ts
'use server';

/**
 * @fileOverview A flow for suggesting a description for a given URL using AI.
 *
 * - suggestLinkDescription - A function that takes a URL as input and returns a suggested description for the website.
 * - SuggestLinkDescriptionInput - The input type for the suggestLinkDescription function.
 * - SuggestLinkDescriptionOutput - The return type for the suggestLinkDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLinkDescriptionInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to describe.'),
});
export type SuggestLinkDescriptionInput = z.infer<
  typeof SuggestLinkDescriptionInputSchema
>;

const SuggestLinkDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A short, AI-generated description of the website.'),
});
export type SuggestLinkDescriptionOutput = z.infer<
  typeof SuggestLinkDescriptionOutputSchema
>;

export async function suggestLinkDescription(
  input: SuggestLinkDescriptionInput
): Promise<SuggestLinkDescriptionOutput> {
  return suggestLinkDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLinkDescriptionPrompt',
  input: {schema: SuggestLinkDescriptionInputSchema},
  output: {schema: SuggestLinkDescriptionOutputSchema},
  prompt: `You are an AI assistant that generates short descriptions for websites.

  Given the URL of a website, your task is to generate a concise and informative description of the site.
  The description should be no more than 100 characters.

  URL: {{{url}}}
  Description:`, // Removed the await keyword, and the function call since it's not allowed
});

const suggestLinkDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestLinkDescriptionFlow',
    inputSchema: SuggestLinkDescriptionInputSchema,
    outputSchema: SuggestLinkDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
