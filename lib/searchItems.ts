import { events } from "./events";
import { carriers } from "./carriers";
import { conflicts } from "./conflicts";
import { notams } from "./notams";

export const searchItems = [
  ...events.map((e) => ({
    type: "Event",
    title: e.title,
    lat: e.lat,
    lng: e.lng,
  })),

  ...carriers.map((c) => ({
    type: "Carrier",
    title: c.name,
    lat: c.lat,
    lng: c.lng,
  })),

  ...conflicts.map((c) => ({
    type: "Conflict Zone",
    title: c.name,
    lat: c.lat,
    lng: c.lng,
  })),

  ...notams.map((n) => ({
    type: "NOTAM",
    title: n.title,
    lat: n.lat,
    lng: n.lng,
  })),
];