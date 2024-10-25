import React, { useMemo } from "react";
import { compareFirstPart } from "@/lib/utils";

interface TextToTypeProps {
  words: string[] | undefined;
  cursor: number;
  inputValue: string;
}

// Memoized word component to prevent unnecessary re-renders
const Word = React.memo(function Word({
  word,
  isCurrentWord,
  inputValue,
}: {
  word: string;
  isCurrentWord: boolean;
  inputValue: string;
}) {
  // If it's just whitespace, return early
  if (word.trim() === "") {
    return word;
  }

  const textColor = compareFirstPart(inputValue, word)
    ? "bg-green-300"
    : "bg-red-300";

  return (
    <span className={isCurrentWord ? `${textColor} rounded p-1` : ""}>
      {word}
    </span>
  );
});

export function TextToType({
  words,
  cursor,
  inputValue,
}: Readonly<TextToTypeProps>) {
  // Memoize the words array processing
  const processedWords = useMemo(() => {
    return words?.map((word, index) => ({
      word,
      isCurrentWord: index === cursor,
      key: `${word}-${index}`, // Unique key based on content and position
    }));
  }, [words, cursor]);

  if (!processedWords) {
    return null;
  }

  return (
    <div className="text-xl space-x-1">
      {processedWords.map(({ word, isCurrentWord, key }) => (
        <Word
          key={key}
          word={word}
          isCurrentWord={isCurrentWord}
          inputValue={inputValue}
        />
      ))}
    </div>
  );
}
