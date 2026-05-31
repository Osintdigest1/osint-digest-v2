"use client";

import { useState } from "react";
import { searchItems } from "@/lib/searchItems";

type SearchPanelProps = {
  open: boolean;
  onSelect: (item: any) => void;
};

export default function SearchPanel({
  open,
  onSelect,
}: SearchPanelProps) {
  const [query, setQuery] = useState("");

  if (!open) return null;

  const filtered = searchItems.filter((item) =>
    item.title
      .toLowerCase()
      .includes(query.toLowerCase())
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
          placeholder="Search assets..."
          className="w-full bg-zinc-900 border border-zinc-700 p-2 outline-none"
        />
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filtered.map((item) => (
          <div
            key={item.title}
            onClick={() =>
              onSelect(item)
            }
            className="p-3 border-t border-zinc-800 hover:bg-zinc-900 cursor-pointer"
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}