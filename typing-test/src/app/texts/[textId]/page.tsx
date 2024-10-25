"use client";
import ResultCard from "@/components/resultCard";
import { TextToType } from "@/components/textToType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTimer } from "@/hooks/useTimer";
import { useTypingGame } from "@/hooks/useTypingGame";
import { useTexts } from "@/lib/textsContext";
import { formatTime, getWordCount } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import React, { useMemo } from "react";

// Text type
export interface TextObject {
  title: string;
  text: string;
}

export default function TypingTest() {
  const { getSelectedText } = useTexts();
  const textObject = getSelectedText();

  const words = useMemo(() => {
    return textObject?.text.split(/(\s+)/g);
  }, [textObject]);

  const wordCount = getWordCount(textObject?.text ?? "");

  const {
    seconds,
    isRunning,
    setIsRunning,
    handleReset: resetTimer,
  } = useTimer();

  const {
    cursor,
    mistakesCounter,
    correctWordsCounter,
    disabled,
    inputValue,
    setInputValue,
    handleKeyDown,
    reset: resetGame,
  } = useTypingGame({
    words,
    onGameEnd: () => setIsRunning(false),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    resetGame();
    resetTimer();
  };

  return (
    <div className="text-center px-3 mt-8 w-[90%] m-auto space-y-10">
      <h1 className="text-4xl font-semibold mb-5 text-cyan-600">
        {textObject?.title}
      </h1>

      <div className="border-2 border-cyan-800 rounded p-2 bg-cyan-50">
        <TextToType words={words} cursor={cursor} inputValue={inputValue} />
      </div>

      <div className="m-auto mt-5 flex justify-center items-center gap-2">
        <Input
          disabled={disabled}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="text-xl h-10 w-[50%] border-cyan-800"
          onKeyDown={handleKeyDown}
        />
        <Button className="text-xl p-5 bg-cyan-900 hover:bg-cyan-700">
          {formatTime(seconds)}
        </Button>
        <Button
          onClick={handleReset}
          className="bg-cyan-500 hover:bg-cyan-800 p-5"
        >
          <RefreshCcw className="h-10 w-10 text-white" />
        </Button>
      </div>

      <ResultCard
        cursor={cursor}
        wordCount={wordCount}
        correctWordsCounter={correctWordsCounter}
        mistakesCounter={mistakesCounter}
        seconds={seconds}
      />
    </div>
  );
}
