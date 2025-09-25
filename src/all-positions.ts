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

function renderPositionCard(node: EndNode): string {
  const referencesHtml =
    node.references.length > 0
      ? `<div class="thinkers">
        <strong>Key Thinkers & Sources:</strong>
        <ul>
          ${node.references
            .map(
              (ref) =>
                `<li><span class="thinker-name">${ref.thinker}</span> — <em>${ref.work}</em></li>`,
            )
            .join('')}
        </ul>
      </div>`
      : '';

  return `
    <div class="position-card">
      <div class="verdict-badge" style="background-color: ${getVerdictColor(node.verdict)}">
        ${getVerdictLabel(node.verdict)}
      </div>
      <h2>${node.title}</h2>
      <p class="description">${node.desc}</p>
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

  function updateDisplay() {
    const displayNodes = selectedVerdict === 'all' ? endNodes : groupedNodes[selectedVerdict] || [];

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
  }

  updateDisplay();
}

// Initialize the page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderPage);
} else {
  renderPage();
}
