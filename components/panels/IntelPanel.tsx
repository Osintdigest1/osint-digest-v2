type IntelPanelProps = {
  selectedIntel: any;
};
import IntelFeed from "./IntelFeed";
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

              {selectedIntel.type === "Carrier" ? (
  <>
    <div>
      <div className="text-xs text-zinc-500">
        CLASS
      </div>
      <div>{selectedIntel.class}</div>
    </div>

    <div>
      <div className="text-xs text-zinc-500">
        COUNTRY
      </div>
      <div>{selectedIntel.country}</div>
    </div>

    <div>
      <div className="text-xs text-zinc-500">
        REGION
      </div>
      <div>{selectedIntel.region}</div>
    </div>

    <div>
      <div className="text-xs text-zinc-500">
        STATUS
      </div>
      <div className="text-green-400">
        {selectedIntel.status}
      </div>
    </div>

    <div>
      <div className="text-xs text-zinc-500">
        LAST UPDATE
      </div>
      <div>{selectedIntel.lastUpdate}</div>
    </div>
  </>
) : (
  <>
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
  </>
)}

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

  <IntelFeed />
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