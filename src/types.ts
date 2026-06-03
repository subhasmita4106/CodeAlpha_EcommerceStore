export interface Product {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  category?: string;
  specifications?: string[];
  shippingReturns?: string;
}

export interface CartItem {
  id: string; // unique for item + size + color combination
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  postalCode: string;
}

export type TabType = 'Home' | 'Search' | 'Cart' | 'Profile';

export enum CheckoutStep {
  Cart = 0,
  Shipping = 1,
  Payment = 2,
  Review = 3,
  Success = 4
}
