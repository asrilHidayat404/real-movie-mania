"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Hamburger } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import AuthLink from "./AuthLink";

type NavLinks = {
  label: string;
  path: string;
}[];

const NavLinks: NavLinks = [
  { label: "Popular", path: "/movie/recommended" },
  { label: "Trending", path: "/movie/trending" },
];

const Navbar = () => {
  const path = usePathname();
  const navigate = useRouter();
  const [search, setSearch] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const handleSearch = () => {
    if (search) {
      navigate.push(`/search/${search}`);
    }
  };
  return (
    <div className="fixed bg-[rgba(0,0,0,.7)] text-white top-0 left-0 right-0 z-20 py-3 px-10 flex items-center gap-5 justify-between">
      {/* Logo */}
      <div className="lg:hidden">
        <button onClick={() => setShowMobileNav((prev) => !prev)}>
          <Hamburger size={25} />
        </button>
      </div>

      <MobileNav
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
      />

      <Link href="/">
        <img src="/logo2.jpeg" alt="logo" width={100} height={100} />
      </Link>

      {/* Navigation */}
      <nav className="hidden lg:flex gap-x-10 items-center">
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
          <AuthLink />
        </ul>
      </nav>

      {/* Search Input */}
      <div className="relative lg:flex hidden justify-end gap-4 flex-1 ml-10 ">
        <input
          type="text"
          placeholder="Cari film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-80 bg-gray-800 text-white rounded-full focus:outline-none shadow-sm shadow-white"
        />
        <button onClick={() => handleSearch()}>
          <MagnifyingGlass
            className="absolute top-1/2 -right-3 transform -translate-y-1/2"
            weight="bold"
          />
        </button>
      </div>

      <div className="lg:hidden">
        <button>
          <MagnifyingGlass size={25} />
        </button>
      </div>
    </div>
  );
};

const MobileNav = ({
  showMobileNav,
  setShowMobileNav,
}: {
  showMobileNav: boolean;
  setShowMobileNav: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showGenres, setShowGenres] = useState(false);
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western",
  ];
  return (
    <div
      className={`absolute ${
        showMobileNav ? "flex" : "hidden"
      } bg-[rgba(0,0,0,.7)] text-white top-0 left-0 bottom-0 min-h-screen w-1/2 z-20 py-3 px-10  flex-col gap-6`}
    >
      {/* Logo */}
      <div className="lg:hidden">
        <button onClick={() => setShowMobileNav((prev) => !prev)}>
          <Hamburger size={25} />
        </button>
      </div>
      {/* Navigation */}
      <nav className="">
        <ul className="flex gap-x-10 flex-col gap-4 h-1/2">
          {NavLinks.map((nav, i) => (
            <li key={i}>
              <Link href={nav.path}>{nav.label}</Link>
            </li>
          ))}
          <AuthLink />
        </ul>
      </nav>
      <div className="overflow-auto">
        <button onClick={() => setShowGenres((prev) => !prev)}>Genres:</button>
        {showGenres && (
          <ul className="ml-3 space-y-2 mt-2">
            {genres.map((genre, i) => (
              <li key={i}>{genre}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
