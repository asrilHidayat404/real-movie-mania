"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinks = {
  label: string;
  path: string;
}[];
const NavLinks: NavLinks = [
  {
    label: "Popular",
    path: "/movie/popular",
  },
  {
    label: "Trending",
    path: "/movie/trending",
  },
];
const Navbar = () => {
  const path = usePathname();
  return (
    <div className="fixed bg-[rgba(0,0,0,.7)] text-white top-0 left-0 right-0 z-20 py-3 px-10 flex items-center gap-5">
      <Link href="/">
        <img
          src="/logo2.jpeg"
          alt="logo"
          width={100}
          height={100}
          className=""
        />
      </Link>
      <nav>
        <ul className="flex gap-x-10 items-center">
          {NavLinks.map((nav, i) => {
            return (
              <li key={i}>
                <Link
                  href={nav.path}
                  className={`${nav.path == path ? "font-bold" : ""}`}
                >
                  {nav.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
