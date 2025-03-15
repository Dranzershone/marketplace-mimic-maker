
import { Category, Product, User } from "./types";

export const users: User[] = [
  {
    id: "u1",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format",
    rating: 4.8,
    memberSince: "2021-03-15",
    location: "New York, NY"
  },
  {
    id: "u2",
    name: "Emily Parker",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format",
    rating: 4.9,
    memberSince: "2020-06-22",
    location: "San Francisco, CA"
  },
  {
    id: "u3",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format",
    rating: 4.7,
    memberSince: "2022-01-10",
    location: "Chicago, IL"
  },
  {
    id: "u4",
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format",
    rating: 4.6,
    memberSince: "2021-08-05",
    location: "Miami, FL"
  }
];

export const categories: Category[] = [
  {
    id: "c1",
    name: "Electronics",
    slug: "electronics",
    icon: "laptop"
  },
  {
    id: "c2",
    name: "Vehicles",
    slug: "vehicles",
    icon: "car"
  },
  {
    id: "c3",
    name: "Furniture",
    slug: "furniture",
    icon: "armchair"
  },
  {
    id: "c4",
    name: "Real Estate",
    slug: "real-estate",
    icon: "home"
  },
  {
    id: "c5",
    name: "Fashion",
    slug: "fashion",
    icon: "shirt"
  },
  {
    id: "c6",
    name: "Jobs",
    slug: "jobs",
    icon: "briefcase"
  },
  {
    id: "c7",
    name: "Services",
    slug: "services",
    icon: "wrench"
  },
  {
    id: "c8",
    name: "Hobbies",
    slug: "hobbies",
    icon: "gamepad"
  }
];

export const products: Product[] = [
  {
    id: "p1",
    title: "iPhone 13 Pro, 256GB, Excellent Condition",
    description: "iPhone 13 Pro in excellent condition. Comes with original box, charger, and accessories. No scratches or dents. Battery health at 92%.",
    price: 699,
    currency: "USD",
    location: "New York, NY",
    category: categories[0],
    images: [
      "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1592286927505-1def25115669?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1563642421748-5047b6585a4a?q=80&w=800&auto=format"
    ],
    createdAt: "2023-04-10T13:45:00Z",
    seller: users[0],
    featured: true,
    condition: "used",
    status: "available"
  },
  {
    id: "p2",
    title: "2018 Toyota Camry, Low Mileage",
    description: "2018 Toyota Camry SE with only 45,000 miles. One owner, clean title, no accidents. Regular maintenance, all service records available.",
    price: 18500,
    currency: "USD",
    location: "San Francisco, CA",
    category: categories[1],
    images: [
      "https://images.unsplash.com/photo-1621007947782-57061ae127ab?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1596641331453-c4aced2dca3d?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1572831808018-86ca2a2355f6?q=80&w=800&auto=format"
    ],
    createdAt: "2023-04-12T10:30:00Z",
    seller: users[1],
    featured: true,
    condition: "used",
    status: "available"
  },
  {
    id: "p3",
    title: "Modern Sectional Sofa, Gray",
    description: "Modern L-shaped sectional sofa in light gray. Only 1 year old, excellent condition. Pet-free and smoke-free home. Dimensions: 9ft x 6ft.",
    price: 850,
    currency: "USD",
    location: "Chicago, IL",
    category: categories[2],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800&auto=format"
    ],
    createdAt: "2023-04-15T15:20:00Z",
    seller: users[2],
    condition: "used",
    status: "available"
  },
  {
    id: "p4",
    title: "Studio Apartment for Rent in Downtown",
    description: "Modern studio apartment in the heart of downtown. Fully furnished, all utilities included. 12-month lease required. Available from May 1st.",
    price: 1600,
    currency: "USD",
    location: "Miami, FL",
    category: categories[3],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1486304873000-235643847519?q=80&w=800&auto=format"
    ],
    createdAt: "2023-04-18T09:15:00Z",
    seller: users[3],
    featured: true,
    condition: "new",
    status: "available"
  },
  {
    id: "p5",
    title: "MacBook Pro 16\", M1 Pro, 16GB RAM",
    description: "MacBook Pro 16\" (2021) with M1 Pro chip, 16GB RAM, 512GB SSD. Used for 6 months, like new condition. Comes with original packaging and charger.",
    price: 1899,
    currency: "USD",
    location: "Seattle, WA",
    category: categories[0],
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format"
    ],
    createdAt: "2023-04-20T14:40:00Z",
    seller: users[0],
    condition: "used",
    status: "available"
  },
  {
    id: "p6",
    title: "Vintage Record Player",
    description: "Beautiful vintage record player from the 1970s. Fully functional, restored to excellent condition. Includes a collection of 10 vinyl records.",
    price: 350,
    currency: "USD",
    location: "Portland, OR",
    category: categories[7],
    images: [
      "https://images.unsplash.com/photo-1516916759473-7dbc63101014?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1593078166039-c467d9727893?q=80&w=800&auto=format"
    ],
    createdAt: "2023-04-22T11:25:00Z",
    seller: users[1],
    condition: "refurbished",
    status: "available"
  },
  {
    id: "p7",
    title: "Professional Photography Services",
    description: "Professional photographer offering services for events, portraits, and commercial photography. Packages start at $250. Portfolio available upon request.",
    price: 250,
    currency: "USD",
    location: "Austin, TX",
    category: categories[6],
    images: [
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=800&auto=format"
    ],
    createdAt: "2023-04-25T16:50:00Z",
    seller: users[2],
    condition: "new",
    status: "available"
  },
  {
    id: "p8",
    title: "Designer Leather Jacket, Size M",
    description: "Genuine leather jacket in excellent condition. Size M, black color. Worn only a few times. Original price $800.",
    price: 350,
    currency: "USD",
    location: "Los Angeles, CA",
    category: categories[4],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=800&auto=format"
    ],
    createdAt: "2023-04-28T12:35:00Z",
    seller: users[3],
    condition: "used",
    status: "available"
  }
];

export const featuredProducts = products.filter(product => product.featured);

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(product => product.category.slug === categorySlug);
}

export function searchProducts(query: string, filters?: SearchFilters): Product[] {
  let results = products.filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase()) || 
    product.description.toLowerCase().includes(query.toLowerCase())
  );
  
  if (filters) {
    if (filters.category) {
      results = results.filter(product => product.category.slug === filters.category);
    }
    
    if (filters.priceMin !== undefined) {
      results = results.filter(product => product.price >= filters.priceMin!);
    }
    
    if (filters.priceMax !== undefined) {
      results = results.filter(product => product.price <= filters.priceMax!);
    }
    
    if (filters.condition && filters.condition !== "all") {
      results = results.filter(product => product.condition === filters.condition);
    }
    
    if (filters.location) {
      results = results.filter(product => 
        product.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.sort) {
      switch (filters.sort) {
        case "newest":
          results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case "price-low-high":
          results.sort((a, b) => a.price - b.price);
          break;
        case "price-high-low":
          results.sort((a, b) => b.price - a.price);
          break;
        case "popular":
          results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
    }
  }
  
  return results;
}
