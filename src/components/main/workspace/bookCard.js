import { getBookCoverUrl } from "../../../api/openLibrary.js";
import { createElement } from "../../../utils/dom.js";

export function createBookCard(book, onFavoriteClick, isFavorited = false) {
  // Destructure book properties
  const {
    title,
    cover_i: coverId,
    author_name: author,
    first_publish_year: year,
    key,
  } = book;

  // Prepare display text
  const authorText = author?.join(", ") || "Unknown author";
  const yearText = year || "Unknown year";

  const coverUrl = getBookCoverUrl(coverId);

  // Create DOM elements for book card:
  const bookYear = createElement("p", {
    className: "book-year",
    textContent: yearText,
  });

  const bookAuthor = createElement("p", {
    className: "book-author",
    textContent: authorText,
  });

  const bookTitle = createElement("h3", {
    textContent: title,
  });

  const favoriteButton = createElement("button", {
    className: `icon-button favorite-button ${isFavorited ? "is-favorited" : ""}`,
    textContent: isFavorited ? "♥" : "♡",
    attributes: { type: "button" },
  });

  // Attach click listener after element creation (createElement doesn't map function attributes)
  if (typeof onFavoriteClick === "function") {
    favoriteButton.addEventListener("click", () => onFavoriteClick(book));
  }

  const bookCover = coverUrl
    ? // Create img element if cover exists
      createElement("img", {
        className: "book-cover",
        attributes: { src: coverUrl, alt: "Book Cover Image" },
      })
    : // Create fallback placeholder if no cover
      createElement("div", {
        className: "cover-fallback",
        textContent: "No cover",
      });

  // const bookCard =
  return createElement("article", {
    className: "book-card",
    attributes: {
      "data-book-key": key,
    },
    children: [bookCover, favoriteButton, bookTitle, bookAuthor, bookYear],
  });
}
