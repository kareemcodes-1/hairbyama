'use client';

import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { Product } from '@/types';
import ProductCard from './product-card';
import { SplitText } from '../../../../components/animations/SplitText';

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {

  return (
    <section className="products w-full py-16 sm:py-20 md:py-[6rem] bg-white px-4 sm:px-8 md:px-[3rem]">
      <div className="flex flex-col gap-8">

        {/* Header */}
        <div className='flex items-center flex-col gap-6 justify-center w-full'>

          {/* Desktop only */}
          <SplitText
            text="Best selling hair trusted by thousands"
            tag="h1"
            className="hidden md:block  md:text-[3.5rem] lg:text-[5rem] text-center overflow-hidden w-full sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%]"
            duration={1}
            ease="power3.out"
            splitType="chars"
            threshold={0.1}
            rootMargin="-100px"
            stagger={0.025}
          />

          {/* Mobile only */}
          <SplitText
            text="Best selling hair"
            tag="h1"
            className="block md:hidden text-[2rem] text-center overflow-hidden w-full sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%]"
            duration={1}
            ease="power3.out"
            splitType="chars"
            threshold={0.1}
            rootMargin="-100px"
            stagger={0.025}
          />



          <button className='btn-outline'>
            View all
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-16">
          {products.map((item, i) => (
            <ProductCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;