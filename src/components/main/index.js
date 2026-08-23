import { initSearchLogic, renderSearchBand } from "./searchBand";
import { initWorkspaceLogic, renderWorkspace } from "./workspace";

export function renderMain() {
  const main = document.querySelector("main");
  if (!main) return console.error("Main element not found in HTML");

  // 1. Create all UI elements
  const searchBandSection = renderSearchBand();
  const workspaceSection = renderWorkspace();

  // 2. Add them to the DOM
  // Clear previous content and safely insert new elements
  // faster than main.innerHTML = "" & main.append(searchBandSection, workspaceSection)
  main.replaceChildren(searchBandSection, workspaceSection);

  // 3. Initialize logic that needs DOM elements
  initSearchLogic();
  initWorkspaceLogic();

  console.log("Main rendered successfully");
}
