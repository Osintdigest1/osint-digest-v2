"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import { events } from "@/lib/events";
import { carriers } from "@/lib/carriers";
import { conflicts } from "@/lib/conflicts";
import { notams } from "@/lib/notams";
import RadarPulse from "@/components/map/RadarPulse";


type TacticalMapProps = {
  showEvents: boolean;
  showCarriers: boolean;
  showConflicts: boolean;
  showNotams: boolean;
  setSelectedIntel: (data: any) => void;
  flyToTarget: any;
  selectedIntel: any;
};

export default function TacticalMap({
  showEvents,
  showCarriers,
  showConflicts,
  showNotams,
  setSelectedIntel,
  flyToTarget,
  selectedIntel,
}: TacticalMapProps) {
  const mapContainer =
    useRef<HTMLDivElement | null>(null);

  const mapRef =
    useRef<maplibregl.Map | null>(null);
const [pulsePosition, setPulsePosition] =
  useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [75, 25],
      zoom: 2.6,
    });

    mapRef.current = map;
    (window as any).map = map;

    map.addControl(
      new maplibregl.NavigationControl()
    );

    const clearSelection = () => {
      document
        .querySelectorAll(".selected-asset")
        .forEach((el) =>
          el.classList.remove(
            "selected-asset"
          )
        );
    };

    map.on("load", () => {
      map.addSource("india-border", {
  type: "geojson",
  data: "/maps/india-border.geojson",
});

map.addLayer({
  id: "india-border-glow",
  type: "line",
  source: "india-border",
  paint: {
    "line-color": "#838992",
    "line-width": 2,
    "line-blur": 1,
    "line-opacity": 0.08,
  },
});

map.addLayer({
  id: "india-border-main",
  type: "line",
  source: "india-border",
  paint: {
    "line-color": "#8f98a3",
    "line-width": 0.7,
    "line-opacity": 0.65,
  },
});
      // =====================
      // CONFLICTS
      // =====================

      if (showConflicts) {
        conflicts.forEach((conflict) => {
          const el =
            document.createElement(
              "div"
            );

          el.style.width = "28px";
          el.style.height = "28px";
          el.style.background =
            "rgba(255,0,0,0.25)";
          el.style.border =
            "2px solid #ff3b30";
          el.style.borderRadius =
            "50%";
          el.style.cursor =
            "pointer";

          el.onclick = () => {
            clearSelection();

            el.classList.add(
              "selected-asset"
            );

            setSelectedIntel({
              type: "Conflict Zone",
              title: conflict.name,
              lat: conflict.lat,
              lng: conflict.lng,
            });
          };

          new maplibregl.Marker({
            element: el,
          })
            .setLngLat([
              conflict.lng,
              conflict.lat,
            ])
            .addTo(map);
        });
      }

      // =====================
      // EVENTS
      // =====================

      if (showEvents) {
        events.forEach((event) => {
          const marker =
            new maplibregl.Marker({
              color:
                event.severity ===
                "critical"
                  ? "#ff3b30"
                  : event.severity ===
                    "high"
                  ? "#ff9500"
                  : "#ffd60a",
            })
              .setLngLat([
                event.lng,
                event.lat,
              ])
              .addTo(map);

          marker
            .getElement()
            .addEventListener(
              "click",
              () => {
                clearSelection();

                marker
                  .getElement()
                  .classList.add(
                    "selected-asset"
                  );

                setSelectedIntel({
                  type: "Event",
                  title:
                    event.title,
                  severity:
                    event.severity,
                  lat: event.lat,
                  lng: event.lng,
                });
              }
            );
        });
      }

      // =====================
      // CARRIERS
      // =====================

      if (showCarriers) {
        carriers.forEach(
          (carrier) => {
            const el =
              document.createElement(
                "div"
              );

            el.innerHTML = "⚓";
el.style.width = "10px";
el.style.height = "10px";

el.style.background = "#00b4ff";

el.style.borderRadius = "50%";

el.style.boxShadow =
  "0 0 4px #00b4ff";

            el.onclick = () => {
              clearSelection();

              el.classList.add(
                "selected-asset"
              );

              setSelectedIntel({
  type: "Carrier",
  title: carrier.name,
  class: carrier.class,
  country: carrier.country,
  region: carrier.region,
  status: carrier.status,
  lastUpdate: carrier.lastUpdate,
  lat: carrier.lat,
  lng: carrier.lng,
});
            };

            new maplibregl.Marker({
              element: el,
            })
              .setLngLat([
                carrier.lng,
                carrier.lat,
              ])
              .addTo(map);
          }
        );
      }

      // =====================
      // NOTAMS
      // =====================

      if (showNotams) {
        notams.forEach((notam) => {
          const el =
            document.createElement(
              "div"
            );

          el.innerHTML = "✈";
          el.style.color =
            "#00ff88";
          el.style.fontSize =
            "20px";
          el.style.cursor =
            "pointer";

          el.onclick = () => {
            clearSelection();

            el.classList.add(
              "selected-asset"
            );

            setSelectedIntel({
              type: "NOTAM",
              title: notam.title,
              lat: notam.lat,
              lng: notam.lng,
            });
          };

          new maplibregl.Marker({
            element: el,
          })
            .setLngLat([
              notam.lng,
              notam.lat,
            ])
            .addTo(map);
        });
      }
    });

    return () => {
      map.remove();
    };
  }, [
    showEvents,
    showCarriers,
    showConflicts,
    showNotams,
    setSelectedIntel,
  ]);

  useEffect(() => {
    if (
      !flyToTarget ||
      !mapRef.current
    )
      return;

    mapRef.current.flyTo({
      center: [
        flyToTarget.lng,
        flyToTarget.lat,
      ],
      zoom: 8,
      speed: 1,
      essential: true,
      offset: [-200, 0],
    });
  }, [flyToTarget]);
useEffect(() => {
  if (
    !selectedIntel ||
    !mapRef.current
  )
    return;

  const updatePulse = () => {
    const point =
      mapRef.current!.project([
        selectedIntel.lng,
        selectedIntel.lat,
      ]);

    setPulsePosition({
      x: point.x,
      y: point.y,
    });
  };

  updatePulse();

  mapRef.current.on(
    "move",
    updatePulse
  );

  return () => {
    mapRef.current?.off(
      "move",
      updatePulse
    );
  };
}, [selectedIntel]);
  return (
  <div className="relative w-full h-full">
    <div
      ref={mapContainer}
      className="w-full h-full"
    />

    {selectedIntel && (
  <div
    className="absolute pointer-events-none"
    style={{
      left: pulsePosition.x,
      top: pulsePosition.y,
      transform:
        "translate(-50%, -50%)",
    }}
  >
    <RadarPulse />
  </div>
)}
  </div>
);
}