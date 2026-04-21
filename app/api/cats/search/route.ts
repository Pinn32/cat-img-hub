import { NextResponse } from "next/server";
import { getCatById } from "@/lib/cat-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Cat id is required." }, { status: 400 });
  }

  try {
    const cat = await getCatById(id);

    if (!cat) {
      return NextResponse.json({ cat: null }, { status: 404 });
    }

    return NextResponse.json({ cat });
  } catch {
    return NextResponse.json(
      { message: "Failed to search cat." },
      { status: 500 },
    );
  }
}
