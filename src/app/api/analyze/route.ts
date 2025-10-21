import { NextResponse } from 'next/server';
import {Mistral} from '@mistralai/mistralai';
import type { GitHubUser, GitHubRepo, ProcessedGitHubData } from '@/types';

const API_KEY = process.env.MISTRAL_API_KEY;

if (!API_KEY) {
  console.warn('MISTRAL_API_KEY is not set. The /api/analyze route will not work.');
}

const mistral = API_KEY ? new Mistral({apiKey : API_KEY}) : null;

export async function POST(request: Request) {
  if (!mistral) {
    return NextResponse.json(
      { error: 'Mistral AI API key not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    const { user, repos }: { user: GitHubUser; repos: GitHubRepo[] } = await request.json();

    const languageCounts = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topLanguages = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, number>);

    const topStarred = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map(repo => ({ name: repo.name, stars: repo.stargazers_count }));

    const repoDescriptions = repos
      .filter(repo => repo.description && !repo.fork)
      .map(repo => repo.description!)
      .slice(0, 20);

    const processedData: ProcessedGitHubData = {
      username: user.login,
      total_repos: user.public_repos,
      top_languages: topLanguages,
      top_starred: topStarred,
      repo_descriptions: repoDescriptions,
    };

    const prompt = `
Analyze the following GitHub user's coding profile based on the provided data.
Provide a concise, professional, and insightful summary of their strengths, potential areas of expertise, and primary programming languages.
Structure your response in Markdown format.

**Data:**
\`\`\`json
${JSON.stringify(processedData, null, 2)}
\`\`\`

**Analysis Guidelines:**
- Start with a one-paragraph summary of the user's overall profile.
- Identify the most frequently used languages and what they might imply (e.g., frontend, backend, data science).
- Mention the most starred repositories as an indicator of their popular or impactful work.
- Use the repository descriptions to infer their domains of interest (e.g., web development, machine learning, open source).
- Conclude with a summary of their likely expertise.
- Keep the tone positive and encouraging.
`;

    const chatResponse = await mistral.chat.complete({
      model: 'mistral-small-latest',
      messages: [{ role: 'user', content: prompt }],
    });

    const analysis = chatResponse.choices[0].message.content;
    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred.' },
      { status: 500 }
    );
  }
}
