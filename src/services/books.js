import { getDefaultBooksInfo } from "../api/openLibrary.js";

export async function initBooksInfo() {
  console.log("Fetching books info...");

  try {
    const books = await getDefaultBooksInfo();
    console.log("Books fetched successfully:");
    console.log(books);

    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}
