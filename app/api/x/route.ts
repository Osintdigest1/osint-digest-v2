import { NextResponse } from "next/server";
import { apify } from "@/lib/apify";

export async function GET() {
  try {
    const run = await apify.actor(
      "apidojo/twitter-scraper-lite"
    ).call({
      handles: [
        "sentdefender",
        "Osint613",
        "Osinttechnical",
        "FaytuksNetwork",
        "AZ_Intel_",
        "Tracking_live",
        "WarMonitorInTL",
      ],

      tweetsDesired: 5,
    });

    const { items } =
      await apify
        .dataset(run.defaultDatasetId)
        .listItems();

    const feed = items.map(
      (tweet: any, index: number) => ({
        id: `x-${index}`,
        source:
          tweet.author?.userName ||
          "X",

        region: "Global",

        severity: "high",

        title:
          tweet.text?.slice(0, 250) ||
          "No text",

        time:
          tweet.createdAt ||
          new Date().toUTCString(),
      })
    );

    return NextResponse.json(feed);
  } catch (error) {
    console.error(error);

    return NextResponse.json([]);
  }
}