# GitLens.AI 🧠

GitLens.AI is a full-stack web application that provides an AI-powered analysis of a GitHub user's profile. Simply enter a GitHub username, and the application will fetch their profile data, analyze their repositories, and generate insights using the Google Gemini API.

![GitLens.AI Screenshot](https://i.imgur.com/your-screenshot.png) <!-- Add a screenshot URL here later -->

## Features

- **GitHub Profile Analysis**: Fetches and displays a user's public profile information (avatar, bio, followers, etc.).
- **Repository Insights**: Shows a user's top repositories, sorted by stars.
- **Language Analysis**: Calculates and displays the user's most frequently used programming languages in a pie chart.
- **AI-Powered Summary**: Uses the Google Gemini API to generate a natural language summary of the user's coding strengths, domains of expertise, and primary languages.
- **Responsive UI**: Clean, minimal, and responsive interface built with Tailwind CSS and shadcn/ui.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI/LLM**: [Google Gemini API](https://ai.google.dev/)
- **Data**: [GitHub REST API](https://docs.github.com/en/rest)
- **Charting**: [Recharts](https://recharts.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18.x or later)
- [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/gitlens.ai.git
   cd gitlens.ai
   ```

2. Install the required dependencies:
   ```sh
   npm install
   ```

### Environment Variables

To run the application, you need to set up your environment variables. Create a file named `.env.local` in the root of your project and add your Google Gemini API key.

```.env.local
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

### Running the Development Server

Once the dependencies are installed and the environment variables are set, you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1.  Navigate to the homepage.
2.  Enter a valid GitHub username in the input field.
3.  Click the "Analyze" button or press Enter.
4.  The application will navigate to a new page and display the complete analysis of the user's profile.

## Project Structure

The project is organized as follows:

```
/src
├── app/
│   ├── api/
│   │   ├── analyze/route.ts       # Gemini API route
│   │   └── github/[username]/route.ts # GitHub API route
│   ├── user/[username]/page.tsx # Dynamic page for displaying results
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   └── ui/                      # shadcn/ui components
├── lib/
│   └── utils.ts                 # Utility functions
└── types.ts                     # TypeScript type definitions
```

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new). Make sure to set up the `GEMINI_API_KEY` environment variable in your Vercel project settings.