import { getDefaultBooksInfo } from "../../api/openLibrary";
import { searchBooks } from "../../services/books";
import { renderErrorState } from "../../states/errorState";
import { renderLoadingState } from "../../states/loadingState";
import { debounce } from "../../utils/debounce";
import { createElement } from "../../utils/dom";
import { renderBooks } from "./workspace/resultsArea";

const searchUrl = new URL("../../assets/icons/search.svg", import.meta.url)
  .href;

let currentSearchId = 0;

// Store books from the current search
let currentBooks = [];

// 1. Create HTML:
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
      placeholder: "Search for books...",
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
    children: [searchTitle, searchSubtitle, searchForm, authorFilterContainer],
  });

  // const searchBandSection =
  return createElement("section", {
    className: "search-band",
    children: [searchContent],
  });
}

// Run a search and render the result
async function executeSearch(query, resultsArea) {
  const searchId = ++currentSearchId;
  const trimmedQuery = query.trim();

  // Wait for at least 2 characters
  if (trimmedQuery && trimmedQuery.length <= 2) {
    return;
  }

  try {
    // Show loading state
    renderLoadingState(resultsArea);

    // Search books or Load default books for an empty query
    const books = trimmedQuery
      ? await searchBooks(query)
      : await getDefaultBooksInfo();

    // Ignore the response if a newer search has started.
    if (searchId !== currentSearchId) {
      return;
    }

    // Save current books for author filtering
    currentBooks = books;

    // Update the author list
    updateAuthorFilter(books);

    renderBooks(books, resultsArea);
    console.log(`Search for "${query}" rendered successfully`);
  } catch (error) {
    // Ignore errors from old searches
    if (searchId !== currentSearchId) {
      return;
    }

    console.error("Search failed:", error);
    renderErrorState(error.message);
  }
}

// 2. Initialize search logic after rendering HTML
export function initSearchLogic() {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const resultsArea = document.querySelector(".results-area");
  const authorFilter = document.getElementById("author-filter");

  // Check that all required elements exist in DOM
  if (!searchForm || !searchInput || !resultsArea || !authorFilter) {
    return console.error("Search components not found in DOM");
  }

  // Filter books when the selected author changes
  authorFilter.addEventListener("change", (event) => {
    const selectedAuthor = event.target.value;

    // Show books only by the selected author
    const filteredBooks = selectedAuthor
      ? currentBooks.filter((book) =>
          book.author_name?.includes(selectedAuthor),
        )
      : currentBooks;

    renderBooks(filteredBooks, resultsArea);
  });

  // Scenario A: Search on form submit
  searchForm.addEventListener("submit", (event) => {
    // Prevent default button behavior
    event.preventDefault();

    if (!searchInput.value.trim()) {
      return alert("Please enter a search term!");
    }

    executeSearch(searchInput.value, resultsArea);
  });

  // Scenario B: Search while typing
  const debouncedSearch = debounce((query) => {
    executeSearch(query, resultsArea);
  }, 500);

  searchInput.addEventListener("input", (event) => {
    debouncedSearch(event.target.value);
  });
}

// Create label for the author filter
const authorFilterLabel = createElement("label", {
  textContent: "Filter by author:",
  attributes: {
    for: "author-filter",
  },
});

// Create author filter
const authorFilter = createElement("select", {
  attributes: {
    id: "author-filter",
    name: "author",
  },
  children: [
    createElement("option", {
      textContent: "All authors",
      attributes: {
        value: "",
      },
    }),
  ],
});

// Create author filter container
const authorFilterContainer = createElement("div", {
  className: "author-filter",
  children: [authorFilterLabel, authorFilter],
});

// Update the list of authors
function updateAuthorFilter(books) {
  const authorFilter = document.getElementById("author-filter");

  if (!authorFilter) return;

  // Get unique authors and sort them
  const authors = [
    ...new Set(books.flatMap((book) => book.author_name || [])),
  ].sort();

  // Add authors to the filter
  authorFilter.replaceChildren(
    createElement("option", {
      textContent: "All authors",
      attributes: {
        value: "",
      },
    }),
    ...authors.map((author) =>
      createElement("option", {
        textContent: author,
        attributes: {
          value: author,
        },
      }),
    ),
  );
}

// Load default books when the app starts
export async function loadInitialBooks() {
  const resultsArea = document.querySelector(".results-area");

  if (!resultsArea) {
    return console.error("Results area not found in DOM");
  }

  await executeSearch("", resultsArea);
}
