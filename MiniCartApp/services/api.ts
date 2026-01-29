import axios from "axios";
import { Product } from "../types";

const API_BASE_URL = "https://fakestoreapi.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getCategories(): Promise<string[]> {
    try {
      const response = await api.get("/products/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};
