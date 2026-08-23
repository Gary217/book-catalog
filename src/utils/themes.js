// Key for local storage
const THEME_KEY = "theme";

// Get saved theme or use light by default
export function getStoredTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);
  return storedTheme === "dark" ? "dark" : "light";
}

// Save theme and apply it to HTML
export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

export function toggleTheme() {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  return nextTheme;
}
