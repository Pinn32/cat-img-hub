// Member: Yuchen Bao
// types for cat card data

export type CatCardData = {
  id: string;
  imageUrl: string;
  breed: string;
  lifeSpan: string;
  temperament: string;
};


// Member: Tianpeng Xu
// type for user-liked cat card data

export type FavoriteDocument = CatCardData & {
  userId: string;
};
