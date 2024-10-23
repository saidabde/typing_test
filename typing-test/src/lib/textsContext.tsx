"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// Types
export interface Text {
  id: string;
  title: string;
  text: string;
}

interface TextsContextType {
  texts: Text[];
  selectedTextId: string | null;
  setSelectedTextId: (id: string | null) => void;
  getSelectedText: () => Text | null;
}

const TextsContext = createContext<TextsContextType | null>(null);

export const TextsProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

  const texts: Text[] = useMemo(
    () => [
      {
        id: "1",
        title: "Alpacas",
        text: "Alpacas are social herd animals that live in family groups consisting of a territorial alpha. They are known for their soft wool and are often used for their wool. Alpacas are social herd animals that live in family groups consisting of a territorial alpha. They are known for their soft wool and are often used for their wool. Alpacas are social herd animals that live in family groups consisting of a territorial alpha. They are known for their soft wool and are often used for their wool.",
      },
      {
        id: "2",
        title: "Alfred Hitchcock",
        text: "Alfred Hitchcock was a British film director who was regarded as the greatest British filmmaker. He was particularly known for his suspense and thriller films. He directed more than fifty feature films in a career spanning six decades and is often regarded as one of the most influential directors in cinematic history.",
      },
      {
        id: "3",
        title: "Zinedine Zidane",
        text: "Zinedine Zidane is a French former professional football player and current manager of Real Madrid. He is widely regarded as one of the greatest football players of all time. Zidane was an elite playmaker renowned for his elegance, vision, ball control and technique.",
      },
      {
        id: "4",
        title: "Great Wall of China",
        text: "The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions.",
      },
    ],
    []
  );

  const getSelectedText = useCallback(() => {
    return texts.find((text) => text.id === selectedTextId) || null;
  }, [texts, selectedTextId]);

  const value = React.useMemo(
    () => ({
      texts,
      selectedTextId,
      setSelectedTextId,
      getSelectedText,
    }),
    [texts, selectedTextId, getSelectedText]
  );

  return (
    <TextsContext.Provider value={value}>{children}</TextsContext.Provider>
  );
};

export const useTexts = () => {
  const context = useContext(TextsContext);
  if (!context) {
    throw new Error("useTexts must be used within a TextsProvider");
  }
  return context;
};
