export default function TextLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>Aside</div>
      {children}
    </div>
  );
}
