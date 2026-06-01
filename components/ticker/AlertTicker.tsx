"use client";

import { alerts } from "@/lib/alerts";

export default function AlertTicker() {
  return (
    <div className="h-12 flex items-center overflow-hidden border-b border-zinc-800 bg-black">
      <div className="animate-marquee whitespace-nowrap">

        {alerts.map((alert, index) => (
          <span
            key={index}
            className={
              alert.severity === "critical"
                ? "text-red-500 font-bold tracking-wider text-sm mr-16"
                : alert.severity === "high"
                ? "text-orange-500 font-bold tracking-wider text-sm mr-16"
                : "text-yellow-500 font-bold tracking-wider text-sm mr-16"
            }
          >
            ● {alert.text}
          </span>
        ))}

      </div>
    </div>
  );
}