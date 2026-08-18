import { createElement } from "../../utils/dom";

export function renderWorkspace() {
  // --- RESULTS AREA section ---

  const booksGrid = createElement("div", {
    className: "books-grid",
    attributes: { id: "books-grid" },
  });

  const resultsArea = createElement("div", {
    className: "results-area",
    children: [booksGrid],
  });

  // --- FAVORITES PANEL section ---

  const favoritesIcon = createElement("span", {
    className: "favorites-icon",
    textContent: "♡",
  });

  const favoritesTitleH2 = createElement("h2", {
    attributes: { id: "favorites-title" },
    textContent: "Favorites",
  });

  const favoriteCountSpan = createElement("span", {
    attributes: { id: "favorite-count" },
    textContent: "0",
  });

  const favoriteCountText = document.createTextNode(" books saved");
  const favoriteSmall = createElement("small", {
    children: [favoriteCountSpan],
  });
  favoriteSmall.append(favoriteCountText);

  const titleTextContainer = createElement("div", {
    children: [favoritesTitleH2, favoriteSmall],
  });

  const favoritesTitleContainer = createElement("div", {
    className: "favorites-title",
    children: [favoritesIcon, titleTextContainer],
  });

  const panelHead = createElement("div", {
    className: "panel-head",
    children: [favoritesTitleContainer],
  });

  const favoritesList = createElement("div", {
    className: "favorites-list",
    attributes: { id: "favorites-list" },
  });

  const favoritesPanel = createElement("aside", {
    className: "favorites-panel",
    children: [panelHead, favoritesList],
  });

  // const workspaceSection =
  return createElement("section", {
    className: "workspace",
    children: [resultsArea, favoritesPanel],
  });
}
