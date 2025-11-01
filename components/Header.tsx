"use client";
/**
 * This component is a client-side component because it uses React hooks
 * (useState, useEffect) and Next.js navigation hooks (useRouter, usePathname)
 * that require client-side interactivity.
 */

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Header Component
 * ---
 * Displays the site logo on the left and a navigation button on the right.
 * It manages a 7-second API cooldown timer that persists across page navigations
 * using `sessionStorage`.
 *
 * - On the main page (`/`), the button navigates to the Random Quote page (`/random`).
 * - On the Random Quote page (`/random`), the button navigates back to the Daily Quote page (`/`).
 */
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Check if the current route is the Random Quote page.
   * Used to toggle the button label and navigation target.
   */
  const isRandomPage = pathname === "/random";

  // Cooldown timer (in seconds), displayed to the user.
  const [cooldown, setCooldown] = useState(0);

  /**
   * Effect: Cooldown Countdown
   * ---
   * This effect runs a 1-second interval timer whenever the 'cooldown'
   * state is greater than 0, counting it down to 0.
   */
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  /**
   * Effect: Check Cooldown on Page Load
   * ---
   * This effect runs every time the 'pathname' changes (i.e., on every navigation).
   * It checks sessionStorage for a "cooldownUntil" timestamp.
   * If one is found and is still in the future, it calculates the
   * remaining seconds and updates the 'cooldown' state to enforce the wait.
   */
  useEffect(() => {
    const checkCooldownOnLoad = () => {
      const cooldownUntil = sessionStorage.getItem("cooldownUntil");
      if (cooldownUntil) {
        const remainingMs = parseInt(cooldownUntil) - Date.now();
        const remainingSec = Math.ceil(remainingMs / 1000);

        if (remainingSec > 0) {
          setCooldown(remainingSec);
        }
      }
    };
    checkCooldownOnLoad();
  }, [pathname]); // Re-check cooldown every time the page changes

  /**
   * Handles navigation when the button is clicked.
   * ---
   * 1. Checks if a cooldown is already active.
   * 2. If not, it sets a 7-second cooldown timestamp in `sessionStorage`
   * to ensure persistence across page loads.
   * 3. It updates the local 'cooldown' state to 7 seconds for immediate UI feedback.
   * 4. It navigates the user to the alternate page (Daily <-> Random).
   */
  const handleNavigate = () => {
    // 1. Check if cooldown is already active
    if (cooldown > 0) return;

    const now = Date.now();

    // 2. Set cooldown timestamp 7 seconds into the future
    sessionStorage.setItem("cooldownUntil", (now + 7000).toString());

    // 3. Set local state for immediate UI update
    setCooldown(7);

    // 4. Navigate to the other page
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
        disabled={cooldown > 0} // Button is disabled if cooldown is active
        className={`px-4 py-2 sm:px-5 sm:py-2 text-gray-800 font-medium text-xs sm:text-sm md:text-base cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed ${
          // Conditional styling for cooldown state
          cooldown > 0
            ? "bg-linear-to-r from-indigo-300 to-pink-300"
            : "bg-linear-to-r from-pink-400 via-pink-300 to-yellow-300 hover:from-yellow-500 hover:via-pink-400 hover:to-pink-400"
        }`}
        aria-label={isRandomPage ? "Go to Daily Quote" : "Go to Random Quote"}
      >
        {/* Toggle button text based on the current page */}
        {isRandomPage ? "Daily Quote" : "Random Quote"}

        {/* Show cooldown timer if active */}
        {cooldown > 0 ? ` (Wait ${cooldown}s)` : ""}
      </button>
    </header>
  );
}
