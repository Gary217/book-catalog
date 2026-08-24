// Inject styles into the HTML document head.
export function injectStyles(cssString) {
  const style = document.createElement("style");
  style.textContent = cssString;
  document.head.appendChild(style);
}

// Helper to create DOM elements with options.
export function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  // 1. Add CSS class if provided
  if (options.className) {
    element.className = options.className;
  }

  // 2. Add text content if provided
  if (options.textContent) {
    element.textContent = options.textContent;
  }

  // 3. Add any extra attributes (src, href, alt, type, etc.)
  if (options.attributes) {
    // Convert attributes object into a list of pairs and loop through them.
    Object.entries(options.attributes).forEach(([key, value]) => {
      // Check if the attribute value actually exists.
      if (value !== undefined) {
        // Add the attribute (like src="url") to the HTML element.
        element.setAttribute(key, value);
      }
    });
  }

  // 4. Check if there are child elements to add.
  if (options.children && Array.isArray(options.children)) {
    // Loop through children and safely append them.
    options.children.forEach((child) => {
      // Check if the child is a real HTML element.
      if (child instanceof HTMLElement) {
        element.append(child);
      }
    });
  }

  return element;
}
