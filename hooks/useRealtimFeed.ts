"use client";

import { useEffect, useState } from "react";
import { simulatedEvents } from "@/lib/simulatedFeed";

export default function useRealtimeFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const random =
        simulatedEvents[
          Math.floor(
            Math.random() *
              simulatedEvents.length
          )
        ];

      const item = {
        time: new Date()
          .toUTCString()
          .slice(17, 25) + " UTC",
        severity: [
          "critical",
          "high",
          "medium",
        ][
          Math.floor(
            Math.random() * 3
          )
        ],
        title: random,
      };

      setFeed((prev: any) => [
        item,
        ...prev,
      ].slice(0, 20));
    }, 15000);

    return () =>
      clearInterval(timer);
  }, []);

  return feed;
}