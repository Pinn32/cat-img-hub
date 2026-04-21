// Member: Tianpeng Xu
// custom hook for managing user favorite cats

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CatCardData } from "@/lib/types";

export function useFavorites(
  initialFavoriteIds: string[],
  isLoggedIn: boolean,
  initialMessage = "",
) {
  // router used to redirect unauthenticated users to login page
  const router = useRouter();
  // state storing IDs of liked cats
  const [favoriteIds, setFavoriteIds] = useState(initialFavoriteIds);
  // feedback message for user actions
  const [message, setMessage] = useState(initialMessage);

  // toggle favorite status of a cat (like / cancel)
  async function handleLike(cat: CatCardData) {
    // redirect unauthenticated users to login page
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // check current favorite status
    const isFavorite = favoriteIds.includes(cat.id);

    try {
      if (isFavorite) {
        // remove from server favorites
        const response = await fetch(`/api/favorites?id=${cat.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          setMessage("Failed to update favorites.");
          return;
        }
        setFavoriteIds((current) => current.filter((id) => id !== cat.id));
        setMessage("Removed from favorites.");
        return;
      }

      // add to server favorites
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cat),
      });
      if (!response.ok) {
        setMessage("Failed to update favorites.");
        return;
      }
      setFavoriteIds((current) => [...current, cat.id]);
      setMessage("Added to favorites.");
    } catch {
      setMessage("Failed to update favorites.");
    }
  }

  return { favoriteIds, message, setMessage, handleLike };
}
