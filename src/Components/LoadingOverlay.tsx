type LoadingOverlayProps = {
  message?: string;
  show?: boolean;
};

export default function LoadingOverlay({
  message = "Loading...",
  show = false,
}: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-white text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}