import { NextRequest, NextResponse } from 'next/server';
import type { GitHubUser, GitHubRepo } from '@/types';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const { username } = await context.params
  if (!username) return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }),
    ]);

    if (!userRes.ok) {
      return NextResponse.json({ error: `User not found: ${userRes.statusText}` }, { status: userRes.status });
    }

    if (!reposRes.ok) {
      return NextResponse.json({ error: `Failed to fetch repos: ${reposRes.statusText}` }, { status: reposRes.status });
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    return NextResponse.json({ user, repos });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}