"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { productType } from "../types/types";
import Card from "./card";
import useScreenSize from "../hooks/useScreenSize";

interface SliderProps {
  products: productType[];
}

const Slider = ({ products }: SliderProps) => {
  const [inViewIndex, setInViewIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();
  // TODO: mobile first design or add loading
  const cardWidth = (screenSize.width as number) > 1440 ? 370 : 320;
  const cardNum =
    Math.floor((screenSize.width as number) / 320) >= 4
      ? 4
      : Math.floor((screenSize.width as number) / 320) === 0
        ? 1
        : Math.floor((screenSize.width as number) / 320);

  const handleLeftClick = useCallback(() => {
    if (inViewIndex === 0) {
      return;
    }
    setInViewIndex((ivi) => ivi - 1);
  }, [inViewIndex]);
  const handleRightClick = useCallback(() => {
    if (inViewIndex + cardNum >= products.length) {
      return;
    }
    setInViewIndex((ivi) => ivi + 1);
  }, [inViewIndex, cardNum, products]);

  useEffect(() => {
    let sliderRefCopy = sliderRef.current ?? null;
    let touchStartX = 0;
    let touchX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      touchX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchX < touchStartX) handleRightClick(); // swipe left
      if (touchX > touchStartX) handleLeftClick(); // swipe right
    };

    sliderRefCopy?.addEventListener("touchstart", handleTouchStart, false);
    sliderRefCopy?.addEventListener("touchmove", handleTouchMove, false);
    sliderRefCopy?.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      sliderRefCopy?.removeEventListener("touchstart", handleTouchStart);
      sliderRefCopy?.removeEventListener("touchmove", handleTouchMove);
      sliderRefCopy?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [screenSize, handleLeftClick, handleRightClick]);

  return (
    <div className="flex h-full w-full flex-col" ref={sliderRef}>
      {cardNum > 1 && products.length > cardNum && (
        <div
          className="mr-[20px] flex flex-row justify-end gap-1 self-center"
          style={{
            width: `${cardWidth * cardNum}px`,
          }}
        >
          <button
            className="size-9 rounded-xl border border-solid text-xl shadow-outer hover:bg-ibp-light-blue disabled:bg-transparent disabled:text-ibp-zinc disabled:shadow-none"
            onClick={handleLeftClick}
            disabled={inViewIndex === 0}
          >
            &lt;
          </button>
          <button
            className="size-9 rounded-xl border border-solid text-xl shadow-outer hover:bg-ibp-light-blue disabled:bg-transparent disabled:text-ibp-zinc disabled:shadow-none"
            onClick={handleRightClick}
            disabled={inViewIndex === products.length - cardNum}
          >
            &gt;
          </button>
        </div>
      )}
      <div
        className="my-[10px] flex h-fit flex-row self-center overflow-x-clip"
        style={{
          width: `${cardWidth * cardNum}px`,
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="mx-[10px] basis-[350px] transform transition-transform duration-500"
            style={{
              transform: `translateX(-${cardWidth * inViewIndex}px)`,
              flexShrink: `${cardWidth === 320 ? 1 : 0}`,
            }}
          >
            <Card product={product} />
          </div>
        ))}
      </div>
      {cardNum === 1 && products.length > 1 && (
        <div className="my-3 flex flex-row justify-center gap-1.5">
          {products.map((_, i) => (
            <div
              key={i}
              className={
                i === inViewIndex
                  ? "size-1.5 rounded-full bg-black"
                  : "size-1.5 rounded-full bg-ibp-zinc"
              }
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
