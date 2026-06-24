"use client";

import { useEffect, useState } from "react";

export default function UtcClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      setTime(
        now.toUTCString().replace(
          "GMT",
          "UTC"
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-xs text-zinc-400 font-mono">
      {time}
    </div>
  );
}