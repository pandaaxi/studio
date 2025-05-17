// src/app/actions.ts
"use server";

import { suggestLinkDescription } from "@/ai/flows/suggest-link-description";
import type { SuggestLinkDescriptionInput, SuggestLinkDescriptionOutput } from "@/ai/flows/suggest-link-description";

export async function getAISuggestedDescription(
  input: SuggestLinkDescriptionInput
): Promise<SuggestLinkDescriptionOutput | { error: string }> {
  try {
    // Validate input if necessary, though Zod in the flow handles it
    if (!input.url || !/^https?:\/\//.test(input.url)) {
      return { error: "Invalid URL provided." };
    }
    const result = await suggestLinkDescription(input);
    return result;
  } catch (error) {
    console.error("Error getting AI suggested description:", error);
    return { error: "Failed to generate description. Please try again." };
  }
}
