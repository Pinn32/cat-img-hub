// Member: Tianpeng Xu
// Favorites DB routes: fetch liked cats from mongodb for authenticated users

import { NextResponse } from "next/server";
import { auth } from "@/auth";
// standardized error message for database-related failures
import { FAVORITE_DATABASE_ERROR } from "@/lib/favorite-error-message";
// database service functions for favorite cats CRUD operations
import { addFavorite, getFavoritesByUserId, removeFavorite } from "@/lib/favorites";
import type { CatCardData } from "@/lib/types";

////////// GET //////////
// fetch all liked cats for the authenticated user
export async function GET() {
  // get current user auth session
  const session = await auth();

  // return 401 if user is not authenticated (unauthorized)
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    // fetch user's liked cats from mongodb
    const favorites = await getFavoritesByUserId(session.user.id);

    return NextResponse.json({ favorites });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: FAVORITE_DATABASE_ERROR }, { status: 500 });
  }
}

////////// POST //////////
// add a cat to user's favorites
export async function POST(request: Request) {
  // get current user auth session
  const session = await auth();

  // unauthorized: 401
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  // parse cat data
  const cat = (await request.json()) as CatCardData;

  try {
    // save cat to user's favorites in mongodb
    await addFavorite(session.user.id, cat);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: FAVORITE_DATABASE_ERROR }, { status: 500 });
  }
}

////////// DELETE //////////
// cancel like for a cat
export async function DELETE(request: Request) {
  // get user auth session
  const session = await auth();

  // unauthorized: 401
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  // get id from query params
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // if no id input (400: client-side error)
  if (!id) {
    return NextResponse.json({ message: "Cat id is required." }, { status: 400 });
  }

  try {
    // fetch cat by id
    await removeFavorite(session.user.id, id);

    // return successful response
    return NextResponse.json({ success: true });

  } catch (error) {
    // handle error (500: server-side error)
    console.error(error);
    return NextResponse.json({ message: FAVORITE_DATABASE_ERROR }, { status: 500 });
  }
}
