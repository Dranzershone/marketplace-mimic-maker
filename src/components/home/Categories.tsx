
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Armchair, Briefcase, Car, Gamepad, Home, Laptop, Shirt, Wrench } from 'lucide-react';
import { categories } from '@/lib/data';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  'laptop': <Laptop size={24} />,
  'car': <Car size={24} />,
  'armchair': <Armchair size={24} />,
  'home': <Home size={24} />,
  'shirt': <Shirt size={24} />,
  'briefcase': <Briefcase size={24} />,
  'wrench': <Wrench size={24} />,
  'gamepad': <Gamepad size={24} />
};

export function Categories() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16">
      <div className="container-tight">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground">Find what you're looking for in our diverse categories</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          animate={loaded ? "show" : "hidden"}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link 
                to={`/category/${category.slug}`}
                className="flex flex-col items-center p-4 bg-white dark:bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {iconMap[category.icon]}
                </div>
                <span className="text-foreground font-medium text-sm md:text-base">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
