type IntelPanelProps = {
  selectedIntel: any;
};

export default function IntelPanel({
  selectedIntel,
}: IntelPanelProps) {
  return (
    <div className="w-80 bg-black border-l border-zinc-800 text-white overflow-y-auto">

      {/* HEADER */}
      <div className="p-4 border-b border-zinc-800">
        <h2 className="font-bold tracking-wide">
          LIVE INTEL
        </h2>
      </div>

      {/* SELECTED ASSET */}
      <div className="border-b border-zinc-800">
        <div className="p-4">
          <div className="text-xs text-zinc-500 mb-2">
            SELECTED ASSET
          </div>

          {!selectedIntel ? (
            <div className="text-zinc-500">
              Select a marker on the map
            </div>
          ) : (
            <div className="space-y-3">

              <div>
                <div className="text-xs text-zinc-500">
                  TYPE
                </div>
                <div className="font-semibold">
                  {selectedIntel.type}
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-500">
                  TITLE
                </div>
                <div className="text-xl font-bold">
                  {selectedIntel.title}
                </div>
              </div>

              {selectedIntel.severity && (
                <div>
                  <div className="text-xs text-zinc-500">
                    SEVERITY
                  </div>
                  <div className="text-red-500 font-semibold">
                    {selectedIntel.severity.toUpperCase()}
                  </div>
                </div>
              )}

              <div>
                <div className="text-xs text-zinc-500">
                  LATITUDE
                </div>
                <div>{selectedIntel.lat}</div>
              </div>

              <div>
                <div className="text-xs text-zinc-500">
                  LONGITUDE
                </div>
                <div>{selectedIntel.lng}</div>
              </div>

              <div>
                <div className="text-xs text-zinc-500">
                  STATUS
                </div>
                <div>ACTIVE</div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* INTEL FEED */}
      <div>
        <div className="p-4 border-b border-zinc-800">
          <div className="text-xs text-zinc-500">
            LATEST INTEL
          </div>
        </div>

        <div className="p-4 border-b border-zinc-800">
          <div className="text-red-500 text-xs">
            CRITICAL
          </div>
          <div className="font-medium">
            Missile Launch Detected
          </div>
          <div className="text-xs text-zinc-500">
            2 min ago
          </div>
        </div>

        <div className="p-4 border-b border-zinc-800">
          <div className="text-orange-500 text-xs">
            HIGH
          </div>
          <div className="font-medium">
            Carrier Group Movement
          </div>
          <div className="text-xs text-zinc-500">
            5 min ago
          </div>
        </div>

        <div className="p-4 border-b border-zinc-800">
          <div className="text-yellow-500 text-xs">
            MEDIUM
          </div>
          <div className="font-medium">
            Bengaluru NOTAM Active
          </div>
          <div className="text-xs text-zinc-500">
            12 min ago
          </div>
        </div>
      </div>

      {/* WATCHLIST */}
      <div>
        <div className="p-4 border-b border-zinc-800">
          <div className="text-xs text-zinc-500">
            WATCHLIST
          </div>
        </div>

        <div className="p-4 border-b border-zinc-800">
          Taiwan Strait
        </div>

        <div className="p-4 border-b border-zinc-800">
          South China Sea
        </div>

        <div className="p-4">
          Arabian Sea
        </div>
      </div>

    </div>
  );
}