export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Base price in GBP
  originalPrice?: number; // For sale items
  images: string[];
  category: 'baby' | 'toddler' | 'kids' | 'accessories';
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isSale?: boolean;
  isEco?: boolean;
  material?: string;
  ageRange?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
