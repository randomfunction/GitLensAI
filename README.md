# GitLens.AI 🧠

**GitLens.AI** is a full-stack web application that offers AI-powered insights into GitHub profiles. It provides a detailed analysis of a user's coding activities, generates repository recommendations, and features an interactive 3D globe to visualize the user's global presence.

![GitLens.AI Screenshot](/public/image.png) <!-- Add a screenshot URL here later -->

## Project Description

This project is designed to provide a comprehensive and visually engaging analysis of GitHub users. By leveraging a combination of machine learning models and the Mistral AI API, GitLens.AI goes beyond simple statistics to offer a deeper understanding of a developer's skills and interests. The application is built with a modern tech stack, featuring a Next.js frontend, a Python backend for recommendations, and a visually appealing interface with 3D elements.

## Features

- **GitHub Profile Analysis**: Fetches and displays a user's public profile information (avatar, bio, followers, etc.).
- **Repository Insights**: Shows a user's top repositories, sorted by stars.
- **Language Analysis**: Calculates and displays the user's most frequently used programming languages in a pie chart.
- **AI-Powered Summary**: Uses the Mistral AI API to generate a natural language summary of the user's coding strengths, domains of expertise, and primary languages.
- **Repository Recommendations**: A Python-based service that uses a Graph Neural Network (GNN) and sentence transformers to recommend new repositories to the user.
- **Interactive 3D Globe**: A 3D globe on the homepage to visualize the user's global presence.
- **Responsive UI**: Clean, minimal, and responsive interface built with Tailwind CSS and shadcn/ui.

## Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) and [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- **AI/LLM**: [Mistral AI API](https://ai.google.dev/)
- **Recommendation Service**:
    - **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
    - **ML Models**: [PyTorch](https://pytorch.org/), [Sentence-Transformers](https://www.sbert.net/), [Scikit-learn](https://scikit-learn.org/)
- **Data**: [GitHub REST API](https://docs.github.com/en/rest)
- **Charting**: [Recharts](https://recharts.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18.x or later)
- [npm](https://www.npmjs.com/) or a compatible package manager
- [Python](https://www.python.org/downloads/) (v3.8 or later)
- [pip](https://pip.pypa.io/en/stable/installation/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/gitlens.ai.git
   cd gitlens.ai
   ```

2. Install the required frontend dependencies:
   ```sh
   npm install
   ```

3. Install the required backend dependencies:
    ```sh
    pip install -r requirements.txt
    ```

### Environment Variables

To run the application, you need to set up your environment variables. Create a file named `.env.local` in the root of your project and add your Mistral AI API key.

```.env.local
MISTRAL_API_KEY="YOUR_MISTRAL_API_KEY"
GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
```

### Running the Development Servers

1. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

2. **Start the backend recommendation service:**
    ```bash
    uvicorn recommendation_service:app --reload
    ```
    The backend service will be running on [http://localhost:8000](http://localhost:8000).

## Usage

1.  Navigate to the homepage.
2.  Click the "Analyze Profile" button.
3.  Enter a valid GitHub username in the input field.
4.  Click the "Analyze" button or press Enter.
5.  The application will navigate to a new page and display the complete analysis of the user's profile.
6.  To get repository recommendations, use the "Compare Profiles" feature (Note: This feature is still under development).

## Project Structure

The project is organized as follows:

```
/src
├── app/
│   ├── api/
│   │   ├── analyze/route.ts       # Mistral AI API route
│   │   └── github/[username]/route.ts # GitHub API route
│   ├── user/[username]/page.tsx # Dynamic page for displaying results
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   └── ui/                      # shadcn/ui components
├── lib/
│   └── utils.ts                 # Utility functions
└── types.ts                     # TypeScript type definitions

/recommendation_service.py     # Python backend for recommendations
/build_text_embeddings.py      # Script to build text embeddings
/rgcn_model.pt                 # Pre-trained GNN model
/repo_embeddings.pt            # Repository embeddings
/text_embeddings.npy           # Text embeddings
```

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new). Make sure to set up the `MISTRAL_API_KEY` and `GITHUB_TOKEN` environment variables in your Vercel project settings. The Python backend will need to be deployed separately (e.g., on a service like Heroku or AWS).
