// Utility to scroll to a section by title text or id
export function normalizeText(text: string) {
  return text
    .toString()
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

export function slugify(text: string) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Scroll to a page section that matches the provided title.
 * Strategy:
 * 1. Try element with id matching slugified title.
 * 2. Try headings (h1..h4) whose text includes the title (normalized).
 * 3. Try any element with data-title attribute matching the normalized title.
 * If nothing found, returns false.
 */
export function goToTitle(title: string): boolean {
  if (!title) return false;

  const slug = slugify(title);
  // 1. try id
  const byId = document.getElementById(slug);
  if (byId) {
    byId.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }

  // 2. try headings
  const normalized = normalizeText(title);
  const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4')) as HTMLElement[];
  const match = headings.find(h => normalizeText(h.innerText).includes(normalized) || normalizeText(h.innerText) === normalized);
  if (match) {
    match.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }

  // 3. try data-title
  const dataMatch = Array.from(document.querySelectorAll('[data-title]')) as HTMLElement[];
  const dataEl = dataMatch.find(el => normalizeText(el.getAttribute('data-title') || '').includes(normalized));
  if (dataEl) {
    dataEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }

  // not found
  return false;
}

export default goToTitle;

/**
 * Scroll to the top of the page smoothly.
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
