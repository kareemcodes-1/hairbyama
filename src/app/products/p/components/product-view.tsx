"use client";
import React, { useState } from "react";
import { Product } from "@/types";
import { Link, Minus, Plus } from "lucide-react";
import useCart from "@/store";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";
import { priceFormatter } from "@/lib/priceFormatter";
import ProductCard from "@/app/components/products/product-card";

const ProductView = ({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  



  return (
    <section className="relative min-h-screen mt-[5.5rem]">

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen lg:items-start px-[1.5rem] lg:px-0">

        {/* LEFT — Images Column */}
        <div className="lg:w-[50%] w-full flex flex-col gap-[1rem]">

          {/* Main large image */}
          <div className="relative w-full lg:h-screen h-[70vw]">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              quality={75}
              className=" object-cover"
            />
          </div>


          {product.images.slice(1).map((img, index) => (
            <div
              key={index}
              className="relative w-full lg:h-screen h-[70vw] bg-gray-200 rounded-[1.5rem] lg:rounded-[calc(3.90625vw)] overflow-hidden mt-[.5rem]"
            >
              <Image src={img} alt={product.name} fill quality={100} className="object-contain object-center" />
            </div>
          ))}
        </div>

        {/* RIGHT — Sticky Info Panel */}
        <div className="lg:w-[50%] w-full lg:self-start lg:sticky lg:top-0">
          <div className="h-full lg:h-screen overflow-y-auto flex flex-col justify-center px-[1rem] py-[2rem] lg:px-[4rem]">

            <span className="text-black/50 text-[1rem] mb-[1rem]"><a href="/">Home</a>/<a href={`/collections/${product.collectionId?.name.replace(/\s+/g, '-')}`}>{product.collectionId?.name}</a>/<a>{product.name}</a></span>
            {/* Name & Price */}
            <div>
              <h1 className="text-[2.2rem] lg:text-[2.8rem] leading-[1.1] mb-[.75rem]">
              {product.name}
            </h1>
            <div className="w-full h-[1px] bg-black/10 mb-[1.5rem]" />
            <p className="text-[1.8rem] mb-[2rem]">
              {priceFormatter(product.price)}
            </p>
            </div>


            {/* Quantity + Add to Cart */}
            <div className="flex items-stretch gap-[.75rem] mb-[1rem]">
              {/* Quantity */}
              <div className="flex items-center gap-[1rem] border border-black/20 px-[1rem] h-[3.5rem] rounded-[5rem] min-w-[8rem] justify-between">
                <button className="cursor-pointer" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={14} />
                </button>
                <span className="text-[1rem]">{quantity}</span>
                <button className="cursor-pointer" onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

                <button
                onClick={() => addItem({ item: product, quantity })}
                className="btn-primary dark-pink w-full mb-[2rem]"
              >
                Add to cart
              </button>

            {/* Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="description" className="border-black/10">
                <AccordionTrigger className="text-[1.2rem] text-[#111] uppercase py-[1rem]">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-[0.9rem] lg:text-[1rem] text-[#555] leading-relaxed">
                  {product.description}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="key-features" className="border-black/10">
                <AccordionTrigger className="text-[1.2rem] text-[#111] uppercase py-[1rem]">
                  Key Features
                </AccordionTrigger>
                <AccordionContent className="text-[0.9rem] lg:text-[1rem]  text-[#555] leading-relaxed">
                  <ul className="list-disc pl-5">
                    <li>100% Virgin Human Hair</li>
                    <li>Soft, Silky, and Tangle-Free</li>
                    <li>Durable with Proper Care</li>
                    <li>Natural Look and Feel</li>
                    <li>Available in Multiple Lengths and Colors</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-black/10">
                <AccordionTrigger className="text-[1.2rem] text-[#111] uppercase py-[1rem]">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-[0.9rem] lg:text-[1rem]  text-[#555] leading-relaxed">
                  Free shipping on all orders. Returns accepted within 30 days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <div className="px-[1.5rem] lg:px-[3rem] py-[2rem] lg:py-[5rem] border-t border-black/10">
          <h2 className="text-[2rem] md:text-[3.5rem] lg:text-[5rem] text-center mb-[2rem] lg:mb-[4rem]">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[2rem] lg:gap-[3rem]">
            {relatedProducts.map((p, index) => (
              <ProductCard item={p} key={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductView;

export const dynamic = "force-dynamic";