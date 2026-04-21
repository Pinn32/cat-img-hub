// Member: Tianpeng Xu
// favorites & mongodb utilities

import { getMongoDatabase } from "@/lib/mongodb";
import type { CatCardData, FavoriteDocument } from "@/lib/types";

const COLLECTION_NAME = "favorites";

// get all liked cat for authorized user
export async function getFavoritesByUserId(userId: string) {
  const database = await getMongoDatabase();

  const favorites = await database
    .collection<FavoriteDocument>(COLLECTION_NAME)
    .find({ userId })
    .sort({ _id: -1 })
    .toArray();

  return favorites.map((favorite) => ({
    id: favorite.id,
    imageUrl: favorite.imageUrl,
    breed: favorite.breed,
    lifeSpan: favorite.lifeSpan,
    temperament: favorite.temperament,
  }));
}

// get only id of favorite cats
export async function getFavoriteIdsByUserId(userId: string) {
  const favorites = await getFavoritesByUserId(userId);

  return favorites.map((favorite) => favorite.id);
}


// add a cat to user's favorite
export async function addFavorite(userId: string, cat: CatCardData) {
  const database = await getMongoDatabase();
  const collection = database.collection<FavoriteDocument>(COLLECTION_NAME);

  const exists = await collection.findOne({ userId, id: cat.id });

  if (!exists) {
    await collection.insertOne({
      userId,
      ...cat,
    });
  }
}

// remove a cat from user's favorites.
export async function removeFavorite(userId: string, catId: string) {
  const database = await getMongoDatabase();

  await database.collection<FavoriteDocument>(COLLECTION_NAME).deleteOne({
    userId,
    id: catId,
  });
}
