"use client";

import { useState } from "react";
import { CatCard } from "@/components/cat-card";
import { Grid } from "@/components/cat-card.styles";
import { Hero, Message, PageShell, Text, Title } from "@/components/page-shell.styles";
import type { CatCardData } from "@/lib/types";

type FavoritesContentProps = {
  initialCats: CatCardData[];
  initialMessage: string;
};

export function FavoritesContent({
  initialCats,
  initialMessage,
}: FavoritesContentProps) {
  const [cats, setCats] = useState(initialCats);
  const [message, setMessage] = useState(initialMessage);

  async function handleRemove(cat: CatCardData) {
    try {
      const response = await fetch(`/api/favorites?id=${cat.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove favorite.");
      }

      setCats((current) => current.filter((item) => item.id !== cat.id));
      setMessage("Removed from favorites.");
    } catch {
      setMessage("Failed to remove favorite.");
    }
  }

  return (
    <PageShell>
      <Hero>
        <Title>Your Favorite Cats</Title>
        <Text>Only your own favorites are shown here.</Text>
      </Hero>

      {message ? <Message>{message}</Message> : null}

      {cats.length === 0 ? (
        <Message>No favorite cats yet.</Message>
      ) : (
        <Grid>
          {cats.map((cat) => (
            <CatCard
              key={cat.id}
              cat={cat}
              buttonText="Cancel Like"
              onButtonClick={handleRemove}
            />
          ))}
        </Grid>
      )}
    </PageShell>
  );
}
