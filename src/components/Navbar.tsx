import Link from "next/link";

export default function Navbar({ isHomePage }: { isHomePage: boolean }) {
  const linkClassName = isHomePage ? "relative group text-black no-underline transition-shadow duration-300 hover:shadow-lg hover:shadow-black/30 rounded-md px-3 py-2" : "text-black no-underline px-3 py-2";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/80">
      <div className="w-full px-4 flex justify-between items-center p-4 text-black">
        <Link href="/" className="text-2xl font-bold text-black no-underline">
          GitLens.AI
        </Link>
        <div className="flex gap-8">
          <Link href="/analyze" className={linkClassName}>
            Analyze Profile
          </Link>
          <Link href="/compare" className={linkClassName}>
            Compare
          </Link>
          <Link href="/contact" className={linkClassName}>
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
