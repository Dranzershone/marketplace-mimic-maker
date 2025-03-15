
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <FeaturedListings />
        
        {/* Trust Section */}
        <section className="py-16 bg-secondary">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose OLX?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Join millions of users who buy and sell on our platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-card p-6 rounded-xl text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Secure Transactions</h3>
                <p className="text-muted-foreground">Our safety features help you buy and sell with confidence</p>
              </div>
              
              <div className="bg-white dark:bg-card p-6 rounded-xl text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Free Listings</h3>
                <p className="text-muted-foreground">List your items for free and reach thousands of potential buyers</p>
              </div>
              
              <div className="bg-white dark:bg-card p-6 rounded-xl text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" x2="22" y1="12" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Local Marketplace</h3>
                <p className="text-muted-foreground">Find items in your area and connect with local buyers and sellers</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/[0.03] to-primary/[0.07]">
          <div className="container-tight text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start selling?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Turn your unused items into cash. Listing is quick, easy, and free!
            </p>
            <Link
              to="/sell"
              className="btn-primary text-base px-6 py-3"
            >
              Start Selling Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
