"use client";

import { useState, useEffect } from "react";

type screenSizeType = {
  width: null | number;
  height: null | number;
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<screenSizeType>({
    width: null,
    height: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
