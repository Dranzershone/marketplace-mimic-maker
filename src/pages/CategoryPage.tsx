
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory, categories } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';
import { Product, SearchFilters } from '@/lib/types';
import { SearchBar } from '@/components/ui/SearchBar';
import { ArrowUpDown, ChevronDown, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    sort: 'newest'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const category = categories.find(c => c.slug === slug);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading
    const timer = setTimeout(() => {
      if (slug) {
        const filteredProducts = getProductsByCategory(slug);
        setProducts(filteredProducts);
      }
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [slug]);
  
  const handleSortChange = (sort: SearchFilters['sort']) => {
    setFilters(prev => ({ ...prev, sort }));
  };
  
  const sortedProducts = [...products].sort((a, b) => {
    switch (filters.sort) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'popular':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-tight mb-16">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground font-medium">
              {category?.name || 'Category'}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{category?.name || 'Category'}</h1>
              <p className="text-muted-foreground">
                Browse all {products.length} listing{products.length !== 1 ? 's' : ''} in this category
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <SearchBar 
                variant="minimal" 
                placeholder={`Search in ${category?.name || 'this category'}...`} 
                className="md:w-64"
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-secondary/50 rounded-lg p-4">
            <div className="flex items-center">
              <SlidersHorizontal size={18} className="mr-2 text-muted-foreground" />
              <span className="font-medium">Filters</span>
              
              {/* Mobile filter button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 md:hidden"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} className="mr-1" />
                <span>Filter</span>
                <ChevronDown size={16} className={`ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {/* Sort options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={filters.sort}
                onChange={(e) => handleSortChange(e.target.value as SearchFilters['sort'])}
                className="bg-white dark:bg-card text-sm rounded-md border border-border py-1.5 pl-3 pr-8"
              >
                <option value="newest">Newest first</option>
                <option value="price-low-high">Price: Low to high</option>
                <option value="price-high-low">Price: High to low</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </div>
          
          {/* Filter panel (mobile) */}
          {isFilterOpen && (
            <div className="bg-white dark:bg-card rounded-lg border border-border p-4 mb-6 md:hidden">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Price range</h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full bg-secondary p-2 rounded-md text-sm"
                    />
                    <span className="text-muted-foreground">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full bg-secondary p-2 rounded-md text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Condition</h3>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      New
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Used
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Refurbished
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border flex justify-between">
                  <Button variant="outline" size="sm">
                    Reset
                  </Button>
                  <Button size="sm">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="rounded-xl overflow-hidden border border-border animate-pulse">
                  <div className="bg-muted aspect-[4/3]"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-6 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No listings found</h3>
              <p className="text-muted-foreground mb-6">
                There are no items in this category right now.
              </p>
              <Link to="/" className="btn-primary">
                Browse other categories
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
