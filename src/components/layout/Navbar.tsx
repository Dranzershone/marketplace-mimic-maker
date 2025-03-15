
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, PlusCircle, User, Bell, MessageCircle, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/ui/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/');
  };

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
          <span className="bg-primary text-white h-8 w-8 flex items-center justify-center rounded">R</span>
          <span>Revive</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchBar className="w-[400px]" />
          
          <div className="flex items-center space-x-1">
            {user ? (
              <>
                <Link to="/wishlist">
                  <Button variant="ghost" size="icon" aria-label="Wishlist">
                    <Heart size={20} />
                  </Button>
                </Link>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative" aria-label="Profile">
                      {user.avatar ? (
                        <div className="rounded-full overflow-hidden h-7 w-7 border border-border">
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <User size={20} />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {user.name}
                    </div>
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                      {user.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist" className="cursor-pointer">
                        <Heart size={16} className="mr-2" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut size={16} className="mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
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
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-secondary"
                  >
                    <User size={18} className="mr-2" />
                    Profile
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className="flex items-center py-2 px-3 rounded-md hover:bg-secondary"
                  >
                    <Heart size={18} className="mr-2" />
                    Wishlist
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
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 px-3 rounded-md hover:bg-secondary text-destructive text-left w-full"
                  >
                    <LogOut size={18} className="mr-2" />
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link to="/login">
                    <Button variant="outline" className="w-full justify-start">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full justify-start">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
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
