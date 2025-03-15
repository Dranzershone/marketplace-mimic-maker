
// Original marketplace types
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

// New types for waste management app
export interface WasteItem {
  id: string;
  name: string;
  material: string;
  recyclable: boolean;
  image?: string;
  recyclingInstructions: string;
  upcyclingIdeas?: string[];
}

export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  acceptedMaterials: string[];
  openingHours: {
    [day: string]: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  location?: string;
  stats: {
    itemsRecycled: number;
    itemsUpcycled: number;
    co2Saved: number; // in kg
  };
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export interface WasteTip {
  id: string;
  category: "plastic" | "paper" | "food" | "general" | "electronics" | "clothing";
  tip: string;
  impact: "low" | "medium" | "high";
}
