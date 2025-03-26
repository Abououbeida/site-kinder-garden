import { Product } from "@/types/product";

export const productData: Product = {
  id: "1",
  name: "Produit en vedette",
  description: "Un produit de qualité avec un design élégant.",
  price: 99.99,
  image: "https://i.imgur.com/DAjgx7n.jpg",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
