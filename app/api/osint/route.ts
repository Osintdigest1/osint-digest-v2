import { NextResponse } from "next/server";

export async function GET() {
  const osint = [
    {
      id: 1,
      source: "SentDefender",
      region: "Middle East",
      severity: "critical",
      title: "Missile launch detected",
      time: new Date().toUTCString(),
    },

    {
      id: 2,
      source: "OSINT613",
      region: "Eastern Europe",
      severity: "high",
      title: "Drone activity reported",
      time: new Date().toUTCString(),
    },

    {
      id: 3,
      source: "OSINTTechnical",
      region: "Indo-Pacific",
      severity: "high",
      title: "Naval movement observed",
      time: new Date().toUTCString(),
    },

    {
      id: 4,
      source: "Tracking Live",
      region: "Taiwan Strait",
      severity: "medium",
      title: "Military aircraft activity",
      time: new Date().toUTCString(),
    },
  ];

  return NextResponse.json(osint);
}