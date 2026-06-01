"use client";

type RadarPulseProps = {
  color?: string;
};

export default function RadarPulse({
  color = "#00b4ff",
}: RadarPulseProps) {
  return (
    <div
      className="relative"
      style={{
        width: "32px",
        height: "32px",
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          border: `2px solid ${color}`,
          opacity: 0.5,
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: "16px",
          height: "16px",
          background: color,
          boxShadow: `0 0 15px ${color}`,
          left: "50%",
          top: "50%",
          transform:
            "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}