import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWordCount(text: string): number {
  // Remove extra spaces and special characters
  const cleanText = text.trim().replace(/[^\w\s]/g, " ");
  // Split by one or more whitespace characters and filter out empty strings
  const words = cleanText.split(/\s+/).filter((word) => word.length > 0);
  return words.length;
}

export function compareFirstPart(string1: string, string2: string): boolean {
  // Find the length of the shorter string
  const minLength = Math.min(string1.length, string2.length);

  // Compare the characters up to the minimum length
  for (let i = 0; i < minLength; i++) {
    if (string1[i] !== string2[i]) {
      return false;
    }
  }

  return true;
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const formattedSeconds =
    seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
  return `${minutes}:${formattedSeconds}`;
}

export function calculateWPM(words: number, time: number): number {
  if (time === 0) {
    return 0;
  }

  const minutes = time / 60;
  return Math.round(words / minutes);
}
