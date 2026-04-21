// Member: Yuchen Bao
// Cat API utilities

import type { CatCardData } from "@/lib/types";

type CatApiBreed = {
  name?: string;
  life_span?: string;
  temperament?: string;
};

type CatApiImage = {
  id: string;
  url: string;
  breeds?: CatApiBreed[];
};

const CAT_API_BASE_URL = "https://api.thecatapi.com/v1";

// define request headers for the cat api
function getHeaders() {
  if (!process.env.THE_CAT_API_KEY) {
    return undefined;
  }

  return {
    "x-api-key": process.env.THE_CAT_API_KEY,
  };
}

// map raw api image to card
function mapCat(image: CatApiImage): CatCardData {
  const breed = image.breeds?.[0];

  return {
    id: image.id,
    imageUrl: image.url,
    breed: breed?.name || "Unknown",
    lifeSpan: breed?.life_span || "Unknown",
    temperament: breed?.temperament || "Unknown",
  };
}

// fetch one single cat img by id
async function fetchCatImageById(id: string) {
  const response = await fetch(`${CAT_API_BASE_URL}/images/${id}`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  // 404 not found
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch the cat.");
  }

  return (await response.json()) as CatApiImage;
}

// fetch a batch of random cats
export async function getRandomCats(limit = 6) {
  const response = await fetch(
    `${CAT_API_BASE_URL}/images/search?limit=${limit}&has_breeds=1`,
    {
      headers: getHeaders(),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch random cats.");
  }

  const data = (await response.json()) as CatApiImage[];

  return await Promise.all(
    data.map(async (image) => {
      if (image.breeds?.length) {
        return mapCat(image);
      }

      const fullImage = await fetchCatImageById(image.id);

      return mapCat(fullImage || image);
    }),
  );
}

// fetch cat data by id
export async function getCatById(id: string) {
  const data = await fetchCatImageById(id);

  if (!data) {
    return null;
  }

  return mapCat(data);
}
