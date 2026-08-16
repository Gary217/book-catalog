// Inject styles into the HTML document head
export function injectStyles(cssString) {
  const style = document.createElement("style");
  style.textContent = cssString;
  document.head.appendChild(style);
}
