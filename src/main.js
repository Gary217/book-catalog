// Import CSS as text. "?inline" stops Vite from making a separate CSS file.
import styles from "./styles/base.css?inline";
import { injectStyles } from "./utils/dom.js";
import { renderHeader } from "./components/header.js";
import { renderMain } from "./components/main/index.js";
import { renderResultsArea } from "./components/main/workspace/resultsArea.js";
import { initSearch } from "./components/main/searchBand.js";

injectStyles(styles);

renderHeader();
renderMain();
renderResultsArea();
initSearch();
