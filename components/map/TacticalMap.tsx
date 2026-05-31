"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import { events } from "@/lib/events";
import { carriers } from "@/lib/carriers";
import { conflicts } from "@/lib/conflicts";
import { notams } from "@/lib/notams";

type TacticalMapProps = {
  showEvents: boolean;
  showCarriers: boolean;
  showConflicts: boolean;
  showNotams: boolean;
  setSelectedIntel: (data: any) => void;
};

export default function TacticalMap({
  showEvents,
  showCarriers,
  showConflicts,
  showNotams,
  setSelectedIntel,
}: TacticalMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [75, 25],
      zoom: 2.6,
    });

    map.addControl(
      new maplibregl.NavigationControl()
    );

    map.on("load", () => {
      if (showConflicts) {
        conflicts.forEach((conflict) => {
          const el =
            document.createElement("div");

          el.style.width = "40px";
          el.style.height = "40px";
          el.style.background =
            "rgba(255,0,0,0.25)";
          el.style.border =
            "2px solid #ff3b30";
          el.style.borderRadius = "50%";
          el.style.cursor = "pointer";

          el.onclick = () =>
            setSelectedIntel({
              type: "Conflict Zone",
              title: conflict.name,
              lat: conflict.lat,
              lng: conflict.lng,
            });

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

      if (showEvents) {
        events.forEach((event) => {
          const marker =
            new maplibregl.Marker({
              color:
                event.severity === "critical"
                  ? "#ff3b30"
                  : event.severity === "high"
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
                setSelectedIntel({
                  type: "Event",
                  title: event.title,
                  severity:
                    event.severity,
                  lat: event.lat,
                  lng: event.lng,
                });
              }
            );
        });
      }

      if (showCarriers) {
        carriers.forEach((carrier) => {
          const el =
            document.createElement("div");

          el.style.width = "20px";
          el.style.height = "20px";
          el.style.background =
            "#00b4ff";
          el.style.border =
            "2px solid white";
          el.style.borderRadius =
            "50%";
          el.style.boxShadow =
            "0 0 10px #00b4ff";
          el.style.cursor = "pointer";

          el.onclick = () =>
            setSelectedIntel({
              type: "Carrier",
              title: carrier.name,
              lat: carrier.lat,
              lng: carrier.lng,
            });

          new maplibregl.Marker({
            element: el,
          })
            .setLngLat([
              carrier.lng,
              carrier.lat,
            ])
            .addTo(map);
        });
      }

      if (showNotams) {
        notams.forEach((notam) => {
          const el =
            document.createElement("div");

          el.innerHTML = "✈";
          el.style.color =
            "#00ff88";
          el.style.fontSize = "20px";
          el.style.cursor = "pointer";

          el.onclick = () =>
            setSelectedIntel({
              type: "NOTAM",
              title: notam.title,
              lat: notam.lat,
              lng: notam.lng,
            });

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

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
    />
  );
}