import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";
import OrdersClient from "./components/order-client";
import { getOrders } from "@/actions/getOrders";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  const orders = await getOrders();

  return <OrdersClient orders={orders} />;
}