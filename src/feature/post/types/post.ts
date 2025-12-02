export type ContentBlock = {
  type: "sentence" | "img_url";
  content: string;
  order_index: number;
  isThumbnail?: boolean;
};

export type BookstoreForm = {
  postalCode: string;
  address: string;
  detailedAddress: string;
  lat: number;
  lng: number;
  kakaoPlaceId: string;
  openDays: string;
  openHours: string;
  phoneNumber: string;
  instagramLink: string;
  image: string;
};

export type ProductForm = {
  productName: string;
  price: number;
  productImg: string;
  description: string;
};

export type NewPostForm = {
  title: string;
  location: string;
  content: ContentBlock[];
  bookstore: BookstoreForm;
  products: ProductForm[];
};
