
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ComparePage() {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [comparison, setComparison] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    setLoading(true);
    setError(null);
    setComparison(null);

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username1, username2 }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comparison data');
      }

      const data = await response.json();
      setComparison(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">Compare GitHub Users</h1>
      <div className="flex justify-center gap-4 mb-8">
        <Input placeholder="Enter GitHub Username 1" value={username1} onChange={(e) => setUsername1(e.target.value)} />
        <Input placeholder="Enter GitHub Username 2" value={username2} onChange={(e) => setUsername2(e.target.value)} />
        <Button onClick={handleCompare} disabled={loading}>{loading ? 'Comparing...' : 'Compare'}</Button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {comparison && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserCard user={comparison.user1} />
          <UserCard user={comparison.user2} />
        </div>
      )}
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function UserCard({ user }: { user: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.avatar_url} alt={user.login} />
            <AvatarFallback>{user.login.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name} (@{user.login})</CardTitle>
            <p className="text-sm text-light-grey">{user.bio}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stats">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="repos">Repositories</TabsTrigger>
          </TabsList>
          <TabsContent value="stats" className="space-y-2 pt-4">
            <TooltipProvider>
              <div className="grid grid-cols-2 gap-4">
                <StatTooltip label="Followers" value={user.followers} tooltip="Total number of followers" />
                <StatTooltip label="Following" value={user.following} tooltip="Total number of users followed" />
                <StatTooltip label="Public Repos" value={user.public_repos} tooltip="Total number of public repositories" />
                <StatTooltip label="Public Gists" value={user.public_gists} tooltip="Total number of public gists" />
                <StatTooltip label="Total Stars" value={user.totalStars} tooltip="Total number of stars received" />
                <StatTooltip label="Total Forks" value={user.totalForks} tooltip="Total number of forks" />
                <StatTooltip label="Avg. Repo Size" value={`${(user.avgRepoSize / 1024).toFixed(2)} MB`} tooltip="Average repository size" />
              </div>
            </TooltipProvider>
            <div>
              <strong>Languages:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(user.languageCounts).map(([lang, count]) => (
                  <Badge key={lang} variant="secondary">{lang}: {count as number}</Badge>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="repos" className="space-y-2 pt-4">
            {user.mostStarredRepo && <p><strong>Most Starred Repo:</strong> {user.mostStarredRepo.name} ({user.mostStarredRepo.stars} stars)</p>}
            {user.mostForkedRepo && <p><strong>Most Forked Repo:</strong> {user.mostForkedRepo.name} ({user.mostForkedRepo.forks} forks)</p>}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function StatTooltip({ label, value, tooltip }: { label: string, value: string | number, tooltip: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="text-left">
          <p className="text-sm text-light-grey">{label}</p>
          <p className="font-bold">{value}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
