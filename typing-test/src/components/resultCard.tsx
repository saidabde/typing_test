import { calculateWPM } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTranslations } from "next-intl";

export default function ResultCard(
  params: Readonly<{
    cursor: number;
    wordCount: number;
    correctWordsCounter: number;
    mistakesCounter: number;
    seconds: number;
  }>
) {
  const t = useTranslations();

  return (
    <Card className="w-72 space-y-2 bg-cyan-50">
      <CardHeader className="bg-cyan-400 p-3">
        <CardTitle className="text-start text-lg">
          {t("typingTest.result")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <h3 className="text-4xl font-bold p-4 border-b text-green-600">
          {calculateWPM(params.correctWordsCounter, params.seconds)} WPM
        </h3>
        <ul className="space-y-2">
          <ResultCardItem
            title={t("typingTest.words")}
            value={params.wordCount}
          />
          <ResultCardItem
            title={t("typingTest.accuracy")}
            value={(params.cursor === 0
              ? 0
              : (100 * params.correctWordsCounter) /
                (params.mistakesCounter + params.correctWordsCounter)
            ).toFixed(2)}
          />
          <ResultCardItem
            title={t("typingTest.correctWords")}
            value={params.correctWordsCounter}
          />
          <ResultCardItem
            title={t("typingTest.incorrectWords")}
            value={params.mistakesCounter}
          />
        </ul>
      </CardContent>
    </Card>
  );
}

export function ResultCardItem(
  params: Readonly<{ title: string; value: number | string }>
) {
  return (
    <li className="flex justify-between border-b py-1">
      <div>{params.title}</div>
      <div>{params.value}</div>
    </li>
  );
}
