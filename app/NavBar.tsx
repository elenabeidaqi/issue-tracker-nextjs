'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const current = usePathname();
  const item = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex gap-10 border-b-2 mb-5 px-2 h-14 items-center">
      <Link href="/">
        <AiFillBug className="text-xl ml-5" />
      </Link>
      <ul className="flex gap-4">
        {item.map((elem: any, index: any) => (
          <li key={index}>
            <Link
              href={elem.href}
              className={`text-zinc-500 hover:text-zinc-800 transition-colors ${
                elem.href === current && "text-zinc-900"
              }`}
            >
              {elem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
