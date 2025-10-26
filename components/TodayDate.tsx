"use client";

/**
 * TodayDate Component
 * ---
 * Displays the current date in a human-readable format (e.g., "Saturday, October 25, 2025").
 *
 * - Client Component - Uses JavaScript Date API (runs on client side).
 * - Automatically updates based on the user's local timezone.
 * - Styled with Tailwind for responsive and elegant typography.
 */
export default function TodayDate() {
  // Create a new Date instance representing the current time/date.
  const today = new Date();

  /**
   * Format the date
   * ---
   * Converts the Date object into a readable string, such as:
   * "Saturday, October 25, 2025"
   *
   * - `weekday` : full day name (e.g., "Saturday")
   * - `month` : full month name (e.g., "October")
   * - `day` : numeric day (e.g., 25)
   * - `year` : full year (e.g., 2025)
   */
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="font-cinzel text-md sm:text-2xl md:text-3xl text-right px-4 sm:px-8 md:px-16 lg:px-36 text-gray-700 mt-4 tracking-wide ">
      {formattedDate}
    </div>
  );
}
