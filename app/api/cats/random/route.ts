// Member: Yuchen Bao
// Random cat API routes: fetch 12 random cats

import { NextResponse } from "next/server";
import { getRandomCats } from "@/lib/cat-api";

// NOTE:
// This endpoint depends on a valid API key to ensure
// consistent and complete data retrieval from The Cat API.
// Missing API key may lead to limited or truncated results.
// Fetch 12 random cats
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // read limit query param and convert to number
  const limitParam = searchParams.get("limit");
  const limitValue = limitParam ? Number(limitParam) : NaN;
  // fallback to default limit (12) if invalid value is provided
  const limit = Number.isNaN(limitValue) ? 12 : limitValue;

  try {
    // fetch random cats using resolved limit (should also be 12)
    const cats = await getRandomCats(limit);

    // return successful response with cat data
    return NextResponse.json({ cats });
  } catch (error) {
    // handle errors, return 500 response
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to fetch cats.",
      },
      { status: 500 },  // response 500: server-side error // status: 422 is ok cuz we need more but get 10(unautenticated fetch)
    );
  }
}
