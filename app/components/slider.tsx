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
  const cardNum =
    screenSize.width && Math.floor(screenSize.width / 370) <= 4
      ? Math.floor(screenSize.width / 370)
      : 4;

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
      if (touchX < touchStartX) handleLeftClick(); // swipe left
      if (touchX > touchStartX) handleRightClick(); // swipe right
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
          style={{ width: `${370 * cardNum}px` }}
        >
          <button
            className="shadow-outer size-9 rounded-xl border border-solid text-xl"
            onClick={handleLeftClick}
          >
            &lt;
          </button>
          <button
            className="shadow-outer size-9 rounded-xl border border-solid text-xl"
            onClick={handleRightClick}
          >
            &gt;
          </button>
        </div>
      )}
      <div
        className="flex h-fit flex-row self-center overflow-x-clip py-[10px]"
        style={{ width: `${370 * cardNum}px` }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="mx-[10px] shrink-0 basis-[350px] transform transition-transform duration-500"
            style={{ transform: `translateX(-${370 * inViewIndex}px)` }}
          >
            <Card product={product} />
          </div>
        ))}
      </div>
      {cardNum === 1 && products.length > 1 && (
        <div className="mb-3 flex flex-row justify-center gap-1.5">
          {products.map((_, i) => (
            <div
              key={i}
              className={
                i === inViewIndex
                  ? "size-1.5 rounded-full bg-black"
                  : "bg-ibp-zinc size-1.5 rounded-full"
              }
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
