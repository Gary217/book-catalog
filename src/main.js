// Import CSS as text. "?inline" stops Vite from making a separate CSS file.
import styles from "./styles/base.css?inline";
import { injectStyles } from "./utils/dom.js";
import { renderHeader } from "./components/header.js";
import { renderMain } from "./components/main.js";

injectStyles(styles);

renderHeader();
renderMain();

/* const heartUrl = new URL("./assets/icons/heart.svg", import.meta.url).href;

const img = document.createElement("img");
img.src = heartUrl;
document.body.appendChild(img); */
