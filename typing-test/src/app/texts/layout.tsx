import Sidebar from "@/components/sidebar";
import { TextsProvider } from "@/lib/textsContext";

export default function TextLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TextsProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </TextsProvider>
  );
}
