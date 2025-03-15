
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { useState } from 'react';

interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  likes: number;
  comments: number;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format',
      },
      content: 'Just found a great way to upcycle old glass jars - turned them into beautiful candle holders with some paint and twine!',
      date: '2 hours ago',
      likes: 15,
      comments: 3
    },
    {
      id: '2',
      author: {
        name: 'Emily Parker',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format',
      },
      content: 'Does anyone know if there\'s a recycling center in the downtown area that accepts electronic waste? My old laptop needs to be recycled properly.',
      date: '1 day ago',
      likes: 8,
      comments: 7
    }
  ]);
  
  const [newPostContent, setNewPostContent] = useState('');
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: undefined,
      },
      content: newPostContent,
      date: 'Just now',
      likes: 0,
      comments: 0
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container-tight">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
            <p className="text-muted-foreground">Connect with other eco-conscious individuals</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Share Your Thoughts</CardTitle>
                </CardHeader>
                <form onSubmit={handlePostSubmit}>
                  <CardContent>
                    <Textarea 
                      placeholder="Share recycling tips, ask questions, or show off your upcycling projects..."
                      className="min-h-24"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost" type="button">Add Photo</Button>
                    <Button type="submit" disabled={!newPostContent.trim()}>Post</Button>
                  </CardFooter>
                </form>
              </Card>
              
              <div className="space-y-4">
                {posts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <Avatar className="w-10 h-10">
                          {post.author.avatar ? (
                            <img src={post.author.avatar} alt={post.author.name} />
                          ) : (
                            <div className="bg-primary/10 text-primary w-full h-full flex items-center justify-center font-medium">
                              {post.author.name.charAt(0)}
                            </div>
                          )}
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{post.author.name}</h3>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                      </div>
                      <p className="mb-4">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          ❤️ {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          💬 {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Members</span>
                    <span className="font-medium">1,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items Recycled</span>
                    <span className="font-medium">8,392</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CO₂ Saved</span>
                    <span className="font-medium">2.4 tons</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    #PlasticFree
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    #Upcycling
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    #CompostTips
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    #ZeroWaste
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    #RecyclingHelp
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Beach Cleanup</h3>
                    <p className="text-sm text-muted-foreground">June 15, 9AM - 12PM</p>
                    <p className="text-sm">Ocean Beach, Main Entrance</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Recycling Workshop</h3>
                    <p className="text-sm text-muted-foreground">June 22, 2PM - 4PM</p>
                    <p className="text-sm">Community Center</p>
                  </div>
                  <Button className="w-full">View All Events</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Community;
