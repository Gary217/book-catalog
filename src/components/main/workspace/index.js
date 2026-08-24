import { createElement } from "../../../utils/dom";
import { createResultsContainer } from "./resultsArea";
import { renderFavoritesPanel } from "./favoritesPanel";
import { loadInitialBooks } from "../searchBand";

export function renderWorkspace() {
  const resultsArea = createResultsContainer();
  const favoritesPanel = renderFavoritesPanel();

  return createElement("section", {
    className: "workspace",
    children: [resultsArea, favoritesPanel],
  });
}

export function initWorkspaceLogic() {
  loadInitialBooks();
}
