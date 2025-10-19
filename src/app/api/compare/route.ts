import { NextRequest, NextResponse } from 'next/server';
import type { GitHubUser, GitHubRepo } from '@/types';

async function getUserData(username: string): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`Failed to fetch data for user ${username}`);
  }

  return { user: await userRes.json(), repos: await reposRes.json() };
}

function processUserData(username: string, repos: GitHubRepo[]) {
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  const avgRepoSize = repos.length > 0 ? repos.reduce((acc, repo) => acc + repo.size, 0) / repos.length : 0;

  const languageCounts = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const mostStarredRepo = repos.length > 0 ? repos.reduce((max, repo) => repo.stargazers_count > max.stargazers_count ? repo : max, repos[0]) : null;
  const mostForkedRepo = repos.length > 0 ? repos.reduce((max, repo) => repo.forks_count > max.forks_count ? repo : max, repos[0]) : null;

  return {
    totalStars,
    totalForks,
    avgRepoSize,
    languageCounts,
    mostStarredRepo: mostStarredRepo ? { name: mostStarredRepo.name, stars: mostStarredRepo.stargazers_count } : null,
    mostForkedRepo: mostForkedRepo ? { name: mostForkedRepo.name, forks: mostForkedRepo.forks_count } : null,
  };
}

export async function POST(req: NextRequest) {
  const { username1, username2 } = await req.json();

  if (!username1 || !username2) {
    return NextResponse.json({ error: 'Two usernames are required' }, { status: 400 });
  }

  try {
    const [data1, data2] = await Promise.all([
      getUserData(username1),
      getUserData(username2),
    ]);

    const processedData1 = processUserData(username1, data1.repos);
    const processedData2 = processUserData(username2, data2.repos);

    const comparison = {
      user1: { ...data1.user, ...processedData1 },
      user2: { ...data2.user, ...processedData2 },
    };

    return NextResponse.json(comparison);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
