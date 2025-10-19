"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GitHubUser, GitHubRepo } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, GitFork, BrainCircuit } from "lucide-react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Helper function for generating chart colors
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#ff4d4d",
];

// --- Sub-components --- //

function StatTooltip({
  label,
  value,
  tooltip,
}: {
  label: string;
  value: string | number;
  tooltip: string;
}) {
  return (
    <ShadcnTooltip>
      <TooltipTrigger>
        <div className="text-center">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </ShadcnTooltip>
  );
}

const ProfileCard = ({ user }: { user: GitHubUser }) => (
  <Card>
    <CardHeader className="flex flex-row items-center space-x-4 text-white">
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.avatar_url} alt={user.login} />
        <AvatarFallback>
          {user.name?.charAt(0) || user.login.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <CardTitle className="text-3xl font-bold">
          {user.name || user.login}
        </CardTitle>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          @{user.login}
        </a>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{user.bio}</p>
      </div>
    </CardHeader>
    <CardContent className="flex justify-around pt-4 border-t">
      <div className="flex gap-100 text-sm text-muted-foreground">
        <span>Followers: {user.followers}</span>
        <span>Following: {user.following}</span>
        <span>Repositories: {user.public_repos}</span>
      </div>
    </CardContent>
  </Card>
);

const LanguageChart = ({ repos }: { repos: GitHubRepo[] }) => {
  const languageCounts = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(languageCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  if (chartData.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No language data found.</CardTitle>
        </CardHeader>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const TopReposCard = ({ repos }: { repos: GitHubRepo[] }) => {
  const topRepos = repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Repositories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topRepos.map((repo) => (
          <Dialog key={repo.id}>
            <DialogTrigger asChild>
              <div className="p-3 border rounded-lg cursor-pointer hover:bg-gray-800">
                <p className="font-bold text-blue-500">{repo.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {repo.description}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1" /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center">
                    <GitFork className="w-4 h-4 mr-1" /> {repo.forks_count}
                  </span>
                  {repo.language && (
                    <Badge variant="secondary">{repo.language}</Badge>
                  )}
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{repo.name}</DialogTitle>
                <DialogDescription>{repo.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <p>
                  <strong>Language:</strong> {repo.language || "N/A"}
                </p>
                <p>
                  <strong>Stars:</strong> {repo.stargazers_count}
                </p>
                <p>
                  <strong>Forks:</strong> {repo.forks_count}
                </p>
                <p>
                  <strong>Open Issues:</strong> {repo.open_issues_count}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(repo.created_at).toLocaleDateString()}
                </p>
                <p>
                  <strong>Last Updated:</strong>{" "}
                  {new Date(repo.updated_at).toLocaleDateString()}
                </p>
              </div>
              <Button asChild className="mt-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </Button>
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
    </Card>
  );
};

const AnalysisCard = ({
  analysis,
  loading,
}: {
  analysis: string;
  loading: boolean;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <BrainCircuit className="w-6 h-6 mr-2 text-blue-500" />
        AI-Powered Analysis
      </CardTitle>
    </CardHeader>
    <CardContent>
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
          <p>Generating insights...</p>
        </div>
      ) : (
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: analysis.replace(/\n/g, "<br />"),
          }}
        />
      )}
    </CardContent>
  </Card>
);

interface Recommendation {
  repo_name: string;
  similarity: number;
  language?: string;
}

const RecommendationsCard = ({ username }: { username: string }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/recommend?username=${username}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch recommendations");
      }
      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleFetchRecommendations} disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </Button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {recommendations.map((rec, index) => (
            <Card key={`${rec.repo_name}-${index}`}>
              <CardHeader>
                <CardTitle>{rec.repo_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Similarity: {(rec.similarity * 100).toFixed(2)}%</p>
                <Button asChild className="mt-2">
                  <a
                    href={`https://github.com/${rec.repo_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// --- Main Page Component --- //

export default function UserPage() {
  const params = useParams();
  const username = params.username as string;

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/github/${username}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch GitHub data: ${res.statusText}`);
        }
        const data = await res.json();
        setUser(data.user);
        setRepos(data.repos);
        setLoading(false);
        fetchAnalysis(data.user, data.repos);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
        setLoading(false);
        setAnalysisLoading(false);
      }
    };

    const fetchAnalysis = async (user: GitHubUser, repos: GitHubRepo[]) => {
      setAnalysisLoading(true);
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user, repos }),
        });
        if (!res.ok) {
          throw new Error(`Failed to get analysis: ${res.statusText}`);
        }
        const data = await res.json();
        setAnalysis(data.analysis);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Failed to load AI analysis."
        );
      } finally {
        setAnalysisLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Fetching GitHub profile...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl mb-4">Error: {error}</p>
        <Link href="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" /> Try another username
          </Button>
        </Link>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </Link>

      <div className="space-y-8">
        <ProfileCard user={user} />

        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="repos">Top Repos</TabsTrigger>
          </TabsList>
          <TabsContent value="analysis" className="pt-4">
            <AnalysisCard analysis={analysis} loading={analysisLoading} />
            {error && !analysis && (
              <Card className="border-red-500 mt-4">
                <CardHeader>
                  <CardTitle className="text-red-500">
                    Analysis Failed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{error}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="recommendations" className="pt-4">
            <RecommendationsCard username={username} />
          </TabsContent>
          <TabsContent value="languages" className="pt-4">
            <LanguageChart repos={repos} />
          </TabsContent>
          <TabsContent value="repos" className="pt-4">
            <TopReposCard repos={repos} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
