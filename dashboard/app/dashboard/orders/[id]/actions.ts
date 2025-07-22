"use server";
import { cookies } from "next/headers";
import { API_URL } from "../../../../config";
import { redirect } from "next/navigation";

export async function updateOrderStatus(id: number, status: string) {
  let redirectUrl = `/dasboard/orders/${id}`;
  try {
    const token = cookies().get("token")?.value;
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: token ?? "",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      throw new Error("Failed to update order status");
    }
  } catch (e) {
    console.log(e);
  } finally {
    redirect(redirectUrl);
  }
};