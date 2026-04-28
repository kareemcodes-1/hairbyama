import { Schema, model, Document, models, Types } from "mongoose";

export type Collection = {
  _id: string;
  name: string;
  userId: Types.ObjectId;
  description: string;
  image: string;
}

export type Product = {
  _id: string;
  name: string;
  collectionId: Collection;
  userId: string;
  description: string;
  price: number;
  inStock: boolean;
  images: Array<string>;
}