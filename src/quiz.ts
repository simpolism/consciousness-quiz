import { nodes, startId, getNode } from './data/nodes';
import type { Node, NodeId } from './types';

interface HistoryEntry {
  id: NodeId;
  answer: 'yes' | 'no';
}

interface QuizState {
  current: NodeId;
  history: HistoryEntry[];
}

interface QuizElements {
  question: HTMLElement;
  yesBtn: HTMLButtonElement;
  noBtn: HTMLButtonElement;
  backBtn: HTMLButtonElement;
  restartBtn: HTMLButtonElement;
  result: HTMLElement;
}

const template = `
  <header>
    <h1>Consciousness 20Q — Master Quiz</h1>
    <p>Answer Yes/No to navigate the landscape of consciousness theories. Finish to discover your end state (theory + thinkers).</p>
    <div class="header-links">
      <a href="/all-positions.html">View All Positions →</a>
    </div>
  </header>

  <div class="container">
    <div class="card" id="quiz">
      <div class="card-actions">
        <button class="card-action control-button control-button--ghost" id="backBtn" title="Go back one step">← Back</button>
        <button class="card-action control-button control-button--ghost" id="restartBtn" title="Restart the quiz">⟲ Restart</button>
      </div>
      <div id="question" class="question"></div>
      <div class="controls">
        <button class="control-button control-button--choice yes" id="yesBtn">Yes</button>
        <button class="control-button control-button--choice control-button--danger no" id="noBtn">No</button>
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

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

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
      result: this.getElement('#result'),
    };

    this.elements.yesBtn.addEventListener('click', () => this.onAnswer('yes'));
    this.elements.noBtn.addEventListener('click', () => this.onAnswer('no'));
    this.elements.backBtn.addEventListener('click', () => this.onBack());
    this.elements.restartBtn.addEventListener('click', () => this.restart());

    [this.elements.yesBtn, this.elements.noBtn, this.elements.backBtn, this.elements.restartBtn].forEach(
      (btn) => {
        btn.addEventListener('pointerup', () => btn.blur());
        btn.addEventListener('pointerleave', () => btn.blur());
      },
    );

    this.renderNode();
  }

  private onAnswer(choice: 'yes' | 'no'): void {
    const node = getNode(this.state.current);
    if (node.kind === 'end') {
      return;
    }

    const nextId = node[choice];
    this.go(choice, nextId);
  }

  private onBack(): void {
    if (this.state.history.length === 0) {
      return;
    }

    const previous = this.state.history.pop();
    if (!previous) {
      return;
    }
    this.state.current = previous.id;
    this.renderNode();
  }

  private restart(): void {
    this.state.current = startId;
    this.state.history = [];
    this.renderNode();
  }

  private go(choice: 'yes' | 'no', nextId: NodeId): void {
    this.state.history.push({ id: this.state.current, answer: choice });
    this.state.current = nextId;
    this.renderNode();
  }

  private renderNode(): void {
    this.elements.result.innerHTML = '';

    let node: Node;
    try {
      node = getNode(this.state.current);
    } catch (error) {
      this.elements.question.textContent = 'Error: missing node.';
      this.setDecisionButtons({ visible: true, disabled: true });
      this.elements.backBtn.disabled = true;
      this.elements.backBtn.hidden = this.state.history.length === 0;
      return;
    }

    if (node.kind === 'end') {
      this.renderResult(node);
      this.elements.question.textContent = 'Result';
      this.elements.question.classList.add('question--label');
      this.setDecisionButtons({ visible: false, disabled: true });
      const noHistory = this.state.history.length === 0;
      this.elements.backBtn.disabled = noHistory;
      this.elements.backBtn.hidden = noHistory;
      return;
    }

    this.elements.question.classList.remove('question--label');
    this.elements.question.textContent = node.text;
    this.setDecisionButtons({ visible: true, disabled: false });
    const noHistory = this.state.history.length === 0;
    this.elements.backBtn.disabled = noHistory;
    this.elements.backBtn.hidden = noHistory;
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
        <button class="control-button control-button--ghost" id="viewPathBtn" aria-expanded="false">View full path</button>
      </div>
      <div class="result-path" id="resultPath" hidden></div>
    `;

    this.elements.result.appendChild(wrapper);

    const viewPathBtn = wrapper.querySelector<HTMLButtonElement>('#viewPathBtn');
    const pathContainer = wrapper.querySelector<HTMLDivElement>('#resultPath');

    if (viewPathBtn) {
      viewPathBtn.addEventListener('click', () => {
        if (!pathContainer) {
          return;
        }

        const isVisible = pathContainer.hasAttribute('data-open');
        if (isVisible) {
          pathContainer.removeAttribute('data-open');
          pathContainer.hidden = true;
          pathContainer.innerHTML = '';
          viewPathBtn.textContent = 'View full path';
          viewPathBtn.setAttribute('aria-expanded', 'false');
          return;
        }

        pathContainer.innerHTML = this.buildPathMarkup();
        pathContainer.setAttribute('data-open', 'true');
        pathContainer.hidden = false;
        viewPathBtn.textContent = 'Hide path';
        viewPathBtn.setAttribute('aria-expanded', 'true');
      });
    }
  }

  private setDecisionButtons({ visible, disabled }: { visible: boolean; disabled: boolean }): void {
    const display = visible ? 'inline-flex' : 'none';
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

  private buildPathMarkup(): string {
    const steps = this.state.history
      .map((entry, index) => {
        const questionNode = nodes[entry.id];
        if (!questionNode || questionNode.kind === 'end') {
          return null;
        }
        const answerClass = entry.answer === 'yes' ? 'result-path-answer--yes' : 'result-path-answer--no';
        const answerLabel = entry.answer === 'yes' ? 'Yes' : 'No';
        const questionText = escapeHtml(questionNode.text);
        return `
          <li class="result-path-item">
            <span class="result-path-step">${index + 1}</span>
            <div class="result-path-copy">
              <span class="result-path-question">${questionText}</span>
              <span class="result-path-answer ${answerClass}">${answerLabel}</span>
            </div>
          </li>
        `;
      })
      .filter((item): item is string => item !== null);

    const currentNode = getNode(this.state.current);
    if (currentNode.kind === 'end') {
      steps.push(`
        <li class="result-path-item result-path-end">
          <span class="result-path-step">${steps.length + 1}</span>
          <div class="result-path-copy">
            <span class="result-path-question">Result</span>
            <span class="result-path-answer result-path-answer--result">${escapeHtml(currentNode.title)}</span>
          </div>
        </li>
      `);
    }

    if (steps.length === 0) {
      return '<p class="result-path-empty">No path history recorded.</p>';
    }

    return `<ol class="result-path-list">${steps.join('')}</ol>`;
  }
}
