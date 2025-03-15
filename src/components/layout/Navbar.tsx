
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, PlusCircle, User, Bell, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/ui/SearchBar';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect py-3 subtle-shadow' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-tight mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-bold text-foreground"
        >
          <span className="bg-primary text-white h-8 w-8 flex items-center justify-center rounded">O</span>
          <span>OLX</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchBar className="w-[400px]" />
          
          <div className="flex items-center space-x-1">
            <Link to="/messages">
              <Button variant="ghost" size="icon" aria-label="Messages">
                <MessageCircle size={20} />
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell size={20} />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" aria-label="Profile">
                <User size={20} />
              </Button>
            </Link>
          </div>
          
          <Link to="/sell">
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle size={18} className="mr-2" />
              Sell
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 glass-effect border-t border-border animate-fade-in">
          <div className="container-tight mx-auto py-4 space-y-4">
            <SearchBar />
            
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/categories" 
                className="flex items-center py-2 px-3 rounded-md hover:bg-secondary"
              >
                Categories
              </Link>
              <Link 
                to="/profile" 
                className="flex items-center py-2 px-3 rounded-md hover:bg-secondary"
              >
                <User size={18} className="mr-2" />
                Profile
              </Link>
              <Link 
                to="/messages" 
                className="flex items-center py-2 px-3 rounded-md hover:bg-secondary"
              >
                <MessageCircle size={18} className="mr-2" />
                Messages
              </Link>
              <Link 
                to="/notifications" 
                className="flex items-center py-2 px-3 rounded-md hover:bg-secondary"
              >
                <Bell size={18} className="mr-2" />
                Notifications
              </Link>
            </nav>
            
            <Link to="/sell" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <PlusCircle size={18} className="mr-2" />
                Sell
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
