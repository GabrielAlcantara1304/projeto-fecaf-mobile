import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export async function getProductsByCategory(category) {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
}

export async function getProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export default api;

