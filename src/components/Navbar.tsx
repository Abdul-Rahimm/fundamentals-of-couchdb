import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white shadow-md mb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Criminal Records DB</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/" ? "bg-gray-900" : "hover:bg-gray-700"
              }`}
            >
              Add Record
            </Link>
            <Link
              href="/records"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/records" ? "bg-gray-900" : "hover:bg-gray-700"
              }`}
            >
              View Records
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
