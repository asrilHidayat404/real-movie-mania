"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLinks = {
  label: string;
  path: string;
}[];

const NavLinks: NavLinks = [
  { label: "Popular", path: "/movie/popular" },
  { label: "Trending", path: "/movie/trending" },
];

const Navbar = () => {
  const path = usePathname();
  const [search, setSearch] = useState("");

  return (
    <div className="fixed bg-[rgba(0,0,0,.7)] text-white top-0 left-0 right-0 z-20 py-3 px-10 flex items-center gap-5">
      {/* Logo */}
      <Link href="/">
        <img src="/logo2.jpeg" alt="logo" width={100} height={100} />
      </Link>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-x-10 items-center">
          {NavLinks.map((nav, i) => (
            <li key={i}>
              <Link
                href={nav.path}
                className={`${nav.path == path ? "font-bold" : ""}`}
              >
                {nav.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Search Input */}
      <div className="relative flex-1 ml-10">
        <input
          type="text"
          placeholder="Cari film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-80 bg-gray-800 text-white rounded-full focus:outline-none"
        />
        <i className="ph ph-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default Navbar;
