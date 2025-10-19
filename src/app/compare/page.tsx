
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
      <h1 className="text-3xl font-bold mb-4 text-center">Compare GitHub Users</h1>
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

function UserCard({ user }: { user: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <img src={user.avatar_url} alt={user.login} className="w-20 h-20 rounded-full" />
          <div>
            <CardTitle>{user.name} (@{user.login})</CardTitle>
            <p className="text-sm text-gray-500">{user.bio}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Followers:</strong> {user.followers}</p>
        <p><strong>Following:</strong> {user.following}</p>
        <p><strong>Public Repos:</strong> {user.public_repos}</p>
        <p><strong>Public Gists:</strong> {user.public_gists}</p>
        <p><strong>Total Stars:</strong> {user.totalStars}</p>
        <p><strong>Total Forks:</strong> {user.totalForks}</p>
        <p><strong>Avg. Repo Size:</strong> {(user.avgRepoSize / 1024).toFixed(2)} MB</p>
        {user.mostStarredRepo && <p><strong>Most Starred Repo:</strong> {user.mostStarredRepo.name} ({user.mostStarredRepo.stars} stars)</p>}
        {user.mostForkedRepo && <p><strong>Most Forked Repo:</strong> {user.mostForkedRepo.name} ({user.mostForkedRepo.forks} forks)</p>}
        <div>
          <strong>Languages:</strong>
          <ul className="list-disc list-inside">
            {Object.entries(user.languageCounts).map(([lang, count]) => (
              <li key={lang}>{lang}: {count as number}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
