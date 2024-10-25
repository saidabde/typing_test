import Sidebar from "@/components/sidebar";
import { TextsProvider } from "@/lib/textsContext";

export default function TextLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TextsProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-cyan-100">{children}</main>
      </div>
    </TextsProvider>
  );
}
