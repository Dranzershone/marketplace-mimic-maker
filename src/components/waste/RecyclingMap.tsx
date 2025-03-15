
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Locate } from 'lucide-react';
import { getRecyclingCenters } from '@/lib/waste-identification';

export function RecyclingMap() {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [centers, setCenters] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!location.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get recycling centers data
      const recyclingCenters = await getRecyclingCenters(location);
      setCenters(recyclingCenters);
    } catch (err) {
      setError('Failed to find recycling centers. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          
          // Automatically search for centers with the detected location
          try {
            const recyclingCenters = await getRecyclingCenters(`${latitude},${longitude}`);
            setCenters(recyclingCenters);
          } catch (err) {
            setError('Failed to find recycling centers. Please try again.');
            console.error(err);
          } finally {
            setIsLoading(false);
          }
        },
        (err) => {
          setError('Unable to retrieve your location. Please enter it manually.');
          setIsLoading(false);
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Please enter your location manually.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Find Recycling Centers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleGetCurrentLocation} variant="outline" title="Use current location">
            <Locate size={18} />
          </Button>
          <Button onClick={handleSearch} disabled={isLoading || !location.trim()}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        
        {error && <p className="text-destructive text-sm">{error}</p>}
        
        <div className="w-full h-64 bg-muted rounded-md overflow-hidden">
          {/* Map would be rendered here with an actual map API */}
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-muted-foreground text-center px-4">
              {centers.length > 0 
                ? `Found ${centers.length} recycling centers near ${location}`
                : 'Map will be displayed here after you search for a location'}
            </p>
          </div>
        </div>
        
        {centers.length > 0 && (
          <div className="mt-4 space-y-3">
            <h3 className="font-medium">Nearby Recycling Centers:</h3>
            <div className="space-y-2">
              {centers.map((center, index) => (
                <div key={index} className="p-3 bg-secondary rounded-md">
                  <h4 className="font-medium">{center.name}</h4>
                  <p className="text-sm text-muted-foreground">{center.address}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm">{center.distance} away</span>
                    <Button variant="ghost" size="sm" className="text-primary">Directions</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
