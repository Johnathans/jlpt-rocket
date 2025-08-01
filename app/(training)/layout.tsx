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
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}