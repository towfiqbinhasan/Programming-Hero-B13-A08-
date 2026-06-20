import { NextResponse } from "next/server";
import tilesData from "@/data/tiles.json";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const tile = tilesData.find((t) => t.id === params.id);
  if (!tile) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(tile);
}
