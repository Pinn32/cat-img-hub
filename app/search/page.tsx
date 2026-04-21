// Member: Yuchen Bao
// Search page layout: search cats by id, handle liked status

import { auth } from "@/auth";
import { SearchContent } from "@/components/SearchContent";
import { getCatById } from "@/lib/cat-api";
import { FAVORITE_DATABASE_ERROR } from "@/lib/favorite-error-message";
import { getFavoriteIdsByUserId } from "@/lib/favorites";

type SearchPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;  // get search params
  const id = params.id?.trim() || "";  // extract id from search params
  const session = await auth();  // get user auth session

  // init variables for ui data & error message
  let favoriteMessage = "";
  let favoriteIds: string[] = [];

  // Handle like button status
  // if logged in and got user id
  if (session?.user?.id) {
    try {
      // get liked cat id by user id
      favoriteIds = await getFavoriteIdsByUserId(session.user.id);
    } catch (error) {
      // error: mongodb error
      console.error(error);
      favoriteMessage = FAVORITE_DATABASE_ERROR;
    }
  }

  // fetch cat data by id from cat api
  let cat: Awaited<ReturnType<typeof getCatById>> = null;
  if (id) {
    try {
      cat = await getCatById(id);
    } catch {
      cat = null;
    }
  }

  return (
    <SearchContent
      initialCat={cat}
      initialFavoriteIds={favoriteIds}
      initialMessage={favoriteMessage}
      initialQuery={id}
      isLoggedIn={Boolean(session?.user?.id)}
    />
  );
}
