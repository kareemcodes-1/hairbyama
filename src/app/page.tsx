
// import { useEffect } from "react";
import About from "./components/about";
import Collections from "./components/collections";
import Hero from "./components/hero";
import Products from "./components/products/products";
import Testimonials from "./components/testimonials";
import LenisProvider from "./providers/lenis-provider";
import Navbar from "./components/navbar";
import FAQ from "./components/faq";
import { getProducts } from "@/actions/getProducts";
import { getCollections } from "@/actions/getCollections";



export default async function Home() {

  const products = await getProducts();
  const collections = await getCollections();


  return (
     <LenisProvider>
          <Navbar />
          <Hero />
          <About />
          <Collections collections={collections} />
          <Products products={products} />
          <Testimonials />
          <FAQ />
     </LenisProvider>
  );
}


