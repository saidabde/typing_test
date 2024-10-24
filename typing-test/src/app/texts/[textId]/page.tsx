"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTexts } from "@/lib/textsContext";
import { compareFirstPart, getWordCount } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import React, { useMemo, useState } from "react";

export default function TextToType() {
  const [inputValue, setInputValue] = useState("");
  const { getSelectedText } = useTexts();
  const textObject = getSelectedText();

  // get text words
  const words = useMemo(() => {
    return textObject?.text.split(/(\s+)/g);
  }, [textObject]);

  const wordCount = getWordCount(textObject?.text ?? "");
  // cursor
  const [cursor, setCursor] = useState(0);
  // mistakes counter
  const [mistakesCounter, setMistakesCounter] = useState(0);
  // correct words counter
  const [correctWordsCounter, setCorrectWordsCounter] = useState(0);

  /**
   * when the user presses the space key, check if the word is correct
   * @param e
   */
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (cursor === 0) {
      reset();
    }

    if (e.code === "Space" && inputValue.length > 0) {
      const word = words?.[cursor];

      if (word === inputValue) {
        setCorrectWordsCounter((prev) => prev + 1);
      } else {
        setMistakesCounter((prev) => prev + 1);
      }

      e.preventDefault();
      setInputValue("");

      if (cursor + 1 === words?.length) {
        // end of text
        console.log(
          "End of text",
          wordCount,
          "\t",
          mistakesCounter,
          "\t",
          correctWordsCounter
        );
      } else {
        setCursor((prev) => prev + 2);
      }
    }
  }

  /**
   * Reset the cursor, mistakes counter and correct words counter
   */
  function reset() {
    setCursor(0);
    setMistakesCounter(0);
    setCorrectWordsCounter(0);
  }

  return (
    <div className="text-center px-3 mt-8 w-[90%] m-auto space-y-10">
      <h1 className="text-3xl font-bold mb-5 text-green-500">
        {textObject?.title}
      </h1>
      <div className="border-2 border-gray-700 rounded text-gray-700 p-2 bg-blue-50">
        <div className="text-xl space-x-1">
          {words?.map((word, index) => {
            // If this part is just whitespace, render it as-is
            if (word.trim() === "") {
              return <React.Fragment key={index}>{word}</React.Fragment>;
            }

            const isCurrentWord = index === cursor;
            const textColor = compareFirstPart(inputValue, word)
              ? "bg-green-300"
              : "bg-red-300";

            return (
              <span
                key={index}
                className={`${isCurrentWord ? textColor + " rounded p-1" : ""}`}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      <div className="m-auto mt-5 flex justify-center items-center gap-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-xl h-10 w-[50%] border-gray-700"
          onKeyDown={onKeyDown}
        />
        <Button onClick={reset} className="bg-blue-500 hover:bg-blue-700 p-5">
          <RefreshCcw className="h-10 w-10 text-white" />
        </Button>
      </div>

      <Card className="w-72 space-y-2">
        <CardHeader className="bg-gray-300 p-3">
          <CardTitle className="text-start">Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <ResultCardItem title="Words" value={wordCount} />
            <ResultCardItem
              title="Accuracy"
              value={((100 * correctWordsCounter) / (1 + cursor / 2)).toFixed(
                2
              )}
            />
            <ResultCardItem title="Correct words" value={correctWordsCounter} />
            <ResultCardItem title="Wrong words" value={mistakesCounter} />
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export function ResultCardItem(
  params: Readonly<{ title: string; value: number | string }>
) {
  return (
    <li className="flex justify-between">
      <div>{params.title}</div>
      <div>{params.value}</div>
    </li>
  );
}
