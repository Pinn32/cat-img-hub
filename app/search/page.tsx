import { auth } from "@/auth";
import { SearchContent } from "@/components/search-content";
import { getCatById } from "@/lib/cat-api";
import { FAVORITE_DATABASE_ERROR } from "@/lib/favorite-error-message";
import { getFavoriteIdsByUserId } from "@/lib/favorites";

type SearchPageProps = {
  searchParams: Promise<{
    id?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const id = params.id?.trim() || "";
  const session = await auth();
  let favoriteMessage = "";
  let favoriteIds: string[] = [];

  if (session?.user?.id) {
    try {
      favoriteIds = await getFavoriteIdsByUserId(session.user.id);
    } catch (error) {
      console.error(error);
      favoriteMessage = FAVORITE_DATABASE_ERROR;
    }
  }

  const cat = id ? await getCatById(id) : null;

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
