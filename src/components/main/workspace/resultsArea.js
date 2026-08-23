import { createBookCard } from "./bookCard.js";
import { renderErrorState } from "../../../states/errorState.js";
import { renderLoadingState } from "../../../states/loadingState.js";
import { renderEmptyState } from "../../../states/emptyState.js";
import { createElement } from "../../../utils/dom";
import { getDefaultBooksInfo } from "../../../api/openLibrary.js";
import {
  removeFavorite,
  getFavorites,
  isFavorite,
  toggleFavorite,
} from "../../../services/favorites.js";
import {
  updateFavoriteCount,
  renderEmptyFavorites,
} from "../../../states/favoriteState.js";
import { createFavoriteCard } from "./favoriteCard.js";

// Create results container element used in workspace
export function createResultsContainer() {
  return createElement("div", {
    className: "results-area",
  });
}

function updateResultCardFavoriteState(bookKey, isFavorited) {
  const resultsArea = document.querySelector(".results-area");
  if (!resultsArea) return;

  const card = resultsArea.querySelector(`[data-book-key="${bookKey}"]`);
  if (!card) return;
  const button = card.querySelector(".favorite-button");
  if (!button) return;
  button.textContent = isFavorited ? "♥" : "♡";
  button.classList.toggle("is-favorited", isFavorited);
}

function handleToggleFavorite(book) {
  const favorites = toggleFavorite(book);

  // Update favorites panel
  renderFavorites(favorites);

  // Update the button state in results area
  const isFavorited = favorites.some((favorite) => favorite.key === book.key);
  updateResultCardFavoriteState(book.key, isFavorited);

  return favorites;
}

function renderFavorites(favorites) {
  // Update count
  updateFavoriteCount(favorites.length);

  const favoritesList = document.getElementById("favorites-list");
  if (!favoritesList) return;

  if (!favorites || favorites.length === 0) {
    renderEmptyFavorites();
    return;
  }

  // For each favorite, create a book card with a handler to remove it
  favoritesList.replaceChildren(
    ...favorites.map((book) =>
      createFavoriteCard(book, (bookKey) => {
        const updatedFavorites = removeFavorite(bookKey);

        renderFavorites(updatedFavorites);
        // also update any result card button
        updateResultCardFavoriteState(bookKey, false);
      }),
    ),
  );
}

export function renderBooks(books, resultsArea) {
  if (!books || books.length === 0) {
    renderEmptyState(resultsArea);
    return;
  }

  resultsArea.replaceChildren(
    ...books.map((book) =>
      createBookCard(book, handleToggleFavorite, isFavorite(book.key)),
    ),
  );

  // Ensure favorites panel reflects current saved favorites
  renderFavorites(getFavorites());
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
