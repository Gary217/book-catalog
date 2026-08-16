// Import CSS as text. "?inline" stops Vite from making a separate CSS file
import styles from "./styles/base.css?inline";
import { injectStyles } from "./utils/dom.js";
injectStyles(styles);

const heartUrl = new URL("./assets/icons/heart.svg", import.meta.url).href;

const img = document.createElement("img");
img.src = heartUrl;
document.body.appendChild(img);

console.log("test");
