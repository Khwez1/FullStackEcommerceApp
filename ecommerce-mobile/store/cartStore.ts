import { Product } from "@/components/ProductListItem";
import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],

  addProduct: (product: Product) =>
    // TODO: if already in cart, increase quantity, else, add a new item
    set((state: {}) => ({ 
        items: [...state.items, { product, quantity: 1 }] 
    })),

    resetCart: () => set({ items: []})
}));
