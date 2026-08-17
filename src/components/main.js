export function renderMain() {
  const main = document.querySelector("main");
  if (!main) return console.error("Main element not found in HTML");

  main.innerHTML = `
    <div>Блок Main</div>
  `;

  console.log("Main rendered successfully");
}
