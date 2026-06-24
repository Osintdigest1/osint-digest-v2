export type FeedItem = {
  id: string;
  source: string;
  severity: "critical" | "high" | "medium";
  title: string;
  timestamp: string;
};