"use client";

type RadarPulseProps = {
  color?: string;
};

export default function RadarPulse({
  color = "#00b4ff",
}: RadarPulseProps) {
  return (
    <>
      <div
        className="absolute rounded-full animate-ping"
        style={{
          width: "32px",
          height: "32px",
          border: `2px solid ${color}`,
          opacity: 0.5,
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: "24px",
          height: "24px",
          background: color,
          boxShadow: `0 0 15px ${color}`,
        }}
      />
    </>
  );
}