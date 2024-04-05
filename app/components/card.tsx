import Image from "next/image";
import ProductImage from "./product-image";
import { productType } from "../types/types";
import { MONTHS, WEEK_DAYS } from "../constants/constants";

interface CardProps {
  product: productType;
}

const Card = ({ product }: CardProps) => {
  const reducedPrice = product.price - product.discount;
  const shippingDate = new Date(product.shippingDate);
  const isWithinFiveDays =
    Math.abs(
      (shippingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    ) <= 5;
  const shippingWeekDay = WEEK_DAYS[shippingDate.getDay()];
  const shippingMonth = MONTHS[shippingDate.getMonth()];

  return (
    <div className="shadow-outer flex h-[640px] min-w-[300px] max-w-[350px] basis-full flex-col rounded-xl">
      <div className="flex grow flex-col items-start gap-px p-5">
        <div className="border-ibp-zinc text-ibp-zinc text-xxs rounded-2xl border border-solid px-2 py-0.5 font-semibold">
          {product.type} PC
        </div>
        <div className="self-center">
          <ProductImage src={product.image} />
        </div>
        <p className="hover:text-ibp-red pt-3 text-base font-semibold">
          {product.name}
        </p>
        <div className="mt-auto text-sm leading-6">
          <p>{product.os}</p>
          <p>{product.processor}</p>
          <p>{product.videoCard}</p>
          <p>{product.storage}</p>
          <p>{product.memory}</p>
        </div>
      </div>
      <div className="mt-auto flex h-[176px] flex-col items-start gap-2 bg-[#f2f6fa] p-5">
        <div className="bg-ibp-red rounded-2xl px-2 py-1 text-xs text-white">
          SAVE ${product.discount}
        </div>
        <div className="flex flex-row">
          <div>
            <p>
              <span className="text-xl font-bold">${reducedPrice}</span>
              <span className="text-ibp-zinc pl-2 align-text-bottom text-xs line-through">
                ${product.price}
              </span>
            </p>
            <p className="mt-1 text-xs">
              Starting at{" "}
              <span className="text-[#004cff]">
                $Affirm {product.affirmPrice}/mo
              </span>{" "}
              with{" "}
            </p>
          </div>
          <div className="self-end">
            <Image
              src="/icon-affirm.svg"
              alt="Affirm Logo"
              width={0}
              height={0}
              style={{
                display: "inline",
                height: "auto",
                width: "55px",
                marginBottom: "-8px",
                marginLeft: "0",
              }}
            />
          </div>
        </div>
        <div className="mt-auto flex flex-row justify-between gap-px self-stretch">
          <div>
            <div className="text-xs font-bold">Free Shipping</div>
            <div className="text-xs">
              {isWithinFiveDays
                ? `Delivery By ${shippingWeekDay}, ${shippingMonth}, ${shippingDate.getDate()}`
                : `Estimate Ship By ${shippingDate.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}`}{" "}
            </div>
          </div>
          <button className="border-ibp-red text-ibp-red w-28 self-center rounded-3xl border border-solid px-3 py-1 text-sm font-medium">
            {product.type === "Prebuilt" ? "Buy Now" : "Customize"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
