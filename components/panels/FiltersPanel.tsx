"use client";

type FiltersPanelProps = {
  open: boolean;
};

export default function FiltersPanel({
  open,
}: FiltersPanelProps) {
  if (!open) return null;

  return (
    <div className="absolute left-4 top-16 z-50 w-80 bg-black border border-zinc-800">
      <div className="p-4 border-b border-zinc-800 font-semibold">
        FILTERS
      </div>

      <div className="p-4 space-y-3">
        <div className="text-xs text-zinc-500">
          SEVERITY
        </div>

        <label className="block">
          <input type="checkbox" defaultChecked />
          <span className="ml-2">Critical</span>
        </label>

        <label className="block">
          <input type="checkbox" defaultChecked />
          <span className="ml-2">High</span>
        </label>

        <label className="block">
          <input type="checkbox" defaultChecked />
          <span className="ml-2">Medium</span>
        </label>

        <div className="pt-4 text-xs text-zinc-500">
          LAYERS
        </div>

        <label className="block">
          <input type="checkbox" defaultChecked />
          <span className="ml-2">Events</span>
        </label>

        <label className="block">
          <input type="checkbox" defaultChecked />
          <span className="ml-2">Carriers</span>
        </label>

        <label className="block">
          <input type="checkbox" defaultChecked />
          <span className="ml-2">Conflicts</span>
        </label>

        <label className="block">
          <input type="checkbox" defaultChecked />
          <span className="ml-2">NOTAMs</span>
        </label>
      </div>
    </div>
  );
}