import { createElement } from "../utils/dom.js";

export function renderEmptyState(container) {
  const emptyMessage = createElement("p", {
    className: "empty-message",
    textContent: "No books found.",
  });

  container.replaceChildren(emptyMessage);
}
