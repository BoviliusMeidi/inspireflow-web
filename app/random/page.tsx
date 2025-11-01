/**
 * Random Quote Page
 * ---
 * This page displays a random motivational or inspirational quote.
 * It fetches the data from the `getRandomQuote()` function and
 * renders it inside a `QuoteBox` component.
 *
 * Features:
 * - Server-side rendering (async component).
 * - Centered layout for better focus on the quote.
 */

import { getRandomQuote } from "@/lib/getQuote";
import QuoteBox from "@/components/QuoteBox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function RandomQuotePage() {
  const randomQuote = await getRandomQuote();
  return (
    <div className="flex flex-col w-full h-screen relative">
      <Header />
      <div className="absolute top-1/2 -translate-y-1/2">
        <QuoteBox initialQuote={randomQuote} showButton />
      </div>
      <Footer />
    </div>
  );
}
