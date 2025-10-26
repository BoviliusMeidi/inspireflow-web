"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

/**
 * Header Component
 * ---
 * Displays the site logo on the left and a navigation button on the right.
 *
 * - On the main page (`/`), the button navigates to the Random Quote page (`/random`).
 * - On the Random Quote page (`/random`), the button navigates back to the Daily Quote page (`/`).
 *
 * This components uses Next.js Client Components for route detection and navigation.
 */
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Check if the current route is the Random Quote page.
   * Used to toggle the button label and navigation target.
   */
  const isRandomPage = pathname === "/random";

  /**
   * Handles navigation when the button is clicked.
   * Redirects the user to either `/` or `/random` based on the current page.
   */
  const handleNavigate = () => {
    router.push(isRandomPage ? "/" : "/random");
  };

  return (
    <header
      className=" absolute top-4 left-4 right-4
        sm:top-6 sm:left-10 sm:right-10
        md:left-36 md:right-36
        flex items-center justify-between
        z-10"
    >
      <div className="flex items-center">
        <Image
          src={"/logo.svg"}
          width={100}
          height={100}
          alt="InspireFlow Logo"
          className="relative w-[60px] sm:w-20 md:w-[100px]"
          priority
        />
      </div>
      <button
        onClick={handleNavigate}
        className={`px-4 py-2 sm:px-5 sm:py-2 text-gray-800 font-medium text-xs sm:text-sm md:text-base
                    bg-linear-to-r from-pink-400 via-pink-300 to-yellow-300 hover:from-yellow-500 hover:via-pink-400 hover:to-pink-400
                    shadow-md hover:shadow-lg transition-all duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed`}
        aria-label={isRandomPage ? "Go to Daily Quote" : "Go to Random Quote"}
      >
        {isRandomPage ? "Daily Quote" : "Random Quote"}
      </button>
    </header>
  );
}
