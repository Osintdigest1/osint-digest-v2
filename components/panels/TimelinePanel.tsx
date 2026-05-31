"use client";

import { timeline } from "@/lib/timeline";

type Props = {
  open: boolean;
};

export default function TimelinePanel({
  open,
}: Props) {
  if (!open) return null;

  return (
    <div className="absolute left-4 top-16 z-50 w-80 bg-black border border-zinc-800">

      <div className="p-4 border-b border-zinc-800 font-semibold">
        TIMELINE
      </div>

      <div className="max-h-[500px] overflow-y-auto">

        {timeline.map((item) => (
          <div
            key={item.id}
            className="p-3 border-b border-zinc-800"
          >
            <div className="text-xs text-zinc-500">
              {item.time}
            </div>

            <div
              className={
                item.severity === "critical"
                  ? "text-red-500"
                  : item.severity === "high"
                  ? "text-orange-500"
                  : "text-yellow-500"
              }
            >
              {item.title}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}