'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Globe } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyzePage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleAnalyze = () => {
    if (username.trim()) {
      router.push(`/user/${username.trim()}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Github className="w-16 h-16 text-blue-500" />
          </div>
          <CardTitle className="text-4xl font-bold">GitLens.AI</CardTitle>
          <CardDescription className="text-lg">
            Enter a GitHub username to get an AI-powered analysis of their profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="e.g., randomfunction"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-4 text-lg"
            />
            <Button onClick={handleAnalyze} className="p-4 text-lg">
              Analyze
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}