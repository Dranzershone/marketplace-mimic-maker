
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getPersonalizedTips } from '@/lib/waste-identification';

export function WasteTips() {
  const [answers, setAnswers] = useState({
    usesPlastic: false,
    recyclesPaper: false,
    compostsFoodWaste: false,
    usesReusableBags: false
  });
  const [showQuestions, setShowQuestions] = useState(false);
  const [tips, setTips] = useState<string[]>([]);

  const handleCheckboxChange = (key: keyof typeof answers) => {
    setAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleGetTips = () => {
    const personalizedTips = getPersonalizedTips(answers);
    setTips(personalizedTips);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/[0.05] to-secondary">
      <div className="container-tight">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Personalized Waste Reduction Tips</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Get customized suggestions to help you reduce waste in your daily life
          </p>
          {!showQuestions && !tips.length && (
            <Button 
              onClick={() => setShowQuestions(true)}
              className="btn-primary"
            >
              Get Personalized Tips
            </Button>
          )}
        </div>
        
        {showQuestions && !tips.length && (
          <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-xl">Quick Questionnaire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="usesPlastic" 
                    checked={answers.usesPlastic}
                    onCheckedChange={() => handleCheckboxChange('usesPlastic')}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="usesPlastic"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      I regularly use single-use plastic items (water bottles, straws, etc.)
                    </label>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="recyclesPaper" 
                    checked={answers.recyclesPaper}
                    onCheckedChange={() => handleCheckboxChange('recyclesPaper')}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="recyclesPaper"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      I regularly recycle paper products
                    </label>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="compostsFoodWaste" 
                    checked={answers.compostsFoodWaste}
                    onCheckedChange={() => handleCheckboxChange('compostsFoodWaste')}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="compostsFoodWaste"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      I compost food waste
                    </label>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="usesReusableBags" 
                    checked={answers.usesReusableBags}
                    onCheckedChange={() => handleCheckboxChange('usesReusableBags')}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="usesReusableBags"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      I bring reusable bags when shopping
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button onClick={handleGetTips}>
                  Get My Tips
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {tips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tips.map((tip, index) => (
              <Card key={index} className="group transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {index + 1}
                  </div>
                  <p>{tip}</p>
                </CardContent>
              </Card>
            ))}
            <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setTips([]);
                  setShowQuestions(true);
                }}
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
