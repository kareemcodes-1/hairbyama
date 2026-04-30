import { NextRequest, NextResponse } from "next/server";
import Product from "../../../../../../models/Product";
import "../../../../../../models/Collection";
import dbConnect from "@/lib/dbConnect";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

  try {
    await dbConnect();
    const decodedName = decodeURIComponent(name.replace(/-/g, " "));
    const product = await Product.findOne({ name: decodedName }).populate("collectionId", "name description images");

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}