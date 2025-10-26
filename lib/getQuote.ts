"use server"

/**
 * Quote Interfaces
 * ---
 * Defines the structure of a quote object returned by the ZenQuotes API.
 * - q : Quote
 * - a : Author Quote
 */
export interface Quote {
  q: string;
  a: string;
}

/**
 * API Endpoints
 * ---
 * Stored as constants to ensure reliability and easier refactoring.
 * If the API base or endpoints ever change.
 */
const ZEN_QUOTES_TODAY_URL = "https://zenquotes.io/api/today";
const ZEN_QUOTES_RANDOM_URL = "https://zenquotes.io/api/random";

/**
 * getDailyQuote()
 * ---
 * Fetches the "Quote of the Day" from ZenQuotes API.
 *
 * Uses `Next.js 'revalidate'` to cache data for 24 hours (86400 seconds).
 * Ideal for server components or static generation.
 *
 * @returns {Promise<Quote>} The daily quote object.
 */
export async function getDailyQuote(): Promise<Quote> {
  const response = await fetch(ZEN_QUOTES_TODAY_URL, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the daily quote from ZenQuotes API.");
  }

  const data = await response.json();
  return data[0];
}

/**
 * getRandomQuote()
 * ---
 * Fetches a random quote from ZenQuotes API.
 *
 * Uses `cache : "no-store"` to ensure a fresh quote every request.
 * Perfect for button-triggered updates or refresh actions.
 *
 * @returns {Promise<Quote>} A random quote object.
 */
export async function getRandomQuote(): Promise<Quote> {
  const response = await fetch(ZEN_QUOTES_RANDOM_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch a random quote from ZenQuotes API.");
  }

  const data = await response.json();
  return data[0];
}
