import { createElement } from "../../../utils/dom";
import { createResultsContainer } from "./resultsArea";
import { createFavoritesPanel } from "./favoritesPanel";

export function renderWorkspace() {
  const resultsArea = createResultsContainer();
  const favoritesPanel = createFavoritesPanel();

  return createElement("section", {
    className: "workspace",
    children: [resultsArea, favoritesPanel],
  });
}
