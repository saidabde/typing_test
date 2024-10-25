import { useCallback, useState } from "react";

interface UseTypingGameProps {
  words: string[] | undefined;
  onGameEnd: () => void;
}

export function useTypingGame({ words, onGameEnd }: UseTypingGameProps) {
  const [cursor, setCursor] = useState(0);
  const [mistakesCounter, setMistakesCounter] = useState(0);
  const [correctWordsCounter, setCorrectWordsCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Space" && inputValue.length > 0 && words) {
        const word = words[cursor];

        if (word === inputValue) {
          setCorrectWordsCounter((prev) => prev + 1);
        } else {
          setMistakesCounter((prev) => prev + 1);
        }

        e.preventDefault();
        setInputValue("");

        if (cursor + 1 === words.length) {
          setDisabled(true);
          onGameEnd();
        } else {
          setCursor((prev) => prev + 2);
        }
      }
    },
    [cursor, inputValue, words, onGameEnd]
  );

  const reset = useCallback(() => {
    setDisabled(false);
    setCursor(0);
    setMistakesCounter(0);
    setCorrectWordsCounter(0);
    setInputValue("");
  }, []);

  return {
    cursor,
    mistakesCounter,
    correctWordsCounter,
    disabled,
    inputValue,
    setInputValue,
    handleKeyDown,
    reset,
  };
}
