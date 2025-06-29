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

export default function AIToolsPage() {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    confidence: number;
    description: string;
    treatment: string;
  } | null>(null);

  const handleImageSelect = () => {
    // Simulated image selection - in a real app, this would open a file picker
    const mockImages = [
      'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg',
      'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg',
      'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg'
    ];
    
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setSelectedImage(randomImage);
    setResult(null);
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
    
    // Simulate API call to AI model
    setTimeout(() => {
      // Mock result
      setResult({
        disease: 'Late Blight',
        confidence: 92.7,
        description: 'Late blight is a plant disease caused by the oomycete pathogen Phytophthora infestans. It affects plants in the Solanaceae family, particularly potatoes and tomatoes, causing significant crop losses worldwide.',
        treatment: 'Apply copper-based fungicides as a preventive measure. Remove and destroy infected plant parts. Ensure good air circulation around plants. Use resistant varieties when possible.'
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleReset = () => {
    setSelectedImage(null);
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
                      <CardTitle>Crop Disease Detection</CardTitle>
                      <CardDescription>
                        Upload an image of your crop to identify diseases and get treatment recommendations.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center space-y-4">
                        {selectedImage ? (
                          <div className="relative w-full aspect-square rounded-md overflow-hidden border">
                            <Image
                              src={selectedImage}
                              alt="Selected crop image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div 
                            className="w-full aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={handleImageSelect}
                          >
                            <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">Click to upload an image of your crop</p>
                            <p className="text-xs text-muted-foreground mt-1">Supported formats: JPEG, PNG, WebP</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {selectedImage ? (
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
                        <Button className="w-full" onClick={handleImageSelect}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                  
                  <Card className={result ? '' : 'hidden md:block'}>
                    <CardHeader>
                      <CardTitle>Analysis Results</CardTitle>
                      <CardDescription>
                        {result 
                          ? `Disease detected with ${result.confidence.toFixed(1)}% confidence` 
                          : 'The analysis results will appear here after processing.'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {result ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Check className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Detected Disease</h3>
                              <p className="text-lg font-bold">{result.disease}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-1">Description</h3>
                            <p className="text-sm text-muted-foreground">{result.description}</p>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-1">Recommended Treatment</h3>
                            <p className="text-sm text-muted-foreground">{result.treatment}</p>
                          </div>
                          
                          <div className="bg-muted/50 p-4 rounded-md flex items-center space-x-3">
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                            <p className="text-sm">This is an AI-assisted diagnosis. For severe cases, please consult with an agricultural expert.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-8">
                          <div className="bg-muted rounded-full p-4 mb-4">
                            <Scan className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground">Upload an image and click "Analyze" to get started</p>
                        </div>
                      )}
                    </CardContent>
                    {result && (
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => toast({ title: "Expert connection coming soon" })}>
                          Connect with an Expert
                        </Button>
                      </CardFooter>
                    )}
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