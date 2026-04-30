import dbConnect from "@/lib/dbConnect";
import Product from "../../models/Product";
import "../../models/Collection";

export async function getRelatedProducts(
  collectionId: string,
  excludeId: string,
  limit: number = 5
) {
  await dbConnect();
  const products = await Product.find({
    collectionId,
    _id: { $ne: excludeId },
  })
    .populate("collectionId", "name description images")
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(products));
}