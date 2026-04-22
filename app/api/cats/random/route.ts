// Member: Yuchen Bao
// Random cat API routes: fetch 6 random cats

import { NextResponse } from "next/server";
import { getRandomCats } from "@/lib/cat-api";

// Fetch 6 random cats
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // read limit query param and convert to number
  const limitValue = Number(searchParams.get("limit"));
  // fallback to default limit (6) if invalid value is provided
  const limit = Number.isNaN(limitValue) ? 6 : limitValue;

  try {
    // fetch random cats using resolved limit (should also be 6)
    const cats = await getRandomCats(limit);

    // return successful response with cat data
    return NextResponse.json({ cats });
  } catch {
    // handle errors, return 500 response
    return NextResponse.json(
      { message: "Failed to fetch cats." },
      { status: 500 },  // response 500: server-side error
    );
  }
}
