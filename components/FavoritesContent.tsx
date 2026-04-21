// Member: Tianpeng Xu
// Favorites page content

"use client";

import { useState } from "react";
import { CatCard } from "@/components/CatCard";
import { Grid } from "@/components/CatCard.styles";
import { Hero, Message, Main, Text, Title } from "@/components/Main.styles";
import type { CatCardData } from "@/lib/types";

type FavoritesContentProps = {
  initialCats: CatCardData[];
  initialMessage: string;
};

export function FavoritesContent({
  initialCats,
  initialMessage,
}: FavoritesContentProps) {
  // states for favorite cats list
  const [cats, setCats] = useState(initialCats);
  const [message, setMessage] = useState(initialMessage);

  // remove a cat from favorites
  async function handleRemove(cat: CatCardData) {
    try {
      // delete cat entry from mongodb
      const response = await fetch(`/api/favorites?id=${cat.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setMessage("Failed to remove favorite.");
        return;
      }
      // update state & ui
      setCats((current) => current.filter((item) => item.id !== cat.id));
      setMessage("Removed from favorites.");
    } catch {
      setMessage("Failed to remove favorite.");
    }
  }

  return (
    <Main>
      <Hero>
        <Title>Your Favorite Cats</Title>
        <Text>Only your own favorites are shown here.</Text>
      </Hero>

      {/* status / feedback message */}
      {message ? <Message>{message}</Message> : null}

      {/* empty state / liked cat list */}
      {cats.length === 0 ? (
        <Message>No favorite cats yet.</Message>
      ) : (
        // grid layout for cat cards
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
    </Main>
  );
}
