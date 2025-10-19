import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">GitLens.AI</Link>
        <div className="flex gap-4">
          <Link href="/analyze">Analyze Profile</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}
