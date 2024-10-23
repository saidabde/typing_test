"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTexts } from "@/lib/textsContext";
import { RefreshCcw } from "lucide-react";

export default function TextToType() {
  const { getSelectedText } = useTexts();
  const text = getSelectedText();

  return (
    <div className="text-center px-3 mt-8 w-[90%] m-auto">
      <h1 className="text-3xl font-bold mb-5 text-green-500">{text?.title}</h1>
      <div className="border-2 border-gray-700 rounded mt-2 text-gray-700 p-2 bg-blue-50">
        <p>{text?.text}</p>
      </div>
      <div className="m-auto mt-5 flex justify-center items-center gap-2">
        <Input type="text" className="text-xl h-10 w-[50%] border-gray-700" />
        <Button className="bg-green-600 hover:bg-green-900 p-5 font-bold">
          1:00
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-700 p-5">
          <RefreshCcw className="h-10 w-10 text-white" />
        </Button>
      </div>
    </div>
  );
}
