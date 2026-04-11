"use client";
// import { useEffect } from "react";
import About from "./components/about";
import Collections from "./components/collections";
import CTA from "./components/cta";
import Footer from "./components/footer";
import Hero from "./components/hero";
// import dbConnect from "../../lib/dbConnect";
import Products from "./components/products";
import Testimonials from "./components/testimonials";
import LenisProvider from "./providers/lenis-provider";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import FAQ from "./components/faq";
import PixelLoader from "./components/loader";



export default function Home() {

  const [progress, setProgress] = useState(0)
  const [loaderDone, setLoaderDone] = useState(false)

  return (
     <LenisProvider>
          {/* <PixelLoader /> */}
          <Navbar />
          <Hero />
          <About />
          <Collections />
          <Products />
          <Testimonials />
          <FAQ />
     </LenisProvider>
  );
}


