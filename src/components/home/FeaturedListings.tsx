
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { featuredProducts } from '@/lib/data';
import { motion } from 'framer-motion';

export function FeaturedListings() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="py-16">
      <div className="container-tight">
        <div className="flex justify-between items-baseline mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Listings</h2>
            <p className="text-muted-foreground">Handpicked items that might interest you</p>
          </div>
          <Link 
            to="/featured" 
            className="hidden md:flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <ProductCard product={product} featured={true} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/featured"
            className="btn-primary inline-flex items-center"
          >
            View all featured listings
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
