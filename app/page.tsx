/**
 * Home Page
 * ---
 * This page serves as the main landing page of the website.
 *
 * Features :
 * - Server-side rendering (async function).
 * - Fetches a quote for every day.
 */

import TodayDate from "@/components/TodayDate";
import { getDailyQuote } from "@/lib/getQuote";
import QuoteBox from "@/components/QuoteBox";
import Header from "@/components/Header";

export default async function Home() {
  const dailyQuote = await getDailyQuote();
  return (
    <div className="flex flex-col w-full">
      <Header />
      <TodayDate />
      <QuoteBox initialQuote={dailyQuote} />
    </div>
  );
}
