export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
}

export interface ProductInputErrors {
  name: string[];
  description: string[];
  price: string[];
  category: string[];
};