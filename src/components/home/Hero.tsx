
import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { motion } from 'framer-motion';

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 border-b border-border">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.02]"></div>
      
      <div className="container-tight relative pt-28 md:pt-32 pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Buy and sell <span className="text-primary">anything</span> near you
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Find amazing deals on secondhand items or sell your unused stuff quickly and easily.
          </motion.p>
          
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchBar 
              className="h-14 text-base glass-effect shadow-lg border-white/20" 
              placeholder="Find furniture, cars, phones and more..."
            />
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-16 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
