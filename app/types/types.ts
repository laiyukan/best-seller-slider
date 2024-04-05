export type productType = {
  id: number;
  image: string;
  name: string;
  reviewStars: number | null;
  reviewNum: number;
  type: "Prebuilt" | "Custom";
  os: string;
  processor: string;
  videoCard: string;
  storage: string;
  memory: string;
  discount: number;
  price: number;
  affirmPrice: number;
  shippingDate: string;
};
