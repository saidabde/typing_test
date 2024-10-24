import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10">
      <h1 className="text-3xl text-wrap text-center">{t("HomePage.title")}</h1>
      <Link href="/texts/1">
        <Button
          variant="outline"
          className="p-3 text-xl text-green-300 border-green-300"
        >
          {t("HomePage.start")}
        </Button>
      </Link>
    </div>
  );
}
