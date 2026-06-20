import { NextResponse } from "next/server";
import tilesData from "@/data/tiles.json";

export async function GET() {
  return NextResponse.json(tilesData);
}
