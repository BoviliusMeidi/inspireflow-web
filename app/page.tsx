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
import Footer from "@/components/Footer";

export default async function Home() {
  const dailyQuote = await getDailyQuote();
  return (
    <div className="flex flex-col w-full h-screen relative">
      <Header />
      <div className="absolute top-1/2 -translate-y-1/2">
        <TodayDate />
        <QuoteBox initialQuote={dailyQuote} />
      </div>
      <Footer />
    </div>
  );
}
