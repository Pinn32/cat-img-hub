// Member: Tianpeng Xu
// Favorite cats page: show all liked cats of authorized users.

import { auth } from "@/auth";
import { FavoritesContent } from "@/components/FavoritesContent";
import { MainLinkButton, Message, Main } from "@/components/Main.styles";
import { FAVORITE_DATABASE_ERROR } from "@/lib/favorite-error-message";
import { getFavoritesByUserId } from "@/lib/favorites";
import type { CatCardData } from "@/lib/types";

// server component page: render all liked cats for authorized users
export default async function FavoritesPage() {
  // get user auth session
  const session = await auth();

  // if not logged in, show login prompt
  if (!session?.user?.id) {
    return (
      <Main>
        <Message>Please log in first to see your favorites.</Message>
        <MainLinkButton href="/login">Go to Login</MainLinkButton>
      </Main>
    );
  }

  // init variables for ui data & error message
  let favoriteMessage = "";
  let favorites: CatCardData[] = [];

  // fetch liked cats from mongodb
  try {
    favorites = await getFavoritesByUserId(session.user.id);
  } catch (error) {
    // database error
    console.error(error);
    favoriteMessage = FAVORITE_DATABASE_ERROR;
  }

  // render successful response
  return <FavoritesContent initialCats={favorites} initialMessage={favoriteMessage} />;
}
