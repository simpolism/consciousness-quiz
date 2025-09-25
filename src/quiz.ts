import { nodes, startId, getNode } from './data/nodes';
import { footerTemplate } from './footer';
import type { Node, NodeId, QuestionNode, QuestionOption, QuestionOptionTone } from './types';

interface HistoryEntry {
  nodeId: NodeId;
  optionId: string;
  optionLabel: string;
  optionTone?: QuestionOptionTone;
}

interface QuizState {
  current: NodeId;
  history: HistoryEntry[];
  selectedTarget?: {
    id: string;
    label: string;
    entityTerm: string;
  };
}

interface QuizElements {
  question: HTMLElement;
  controls: HTMLDivElement;
  backBtn: HTMLButtonElement;
  restartBtn: HTMLButtonElement;
  result: HTMLElement;
  introCard: HTMLDivElement;
  startBtn: HTMLButtonElement;
  rejectBtn: HTMLButtonElement;
  actionsBar: HTMLDivElement;
}

const template = `
  <header>
    <h1>Is It Conscious?</h1>
    <p>Figure out where you stand in the consciousness debate.</p>
  </header>

  <div class="container">
      <div class="card" id="quiz">
      <div class="intro-card" id="introCard">
        <h2>How to approach this quiz</h2>
        <p>These prompts map philosophical stances about consciousness. There are no right answers—use your intuitions, and feel free to consult the "More context" dropdowns if a question feels vague. When ready, start the quiz below.</p>
        <button class="control-button control-button--choice" id="startQuizBtn">Begin the quiz</button>
        <button class="control-button control-button--ghost" id="rejectConceptBtn">Consciousness is an incoherent concept</button>
      </div>
      <div class="card-actions" id="quizActions">
        <button class="card-action control-button control-button--ghost" id="backBtn" title="Go back one step">← Back</button>
        <button class="card-action control-button control-button--ghost" id="restartBtn" title="Restart the quiz">⟲ Restart</button>
      </div>
      <div id="question" class="question"></div>
      <div class="controls" id="choiceControls"></div>
      <div id="result"></div>
    </div>

    <div class="header-links header-links--below">
      <a href="/all-positions.html">View All Positions →</a>
    </div>

    ${footerTemplate}
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
      controls: this.getElement('#choiceControls'),
      backBtn: this.getElement('#backBtn'),
      restartBtn: this.getElement('#restartBtn'),
      result: this.getElement('#result'),
      introCard: this.getElement('#introCard'),
      startBtn: this.getElement('#startQuizBtn'),
      rejectBtn: this.getElement('#rejectConceptBtn'),
      actionsBar: this.getElement('#quizActions'),
    };

    this.elements.backBtn.addEventListener('click', () => this.onBack());
    this.elements.restartBtn.addEventListener('click', () => this.restart());
    this.elements.startBtn.addEventListener('click', () => this.startQuiz());
    this.elements.rejectBtn.addEventListener('click', () => this.rejectConcept());

    [this.elements.backBtn, this.elements.restartBtn, this.elements.startBtn, this.elements.rejectBtn].forEach((btn) => {
      btn.addEventListener('pointerup', () => btn.blur());
      btn.addEventListener('pointerleave', () => btn.blur());
    });

    this.elements.actionsBar.hidden = true;
    this.renderNode();
  }

  private onBack(): void {
    if (this.state.history.length === 0) {
      return;
    }

    const previous = this.state.history.pop();
    if (!previous) {
      return;
    }
    this.state.current = previous.nodeId;
    this.renderNode();
  }

  private restart(): void {
    this.state.current = startId;
    this.state.history = [];
    this.state.selectedTarget = undefined;
    this.elements.introCard.hidden = false;
    this.elements.result.innerHTML = '';
    this.elements.question.innerHTML = '';
    this.setOptionControls({ visible: false, disabled: true });
    this.elements.backBtn.hidden = true;
    this.elements.actionsBar.hidden = true;
  }

  private go(option: QuestionOption): void {
    // Capture target selection
    if (this.state.current === 'target_select') {
      const targetMap = {
        'ai': { id: 'ai', label: 'An AI system or chatbot', entityTerm: 'this AI system' },
        'animal': { id: 'animal', label: 'An animal (dog, dolphin, etc.)', entityTerm: 'this animal' },
        'robot': { id: 'robot', label: 'A robot or artificial agent', entityTerm: 'this robot' },
        'human': { id: 'human', label: 'A human in an unusual state', entityTerm: 'this human' },
        'other': { id: 'other', label: 'Something else', entityTerm: 'this entity' }
      };
      this.state.selectedTarget = targetMap[option.id as keyof typeof targetMap] || targetMap.other;
    }

    this.state.history.push({
      nodeId: this.state.current,
      optionId: option.id,
      optionLabel: option.label,
      optionTone: option.tone,
    });
    this.state.current = option.target;
    this.renderNode();
  }

  private renderNode(): void {
    if (!this.hasStarted()) {
      this.elements.backBtn.hidden = true;
      this.setOptionControls({ visible: false, disabled: true });
      this.elements.actionsBar.hidden = true;
      return;
    }

    this.elements.result.innerHTML = '';
    this.elements.controls.innerHTML = '';

    let node: Node;
    try {
      node = getNode(this.state.current);
    } catch (error) {
      this.elements.question.textContent = 'Error: missing node.';
      this.setOptionControls({ visible: true, disabled: true });
      this.elements.backBtn.disabled = true;
      this.elements.backBtn.hidden = this.state.history.length === 0;
      return;
    }

    if (node.kind === 'end') {
      this.renderResult(node);
      this.elements.question.innerHTML = 'Result';
      this.elements.question.classList.add('question--label');
      this.setOptionControls({ visible: false, disabled: true });
      const noHistory = this.state.history.length === 0;
      this.elements.backBtn.disabled = noHistory;
      this.elements.backBtn.hidden = noHistory;
      return;
    }

    this.renderOptions(node);
    this.elements.question.classList.remove('question--label');
    const processedText = this.replaceTargetPlaceholders(node.text);
    const processedDetail = node.detail ? this.replaceTargetPlaceholders(node.detail) : '';
    const detail = processedDetail ? `<details class="question-detail"><summary>More context</summary><p>${escapeHtml(processedDetail)}</p></details>` : '';
    this.elements.question.innerHTML = `<div class="question-text">${escapeHtml(processedText)}</div>${detail}`;
    this.setOptionControls({ visible: true, disabled: false });
    const noHistory = this.state.history.length === 0;
    this.elements.backBtn.disabled = noHistory;
    this.elements.backBtn.hidden = noHistory;
    this.elements.actionsBar.hidden = false;
  }

  private renderOptions(node: QuestionNode): void {
    this.elements.controls.innerHTML = '';
    node.options.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = this.getOptionButtonClass(option);
      button.textContent = option.label;
      button.addEventListener('click', () => this.go(option));
      button.addEventListener('pointerup', () => button.blur());
      button.addEventListener('pointerleave', () => button.blur());
      this.elements.controls.appendChild(button);
    });
  }

  private getOptionButtonClass(option: QuestionOption): string {
    const classes = ['control-button'];
    switch (option.tone) {
      case 'affirmative':
        classes.push('control-button--choice');
        break;
      case 'negative':
        classes.push('control-button--choice', 'control-button--danger');
        break;
      default:
        classes.push('control-button--ghost');
        break;
    }
    return classes.join(' ');
  }

  private hasStarted(): boolean {
    return this.elements.introCard.hidden;
  }

  private startQuiz(): void {
    this.elements.introCard.hidden = true;
    this.state.current = startId;
    this.state.history = [];
    this.elements.backBtn.hidden = true;
    this.setOptionControls({ visible: false, disabled: true });
    this.elements.actionsBar.hidden = false;
    this.renderNode();
  }

  private rejectConcept(): void {
    this.elements.introCard.hidden = true;
    this.state.current = 'consciousness_incoherent';
    this.state.history = [];
    this.elements.backBtn.hidden = true;
    this.setOptionControls({ visible: false, disabled: true });
    this.elements.actionsBar.hidden = false;
    this.renderNode();
  }

  private replaceTargetPlaceholders(text: string): string {
    if (!this.state.selectedTarget) {
      return text;
    }

    return text
      .replace(/\{\{ENTITY\}\}/g, this.state.selectedTarget.entityTerm)
      .replace(/\{\{ENTITY_CAP\}\}/g, this.state.selectedTarget.entityTerm.charAt(0).toUpperCase() + this.state.selectedTarget.entityTerm.slice(1));
  }

  private renderResult(node: Node): void {
    if (node.kind !== 'end') {
      return;
    }

    this.elements.controls.innerHTML = '';
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

    const processedDesc = this.replaceTargetPlaceholders(node.desc);
    const processedDetail = node.detail ? this.replaceTargetPlaceholders(node.detail) : '';

    wrapper.innerHTML = `
      <h2>${escapeHtml(node.title)} <span class="badge ${verdictClass}">${badgeLabel}</span></h2>
      <div class="meta">${escapeHtml(processedDesc)}</div>
      ${
        node.detail
          ? `<details class="result-detail"><summary>Learn more about this stance</summary><p>${escapeHtml(processedDetail)}</p></details>`
          : ''
      }
      ${
        node.references.length
          ? `<div class="thinkers">
        <strong>Thinkers & Sources:</strong>
        <ul>
          ${node.references
            .map(
              (ref) =>
                `<li><span class="thinker-name">${escapeHtml(ref.thinker)}</span> — <em>${escapeHtml(ref.work)}</em></li>`,
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

  private setOptionControls({ visible, disabled }: { visible: boolean; disabled: boolean }): void {
    this.elements.controls.style.display = visible ? '' : 'none';
    const buttons = Array.from(this.elements.controls.querySelectorAll<HTMLButtonElement>('button'));
    buttons.forEach((button) => {
      button.disabled = disabled;
    });
  }

  private getElement<T extends HTMLElement>(selector: string): T {
    const el = this.root.querySelector<T>(selector);
    if (!el) {
      throw new Error(`Missing element for selector: ${selector}`);
    }
    return el;
  }

  private getResultAnswerClass(tone?: QuestionOptionTone): string {
    switch (tone) {
      case 'negative':
        return 'result-path-answer--negative';
      case 'neutral':
        return 'result-path-answer--neutral';
      default:
        return 'result-path-answer--affirmative';
    }
  }

  private buildPathMarkup(): string {
    const steps = this.state.history
      .map((entry, index) => {
        const questionNode = nodes[entry.nodeId];
        if (!questionNode || questionNode.kind === 'end') {
          return null;
        }
        const answerClass = this.getResultAnswerClass(entry.optionTone);
        const answerLabel = escapeHtml(entry.optionLabel);
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
