import React, { useState, useEffect, useRef, memo, useCallback } from "react";

import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { append } from "ramda";
import { useParams } from "react-router-dom";

const Carousel = () => {
  const { slug } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: { imageUrl, imageUrls: partialImageUrls, title } = {} } =
    useShowProduct(slug);

  const imageUrls = append(imageUrl, partialImageUrls);
  const timerRef = useRef(null);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    setCurrentIndex(nextIndex);
  }, [currentIndex, imageUrls.length]);

  const handlePrevious = () => {
    const previousIndex =
      (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    setCurrentIndex(previousIndex);
    resetTimer();
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 3000);
  };

  useEffect(() => {
    timerRef.current = setInterval(handleNext, 3000);

    return () => clearInterval(timerRef.current);
  }, [handleNext]);

  return (
    <div className="flex-col">
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56 p-3"
          src={imageUrls[currentIndex]}
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={() => {
            handleNext();
            resetTimer();
          }}
        />
      </div>
      <div className="flex justify-center space-x-1">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={`neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border ${
              currentIndex === index ? "neeto-ui-bg-black" : ""
            }`}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Carousel);
