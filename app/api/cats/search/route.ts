// Member: Yuchen Bao
// Search API routes: search for cats by id

import { NextResponse } from "next/server";  // for API routes response
import { getCatById } from "@/lib/cat-api";

// Fetch a single cat by id from query param
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // validate required query param
  if (!id) {
    return NextResponse.json({ message: "Cat id is required." }, { status: 400 });
  }

  // fetch cat data
  try {
    const cat = await getCatById(id);

    // return 404 is cat not found
    if (!cat) {
      return NextResponse.json({ cat: null }, { status: 404 });
    }

    // return successful response
    return NextResponse.json({ cat });

  } catch {
    // handle errors
    return NextResponse.json(
      { message: "Failed to search cat." },
      { status: 500 },
    );
  }
}
