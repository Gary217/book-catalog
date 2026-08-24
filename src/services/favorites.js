const FAVORITES_KEY = "favorites";

// Get favorite books from localStorage
export function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);

  return favorites ? JSON.parse(favorites) : [];
}

// Save favorite books to localStorage
function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Create a book object for favorites
function createFavoriteBook(book) {
  return {
    key: book.key,
    title: book.title,
    author_name: book.author_name,
    cover_i: book.cover_i,
    first_publish_year: book.first_publish_year,
  };
}

// Add a book to favorites
export function addFavorite(book) {
  const favorites = getFavorites();

  const alreadyExists = favorites.some((favorite) => favorite.key === book.key);

  if (alreadyExists) {
    return favorites;
  }

  const updatedFavorites = [...favorites, createFavoriteBook(book)];

  saveFavorites(updatedFavorites);

  return updatedFavorites;
}

// Remove a book from favorites
export function removeFavorite(bookKey) {
  const favorites = getFavorites();

  const updatedFavorites = favorites.filter((book) => book.key !== bookKey);

  saveFavorites(updatedFavorites);

  return updatedFavorites;
}

// Check if a book is in favorites
export function isFavorite(bookKey) {
  return getFavorites().some((book) => book.key === bookKey);
}

// Add or remove a book from favorites
export function toggleFavorite(book) {
  if (isFavorite(book.key)) {
    return removeFavorite(book.key);
  }

  return addFavorite(book);
}
