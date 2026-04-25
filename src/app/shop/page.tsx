import { getProducts } from "@/actions/getProducts";
import ShopClient from "./components/shop-client";
import { getCollections } from "@/actions/getCollections";


export default async function ShopPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);

  return (
    <ShopClient
      initialProducts={products ?? []}
      collections={collections ?? []}
    />
  );
}