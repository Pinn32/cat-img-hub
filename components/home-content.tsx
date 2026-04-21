"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CatCard } from "@/components/cat-card";
import { Grid } from "@/components/cat-card.styles";
import {
  Hero,
  MainButton,
  Message,
  PageShell,
  Row,
  Text,
  Title,
} from "@/components/page-shell.styles";
import type { CatCardData } from "@/lib/types";

type HomeContentProps = {
  initialCats: CatCardData[];
  initialFavoriteIds: string[];
  initialMessage: string;
  isLoggedIn: boolean;
};

export function HomeContent({
  initialCats,
  initialFavoriteIds,
  initialMessage,
  isLoggedIn,
}: HomeContentProps) {
  const router = useRouter();
  const [cats, setCats] = useState(initialCats);
  const [favoriteIds, setFavoriteIds] = useState(initialFavoriteIds);
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);

  async function refreshCats() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/cats/random?limit=6", {
        cache: "no-store",
      });
      const data = (await response.json()) as { cats: CatCardData[] };

      setCats(data.cats);
    } catch {
      setMessage("Failed to refresh cats.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(cat: CatCardData) {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const isFavorite = favoriteIds.includes(cat.id);

    try {
      if (isFavorite) {
        const response = await fetch(`/api/favorites?id=${cat.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to remove favorite.");
        }

        setFavoriteIds((current) => current.filter((id) => id !== cat.id));
        setMessage("Removed from favorites.");
        return;
      }

      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cat),
      });

      if (!response.ok) {
        throw new Error("Failed to add favorite.");
      }

      setFavoriteIds((current) => [...current, cat.id]);
      setMessage("Added to favorites.");
    } catch {
      setMessage("Failed to update favorites.");
    }
  }

  return (
    <PageShell>
      <Hero>
        <Title>Random Cat Gallery</Title>
        <Text>
          Open the home page to browse random cats. Press refresh to get another
          batch.
        </Text>
      </Hero>

      <Row>
        <MainButton type="button" onClick={refreshCats} disabled={loading}>
          {loading ? "Refreshing..." : "Refresh Cats"}
        </MainButton>
      </Row>

      {message ? <Message>{message}</Message> : null}

      <Grid>
        {cats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            buttonText={favoriteIds.includes(cat.id) ? "Cancel Like" : "Like"}
            onButtonClick={handleLike}
          />
        ))}
      </Grid>
    </PageShell>
  );
}
