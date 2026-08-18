const searchUrl = new URL("../assets/icons/search.svg", import.meta.url).href;

export function renderMain() {
  const main = document.querySelector("main");
  if (!main) return console.error("Main element not found in HTML");

  main.innerHTML = `
    <section class="search-band">
      <div class="search-content">
        <h1>Discover Your Next Great Read</h1>
        <p class="subtitle">Search millions of books, build a compact favorites shelf, and keep it saved in this browser.</p>
        <form class="search-form" id="search-form">
          <label class="visually-hidden" for="search-input">Search books</label>
          <span class="search-icon">
            <img src=${searchUrl} alt="Search Icon"></img>
          </span>
          <input id="search-input" type="search" placeholder="Search for books by title or author..." autocomplete="off" />
          <button type="submit">Search</button>
        </form>
      </div>
    </section>

    <section class="workspace">
      <div class="results-area">
        <div class="books-grid" id="books-grid"></div>
      </div>

      <aside class="favorites-panel">
        <div class="panel-head">
          <div class="favorites-title">
            <span class="favorites-icon">♡</span>
            <div>
              <h2 id="favorites-title">Favorites</h2>
              <small><span id="favorite-count">0</span> books saved</small>
            </div>
          </div>
        </div>
        <div class="favorites-list" id="favorites-list"></div>
      </aside>
    </section>
  `;

  console.log("Main rendered successfully");
}
