
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/recommend?username=${username}`);
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.detail || 'An error occurred' }, { status: response.status });
    }
    const data = await response.json();

    // Transform the data to match the frontend's expectation
    const transformedData = {
      ...data,
      recommendations: data.recommendations.map((rec: any) => ({
        repo_name: rec.repo,
        similarity: rec.score,
      })),
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
  }
}
