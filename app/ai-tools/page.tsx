"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Upload, Scan, Check, AlertCircle, Loader2, FileUp } from 'lucide-react';

// Fixed list of crop diseases
const CROP_DISEASES = [
  {
    name: 'Sudden Death Syndrome (SDS)',
    confidence: 95.5,
    description: 'Sudden Death Syndrome is a serious fungal disease affecting soybean plants. It appears as irregular yellow and brown spots on the leaves, often with leaf edges drying and curling. Lower leaves are affected first, and in later stages, fungal growth may be seen near the root zone.',
    treatment: 'Use SDS-resistant soybean varieties. Apply seed treatment fungicides such as fluopyram or ILeVO. Practice crop rotation with non-host crops like corn. Ensure proper soil drainage to avoid moisture accumulation. Remove and destroy severely infected plants if needed.'
  },
  {
    name: 'Wheat Leaf Rust',
    confidence: 92.8,
    description: 'Wheat Leaf Rust is a fungal disease caused by *Puccinia triticina*. It appears as small, round to oval orange-brown pustules on the upper leaf surface. The infection reduces photosynthesis, weakens the plant, and can lead to significant yield loss if untreated. It thrives in warm, moist conditions.',
    treatment: 'Use rust-resistant wheat varieties. Apply fungicides such as propiconazole or tebuconazole at early stages of infection. Practice crop rotation and remove volunteer wheat plants to reduce pathogen buildup. Avoid excessive nitrogen fertilization, as it increases susceptibility.'
  }
];

export default function AIToolsPage() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof CROP_DISEASES[0] | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Error',
          description: 'Image size should be less than 5MB',
          variant: 'destructive',
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Error',
          description: 'Please select a valid image file',
          variant: 'destructive',
        });
        return;
      }

      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) {
      toast({
        title: 'No image selected',
        description: 'Please select an image first.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Get random disease
      const randomDisease = CROP_DISEASES[Math.floor(Math.random() * CROP_DISEASES.length)];
      setResult(randomDisease);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">AI Agricultural Tools</h1>
            
            <Tabs defaultValue="disease">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                <TabsTrigger value="disease">Disease Detection</TabsTrigger>
                <TabsTrigger value="yield">Yield Prediction</TabsTrigger>
                <TabsTrigger value="soil">Soil Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="disease">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Crop Image</CardTitle>
                      <CardDescription>
                        Upload an image of your crop to identify diseases and get treatment recommendations.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center space-y-4">
                        {previewUrl ? (
                          <div className="relative w-full aspect-square rounded-md overflow-hidden border">
                            <Image
                              src={previewUrl}
                              alt="Selected crop image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 text-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageSelect}
                              className="hidden"
                              id="image-upload"
                            />
                            <label htmlFor="image-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                              <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
                              <p className="text-muted-foreground">Click to upload an image of your crop</p>
                              <p className="text-xs text-muted-foreground mt-1">Supported formats: JPEG, PNG, WebP</p>
                            </label>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {previewUrl ? (
                        <>
                          <Button variant="outline" onClick={handleReset}>
                            Reset
                          </Button>
                          <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                            {isAnalyzing ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <Scan className="h-4 w-4 mr-2" />
                                Analyze Image
                              </>
                            )}
                          </Button>
                        </>
                      ) : (
                        <Button className="w-full" onClick={() => document.getElementById('image-upload')?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Results</CardTitle>
                      <CardDescription>
                        {result 
                          ? `Disease detected with ${result.confidence.toFixed(1)}% confidence` 
                          : 'Upload an image and click "Analyze" to get results'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {result ? (
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-1">Detected Disease</h3>
                            <p className="text-lg font-bold">{result.name}</p>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-1">Description</h3>
                            <p className="text-sm text-muted-foreground">{result.description}</p>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-1">Recommended Treatment</h3>
                            <p className="text-sm text-muted-foreground">{result.treatment}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-[200px] flex flex-col items-center justify-center text-center">
                          <Scan className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No results yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="yield">
                <Card className="w-full p-6 flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-muted-foreground"
                    >
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Yield Prediction Tool</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Predict your crop yields based on historical data, weather patterns, and growing conditions.
                  </p>
                  <Button onClick={() => toast({ title: "Yield prediction coming soon" })}>
                    Coming Soon
                  </Button>
                </Card>
              </TabsContent>
              
              <TabsContent value="soil">
                <Card className="w-full p-6 flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-muted-foreground"
                    >
                      <path d="M7 20h10" />
                      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                      <path d="M9.5 9.4c1.1.8 1.8 1.7 2.3 3.7" />
                      <path d="M14.1 6.5c3.3 0 4.9 1.6 4.9 4.6 0 4.8-2.5 8.9-7 8.9-4.6 0-7-5.7-7-10.6C5 4.1 8.9 6 11.3 6c.6 0 1.1-.1 1.4-.3.3-.1.6-.2.9-.2.1 0 .1 0 .2.1.1.1.1.1.1.2 0 .2-.1.3-.3.4l-.3.1c-.3 0-.5-.1-.6-.1-.8-.2-1.3-.2-1.7-.1C9.7 6.1 9 7 9 7.3c0 .1.1.1.1.1.2 0 .5-.2.7-.2.3 0 .5.1.7.2.1.1.1.1.1.2 0 .1-.1.2-.1.2l-.2.1h-.2c-.3 0-.7-.1-1-.2-.3-.1-.6-.1-.8-.1" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Soil Analysis Tool</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Upload soil test results to get AI-powered recommendations for amendments and optimal crops.
                  </p>
                  <Button onClick={() => toast({ title: "Soil analysis coming soon" })}>
                    Coming Soon
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}