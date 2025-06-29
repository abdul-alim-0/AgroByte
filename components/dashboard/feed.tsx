"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';
import { MessageSquare, Heart, Share2, MoreHorizontal, Image as ImageIcon, FileText, X } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Sample post data
const initialPosts = [
  {
    id: '1',
    author: {
      name: 'John Farmer',
      role: 'farmer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    content: 'Just harvested my organic tomatoes! The yield is excellent this season. Has anyone else had good results with heirloom varieties?',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    author: {
      name: 'Dr. Sarah Ahmed',
      role: 'expert',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    content: 'I\'ve been observing an increase in leaf spot disease in rice crops across the southern region. Early detection is crucial. Here are some preventive measures farmers can take...',
    image: null,
    timestamp: '5 hours ago',
    likes: 42,
    comments: 15,
  },
  {
    id: '3',
    author: {
      name: 'Miguel Grower',
      role: 'farmer',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    content: 'Does anyone have experience with drip irrigation systems for vegetable gardens? Looking for recommendations on brands and installation tips.',
    image: 'https://images.pexels.com/photos/2286895/pexels-photo-2286895.jpeg',
    timestamp: '1 day ago',
    likes: 18,
    comments: 24,
  },
];

export function Feed() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState(initialPosts);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim() && !selectedImage) {
      toast({
        title: 'Post cannot be empty',
        description: 'Please add some text or an image to your post.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        author: {
          name: user?.name || 'Anonymous',
          role: user?.role || 'general',
          avatar: user?.avatar || '',
        },
        content: postContent,
        image: selectedImage,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
      };
      
      setPosts([newPost, ...posts]);
      setPostContent('');
      setSelectedImage(null);
      setIsSubmitting(false);
      
      toast({
        title: 'Post published!',
        description: 'Your post has been shared with the community.',
      });
    }, 1000);
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Mock function to handle image selection
  const handleImageSelect = () => {
    // In a real app, this would open a file picker
    // For this demo, we'll just use a random image
    const mockImages = [
      'https://images.pexels.com/photos/1153369/pexels-photo-1153369.jpeg',
      'https://images.pexels.com/photos/707756/pexels-photo-707756.jpeg',
      'https://images.pexels.com/photos/3004923/pexels-photo-3004923.jpeg',
    ];
    
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setSelectedImage(randomImage);
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Create Post</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostSubmit}>
            <div className="flex space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  {user?.name
                    ? user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                    : 'U'}
                </AvatarFallback>
              </Avatar>
              <Textarea
                placeholder={`What's on your mind, ${user?.name?.split(' ')[0]}?`}
                className="flex-1 resize-none"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
            
            {selectedImage && (
              <div className="mt-3 relative">
                <div className="rounded-md overflow-hidden">
                  <Image
                    src={selectedImage}
                    alt="Selected image"
                    width={200}
                    height={150}
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-background/80"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleImageSelect}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Photo
            </Button>
            <Button variant="ghost" size="sm" onClick={() => toast({ title: "Document upload coming soon" })}>
              <FileText className="h-4 w-4 mr-2" />
              Document
            </Button>
          </div>
          <Button 
            type="submit" 
            size="sm" 
            onClick={handlePostSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </CardFooter>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden animate-in">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>
                      {post.author.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <span className="capitalize">{post.author.role}</span>
                      <span className="mx-1">•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Save Post</DropdownMenuItem>
                    <DropdownMenuItem>Hide Post</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="whitespace-pre-line">{post.content}</p>
              {post.image && (
                <div className="mt-3 rounded-md overflow-hidden">
                  <Image
                    src={post.image}
                    alt="Post image"
                    width={800}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-3 flex justify-between">
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-1"
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center space-x-1"
                  onClick={() => toast({ title: "Comments coming soon" })}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments}</span>
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toast({ title: "Sharing coming soon" })}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}