"use client";
import getSearchMovie from "@/app/api/searchMovie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function untuk fetch data film berdasarkan keyword
  const fetchMovies = async (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      if (query.length < 3) {
        setResults([]);
        setLoading(false);
        return
      }
      const result = await getSearchMovie(query);
      if (result) {
        setResults(result.results);
        
      }
      // setResults(data.results.slice(0, 5)); // Ambil hanya 5 hasil pertama
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  // Gunakan debounce untuk mengurangi request API berlebihan
  // useEffect(() => {
  //   const delay = setTimeout(() => {
  //     fetchMovies(search);
  //   }, 2000); // Tunggu 500ms sebelum request API

  //   return () => clearTimeout(delay);
  // }, [search]);

  console.log("results", results);
  
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
        {/* Search Result Dropdown */}
        {search && (
          <div className="absolute bg-gray-900 text-white w-full mt-2 rounded-md max-h-60 overflow-y-auto shadow-lg">
            {loading ? (
              <p className="p-2 text-center">Loading...</p>
            ) : results.length > 0 ? (
              results.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/search/${new URLSearchParams({title: movie.title, id: movie.id})}}`}
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  {movie.title}
                </Link>
              ))
            ) : (
              <p className="p-2 text-center">Tidak ada hasil</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
