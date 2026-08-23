import { createElement } from "../../../utils/dom";
import { createResultsContainer, renderResultsArea } from "./resultsArea";
import { renderFavoritesPanel } from "./favoritesPanel";

export function renderWorkspace() {
  const resultsArea = createResultsContainer();
  const favoritesPanel = renderFavoritesPanel();

  return createElement("section", {
    className: "workspace",
    children: [resultsArea, favoritesPanel],
  });
}

export function initWorkspaceLogic() {
  renderResultsArea();
}
