import { NextResponse } from "next/server";

export async function GET() {
  try {
    const xRes = await fetch(
  "http://localhost:3000/api/x"
);

const x = await xRes.json();

return NextResponse.json(x);
  } catch (error: any) {
  console.error(error);

  return NextResponse.json({
    error: error.message,
  });
}
}