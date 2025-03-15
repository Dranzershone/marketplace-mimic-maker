
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  category: Category;
  images: string[];
  createdAt: string;
  seller: User;
  featured?: boolean;
  condition: "new" | "used" | "refurbished";
  status: "available" | "sold" | "reserved";
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  memberSince: string;
  location: string;
}

export interface SearchFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  condition?: "new" | "used" | "refurbished" | "all";
  location?: string;
  sort?: "newest" | "price-low-high" | "price-high-low" | "popular";
}
