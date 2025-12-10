export const metadata = {
  title: 'Training - Rocket JLPT',
  description: 'Japanese training exercises',
};

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Clean training layout without navbar/footer
  return (
    <div className="min-h-screen" className="bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}