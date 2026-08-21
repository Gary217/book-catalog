const BASE_URL = "https://openlibrary.org";

// Get the first 10 books
export async function getDefaultBooksInfo() {
  const url = `${BASE_URL}/search.json?q=programming&limit=10`;

  try {
    const response = await fetch(url);

    // If the server returns a bad status (like 404 or 500)
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json(); // JSON -> JS

    // If the list of books is empty or does not exist
    if (!data.docs || data.docs.length === 0) {
      throw new Error("No books found");
    }

    return data.docs;
  } catch (error) {
    // Code jumps here if:
    // 1. No internet connection
    // 2. Server returned an error status
    // 3. No books were found in the data

    console.error("Error inside getDefaultBooksInfo:", error.message);

    // Send the error to main.js to show it on the screen
    throw error;
  }
}

// Get the book cover image URL by its ID
export function getBookCoverUrl(coverId) {
  return !coverId ? null : `https://covers.openlibrary.org/b/id/${coverId}.jpg`;
}
