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
  SearchForm,
  SearchInput,
  Text,
  Title,
} from "@/components/page-shell.styles";
import type { CatCardData } from "@/lib/types";

type SearchContentProps = {
  initialCat: CatCardData | null;
  initialFavoriteIds: string[];
  initialMessage: string;
  initialQuery: string;
  isLoggedIn: boolean;
};

export function SearchContent({
  initialCat,
  initialFavoriteIds,
  initialMessage,
  initialQuery,
  isLoggedIn,
}: SearchContentProps) {
  const router = useRouter();
  const [favoriteIds, setFavoriteIds] = useState(initialFavoriteIds);
  const [query, setQuery] = useState(initialQuery);
  const [message, setMessage] = useState(initialMessage);

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
        <Title>Search by ID</Title>
        <Text>Paste a cat image id and click search.</Text>
      </Hero>

      <SearchForm action="/search" method="GET">
        <SearchInput
          name="id"
          placeholder="Paste cat id"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <MainButton type="submit">Search</MainButton>
      </SearchForm>

      {message ? <Message>{message}</Message> : null}

      {initialQuery && !initialCat ? <Message>No cat found for this id.</Message> : null}

      {initialCat ? (
        <Grid>
          <CatCard
            cat={initialCat}
            buttonText={favoriteIds.includes(initialCat.id) ? "Cancel Like" : "Like"}
            onButtonClick={handleLike}
          />
        </Grid>
      ) : null}
    </PageShell>
  );
}
