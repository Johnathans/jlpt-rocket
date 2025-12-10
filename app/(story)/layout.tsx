export const metadata = {
  title: 'Story Learning - Rocket JLPT',
  description: 'Interactive Japanese story learning experience',
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Clean story learning layout without navbar/footer
  return (
    <div className="min-h-screen" className="bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}
