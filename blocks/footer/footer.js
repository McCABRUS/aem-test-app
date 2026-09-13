import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

export default async function decorate(block) {
  const footerMeta = getMetadata("footer");
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : "/footer";

  const fragment = await loadFragment(footerPath);

  block.textContent = "";

  const footer = document.createElement("div");

  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  const githubLink = footer.querySelector('a[href*="github.com"]');

  if (githubLink) {
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
  }

  block.append(footer);
}
