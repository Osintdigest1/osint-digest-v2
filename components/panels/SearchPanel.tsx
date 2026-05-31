"use client";

import { useState } from "react";

const items = [
  "USS Nimitz",
  "INS Vikrant",
  "Missile Launch",
  "Bengaluru NOTAM",
];

type SearchPanelProps = {
  open: boolean;
};

export default function SearchPanel({
  open,
}: SearchPanelProps) {
  const [query, setQuery] = useState("");

  if (!open) return null;

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="absolute left-4 top-16 z-50 w-96 bg-black border border-zinc-800">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="font-semibold">
          SEARCH
        </h2>
      </div>

      <div className="p-4">
        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search carriers, events, NOTAMs..."
          className="w-full bg-zinc-900 border border-zinc-700 p-2 outline-none"
        />
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filtered.map((item) => (
          <div
            key={item}
            className="p-3 border-t border-zinc-800 hover:bg-zinc-900 cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}