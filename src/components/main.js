import { createElement } from "../utils/dom";

const searchUrl = new URL("../assets/icons/search.svg", import.meta.url).href;

export function renderMain() {
  const main = document.querySelector("main");
  if (!main) return console.error("Main element not found in HTML");

  // --- SEARCH BAND section ---

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

  const searchBandSection = createElement("section", {
    className: "search-band",
    children: [searchContent],
  });

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

  const workspaceSection = createElement("section", {
    className: "workspace",
    children: [resultsArea, favoritesPanel],
  });

  // Clear previous content and safely insert new elements
  // faster than main.innerHTML = "" & main.append(searchBandSection, workspaceSection)
  main.replaceChildren(searchBandSection, workspaceSection);

  console.log("Main rendered successfully");
}
