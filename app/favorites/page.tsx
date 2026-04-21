import { auth } from "@/auth";
import { FavoritesContent } from "@/components/favorites-content";
import { MainLinkButton, Message, PageShell } from "@/components/page-shell.styles";
import { FAVORITE_DATABASE_ERROR } from "@/lib/favorite-error-message";
import { getFavoritesByUserId } from "@/lib/favorites";
import type { CatCardData } from "@/lib/types";

export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <PageShell>
        <Message>Please log in first to see your favorites.</Message>
        <MainLinkButton href="/login">Go to Login</MainLinkButton>
      </PageShell>
    );
  }

  let favoriteMessage = "";
  let favorites: CatCardData[] = [];

  try {
    favorites = await getFavoritesByUserId(session.user.id);
  } catch (error) {
    console.error(error);
    favoriteMessage = FAVORITE_DATABASE_ERROR;
  }

  return <FavoritesContent initialCats={favorites} initialMessage={favoriteMessage} />;
}
