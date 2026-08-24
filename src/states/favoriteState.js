import { createElement } from "../utils/dom.js";

// Update favorite count in the header
export function updateFavoriteCount(count) {
  const favoriteCountSpan = document.getElementById("favorite-count");
  if (favoriteCountSpan) {
    favoriteCountSpan.textContent = count;
  }
}

// Show empty state when no favorites
export function renderEmptyFavorites() {
  const favoritesList = document.getElementById("favorites-list");
  if (!favoritesList) return;

  const emptyFavorites = createElement("div", {
    className: "empty-favorites",
    textContent: "Saved books will appear here.",
  });

  favoritesList.replaceChildren(emptyFavorites);
}
