import { createElement } from "../../utils/dom";

const searchUrl = new URL("../../assets/icons/search.svg", import.meta.url)
  .href;

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
