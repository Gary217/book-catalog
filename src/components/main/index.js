import { renderSearchBand } from "./searchBand";
import { renderWorkspace } from "./workspace";

export function renderMain() {
  const main = document.querySelector("main");
  if (!main) return console.error("Main element not found in HTML");

  const searchBandSection = renderSearchBand();
  const workspaceSection = renderWorkspace();

  // Clear previous content and safely insert new elements
  // faster than main.innerHTML = "" & main.append(searchBandSection, workspaceSection)
  main.replaceChildren(searchBandSection, workspaceSection);

  console.log("Main rendered successfully");
}
