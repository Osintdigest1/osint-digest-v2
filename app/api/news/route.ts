import Parser from "rss-parser";
import { NextResponse } from "next/server";

const parser = new Parser();

export async function GET() {
  try {
    const allNews: any[] = [];

    // BBC
    try {
      const bbc = await parser.parseURL(
        "https://feeds.bbci.co.uk/news/world/rss.xml"
      );

      allNews.push(
        ...bbc.items.slice(0, 10).map((item, index) => ({
          id: `bbc-${index}`,
          source: "BBC",
          region: "Global",
          severity: "medium",
          title: item.title || "Untitled",
          time:
            item.pubDate ||
            new Date().toUTCString(),
        }))
      );
    } catch (err) {
      console.error("BBC RSS ERROR:", err);
    }

    // Al Jazeera
    try {
      const aljazeera = await parser.parseURL(
        "https://www.aljazeera.com/xml/rss/all.xml"
      );

      allNews.push(
        ...aljazeera.items
          .slice(0, 10)
          .map((item, index) => ({
            id: `aj-${index}`,
            source: "Al Jazeera",
            region: "Middle East",
            severity: "medium",
            title: item.title || "Untitled",
            time:
              item.pubDate ||
              new Date().toUTCString(),
          }))
      );
    } catch (err) {
      console.error(
        "AL JAZEERA RSS ERROR:",
        err
      );
    }

    try {
  const cnn = await parser.parseURL(
    "http://rss.cnn.com/rss/edition.rss"
  );

  allNews.push(
    ...cnn.items.slice(0, 10).map((item, index) => ({
      id: `cnn-${index}`,
      source: "CNN",
      region: "Global",
      severity: "medium",
      title: item.title || "Untitled",
      time:
        item.pubDate ||
        new Date().toUTCString(),
    }))
  );
} catch (err) {
  console.error("CNN RSS ERROR:", err);
}
try {
  const axios = await parser.parseURL(
    "https://api.axios.com/feed/"
  );

  allNews.push(
    ...axios.items.slice(0, 10).map((item, index) => ({
      id: `axios-${index}`,
      source: "Axios",
      region: "US",
      severity: "medium",
      title: item.title || "Untitled",
      time:
        item.pubDate ||
        new Date().toUTCString(),
    }))
  );
} catch (err) {
  console.error("AXIOS RSS ERROR:", err);
}
// Reuters via Google News
try {
  const reuters = await parser.parseURL(
    "https://news.google.com/rss/search?q=Reuters&hl=en-US&gl=US&ceid=US:en"
  );

  allNews.push(
    ...reuters.items.slice(0, 10).map((item, index) => ({
      id: `reuters-${index}`,
      source: "Reuters",
      region: "Global",
      severity: "medium",
      title: item.title || "Untitled",
      time:
        item.pubDate ||
        new Date().toUTCString(),
    }))
  );
} catch (err) {
  console.error(
    "REUTERS RSS ERROR:",
    err
  );
}

    allNews.sort(
  (a, b) =>
    new Date(b.time).getTime() -
    new Date(a.time).getTime()
);

const finalFeed = allNews.slice(0, 50);

return NextResponse.json(finalFeed);
  } catch (error) {
    console.error(
      "GLOBAL NEWS ERROR:",
      error
    );

    return NextResponse.json([]);
  }
}