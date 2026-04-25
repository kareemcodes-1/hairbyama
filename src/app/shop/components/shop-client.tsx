"use client";

import ProductCard from "@/app/components/products/product-card";
import { Product, Collection } from "@/types";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORTS = ["Default", "Price: Low–High", "Price: High–Low"];

type Props = {
  initialProducts: Product[];
  collections: Collection[];
};

export default function ShopClient({ initialProducts, collections }: Props) {
  const [activeCollection, setActiveCollection] = useState<string>("All");
  const [sort, setSort] = useState("Default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered =
    activeCollection === "All"
      ? initialProducts
      : initialProducts.filter((p) => p.collectionId === activeCollection);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Price: Low–High") return a.price - b.price;
    if (sort === "Price: High–Low") return b.price - a.price;
    return 0;
  });

  return (
    <section className="
      w-full 
      py-[6rem] md:py-20 lg:py-[8rem] 
      min-h-screen
    ">
      <div className="px-4 sm:px-6 md:px-8 lg:px-[2rem]">

        {/* Heading */}
        <h1 className="
          text-[2rem]  md:text-[4rem] lg:text-[5rem] 
          text-black 
        ">
          Find Your Perfect Match
        </h1>

        {/* Filter + Sort Bar */}
        <div className="
          flex flex-col 
          sm:flex-row sm:items-center sm:justify-between 
          gap-4 
          pt-6 sm:pt-8 md:pt-[3rem] 
          pb-4 sm:pb-6 md:pb-[2rem]
        ">

          {/* Filters */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="
                flex items-center gap-1.5 
                text-[10px] sm:text-xs 
                tracking-widest uppercase 
                border border-black/30 rounded-full 
                px-3 py-1.5 sm:px-4 sm:py-2 
                hover:bg-black hover:text-white 
                transition-colors
              "
            >
              <span className="text-sm sm:text-base">+</span> Filters
            </button>

            {filtersOpen && (
              <>
                <button
                  onClick={() => setActiveCollection("All")}
                  className={`text-[10px] sm:text-xs tracking-widest uppercase px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-colors ${
                    activeCollection === "All"
                      ? "bg-black text-white border-black"
                      : "border-black/30 text-black hover:border-black"
                  }`}
                >
                  All
                </button>

                {collections.map((col) => (
                  <button
                    key={col._id}
                    onClick={() => setActiveCollection(col._id)}
                    className={`text-[10px] sm:text-xs tracking-widest uppercase px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-colors ${
                      activeCollection === col._id
                        ? "bg-black text-white border-black"
                        : "border-black/30 text-black hover:border-black"
                    }`}
                  >
                    {col.name}
                  </button>
                ))}

                {activeCollection !== "All" && (
                  <button
                    onClick={() => setActiveCollection("All")}
                    className="
                      text-[10px] sm:text-xs 
                      underline underline-offset-2 
                      text-black/50 hover:text-black
                    "
                  >
                    Reset all
                  </button>
                )}
              </>
            )}
          </div>

          {/* Sort */}
          <div className="
            flex items-center gap-2 
            text-[10px] sm:text-xs 
            tracking-widest uppercase text-black
          ">
            <span className="text-black/50">Sort by:</span>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="
                w-[120px] sm:w-[140px] md:w-[160px]
                border-none shadow-none bg-transparent 
                text-black font-medium 
                text-[10px] sm:text-xs 
                tracking-widest uppercase 
                focus:ring-0 px-0
              ">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {SORTS.map((s) => (
                  <SelectItem
                    key={s}
                    value={s}
                    className="text-xs tracking-widest uppercase"
                  >
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="
          grid 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-4 sm:gap-6 md:gap-[2rem]
        ">
          {sorted.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      </div>
    </section>
  );
}