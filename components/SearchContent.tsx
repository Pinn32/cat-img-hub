// Member: Yuchen Bao
// Search page content: search cats by id

"use client";

import { useState } from "react";
import { CatCard } from "@/components/CatCard";
import { Grid } from "@/components/CatCard.styles";
import {
  Hero,
  MainButton,
  Message,
  Main,
  SearchForm,
  SearchInput,
  Text,
  Title,
} from "@/components/Main.styles";
import { useFavorites } from "@/lib/useFavorites";
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
  // input query state
  const [query, setQuery] = useState(initialQuery);
  // custom hook managing favorite logic
  const { favoriteIds, message, handleLike } = useFavorites(
    initialFavoriteIds,
    isLoggedIn,
    initialMessage,
  );

  return (
    <Main>
      <Hero>
        <Title>Search by ID</Title>
        <Text>Enter a cat image id and click search.</Text>
      </Hero>

      <SearchForm action="/search" method="GET">
        <SearchInput
          name="id"
          placeholder="Enter cat id (eg. CvhOrd3S_)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <MainButton type="submit">Search</MainButton>
      </SearchForm>

      {/* feedback messages from favorite action */}
      {message ? <Message>{message}</Message> : null}

      {initialQuery && !initialCat ? <Message>No matched cat image found.</Message> : null}

      {/* render result only if found a valid cat */}
      {initialCat ? (
        <Grid>
          <CatCard
            cat={initialCat}
            buttonText={favoriteIds.includes(initialCat.id) ? "Cancel Like" : "Like"}
            onButtonClick={handleLike}
          />
        </Grid>
      ) : null}
    </Main>
  );
}
