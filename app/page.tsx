import Slider from "./components/slider";

type responseDataType = {
  id: number;
  image: string;
  name: string;
  review_stars: number | null;
  review_num: number;
  type: "Prebuilt" | "Custom";
  os: string;
  processor: string;
  video_card: string;
  storage: string;
  memory: string;
  discount: number;
  price: number;
  affirm_price: number;
  shipping_date: string;
};

export default async function Home() {
  const response = await fetch(process.env.URL + "/api/products", {
    cache: "no-store",
  });
  const data = await response.json();
  const products = data.map((datum: responseDataType) => ({
    id: datum.id,
    image: datum.image,
    name: datum.name,
    reviewStars: datum.review_stars,
    reviewNum: datum.review_num,
    type: datum.type,
    os: datum.os,
    processor: datum.processor,
    videoCard: datum.video_card,
    storage: datum.storage,
    memory: datum.memory,
    discount: datum.discount,
    price: datum.price,
    affirmPrice: datum.affirm_price,
    shippingDate: datum.shipping_date,
  }));

  return (
    <main>
      <section className="my-4">
        <h1 className="text-center text-3xl font-bold">
          Best Selling Gaming PC
        </h1>
        <h2 className="mb-2 text-center text-2xl font-bold">
          Prebuilt & Custom
        </h2>
        <Slider products={products} />
      </section>
    </main>
  );
}
