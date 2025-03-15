
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WasteIdentifier } from '@/components/waste/WasteIdentifier';
import { RecyclingMap } from '@/components/waste/RecyclingMap';
import { WasteTips } from '@/components/waste/WasteTips';
import { ShieldCheck, Recycle, MapPin } from 'lucide-react';

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
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/[0.03] to-primary/[0.07]">
          <div className="container-tight">
            <div className="text-center mb-8 md:mb-12">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Reduce Waste, Save the Planet
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                AI-powered waste identification and personalized recycling suggestions
              </motion.p>
            </div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <WasteIdentifier />
            </motion.div>
          </div>
        </section>
        
        {/* Recycling Map Section */}
        <section className="py-16 bg-background">
          <div className="container-tight">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Find Recycling Centers Near You</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Locate the nearest recycling facilities and drop-off points
              </p>
            </div>
            
            <RecyclingMap />
          </div>
        </section>
        
        {/* Waste Tips Section */}
        <WasteTips />
        
        {/* Features Section */}
        <section className="py-16 bg-secondary">
          <div className="container-tight">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How EcoScan Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Our AI-powered platform makes recycling easier than ever</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white dark:bg-card p-6 rounded-xl text-center transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">AI Identification</h3>
                <p className="text-muted-foreground">Upload a photo and our AI will identify the material type</p>
              </div>
              
              <div className="group bg-white dark:bg-card p-6 rounded-xl text-center transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <Recycle size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Recycling Guides</h3>
                <p className="text-muted-foreground">Get personalized recycling and upcycling instructions</p>
              </div>
              
              <div className="group bg-white dark:bg-card p-6 rounded-xl text-center transition-all hover:shadow-lg">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">Location Services</h3>
                <p className="text-muted-foreground">Find nearby recycling centers and drop-off locations</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/[0.03] to-primary/[0.07]">
          <div className="container-tight text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to reduce your waste?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join our community of eco-conscious individuals making a difference one item at a time.
            </p>
            <Link
              to="/community"
              className="btn-primary text-base px-6 py-3"
            >
              Join Our Community
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
