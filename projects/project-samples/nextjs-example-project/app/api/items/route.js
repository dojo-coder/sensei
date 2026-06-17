import { NextResponse } from "next/server";
import { items } from "../../items";

// GET /api/items -> returns the items as JSON.
export function GET() {
  return NextResponse.json(items);
}
