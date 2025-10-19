import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/10 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center p-4 text-white">
        <Link href="/" className="text-2xl font-bold text-white">
          GitLens.AI
        </Link>
        <div className="flex gap-8">
          <Link href="/analyze" className="relative group">
            Analyze Profile
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link href="/compare" className="relative group">
            Compare
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
          <Link href="/contact" className="relative group">
            Contact Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
