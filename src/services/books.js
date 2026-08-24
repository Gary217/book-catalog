import { getBooksByQuery } from "../api/openLibrary.js";

export async function searchBooks(query) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new Error("Search query is empty");
  }

  return getBooksByQuery(trimmedQuery);
}
