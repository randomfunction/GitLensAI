import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewHomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl w-full text-center p-8">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to GitLens.AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your AI-powered assistant for GitHub profile analysis and comparison.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/analyze">
            <Button className="p-6 text-lg">Analyze a Profile</Button>
          </Link>
          <Link href="/compare">
            <Button className="p-6 text-lg">Compare Profiles</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
