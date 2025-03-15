
export interface RecyclingGuide {
  material: string;
  recyclable: boolean;
  recyclingInstructions: string;
  upcyclingIdeas?: string;
  additionalTips?: string;
}

// Mock AI waste identification function (in a real app, this would call an AI service)
export const identifyWaste = async (imageData: string): Promise<RecyclingGuide> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, we'll return random waste types
  const wasteTypes: RecyclingGuide[] = [
    {
      material: "Plastic Bottle (PET)",
      recyclable: true,
      recyclingInstructions: "Remove cap and label. Rinse thoroughly. Place in recycling bin.",
      upcyclingIdeas: "Cut bottom off to make a small planter, or use as a bird feeder.",
      additionalTips: "PET plastic is one of the most commonly recycled plastics worldwide."
    },
    {
      material: "Cardboard Box",
      recyclable: true,
      recyclingInstructions: "Remove any tape or labels. Flatten the box. Place in recycling bin.",
      upcyclingIdeas: "Use as storage container, make into a cat house, or use for DIY craft projects.",
      additionalTips: "Cardboard can typically be recycled 5-7 times before the fibers become too short."
    },
    {
      material: "Aluminum Can",
      recyclable: true,
      recyclingInstructions: "Rinse thoroughly. Do not crush (in some areas). Place in recycling bin.",
      upcyclingIdeas: "Make into a pencil holder, candle holder, or garden decoration.",
      additionalTips: "Aluminum can be recycled indefinitely without losing quality."
    },
    {
      material: "Glass Bottle",
      recyclable: true,
      recyclingInstructions: "Remove cap. Rinse thoroughly. Sort by color if required in your area.",
      upcyclingIdeas: "Use as a vase, lamp base, or paint for decorative purposes.",
      additionalTips: "Glass can be recycled endlessly without loss in quality or purity."
    },
    {
      material: "Plastic Bag",
      recyclable: false,
      recyclingInstructions: "Most curbside programs don't accept plastic bags. Take to special collection points at grocery stores.",
      upcyclingIdeas: "Reuse for shopping, use as trash bags, or make plarn (plastic yarn) for crafts.",
      additionalTips: "Consider switching to reusable shopping bags to reduce plastic waste."
    }
  ];
  
  // Return a random waste type for demo purposes
  return wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
};

// Mock function to get recycling centers
export const getRecyclingCenters = async (location: string): Promise<any[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data - in a real app, this would call a maps API
  return [
    {
      name: "GreenCycle Recycling Center",
      address: "123 Green St, Anytown",
      distance: "1.2 miles",
      materials: ["Plastic", "Paper", "Glass", "Metal"]
    },
    {
      name: "City Waste Management Facility",
      address: "456 Recycle Ave, Anytown",
      distance: "2.5 miles",
      materials: ["All recyclables", "Hazardous waste", "Electronics"]
    },
    {
      name: "EcoFriendly Drop-off Station",
      address: "789 Earth Blvd, Anytown",
      distance: "3.7 miles",
      materials: ["Plastic", "Paper", "Glass", "Clothing", "Electronics"]
    }
  ];
};

// Function to get personalized waste reduction tips
export const getPersonalizedTips = (answers: {
  usesPlastic: boolean;
  recyclesPaper: boolean;
  compostsFoodWaste: boolean;
  usesReusableBags: boolean;
}): string[] => {
  const tips: string[] = [];
  
  if (answers.usesPlastic) {
    tips.push("Switch to reusable water bottles and coffee cups. This can save hundreds of single-use plastics annually.");
    tips.push("Opt for products with minimal or plastic-free packaging when shopping.");
  }
  
  if (!answers.recyclesPaper) {
    tips.push("Set up a dedicated paper recycling bin at home and make it easily accessible.");
    tips.push("Remember that most paper products, including junk mail and newspapers, can be recycled.");
  }
  
  if (!answers.compostsFoodWaste) {
    tips.push("Start a small countertop compost bin for food scraps. Even apartment dwellers can compost!");
    tips.push("Look for community composting programs if you don't have space for your own compost pile.");
  }
  
  if (!answers.usesReusableBags) {
    tips.push("Keep reusable bags in your car or by the door so you don't forget them when shopping.");
    tips.push("Invest in compact, foldable bags that can fit in a purse or pocket for unexpected shopping trips.");
  }
  
  // Add general tips if we don't have enough specific ones
  const generalTips = [
    "Try a 'zero-waste' challenge for a week, avoiding all disposable items.",
    "Repair items instead of replacing them whenever possible.",
    "Buy second-hand items when you can to reduce packaging waste and extend product lifecycles.",
    "Use cloth napkins and towels instead of paper products.",
    "Opt for digital receipts and bills to reduce paper waste."
  ];
  
  // Add general tips until we have at least 5 tips
  while (tips.length < 5 && generalTips.length > 0) {
    const randomIndex = Math.floor(Math.random() * generalTips.length);
    tips.push(generalTips[randomIndex]);
    generalTips.splice(randomIndex, 1);
  }
  
  return tips.slice(0, 5); // Return max 5 tips
};
