import { selector } from "recoil";

export const productsState = selector({
    key: 'products',
    get: async ({ get }) => {
        const response = await fetch('http://localhost:3000/api/products', { method: "GET" });
        return response.json();
    },
  });