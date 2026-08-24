import { getBookCoverUrl } from "../../../api/openLibrary";
import { createElement } from "../../../utils/dom";

export function createFavoriteCard(book, onRemoveClick) {
  const {
    title,
    cover_i: coverId,
    author_name: authors,
    first_publish_year: year,
  } = book;

  const authorText = authors?.join(", ") || "Unknown author";
  const yearText = year || "Unknown year";
  const coverUrl = getBookCoverUrl(coverId);

  const cover = coverUrl
    ? createElement("img", {
        className: "favorite-cover",
        attributes: {
          src: coverUrl,
          alt: `Cover of ${title}`,
        },
      })
    : createElement("div", {
        className: "cover-fallback",
        textContent: "No cover",
      });

  const removeButton = createElement("button", {
    className: "icon-button remove-button",
    textContent: "♥",
    attributes: {
      type: "button",
      "aria-label": "Remove from favorites",
    },
  });

  removeButton.addEventListener("click", () => {
    onRemoveClick(book.key);
  });

  const info = createElement("div", {
    className: "favorite-info",
    children: [
      createElement("h3", {
        textContent: title,
      }),
      createElement("p", {
        textContent: authorText,
      }),
      createElement("p", {
        textContent: yearText,
      }),
    ],
  });

  return createElement("article", {
    className: "favorite-item",
    children: [cover, info, removeButton],
  });
}
