
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import type { GitHubUser, GitHubRepo, ProcessedGitHubData } from '@/types';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('GEMINI_API_KEY is not set. The /api/analyze route will not work.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export async function POST(request: Request) {
  if (!genAI) {
    return NextResponse.json(
      { error: 'Gemini API key not configured on the server.' },
      { status: 500 }
    );
  }

  try {
    const { user, repos }: { user: GitHubUser; repos: GitHubRepo[] } = await request.json();

    // 1. Process the data
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

    // 2. Generate the prompt for Gemini
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

    // 3. Call the Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });
    
    const generationConfig = {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const result = await model.generateContent({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig, safetySettings });
    const analysis = result.response.text();

    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('Error in /api/analyze:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred during analysis.' }, { status: 500 });
  }
}
