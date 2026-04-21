export type CatCardData = {
  id: string;
  imageUrl: string;
  breed: string;
  lifeSpan: string;
  temperament: string;
};

export type FavoriteDocument = CatCardData & {
  userId: string;
};
