
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, MapPin, Clock, Star, MessageCircle, Flag, Share } from 'lucide-react';
import { getProductById, products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState(id ? getProductById(id) : undefined);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const similarProducts = products
    .filter(p => p.category.id === product?.category.id && p.id !== product?.id)
    .slice(0, 4);
    
  useEffect(() => {
    if (!product) {
      navigate('/not-found');
    }
    // Reset states when product changes
    setCurrentImageIndex(0);
    setIsImageLoaded(false);
  }, [product, navigate]);
  
  if (!product) {
    return null;
  }
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
    maximumFractionDigits: 0
  }).format(product.price);
  
  const formattedDate = new Date(product.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

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
            <Link 
              to={`/category/${product.category.slug}`} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {product.category.name}
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground font-medium truncate">
              {product.title}
            </span>
          </div>
          
          {/* Back button (mobile only) */}
          <div className="mb-4 md:hidden">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center text-xs"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-card rounded-xl border border-border overflow-hidden">
                <div className="relative aspect-[4/3] bg-muted">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isImageLoaded ? 1 : 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <img
                        src={product.images[currentImageIndex]}
                        alt={product.title}
                        className="w-full h-full object-contain"
                        onLoad={() => setIsImageLoaded(true)}
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Image navigation */}
                  {product.images.length > 1 && (
                    <>
                      <button 
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all"
                        onClick={handlePrevImage}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all"
                        onClick={handleNextImage}
                      >
                        <ChevronLeft size={20} className="rotate-180" />
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex p-2 overflow-x-auto hide-scrollbar">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        className={`mr-2 min-w-16 h-16 rounded-md overflow-hidden transition-all ${
                          idx === currentImageIndex 
                            ? 'ring-2 ring-primary' 
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        onClick={() => setCurrentImageIndex(idx)}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${idx}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Description */}
              <div className="mt-8 bg-white dark:bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-foreground whitespace-pre-line">
                  {product.description}
                </p>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <span className="text-sm text-muted-foreground">Condition</span>
                    <p className="font-medium capitalize">{product.condition}</p>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <p className="font-medium capitalize">{product.status}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Info & Seller Box */}
            <div className="space-y-6">
              {/* Product Info */}
              <div className="bg-white dark:bg-card rounded-xl border border-border p-6">
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin size={14} className="mr-1" />
                  <span>{product.location}</span>
                  <span className="mx-2">•</span>
                  <Clock size={14} className="mr-1" />
                  <span>Posted on {formattedDate}</span>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold">{formattedPrice}</div>
                    {product.category.name === 'Real Estate' && (
                      <div className="text-sm text-muted-foreground">/month</div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-10 w-10 rounded-full ${isFavorite ? 'text-red-500' : ''}`}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={isFavorite ? 'fill-red-500' : ''} size={20} />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-primary text-base">
                    <MessageCircle size={16} className="mr-2" />
                    Contact Seller
                  </Button>
                  <Button variant="outline" className="w-full text-base">
                    <Share size={16} className="mr-2" />
                    Share Listing
                  </Button>
                </div>
              </div>
              
              {/* Seller Info */}
              <div className="bg-white dark:bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-bold mb-4">Seller Information</h2>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={product.seller.avatar || 'https://via.placeholder.com/40'} 
                      alt={product.seller.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.seller.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{product.seller.rating} rating</span>
                      <span className="mx-2">•</span>
                      <span>Member since {new Date(product.seller.memberSince).getFullYear()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="flex items-start mb-2">
                    <MapPin size={16} className="mr-2 mt-0.5 text-muted-foreground" />
                    <span>{product.seller.location}</span>
                  </div>
                </div>
                
                <div className="border-t border-border mt-4 pt-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Flag size={14} className="mr-1" />
                    Report this user
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Listings */}
          {similarProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Similar Listings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
