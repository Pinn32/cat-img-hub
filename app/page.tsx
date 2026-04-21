// Member: Yuchen Bao
// HomePage layout

import { auth } from "@/auth";
import { HomeContent } from "@/components/HomeContent";
import { getRandomCats } from "@/lib/cat-api";
import { FAVORITE_DATABASE_ERROR } from "@/lib/favorite-error-message";
import { getFavoriteIdsByUserId } from "@/lib/favorites";

export default async function HomePage() {
  // get 6 random cats
  const [session, cats] = await Promise.all([auth(), getRandomCats(6)]);

  // init variables to handle favorite status
  let favoriteMessage = "";
  let favoriteIds: string[] = [];

  // handle favorite status
  // if logged in and got user id, assign to variables
  if (session?.user?.id) {
    try {
      favoriteIds = await getFavoriteIdsByUserId(session.user.id);
    } catch (error) {
      // error: mongodb error
      console.error(error);
      favoriteMessage = FAVORITE_DATABASE_ERROR;
    }
  }

  // return HomePage layout with cats, login & favorite status
  return (
    <HomeContent
      initialCats={cats}
      initialFavoriteIds={favoriteIds}
      initialMessage={favoriteMessage}
      isLoggedIn={Boolean(session?.user?.id)}
    />
  );
}
