import { searchBooks } from "../../services/books";
import { renderEmptyState } from "../../states/emptyState";
import { renderErrorState } from "../../states/errorState";
import { renderLoadingState } from "../../states/loadingState";
import { createElement } from "../../utils/dom";
import { createBookCard } from "./workspace/bookCard";

const searchUrl = new URL("../../assets/icons/search.svg", import.meta.url)
  .href;

// Create HTML:
export function renderSearchBand() {
  const searchTitle = createElement("h1", {
    textContent: "Discover Your Next Great Read",
  });

  const searchSubtitle = createElement("p", {
    className: "subtitle",
    textContent:
      "Search millions of books, build a compact favorites shelf, and keep it saved in this browser.",
  });

  const labelHidden = createElement("label", {
    className: "visually-hidden",
    textContent: "Search books",
    attributes: { for: "search-input" },
  });

  const searchIconImg = createElement("img", {
    attributes: { src: searchUrl, alt: "Search Icon" },
  });

  const searchIconSpan = createElement("span", {
    className: "search-icon",
    children: [searchIconImg],
  });

  const searchInput = createElement("input", {
    attributes: {
      id: "search-input",
      type: "search",
      placeholder: "Search for books by title or author...",
      autocomplete: "off",
    },
  });

  const searchButton = createElement("button", {
    textContent: "Search",
    attributes: { type: "submit" },
  });

  const searchForm = createElement("form", {
    className: "search-form",
    attributes: { id: "search-form" },
    children: [labelHidden, searchIconSpan, searchInput, searchButton],
  });

  const searchContent = createElement("div", {
    className: "search-content",
    children: [searchTitle, searchSubtitle, searchForm],
  });

  // const searchBandSection =
  return createElement("section", {
    className: "search-band",
    children: [searchContent],
  });
}

// Search logic:
export function initSearch() {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const resultsArea = document.querySelector(".results-area");

  // Check that all required elements exist in DOM
  if (!searchForm || !searchInput || !resultsArea) {
    return console.error("Search components not found in DOM");
  }

  searchForm.addEventListener("submit", async (event) => {
    // Prevent default button behavior
    event.preventDefault();

    const query = searchInput.value.trim();

    // Return early if query is empty
    if (!query) return;

    try {
      // Show loading state
      renderLoadingState(resultsArea);

      // Fetch books from API
      const books = await searchBooks(query);

      // Render books or show empty state
      if (books.length === 0) {
        renderEmptyState(resultsArea);
      } else {
        resultsArea.replaceChildren();
        books.forEach((book) => {
          resultsArea.append(createBookCard(book));
        });
      }

      console.log(`Search for "${query}" rendered successfully`);
    } catch (error) {
      console.error("Search failed:", error);
      renderErrorState(error.message);
    }
  });
}
