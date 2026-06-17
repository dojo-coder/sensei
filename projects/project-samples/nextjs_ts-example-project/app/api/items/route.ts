import { NextResponse } from "next/server";
import { items } from "../../items";

export async function GET() {
  return NextResponse.json(items);
}
