import { NextResponse } from "next/server";
import tilesData from "@/data/tiles.json";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tile = tilesData.find((t) => t.id === id);
  if (!tile) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(tile);
}