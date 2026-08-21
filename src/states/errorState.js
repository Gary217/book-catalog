import { createElement } from "../utils/dom.js";

export function renderErrorState(
  message = "Something went wrong while loading books.",
) {
  const resultsArea = document.querySelector(".results-area");
  if (!resultsArea) return;

  const errorContainer = createElement("div", {
    className: "error-container",
  });

  const errorText = createElement("p", {
    textContent: message,
  });

  const retryButton = createElement("button", {
    textContent: "Try Again",
    attributes: { type: "button" },
  });

  retryButton.addEventListener("click", () => {
    window.location.reload();
  });

  errorContainer.append(errorText, retryButton);
  
  // Replace the results-area with error container
  resultsArea.replaceWith(errorContainer);
}
