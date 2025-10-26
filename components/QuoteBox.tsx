"use client";

import { useEffect, useState } from "react";
import { Quote, getRandomQuote } from "@/lib/getQuote";

/**
 * Props
 * ---
 * @property {Quote} initialQuote - The initial quote (daily or random) fetched at build or runtime (server-side).
 * @property {boolean} {showButton = false} - Whether to show the "New Quote" button.
 */
interface QuoteBoxProps {
  initialQuote: Quote;
  showButton?: boolean;
}

/**
 * QuoteBox Component
 * ---
 * Display a quote and author. Starts with the daily quote and allows users,
 * to fetch a new random quote from the ZenQuotes API.
 * - If `showButton` is true -> allows user to fetch new random quotes.
 * - If `showButton` is false -> shows only the static quote (for daily quote page).
 * - Includes a 7-second cooldown timer to respect the API's rate limit (5 req / 30s).
 *
 * - Client Component - Uses `useState` and user interaction.
 * - Handles loading state, API errors, and user feedback gracefully.
 */
export default function QuoteBox({
  initialQuote,
  showButton = false,
}: QuoteBoxProps) {
  // local state to store the currently displayed quote.
  const [quote, setQuote] = useState<Quote>(initialQuote);
  // loading indicator state for user feedback during fetch.
  const [loading, setLoading] = useState(false);
  // cooldown timer (in seconds).
  const [cooldown, setCooldown] = useState(0);

  /**
   * handleNewQuote()
   * ---
   * Fetches a new random quote from the ZenQuotes API.
   * - Temporary disables the button while loading or during cooldown.
   * - Updates displayed route.
   * - Handles errors gracefully.
   */
  const handleNewQuote = async () => {
    if (cooldown > 0) return;
    setLoading(true);

    try {
      const newQuote = await getRandomQuote();
      setQuote(newQuote);
      setCooldown(7);
    } catch (error) {
      console.error("Error fetching random quote:", error);
      alert("Failed to fetch a new quote.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cooldown countdown effect
   * ---
   * Runs every second until cooldown reaches 0.
   */
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-36 mt-8 text-gray-800">
      <p
        className="text-left
          text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl
          font-playfair font-black leading-snug tracking-wide
          text-gray-700 mb-4"
      >
        {quote.q}
      </p>
      <hr className="w-full md:w-full border-gray-400 my-4 md:my-6" />
      <p className="text-right w-full text-lg sm:text-2xl md:text-3xl font-cinzel text-gray-600 italic">
        {quote.a}
      </p>
      {showButton && (
        <button
          onClick={handleNewQuote}
          disabled={loading || cooldown > 0}
          className={`mt-6 px-6 py-3 text-white font-lato text-sm sm:text-base transition duration-300 ease-in-out
                    ${
                      loading || cooldown > 0
                        ? "bg-linear-to-r from-indigo-300 to-pink-300 opacity-60 cursor-not-allowed"
                        : "bg-linear-to-r from-indigo-600 via-purple-800 to-purple-800 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"
                    }`}
        >
          {loading
            ? "Loading..."
            : cooldown > 0
            ? `Wait ${cooldown}s`
            : "Get new quote"}
        </button>
      )}
    </div>
  );
}
