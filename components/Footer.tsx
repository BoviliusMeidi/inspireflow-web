/**
 * Footer Component
 * ---
 * A simple footer component that displays attribution text and API limit information.
 *
 * It is absolutely positioned to the bottom right of its nearest relative parent container.
 *
 * It provides:
 * - A "powered by" link to ZenQuotes.io.
 * - A text note indicating the API request limit.
 */

export default function Footer() {
  return (
    <div className="absolute bottom-5 right-5 text-right">
      <p className="text-sm text-gray-700">
        Quotes powered by{" "}
        <a
          href="https://zenquotes.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline"
        >
          ZenQuotes.io
        </a>
      </p>
      <p className="text-xs text-gray-600">(API Limit: 5 requests/30s)</p>
    </div>
  );
}
