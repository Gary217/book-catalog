import { createElement } from "../utils/dom.js";

// Update favorite count in the header
export function updateFavoriteCount(count) {
  const favoriteCountSpan = document.querySelector("#favorite-count");
  if (favoriteCountSpan) {
    favoriteCountSpan.textContent = count;
  }
}

// Show empty state when no favorites
export function renderEmptyFavorites() {
  const favoritesList = document.querySelector("#favorites-list");
  if (!favoritesList) return;

  const emptyFavorites = createElement("div", {
    className: "empty-favorites",
    textContent: "Saved books will appear here.",
  });

  favoritesList.replaceChildren(emptyFavorites);
}

// Clear favorites list and add book card
export function addFavoriteCard(bookCard) {
  const favoritesList = document.querySelector("#favorites-list");
  if (!favoritesList) return;

  // Remove empty state if it exists
  const emptyState = favoritesList.querySelector(".empty-favorites");
  if (emptyState) {
    emptyState.remove();
  }

  favoritesList.append(bookCard);
}

// Clear all favorites
export function clearFavoritesList() {
  const favoritesList = document.querySelector("#favorites-list");
  if (favoritesList) {
    favoritesList.replaceChildren();
  }
  renderEmptyFavorites();
}
