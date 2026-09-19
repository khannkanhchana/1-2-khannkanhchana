"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "../components/ui/button";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold"
        >
          My Shop
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                asChild
              >
                <Link href="/login">
                  Login
                </Link>
              </Button>

              <Button asChild>
                <Link href="/register">
                  Register
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
