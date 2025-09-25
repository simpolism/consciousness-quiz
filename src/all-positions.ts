import { nodes } from './data/nodes';
import { EndNode, Verdict } from './types';
import './style.css';

// Extract all end nodes from the nodes map
const endNodes = Object.values(nodes).filter((node): node is EndNode => node.kind === 'end');

// Group end nodes by verdict
const groupedNodes = endNodes.reduce(
  (acc, node) => {
    if (!acc[node.verdict]) {
      acc[node.verdict] = [];
    }
    acc[node.verdict].push(node);
    return acc;
  },
  {} as Record<Verdict, EndNode[]>,
);

function getVerdictLabel(verdict: Verdict): string {
  switch (verdict) {
    case 'conscious':
      return 'Conscious';
    case 'not':
      return 'Not Conscious';
    case 'meta':
      return 'Meta-Position';
  }
}

function getVerdictColor(verdict: Verdict): string {
  switch (verdict) {
    case 'conscious':
      return '#10b981';
    case 'not':
      return '#ef4444';
    case 'meta':
      return '#6366f1';
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderPositionCard(node: EndNode): string {
  const referencesHtml =
    node.references.length > 0
      ? `<div class="thinkers">
        <strong>Key Thinkers & Sources:</strong>
        <ul>
          ${node.references
            .map(
              (ref) =>
                `<li><span class="thinker-name">${escapeHtml(ref.thinker)}</span> — <em>${escapeHtml(ref.work)}</em></li>`,
            )
            .join('')}
        </ul>
      </div>`
      : '';
  const detailHtml = node.detail
    ? `<details class="position-detail"><summary>More about this position</summary><p>${escapeHtml(node.detail)}</p></details>`
    : '';

  return `
    <div class="position-card">
      <div class="verdict-badge" style="background-color: ${getVerdictColor(node.verdict)}">
        ${getVerdictLabel(node.verdict)}
      </div>
      <h2>${escapeHtml(node.title)}</h2>
      <p class="description">${escapeHtml(node.desc)}</p>
      ${detailHtml}
      ${referencesHtml}
    </div>
  `;
}

function renderPage(): void {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    throw new Error('App root element not found');
  }

  let selectedVerdict: Verdict | 'all' = 'all';
  let searchTerm = '';

  function updateDisplay() {
    const activeElement = document.activeElement as HTMLElement | null;
    const wasSearchFocused =
      activeElement instanceof HTMLInputElement && activeElement.id === 'positions-search-input';
    const selectionStart = wasSearchFocused ? activeElement.selectionStart ?? activeElement.value.length : null;
    const selectionEnd = wasSearchFocused ? activeElement.selectionEnd ?? activeElement.value.length : null;

    const filteredByVerdict = selectedVerdict === 'all' ? endNodes : groupedNodes[selectedVerdict] || [];
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const displayNodes = normalizedSearch
      ? filteredByVerdict.filter((node) => {
          const haystack = [node.title, node.desc, node.detail ?? '', ...node.references.map((ref) => `${ref.thinker} ${ref.work}`)]
            .join(' ')
            .toLowerCase();
          return haystack.includes(normalizedSearch);
        })
      : filteredByVerdict;

    app.innerHTML = `
      <div class="positions-layout">
        <h1 class="positions-title">All Consciousness Positions</h1>

        <div class="positions-nav">
          <a href="/" class="positions-link">← Back to Quiz</a>
        </div>

        <div class="positions-filter">
          <label for="verdict-filter" class="positions-filter-label">Filter by verdict:</label>
          <select id="verdict-filter" class="positions-select">
            <option value="all" ${selectedVerdict === 'all' ? 'selected' : ''}>
              All Positions (${endNodes.length})
            </option>
            <option value="conscious" ${selectedVerdict === 'conscious' ? 'selected' : ''}>
              Conscious (${groupedNodes.conscious?.length || 0})
            </option>
            <option value="not" ${selectedVerdict === 'not' ? 'selected' : ''}>
              Not Conscious (${groupedNodes.not?.length || 0})
            </option>
            <option value="meta" ${selectedVerdict === 'meta' ? 'selected' : ''}>
              Meta-Position (${groupedNodes.meta?.length || 0})
            </option>
          </select>
        </div>

        <div class="positions-search">
          <label for="positions-search-input">Search positions</label>
          <input
            type="search"
            id="positions-search-input"
            placeholder="Search by title, thinker, or keyword"
            value="${escapeHtml(searchTerm)}"
          />
        </div>

        <div class="positions-grid">
          ${displayNodes.map(renderPositionCard).join('')}
        </div>
      </div>
      <footer class="site-footer site-footer--light">
        <a href="https://github.com/your-org/consciousness-quiz" target="_blank" rel="noopener">
          View on GitHub →
        </a>
      </footer>
    `;

    const selectElement = document.getElementById('verdict-filter') as HTMLSelectElement;
    selectElement?.addEventListener('change', (e) => {
      selectedVerdict = (e.target as HTMLSelectElement).value as Verdict | 'all';
      updateDisplay();
    });

    const searchInput = document.getElementById('positions-search-input') as HTMLInputElement;
    searchInput?.addEventListener('input', (event) => {
      searchTerm = (event.target as HTMLInputElement).value;
      updateDisplay();
    });

    if (searchInput && wasSearchFocused) {
      searchInput.focus({ preventScroll: true });
      const start = selectionStart ?? searchInput.value.length;
      const end = selectionEnd ?? searchInput.value.length;
      try {
        searchInput.setSelectionRange(start, end);
      } catch {
        // setSelectionRange can fail on some inputs; ignore and keep focus
      }
    }
  }

  updateDisplay();
}

// Initialize the page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderPage);
} else {
  renderPage();
}
