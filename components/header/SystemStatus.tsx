export default function SystemStatus() {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-green-400">
        SYSTEM OPERATIONAL
      </span>
    </div>
  );
}