import Sidebar from "@/components/sidebar";
import { TextsProvider } from "@/lib/textsContext";

export default function TextLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TextsProvider>
      <div className="flex min-h-[100vh]">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-cyan-100 pb-5">
          {children}
        </main>
      </div>
    </TextsProvider>
  );
}
