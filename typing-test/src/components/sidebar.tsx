"use client";
import { useTexts } from "@/lib/textsContext";
import { useTranslations } from "next-intl";
import SideBarItem from "./sideBarItem";

export default function Sidebar() {
  const t = useTranslations();
  const { texts } = useTexts();

  return (
    <div className="w-64 bg-gray-100 border-r border-gray-200 h-screen">
      <div className="p-4 space-y-6">
        <h2 className="text-lg font-semibold">{t("sidebar.selectText")}</h2>
        <div className="space-y-3">
          {texts.map((text) => (
            <SideBarItem key={text.id} {...text} />
          ))}
        </div>
      </div>
    </div>
  );
}
