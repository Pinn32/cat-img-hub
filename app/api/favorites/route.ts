import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { FAVORITE_DATABASE_ERROR } from "@/lib/favorite-error-message";
import { addFavorite, getFavoritesByUserId, removeFavorite } from "@/lib/favorites";
import type { CatCardData } from "@/lib/types";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const favorites = await getFavoritesByUserId(session.user.id);

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: FAVORITE_DATABASE_ERROR }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const cat = (await request.json()) as CatCardData;

  try {
    await addFavorite(session.user.id, cat);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: FAVORITE_DATABASE_ERROR }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Cat id is required." }, { status: 400 });
  }

  try {
    await removeFavorite(session.user.id, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: FAVORITE_DATABASE_ERROR }, { status: 500 });
  }
}
