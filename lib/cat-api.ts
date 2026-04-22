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

//the url of the api provider of thi project
const CAT_API_BASE_URL = "https://api.thecatapi.com/v1";
export const CAT_API_CONFIGURATION_ERROR_MESSAGE = `Configuration error: THE_CAT_API_KEY is missing.

The request asked for 12 results, but only 10 were returned.
This is due to limitations on unauthenticated requests.

A valid API key is required to access extended result limits
and ordered pagination.

Please configure THE_CAT_API_KEY in your environment settings.`;

// define request headers for the cat api
function getHeaders() {
  //if the api key is missed return undefined
  if (!process.env.THE_CAT_API_KEY) {
    return undefined;
  }
  // get the api key as header
  return {
    "x-api-key": process.env.THE_CAT_API_KEY,
  };
}

// map raw api image to card, this transformation is for better providing the cat data to user interface
/*
json sample of cat api
{
  "id":"0XYvRd7oD",
    "width":1204,"height":1445,
    "url":"https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
    "breeds":[{
  "weight":{"imperial":"7  -  10","metric":"3 - 5"},
  "id":"abys","name":"Abyssinian",
  "temperament":"Active, Energetic, Independent, Intelligent, Gentle",
  "origin":"Egypt",
  "country_codes":"EG",
  "country_code":"EG",
  "life_span":"14 - 15",
  "wikipedia_url":"https://en.wikipedia.org/wiki/Abyssinian_(cat)"
}]*/
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

// fetch one single cat img by id(fake search,  it actually a match of url)
async function fetchCatImageById(id: string) {
  //concatenate cat id with base url
  const response = await fetch(`${CAT_API_BASE_URL}/images/${id}`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  // 404 not found
  if (response.status === 404) {
    return null;
  }
  // response.ok is a boolean field of Response, if status is between 200 and 299, it is true
  if (!response.ok) {
    throw new Error("Failed to fetch the cat.");
  }
  // make Promise<response> to response
  // add "as" here just make runtime safer
  return (await response.json()) as CatApiImage;
}

// fetch a batch of random cats
export async function getRandomCats(limit = 12) {
  // IMPORTANT:
  // The Cat API allows unauthenticated access to /images/search,
  // but anonymous requests may be restricted.
  //
  // In testing, requests without an API key returned a fixed number of results (10),
  // even when a higher limit was requested (e.g., limit=12).
  //
  // With a valid API key, the API respects the requested limit
  // and enables extended query features such as ordering and pagination.
  const response = await fetch(
/*    limit	1-100	Number of images to return between	default=1
      has_breeds	1 or 0	Only return images that have breed information	default=0*/

      // set limit variable to get certain number of cats
      //set has_breeds variable to choose to get the information of breeds
    `${CAT_API_BASE_URL}/images/search?limit=${limit}&has_breeds=1`,
    {
      headers: getHeaders(),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch random cats.");
  }

  //get the list of CatApiImage
  const data = (await response.json()) as CatApiImage[];

  if (data.length < limit) {
    throw new Error(CAT_API_CONFIGURATION_ERROR_MESSAGE);
  }

  //wait all the promise to be finished
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
