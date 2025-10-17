'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Globe } from 'lucide-react';

export default function HomePage() {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center p-8">
        <div className="flex justify-center items-center mb-6">
          <Github className="w-16 h-16 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          GitLens.AI
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Enter a GitHub username to get an AI-powered analysis of their profile.
        </p>
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
      </div>
    </div>
  );
}