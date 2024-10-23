import { useTexts } from "@/lib/textsContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";

export default function SideBarItem(
  text: Readonly<{ id: string; title: string; text: string }>
) {
  const router = useRouter();
  const { selectedTextId, setSelectedTextId } = useTexts();

  return (
    <Card
      key={text.id}
      onClick={() => {
        setSelectedTextId(text.id);
        router.push(`/texts/${text.id}`);
      }}
      className={`cursor-pointer transition-colors hover:bg-gray-200 ${
        selectedTextId === text.id ? "border-gray-500 bg-blue-50" : ""
      }`}
    >
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium">{text.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xs text-gray-500 line-clamp-2">{text.text}</p>
        <div className="mt-2 text-xs text-gray-400">
          {text.text.split(" ").length} words
        </div>
      </CardContent>
    </Card>
  );
}
