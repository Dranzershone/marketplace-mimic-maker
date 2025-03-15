
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';
import { SearchFilters } from '@/lib/types';
import { SearchBar } from '@/components/ui/SearchBar';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({});
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading
    const timer = setTimeout(() => {
      const searchResults = searchProducts(query, activeFilters);
      setResults(searchResults);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query, activeFilters]);
  
  const addFilter = (key: keyof SearchFilters, value: any) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const removeFilter = (key: keyof SearchFilters) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };
  
  const clearAllFilters = () => {
    setActiveFilters({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container-tight mb-16">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Search Results</h1>
              <p className="text-muted-foreground">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <SearchBar 
                variant="default" 
                placeholder="Refine your search..." 
                className="md:w-64"
              />
            </div>
          </div>
          
          {/* Active filters */}
          {Object.keys(activeFilters).length > 0 && (
            <div className="mb-6 bg-secondary/50 rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium mr-2">Active filters:</span>
                
                {Object.entries(activeFilters).map(([key, value]) => (
                  <div 
                    key={key}
                    className="bg-white dark:bg-card text-sm rounded-full px-3 py-1 flex items-center border border-border"
                  >
                    <span>{key}: {value}</span>
                    <button 
                      onClick={() => removeFilter(key as keyof SearchFilters)}
                      className="ml-1.5 text-muted-foreground hover:text-foreground"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-sm ml-auto"
                >
                  Clear all
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-12 gap-6">
            {/* Filters (desktop) */}
            <div className="hidden md:block col-span-3 space-y-6">
              <div className="bg-white dark:bg-card rounded-xl border border-border p-5">
                <h2 className="font-bold mb-4">Filters</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Category</h3>
                    <select 
                      className="w-full bg-secondary p-2 rounded-md text-sm"
                      onChange={(e) => addFilter('category', e.target.value)}
                      value={activeFilters.category || ''}
                    >
                      <option value="">All Categories</option>
                      <option value="electronics">Electronics</option>
                      <option value="vehicles">Vehicles</option>
                      <option value="furniture">Furniture</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="fashion">Fashion</option>
                      <option value="jobs">Jobs</option>
                      <option value="services">Services</option>
                      <option value="hobbies">Hobbies</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Price range</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full bg-secondary p-2 rounded-md text-sm"
                        onChange={(e) => addFilter('priceMin', Number(e.target.value))}
                        value={activeFilters.priceMin || ''}
                      />
                      <span className="text-muted-foreground">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full bg-secondary p-2 rounded-md text-sm"
                        onChange={(e) => addFilter('priceMax', Number(e.target.value))}
                        value={activeFilters.priceMax || ''}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Condition</h3>
                    <select 
                      className="w-full bg-secondary p-2 rounded-md text-sm"
                      onChange={(e) => addFilter('condition', e.target.value as any)}
                      value={activeFilters.condition || 'all'}
                    >
                      <option value="all">All Conditions</option>
                      <option value="new">New</option>
                      <option value="used">Used</option>
                      <option value="refurbished">Refurbished</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Location</h3>
                    <input
                      type="text"
                      placeholder="City, State, Zip..."
                      className="w-full bg-secondary p-2 rounded-md text-sm"
                      onChange={(e) => addFilter('location', e.target.value)}
                      value={activeFilters.location || ''}
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <Button onClick={clearAllFilters} variant="outline" className="w-full mb-2">
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results */}
            <div className="col-span-12 md:col-span-9">
              {isLoading ? (
                // Loading skeleton
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
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
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-card rounded-xl border border-border">
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button onClick={clearAllFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
