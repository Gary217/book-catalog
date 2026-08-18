import { createElement } from "../utils/dom";

// Get icon URLs using Vite path helper.
const bookOpenUrl = new URL("../assets/icons/book-open.svg", import.meta.url)
  .href;
const sunMoonUrl = new URL("../assets/icons/sun-moon.svg", import.meta.url)
  .href;

export function renderHeader() {
  const header = document.querySelector("header");
  if (!header) return console.error("Header element not found in HTML");

  // 1. Create the title
  const titleStrong = createElement("strong", {
    textContent: "The Library",
  });

  // 2. Create the subtitle
  const subtitleSmall = createElement("small", {
    textContent: "Discover and save books",
  });

  // 3. Create the text container and put text elements inside.
  const brandText = createElement("span", {
    className: "brand-text",
    children: [titleStrong, subtitleSmall],
  });

  // 4. Create the logo image.
  const brandImg = createElement("img", {
    className: "brand-mark",
    attributes: { src: bookOpenUrl, alt: "Library Logo" },
  });

  // 5. Create the link logo (<a>) and put image + text container inside.
  const brandLink = createElement("a", {
    className: "brand",
    attributes: { href: "/" },
    children: [brandImg, brandText],
  });

  // 6. Create the theme icon
  const themeImg = createElement("img", {
    className: "theme-icon",
    attributes: { src: sunMoonUrl, alt: "Theme Logo" },
  });

  // 7. Create the theme button and put the icon inside.
  const themeBtn = createElement("button", {
    className: "theme-toggle",
    attributes: { type: "button" },
    children: [themeImg],
  });

  // 8. Clear previous content and safely insert new elements
  // faster than header.innerHTML = "" & header.append(brandLink, themeBtn)
  header.replaceChildren(brandLink, themeBtn);

  console.log("Header rendered successfully");
}
