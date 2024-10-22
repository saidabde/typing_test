import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10">
      <h1 className="text-3xl text-wrap text-center">{t("HomePage.title")}</h1>
      <Button
        href="/texts"
        variant="outlined"
        className="p-3 text-xl text-green-300 border-green-300"
      >
        {t("HomePage.start")}
      </Button>
    </div>
  );
}
