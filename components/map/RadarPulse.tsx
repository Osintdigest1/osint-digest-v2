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
        width: "24px",
        height: "24px",
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          border: `1px solid ${color}`,
          opacity: 0.25,
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: "10px",
          height: "10px",
          background: color,
          boxShadow: `
            0 0 6px ${color},
            0 0 12px ${color}
          `,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}