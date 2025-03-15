
import { useState, useEffect } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { categories } from '@/lib/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define a type for Wishlist items
interface WishlistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
}

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(500),
  category: z.string().min(1, { message: "Please select a category" }),
});

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Create form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  useEffect(() => {
    // Load wishlist items from localStorage
    const savedItems = localStorage.getItem('wishlistItems');
    if (savedItems) {
      setWishlistItems(JSON.parse(savedItems));
    } else {
      // Mock data for demo
      const mockItems: WishlistItem[] = [
        {
          id: '1',
          title: 'Office chair',
          description: 'Looking for a second-hand ergonomic office chair in good condition.',
          category: 'furniture',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          title: 'Gardening tools',
          description: 'Need basic gardening tools for starting a small herb garden.',
          category: 'hobbies',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      setWishlistItems(mockItems);
      localStorage.setItem('wishlistItems', JSON.stringify(mockItems));
    }
  }, []);

  const addWishlistItem = (data: z.infer<typeof formSchema>) => {
    const newItem: WishlistItem = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      category: data.category,
      createdAt: new Date().toISOString(),
    };
    
    const updatedItems = [...wishlistItems, newItem];
    setWishlistItems(updatedItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Item added to wishlist",
      description: "Your request has been added successfully.",
    });
    
    form.reset();
    setIsDialogOpen(false);
  };

  const removeWishlistItem = (id: string) => {
    const updatedItems = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedItems);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    });
  };

  const filteredItems = searchQuery
    ? wishlistItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : wishlistItems;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                Request items you need and find them in your community
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  placeholder="Search wishlist..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Add request
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add to Wishlist</DialogTitle>
                    <DialogDescription>
                      Describe what you're looking for and community members will help you find it.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(addWishlistItem)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g., Office chair, Kitchen table" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem key={category.id} value={category.slug}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe what you're looking for, including details about condition, size, etc."
                                className="min-h-24" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Be specific to increase your chances of finding what you need.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          <Plus size={16} className="mr-2" />
                          Add to Wishlist
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => {
                const category = categories.find(cat => cat.slug === item.category);
                const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
                
                return (
                  <Card key={item.id} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <CardDescription className="flex items-center mt-2">
                            {category && (
                              <>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mr-2">
                                  {category.name}
                                </span>
                              </>
                            )}
                            <span className="text-muted-foreground text-xs">
                              Posted on {formattedDate}
                            </span>
                          </CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeWishlistItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Contact
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full bg-white dark:bg-card rounded-lg border border-border p-12 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No items in your wishlist</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Add items you're looking for to your wishlist and let the community help you find them.
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Add your first request
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
