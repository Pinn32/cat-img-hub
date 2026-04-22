// Member: Yuchen Bao, Aiqi Xu, Tianpeng Xu
// Home page content

"use client";

import { useState } from "react";
import { CatCard } from "@/components/CatCard";
import { Grid } from "@/components/CatCard.styles";
import {
  Hero,
  MainButton,
  Message,
  Main,
  Text,
  Title,
} from "@/components/Main.styles";
import { useFavorites } from "@/lib/useFavorites";
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
  // cat & loading states; favorite utilities
  const [cats, setCats] = useState(initialCats);
  const [loading, setLoading] = useState(false);
  const { favoriteIds, message, setMessage, handleLike } = useFavorites(
    initialFavoriteIds,
    isLoggedIn,
    initialMessage,
  );

  // refresh cats: fetch a new batch of random cats from cat api
  async function refreshCats() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/cats/random?limit=12", {
        cache: "no-store",
      });
      const data = (await response.json()) as {
        cats?: CatCardData[];
        message?: string;
      };

      if (!response.ok) {
        setCats([]);
        throw new Error(data.message || "Failed to refresh cats.");
      }

      if (!data.cats) {
        setCats([]);
        throw new Error("Failed to refresh cats.");
      }

      setCats(data.cats);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to refresh cats.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Main>
      <Hero>
        <Title>Random Cat Gallery</Title>
        <Text>
          Open the home page to browse random cats. Press refresh to get another
          batch.
        </Text>
      </Hero>

      <MainButton type="button" onClick={refreshCats} disabled={loading}>
        {/* button text: loading state */}
        {loading ? "Refreshing..." : "Refresh Cats"}
      </MainButton>

      {/* system message: error or feedback */}
      {message ? (
        <Message>
          {message.split("\n").map((line, index, lines) => (
            <span key={`${line}-${index}`}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </Message>
      ) : null}

      {/* render cat gallery */}
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
    </Main>
  );
}
