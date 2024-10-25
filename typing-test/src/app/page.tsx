import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-10 bg-cyan-200">
      <h1 className="text-cyan-950 text-4xl text-wrap text-center md:w-[60%] lg:w-[50%]">
        {t("HomePage.title")}
      </h1>
      <Image
        src="/images/favicon.ico"
        width={250}
        height={250}
        alt={"Typing Test logo"}
      />
      <Link href="/texts/1">
        <Button
          variant="outline"
          className="p-6 text-xl text-cyan-700 border-cyan-900 bg-cyan-50 hover:bg-cyan-100"
        >
          {t("HomePage.start")}
        </Button>
      </Link>
    </div>
  );
}
