import { createElement } from "../utils/dom.js";

export function renderLoadingState(container) {
  const loading = createElement("p", {
    className: "loading",
    textContent: "Loading books...",
  });

  container.replaceChildren(loading);
}
