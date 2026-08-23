import { createBookCard } from "./bookCard.js";
import { renderErrorState } from "../../../states/errorState.js";
import { renderLoadingState } from "../../../states/loadingState.js";
import { renderEmptyState } from "../../../states/emptyState.js";
import { createElement } from "../../../utils/dom";
import { getDefaultBooksInfo } from "../../../api/openLibrary.js";

// Create results container element used in workspace
export function createResultsContainer() {
  return createElement("div", {
    className: "results-area",
  });
}

export function renderBooks(books, resultsArea) {
  if (!books || books.length === 0) {
    renderEmptyState(resultsArea);
    return;
  }

  resultsArea.replaceChildren(...books.map((book) => createBookCard(book)));
}

export async function renderResultsArea() {
  const resultsArea = document.querySelector(".results-area");
  if (!resultsArea) {
    return console.error("'.results-area' element not found in HTML");
  }

  try {
    renderLoadingState(resultsArea);

    // Wait for books array from getDefaultBooksInfo()
    const books = await getDefaultBooksInfo();

    renderBooks(books, resultsArea);

    console.log("'.results-area' rendered successfully");
  } catch (error) {
    // Show error state
    console.error("Failed to render results area:", error);
    renderErrorState();
  }
}
