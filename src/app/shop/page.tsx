// app/shop/page.tsx
// Fonts needed — add to layout.tsx or globals.css:
// @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

"use client";

import Image from "next/image";
import { useState } from "react";
import { products } from "../data";
import ProductCard from "../components/products/product-card";

const FILTERS = ["All", "Bundles", "Wigs", "Closures", "Frontals", "Featured"];
const SORTS = ["Default", "Price: Low–High", "Price: High–Low", "Newest"];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState("Default");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <main
      className="min-h-screen w-full"
    >
      {/* ── Page Header ── */}
      <div className="px-[2rem] pb-[4rem] pt-[7rem] pb-0">
        <h1
          className="text-[5rem] text-black leading-none"
        >
          Find Your Perfect Match
        </h1>

              {/* ── Filter + Sort Bar ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap pt-[3rem] pb-[2rem]">
        {/* Left — filter toggle + pills */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-black border border-black/30 rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-base leading-none">+</span> Filters
          </button>

          {filtersOpen &&
            FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors ${
                  activeFilter === f
                    ? "bg-black text-white border-black"
                    : "border-black/30 text-black hover:border-black"
                }`}
              >
                {f}
              </button>
            ))}

          {filtersOpen && activeFilter !== "All" && (
            <button
              onClick={() => setActiveFilter("All")}
              className="text-xs underline underline-offset-2 text-black/50 hover:text-black transition-colors"
            >
              Reset all
            </button>
          )}
        </div>

        {/* Right — sort */}
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-black">
          <span className="text-black/50">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent border-none outline-none text-black font-medium cursor-pointer"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Product Grid ── */}
      {/* Masonry-style: 3 columns, cards have unequal height like the moodboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2rem]">
          {filtered.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
