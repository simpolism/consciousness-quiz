import { nodes } from './data/nodes';
import { EndNode, Verdict } from './types';
import './style.css';

// Extract all end nodes from the nodes map
const endNodes = Object.values(nodes).filter(
  (node): node is EndNode => node.kind === 'end'
);

// Group end nodes by verdict
const groupedNodes = endNodes.reduce((acc, node) => {
  if (!acc[node.verdict]) {
    acc[node.verdict] = [];
  }
  acc[node.verdict].push(node);
  return acc;
}, {} as Record<Verdict, EndNode[]>);

function getVerdictLabel(verdict: Verdict): string {
  switch (verdict) {
    case 'conscious': return 'Conscious';
    case 'not': return 'Not Conscious';
    case 'meta': return 'Meta-Position';
  }
}

function getVerdictColor(verdict: Verdict): string {
  switch (verdict) {
    case 'conscious': return '#10b981';
    case 'not': return '#ef4444';
    case 'meta': return '#6366f1';
  }
}

function renderPositionCard(node: EndNode): string {
  const thinkersHtml = node.thinkers.length > 0 
    ? `<div class="thinkers">
        <strong>Key Thinkers:</strong>
        <ul>
          ${node.thinkers.map(thinker => `<li>${thinker}</li>`).join('')}
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
      ${thinkersHtml}
    </div>
  `;
}

function renderPage(): void {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  
  let selectedVerdict: Verdict | 'all' = 'all';
  
  function updateDisplay() {
    const displayNodes = selectedVerdict === 'all' 
      ? endNodes 
      : groupedNodes[selectedVerdict] || [];

    app.innerHTML = `
      <div class="container">
        <h1>All Consciousness Positions</h1>
        
        <div class="nav-links">
          <a href="/">← Back to Quiz</a>
        </div>

        <div class="filter-section">
          <label for="verdict-filter">Filter by verdict: </label>
          <select id="verdict-filter" class="verdict-select">
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
    `;

    // Add event listener to the select element
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

// Add styles
const style = document.createElement('style');
style.textContent = `
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .nav-links {
    text-align: center;
    margin-bottom: 2rem;
  }

  .nav-links a {
    color: #6366f1;
    text-decoration: none;
    font-size: 1.1rem;
  }

  .nav-links a:hover {
    text-decoration: underline;
  }

  .filter-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  .filter-section label {
    margin-right: 0.5rem;
    font-weight: 600;
  }

  .verdict-select {
    padding: 0.5rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    background: white;
  }

  .verdict-select:hover {
    border-color: #9ca3af;
  }

  .positions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .position-card {
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1.5rem;
    position: relative;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .position-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .verdict-badge {
    position: absolute;
    top: -12px;
    right: 20px;
    color: white;
    padding: 0.25rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .position-card h2 {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: #1f2937;
    font-size: 1.5rem;
  }

  .description {
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .thinkers {
    border-top: 1px solid #e5e7eb;
    padding-top: 1rem;
    margin-top: 1rem;
  }

  .thinkers strong {
    color: #6b7280;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .thinkers ul {
    margin-top: 0.5rem;
    margin-bottom: 0;
    padding-left: 1.25rem;
  }

  .thinkers li {
    color: #6b7280;
    margin-top: 0.25rem;
  }

  @media (max-width: 768px) {
    .positions-grid {
      grid-template-columns: 1fr;
    }
    
    .container {
      padding: 1rem;
    }
  }
`;
document.head.appendChild(style);