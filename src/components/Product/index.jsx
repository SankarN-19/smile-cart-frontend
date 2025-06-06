import React from "react";

import { Header, PageNotFound, PageLoader } from "components/Commons";
import AddToCart from "components/Commons/AddToCart";
import useSelectedQuantity from "components/hooks/useSelectedQuantity";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Button, Typography } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);
  if (isError) return <PageNotFound />;
  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
      <div className="mt-5 flex items-start justify-center gap-16">
        {isNotNil(imageUrls) ? (
          <Carousel />
        ) : (
          <img alt={name} className="w-48" src={imageUrl} />
        )}
        <div className="w-3/5 space-y-4 p-3">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
