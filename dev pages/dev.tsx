import { nanoid } from "nanoid";
import { NextPage } from "next";
import { FormEvent, FormEventHandler, useContext, useRef } from "react";
import { DatabaseContext } from "../context/DatabaseContext";
import { ProductListing } from "../pages/product/[id]";

const Dev: NextPage = () => {
  const databaseContext = useContext(DatabaseContext);
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const tagline = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const rating = useRef<HTMLInputElement>(null);
  const thumbnailImgUrl = useRef<HTMLInputElement>(null);
  const highResImgUrl = useRef<HTMLInputElement>(null);
  const imgAttribution = useRef<HTMLInputElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    console.log(
      title.current,
      description.current,
      tagline.current,
      price.current,
      rating.current,
      thumbnailImgUrl.current,
      highResImgUrl.current,
      imgAttribution.current
    );
    e.preventDefault();
    if (
      !title.current ||
      !description.current ||
      !tagline.current ||
      !price.current ||
      !rating.current ||
      !thumbnailImgUrl.current ||
      !highResImgUrl.current ||
      !imgAttribution.current
    )
      return;

    const newProduct: ProductListing = {
      title: title.current.value,
      description: description.current.value,
      tagline: tagline.current.value,
      price: Number.parseFloat(price.current.value),
      rating: Number.parseFloat(rating.current.value),
      thumbnailImgUrl: thumbnailImgUrl.current.value,
      highResImgUrl: highResImgUrl.current.value,
      imgAttribution: imgAttribution.current.value,
      productId: nanoid(),
    };

    databaseContext?.dev_uploadProduct(newProduct);
  }

  return (
    <form className="flex flex-col gap-2 bg-gray-700" onSubmit={onSubmit}>
      <input type="text" ref={title} placeholder="title" />
      <textarea ref={description} placeholder="description" />
      <input type="text" ref={tagline} placeholder="tagline" />
      <input type="string" ref={price} placeholder="price" />
      <input type="string" ref={rating} placeholder="rating" />
      <input type="text" ref={thumbnailImgUrl} placeholder="thumbnailimgurl" />
      <input type="text" ref={highResImgUrl} placeholder="highresimgurl" />
      <input type="text" ref={imgAttribution} placeholder="imgattribution" />
      <button className="bg-green-700 text-white p-4 mt-4" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Dev;
