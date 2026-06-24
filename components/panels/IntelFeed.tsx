"use client";

import { useEffect, useState } from "react";

export default function IntelFeed() {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
  const fetchIntel = async () => {
    const res = await fetch("/api/intel")
    const data = await res.json();
    setFeed(data);
  };

  fetchIntel();

  const interval = setInterval(
    fetchIntel,
    30000
  );

  return () => clearInterval(interval);
}, []);

  return (
    <div>
      {feed.map((item) => (
        <div
          key={item.id}
          className="border-b border-zinc-800 p-4"
        >
          <div className="text-xs text-zinc-500 mb-1">
            {item.time}
          </div>

          <div
            className={
              item.severity === "critical"
                ? "text-red-500 text-xs"
                : item.severity === "high"
                ? "text-orange-500 text-xs"
                : "text-yellow-500 text-xs"
            }
          >
            [{item.severity.toUpperCase()}]
          </div>

          <div className="mt-1 font-medium">
            {item.title}
          </div>

          <div className="text-xs text-zinc-500 mt-1">
            {item.source} • {item.region}
          </div>
        </div>
      ))}
    </div>
  );
}