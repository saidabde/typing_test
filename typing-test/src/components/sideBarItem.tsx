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
      className={`cursor-pointer transition-colors bg-cyan-50 hover:bg-cyan-100 ${
        selectedTextId === text.id ? "border-cyan-800 bg-cyan-200" : ""
      }`}
    >
      <CardHeader className="p-3">
        <CardTitle className="text-md font-medium">{text.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-sm text-gray-500 line-clamp-2">{text.text}</p>
        <div className="mt-2 text-xs text-gray-400">
          {text.text.split(" ").length} words
        </div>
      </CardContent>
    </Card>
  );
}
