export default function Loading({ text }: Readonly<{ text?: string }>) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}