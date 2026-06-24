import { NextResponse } from "next/server";
import { client } from "@/lib/telegram";

export async function GET() {
  try {
    await client.connect();

    const channels = [
      "wfwitness",
      "intelslava",
      "warmonitors",
    ];

    const feed: any[] = [];

    for (const channel of channels) {
      try {
        console.log("Trying:", channel);

        const entity =
          await client.getEntity(channel);

        console.log("Found:", channel);

        const messages =
          await client.getMessages(entity, {
            limit: 5,
          });

        console.log(
          "Messages:",
          channel,
          messages.length
        );

        messages.forEach(
          (msg: any, index: number) => {
            if (!msg.message) return;

            feed.push({
              id: `${channel}-${index}`,
              source: channel,
              region: "Global",
              severity: "high",
              title: msg.message.slice(
                0,
                200
              ),
              time:
                msg.date?.toUTCString?.() ||
                new Date().toUTCString(),
            });
          }
        );
      } catch (err) {
        console.error(
          "CHANNEL ERROR:",
          channel
        );
        console.error(err);
      }
    }

    console.log(
      "TOTAL POSTS:",
      feed.length
    );

    return NextResponse.json(feed);
  } catch (error) {
    console.error("GLOBAL ERROR:");
    console.error(error);

    return NextResponse.json([]);
  }
}