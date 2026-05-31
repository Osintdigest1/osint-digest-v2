"use client";

import { useState } from "react";

import TacticalMap from "@/components/map/TacticalMap";
import IntelPanel from "@/components/panels/IntelPanel";
import SearchPanel from "@/components/panels/SearchPanel";
import TimelinePanel from "@/components/panels/TimelinePanel";

export default function DashboardPage() {
  const [showLayers, setShowLayers] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const [selectedIntel, setSelectedIntel] =
    useState<any>(null);

  const [showEvents, setShowEvents] = useState(true);
  const [showCarriers, setShowCarriers] = useState(true);
  const [showConflicts, setShowConflicts] = useState(true);
  const [showNotams, setShowNotams] = useState(true);

  return (
    <main className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* TOP BAR */}
      <div className="h-12 border-b border-zinc-800 flex items-center px-4 gap-6 text-sm shrink-0">
        <span>LIVE INTEL</span>
        <span>ALERTS</span>
        <span>CARRIERS</span>
        <span>INDIA NOTAM</span>
        <span>WATCHLIST</span>
      </div>

      {/* MAP AREA */}
      <div className="flex flex-1 relative overflow-hidden">
        <div className="flex-1">
          <TacticalMap
            showEvents={showEvents}
            showCarriers={showCarriers}
            showConflicts={showConflicts}
            showNotams={showNotams}
            setSelectedIntel={setSelectedIntel}
          />
        </div>

        <IntelPanel
          selectedIntel={selectedIntel}
        />

        <SearchPanel open={showSearch} />

        <TimelinePanel open={showTimeline} />

        {showLayers && (
          <div className="absolute left-4 bottom-24 z-50 w-72 bg-black border border-zinc-800 p-4">
            <h3 className="text-sm font-semibold mb-4">
              MAP LAYERS
            </h3>

            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={showEvents}
                onChange={() =>
                  setShowEvents(!showEvents)
                }
              />
              Events
            </label>

            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={showCarriers}
                onChange={() =>
                  setShowCarriers(!showCarriers)
                }
              />
              Carriers
            </label>

            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={showConflicts}
                onChange={() =>
                  setShowConflicts(!showConflicts)
                }
              />
              Conflict Zones
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showNotams}
                onChange={() =>
                  setShowNotams(!showNotams)
                }
              />
              India NOTAM
            </label>
          </div>
        )}
      </div>

      {/* STATUS BAR */}
      <div className="h-8 border-t border-zinc-800 bg-black flex items-center px-4 gap-6 text-xs shrink-0">
        <span>EVENTS: 12</span>
        <span>CRITICAL: 2</span>
        <span>HIGH: 4</span>
        <span>CARRIERS: 7</span>
        <span>NOTAMS: 19</span>
      </div>

      {/* BOTTOM BAR */}
      <div className="h-12 border-t border-zinc-800 flex items-center px-4 gap-6 text-sm shrink-0">
        <button
          onClick={() =>
            setShowSearch(!showSearch)
          }
        >
          SEARCH
        </button>

        <button
          onClick={() =>
            setShowLayers(!showLayers)
          }
        >
          LAYERS
        </button>

        <button
          onClick={() =>
            setShowTimeline(!showTimeline)
          }
        >
          TIMELINE
        </button>

        <button>FILTERS</button>

        <button>SETTINGS</button>
      </div>
    </main>
  );
}