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

export async function renderResultsArea() {
  const resultsArea = document.querySelector(".results-area");
  if (!resultsArea) {
    return console.error("'.results-area' element not found in HTML");
  }

  try {
    renderLoadingState(resultsArea);

    // Wait for books array from getDefaultBooksInfo()
    const books = await getDefaultBooksInfo();

    if (!books || books.length === 0) {
      renderEmptyState(resultsArea);
      return;
    }

    // Clear container before adding new cards
    resultsArea.replaceChildren();

    // Loop through each book of array
    books.forEach((book) => {
      resultsArea.append(createBookCard(book));
    });

    console.log("'.results-area' rendered successfully");
  } catch (error) {
    // Show error state
    console.error("Failed to render results area:", error);
    renderErrorState();
  }
}
