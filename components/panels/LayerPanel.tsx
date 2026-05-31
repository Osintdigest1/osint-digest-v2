"use client";

type Props = {
  open: boolean;
};

export default function LayerPanel({ open }: Props) {
  if (!open) return null;

  return (
    <div className="absolute bottom-24 left-4 w-72 bg-black border border-zinc-800 text-white z-50">

      <div className="p-3 border-b border-zinc-800 font-semibold">
        MAP LAYERS
      </div>

      <div className="p-3 space-y-3 text-sm">

        <label className="flex gap-2">
          <input type="checkbox" defaultChecked />
          Events
        </label>

        <label className="flex gap-2">
          <input type="checkbox" defaultChecked />
          Carriers
        </label>

        <label className="flex gap-2">
          <input type="checkbox" defaultChecked />
          Maritime
        </label>

        <label className="flex gap-2">
          <input type="checkbox" defaultChecked />
          Conflict Zones
        </label>

        <label className="flex gap-2">
          <input type="checkbox" defaultChecked />
          Military Exercises
        </label>

        <label className="flex gap-2">
          <input type="checkbox" defaultChecked />
          India NOTAM
        </label>

        <label className="flex gap-2">
          <input type="checkbox" defaultChecked />
          Telegram Intel
        </label>

        <label className="flex gap-2">
          <input type="checkbox" defaultChecked />
          X / Twitter Intel
        </label>

      </div>

    </div>
  );
}