"use client";

import { useEffect, useState } from "react";

export default function TopTicker() {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    const fetchIntel = async () => {
      try {
        const res = await fetch("/api/intel");
        const data = await res.json();
        setFeed(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIntel();

    const interval = setInterval(fetchIntel, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
  <div className="overflow-hidden w-full">
    <div
      style={{
        whiteSpace: "nowrap",
        animation: "marquee 20s linear infinite",
      }}
    >
      {feed.concat(feed).map((item, index) => (
        <span
          key={`${item.id}-${index}`}
          className={
  item.severity === "critical"
    ? "text-red-500 mx-12"
    : item.severity === "high"
    ? "text-orange-400 mx-12"
    : "text-yellow-400 mx-12"
}
        >
          ● [{item.source}] {item.title}
        </span>
      ))}
    </div>
  </div>
);
}