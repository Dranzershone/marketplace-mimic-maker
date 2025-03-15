
import { useState, useRef } from 'react';
import { Camera, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { identifyWaste, RecyclingGuide } from '@/lib/waste-identification';

export function WasteIdentifier() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RecyclingGuide | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate API call with a delay
      const identifiedResult = await identifyWaste(image);
      setResult(identifiedResult);
    } catch (error) {
      console.error('Error identifying waste:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">AI Waste Identification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          {image ? (
            <div className="relative w-full max-w-md">
              <img 
                src={image} 
                alt="Waste item" 
                className="w-full h-64 object-contain rounded-md border border-border"
              />
              <Button 
                variant="destructive" 
                size="sm" 
                className="absolute top-2 right-2" 
                onClick={handleReset}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ) : (
            <div 
              className="w-full max-w-md h-64 border-2 border-dashed border-border rounded-md flex items-center justify-center cursor-pointer"
              onClick={handleCapture}
            >
              <div className="text-center p-4">
                <Upload size={40} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Click to upload a photo of your waste item</p>
              </div>
            </div>
          )}
          
          <Input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
          />
        </div>

        {result && (
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h3 className="font-bold text-lg mb-2">Identified as: {result.material}</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Recycling Instructions:</h4>
                <p>{result.recyclingInstructions}</p>
              </div>
              {result.upcyclingIdeas && (
                <div>
                  <h4 className="font-medium">Upcycling Ideas:</h4>
                  <p>{result.upcyclingIdeas}</p>
                </div>
              )}
              {result.additionalTips && (
                <div>
                  <h4 className="font-medium">Additional Tips:</h4>
                  <p>{result.additionalTips}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center space-x-2">
        <Button onClick={handleCapture} disabled={isAnalyzing}>
          <Camera className="mr-2" size={16} />
          {image ? 'Change Photo' : 'Take Photo'}
        </Button>
        {image && !result && (
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing} 
            className="bg-primary text-white"
          >
            {isAnalyzing ? 'Analyzing...' : 'Identify Waste'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
