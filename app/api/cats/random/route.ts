import { NextResponse } from "next/server";
import { getRandomCats } from "@/lib/cat-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitValue = Number(searchParams.get("limit"));
  const limit = Number.isNaN(limitValue) ? 6 : limitValue;

  try {
    const cats = await getRandomCats(limit);

    return NextResponse.json({ cats });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch cats." },
      { status: 500 },
    );
  }
}
