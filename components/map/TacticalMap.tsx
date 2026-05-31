"use client";

import { useEffect, useRef } from "react";
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

            el.style.width =
              "20px";
            el.style.height =
              "20px";
            el.style.background =
              "#00b4ff";
            el.style.border =
              "2px solid white";
            el.style.borderRadius =
              "50%";
            el.style.boxShadow =
              "0 0 10px #00b4ff";
            el.style.cursor =
              "pointer";

            el.onclick = () => {
              clearSelection();

              el.classList.add(
                "selected-asset"
              );

              setSelectedIntel({
                type: "Carrier",
                title:
                  carrier.name,
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

  return (
  <div className="relative w-full h-full">
    <div
      ref={mapContainer}
      className="w-full h-full"
    />

    {selectedIntel && (
      <div className="absolute left-1/2 top-1/2 pointer-events-none">
        <RadarPulse />
      </div>
    )}
  </div>
);
}