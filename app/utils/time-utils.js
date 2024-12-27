import { formatDistanceToNow } from "date-fns";

/**
 * Formats a date to a human-readable relative time string.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted relative time.
 */
export const formatRelativeTime = (date) => {
    const distance = formatDistanceToNow(date, { addSuffix: false });
    return distance
        .replace("less than a minute", "now")
        .replace(" minute", "m")
        .replace(" minutes", "m")
        .replace(" hour", "h")
        .replace(" hours", "h")
        .replace(" day", "d")
        .replace(" days", "d");
};
