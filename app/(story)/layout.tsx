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
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
