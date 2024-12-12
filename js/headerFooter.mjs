import { loadTemplate, renderWithTemplate } from './utils.js';

export async function loadHeaderFooter() {
  const headerpath = await loadTemplate('components/header.html');
  const footerpath = await loadTemplate('components/footer.html');
  const header = document.getElementById('main-header');
  const footer = document.getElementById('main-footer');

  if (header) {
    renderWithTemplate(() => headerpath, header);
  } else {
    console.error('Header element not found');
  }

  if (footer) {
    renderWithTemplate(() => footerpath, footer);
  } else {
    console.error('Footer element not found');
  }
}
