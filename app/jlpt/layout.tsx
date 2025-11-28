'use client';

export default function JLPTPublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Clean layout - pages have their own navbar
  return <div className="min-h-screen">{children}</div>;
}
