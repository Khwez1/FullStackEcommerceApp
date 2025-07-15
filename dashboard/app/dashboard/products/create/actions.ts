// actions.ts
import { API_URL } from "@/config";

export async function createProduct(
  name: string,
  description: string,
  price: number,
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const body = JSON.stringify({ name, description, price });

    console.log("➡️ Sending request:", {
      url: `${API_URL}/products`,
      body,
      token,
    });

    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body,
    });

    const result = await res.json().catch(() => ({}));
    console.log("✅ Response status:", res.status, "Body:", result);

    if (!res.ok) {
      if (res.status === 401) {
        return { success: false, error: "Unauthorized" };
      }
      return {
        success: false,
        error: result?.message || "Failed to create product",
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error("❌ Network error in createProduct:", err);
    return { success: false, error: "Network error" };
  }
}
