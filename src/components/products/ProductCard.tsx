
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { Product } from '@/lib/types';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
    maximumFractionDigits: 0
  }).format(product.price);
  
  const formattedDate = new Date(product.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className={`product-card ${featured ? 'border-primary/30 bg-primary/[0.02]' : 'border border-border'}`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-card-image-wrapper">
          <div className={`relative w-full h-full ${!isLoaded ? 'bg-muted animate-pulse' : ''}`}>
            <img
              src={product.images[0]}
              alt={product.title}
              className={`product-card-image ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsLoaded(true)}
            />
            {featured && (
              <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-md">
                Featured
              </div>
            )}
            <button
              type="button"
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
            >
              <Heart
                size={18}
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}
              />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium line-clamp-2 mb-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-baseline mb-2">
          <span className="text-lg font-bold">{formattedPrice}</span>
          <span className="text-xs text-muted-foreground ml-1">
            {product.category.name === 'Real Estate' ? '/month' : ''}
          </span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin size={12} className="mr-1" />
          <span>{product.location}</span>
          <span className="mx-2">•</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </motion.div>
  );
}
