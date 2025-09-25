import { nodes, startId, getNode } from './data/nodes';
import type { Node, NodeId } from './types';

interface QuizState {
  current: NodeId;
  history: NodeId[];
}

interface QuizElements {
  question: HTMLElement;
  yesBtn: HTMLButtonElement;
  noBtn: HTMLButtonElement;
  backBtn: HTMLButtonElement;
  restartBtn: HTMLButtonElement;
  path: HTMLElement;
  result: HTMLElement;
}

const trimText = (text: string, max = 48): string =>
  text.length > max ? `${text.slice(0, max - 3)}…` : text;

const template = `
  <header>
    <h1>Consciousness 20Q — Master Quiz</h1>
    <p>Answer Yes/No to navigate the landscape of consciousness theories. Finish to discover your end state (theory + thinkers).</p>
    <div class="header-links">
      <a href="/all-positions.html">View All Positions →</a>
    </div>
  </header>

  <div class="container">
    <div class="legend-bar" id="legend">
      <div class="legend-row">
        <span class="legend-label">Legend:</span>
        <div class="legend-pills">
          <span class="pill">✅ Conscious</span>
          <span class="pill">❌ Not Conscious</span>
          <span class="pill">🤯 Humans not conscious (meta-skeptic)</span>
        </div>
      </div>
      <div class="legend-note small">This quiz is a pedagogical map, not medical or legal advice. It condenses viewpoints from philosophy, cognitive science, and neuroscience.</div>
    </div>

    <div class="card" id="quiz">
      <div id="path" class="path" aria-live="polite"></div>
      <div id="question" class="question"></div>
      <div class="controls">
        <button class="yes" id="yesBtn">Yes</button>
        <button class="no" id="noBtn">No</button>
        <button class="aux" id="backBtn" title="Go back one step">← Back</button>
        <button class="aux" id="restartBtn" title="Restart the quiz">⟲ Restart</button>
      </div>
      <div id="result"></div>
    </div>

    <footer class="site-footer">
      <a href="https://github.com/your-org/consciousness-quiz" target="_blank" rel="noopener">
        View on GitHub →
      </a>
    </footer>
  </div>
`;

export class QuizApp {
  private readonly root: HTMLElement;
  private readonly state: QuizState = {
    current: startId,
    history: [],
  };
  private elements!: QuizElements;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  init(): void {
    this.root.innerHTML = template;
    this.elements = {
      question: this.getElement('#question'),
      yesBtn: this.getElement('#yesBtn'),
      noBtn: this.getElement('#noBtn'),
      backBtn: this.getElement('#backBtn'),
      restartBtn: this.getElement('#restartBtn'),
      path: this.getElement('#path'),
      result: this.getElement('#result'),
    };

    this.elements.yesBtn.addEventListener('click', () => this.onAnswer('yes'));
    this.elements.noBtn.addEventListener('click', () => this.onAnswer('no'));
    this.elements.backBtn.addEventListener('click', () => this.onBack());
    this.elements.restartBtn.addEventListener('click', () => this.restart());

    this.renderNode();
  }

  private onAnswer(choice: 'yes' | 'no'): void {
    const node = getNode(this.state.current);
    if (node.kind === 'end') {
      return;
    }

    const nextId = node[choice];
    this.go(nextId);
  }

  private onBack(): void {
    if (this.state.history.length === 0) {
      return;
    }

    this.state.current = this.state.history.pop()!;
    this.renderNode();
  }

  private restart(): void {
    this.state.current = startId;
    this.state.history = [];
    this.renderNode();
  }

  private go(nextId: NodeId): void {
    this.state.history.push(this.state.current);
    this.state.current = nextId;
    this.renderNode();
  }

  private renderNode(): void {
    this.renderPath();
    this.elements.result.innerHTML = '';

    let node: Node;
    try {
      node = getNode(this.state.current);
    } catch (error) {
      this.elements.question.textContent = 'Error: missing node.';
      this.setDecisionButtons({ visible: true, disabled: true });
      this.elements.backBtn.disabled = true;
      return;
    }

    if (node.kind === 'end') {
      this.renderResult(node);
      this.elements.question.textContent = 'Result';
      this.setDecisionButtons({ visible: false, disabled: true });
      this.elements.backBtn.disabled = this.state.history.length === 0;
      return;
    }

    this.elements.question.textContent = node.text;
    this.setDecisionButtons({ visible: true, disabled: false });
    this.elements.backBtn.disabled = this.state.history.length === 0;
  }

  private renderResult(node: Node): void {
    if (node.kind !== 'end') {
      return;
    }

    const wrapper = document.createElement('div');
    const verdictClass =
      node.verdict === 'conscious' ? 'good' : node.verdict === 'not' ? 'bad' : 'mindblown';

    wrapper.className = `result ${verdictClass}`;

    const badgeLabel =
      node.verdict === 'conscious'
        ? 'Conscious'
        : node.verdict === 'not'
          ? 'Not Conscious'
          : 'Humans not conscious';

    wrapper.innerHTML = `
      <h2>${node.title} <span class="badge ${verdictClass}">${badgeLabel}</span></h2>
      <div class="meta">${node.desc}</div>
      ${
        node.references.length
          ? `<div class="thinkers">
        <strong>Thinkers & Sources:</strong>
        <ul>
          ${node.references
            .map(
              (ref) =>
                `<li><span class="thinker-name">${ref.thinker}</span> — <em>${ref.work}</em></li>`,
            )
            .join('')}
        </ul>
      </div>`
          : ''
      }
      <div class="footer-controls">
        <button class="aux" id="viewPathBtn">View full path</button>
        <button class="aux" id="restartBtn2">⟲ Restart</button>
      </div>
    `;

    this.elements.result.appendChild(wrapper);

    const viewPathBtn = wrapper.querySelector<HTMLButtonElement>('#viewPathBtn');
    const restartBtn2 = wrapper.querySelector<HTMLButtonElement>('#restartBtn2');

    if (viewPathBtn) {
      viewPathBtn.addEventListener('click', () => {
        const message = this.state.history
          .map((id, index) => {
            const historyNode = nodes[id];
            const label = historyNode.kind === 'end' ? historyNode.title : historyNode.text;
            return `${index + 1}. ${label}`;
          })
          .join('\n');

        alert(message);
      });
    }

    if (restartBtn2) {
      restartBtn2.addEventListener('click', () => this.restart());
    }
  }

  private renderPath(): void {
    this.elements.path.innerHTML = '';
    this.state.history.forEach((id, index) => {
      const node = nodes[id];
      if (!node) {
        return;
      }
      const pill = document.createElement('span');
      pill.className = 'pill';
      if (node.kind === 'end') {
        pill.textContent = `${index + 1} · ${node.title}`;
      } else {
        pill.textContent = `${index + 1} · ${trimText(node.text)}`;
      }
      this.elements.path.appendChild(pill);
    });
  }

  private setDecisionButtons({ visible, disabled }: { visible: boolean; disabled: boolean }): void {
    const display = visible ? '' : 'none';
    this.elements.yesBtn.style.display = display;
    this.elements.noBtn.style.display = display;
    this.elements.yesBtn.disabled = disabled;
    this.elements.noBtn.disabled = disabled;
  }

  private getElement<T extends HTMLElement>(selector: string): T {
    const el = this.root.querySelector<T>(selector);
    if (!el) {
      throw new Error(`Missing element for selector: ${selector}`);
    }
    return el;
  }
}
