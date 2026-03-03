import type { Algorithm, AhpResponse } from './api/client';
import { solveAhp, runRecommendation } from './api/client';
import { createCriteriaForm } from './components/criteria-form';
import { createMatrixInput, readMatrix } from './components/matrix-input';
import { renderAhpResults, renderRecommendationResults } from './components/results-display';

const ALGORITHMS: { value: Algorithm; label: string; description: string }[] = [
  { value: 'global-leader', label: 'Global Leader', description: 'Match the overall winner' },
  { value: 'local-leader', label: 'Local Leader', description: 'Match the best per criterion' },
  { value: 'global-average', label: 'Global Average', description: 'Match the median-ranked alternative' },
  { value: 'local-average', label: 'Local Average', description: 'Match the per-criterion average' },
  { value: 'adaptive-strategy', label: 'Adaptive Strategy', description: 'Greedy min-cost optimization' },
];

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div id="criteria-form"></div>
  <div id="matrices-container"></div>
  <div id="ahp-results"></div>
  <div id="recommendation-controls"></div>
  <div id="recommendation-results"></div>
`;

let currentCriteria: string[] = [];
let currentAlternatives: string[] = [];

createCriteriaForm(app.querySelector('#criteria-form')!, {
  onUpdate(criteria, alternatives) {
    currentCriteria = criteria;
    currentAlternatives = alternatives;
    buildMatrices(app.querySelector('#matrices-container')!, criteria, alternatives);
    app.querySelector('#ahp-results')!.innerHTML = '';
    app.querySelector('#recommendation-controls')!.innerHTML = '';
    app.querySelector('#recommendation-results')!.innerHTML = '';
  },
});

function buildMatrices(container: HTMLElement, criteria: string[], alternatives: string[]): void {
  container.innerHTML = '<h3>Pairwise Comparison Matrices</h3>';

  createMatrixInput({ container, size: criteria.length, label: 'Criteria', names: criteria });

  for (const name of criteria) {
    createMatrixInput({ container, size: alternatives.length, label: name, names: alternatives });
  }

  const solveBtn = document.createElement('button');
  solveBtn.textContent = 'Solve AHP';
  solveBtn.className = 'primary-btn';
  solveBtn.addEventListener('click', () => handleSolve(container));
  container.appendChild(solveBtn);
}

async function handleSolve(matricesContainer: HTMLElement): Promise<void> {
  const tables = matricesContainer.querySelectorAll<HTMLTableElement>('table');
  const criteriaMatrix = readMatrix(tables[0]);

  const alternativeMatrices: Record<string, number[][]> = {};

  for (let i = 0; i < currentCriteria.length; i++) {
    alternativeMatrices[currentCriteria[i]] = readMatrix(tables[i + 1]);
  }

  const resultsContainer = app.querySelector<HTMLElement>('#ahp-results')!;
  const recControls = app.querySelector<HTMLElement>('#recommendation-controls')!;
  const recResults = app.querySelector<HTMLElement>('#recommendation-results')!;

  recControls.innerHTML = '';
  recResults.innerHTML = '';

  try {
    const result = await solveAhp({
      criteriaMatrix,
      alternativeMatrices,
      criteriaNames: currentCriteria,
      alternativeNames: currentAlternatives,
    });

    renderAhpResults(resultsContainer, result);
    showRecommendationControls(recControls, result);
  } catch (err) {
    resultsContainer.innerHTML = `<p class="error">${(err as Error).message}</p>`;
  }
}

function showRecommendationControls(container: HTMLElement, ahpResult: AhpResponse): void {
  const losers = currentAlternatives.map((name, index) => ({ name, index })).filter((a) => a.name !== ahpResult.winner);

  if (losers.length === 0) return;

  const loserOptions = losers.map((l) => `<option value="${l.index}">${l.name}</option>`).join('');

  const algorithmOptions = ALGORITHMS.map(
    (a) => `<option value="${a.value}">${a.label} — ${a.description}</option>`
  ).join('');

  container.innerHTML = `
    <h3>Generate Recommendations</h3>
    <div class="form-group">
      <label>Target alternative:</label>
      <select id="target-select">${loserOptions}</select>
    </div>
    <div class="form-group">
      <label>Algorithm:</label>
      <select id="algorithm-select">${algorithmOptions}</select>
    </div>
  `;

  const btn = document.createElement('button');
  btn.textContent = 'Generate Recommendations';
  btn.className = 'primary-btn';
  btn.addEventListener('click', () => handleRecommendation());
  container.appendChild(btn);
}

async function handleRecommendation(): Promise<void> {
  const matricesContainer = app.querySelector<HTMLElement>('#matrices-container')!;
  const tables = matricesContainer.querySelectorAll<HTMLTableElement>('table');
  const criteriaMatrix = readMatrix(tables[0]);

  const alternativeMatrices: Record<string, number[][]> = {};

  for (let i = 0; i < currentCriteria.length; i++) {
    alternativeMatrices[currentCriteria[i]] = readMatrix(tables[i + 1]);
  }

  const algorithmSelect = app.querySelector<HTMLSelectElement>('#algorithm-select')!;
  const targetSelect = app.querySelector<HTMLSelectElement>('#target-select')!;
  const algorithm = algorithmSelect.value as Algorithm;
  const targetAlternativeIndex = parseInt(targetSelect.value, 10);

  const recResults = app.querySelector<HTMLElement>('#recommendation-results')!;

  try {
    const result = await runRecommendation(algorithm, {
      criteriaMatrix,
      alternativeMatrices,
      criteriaNames: currentCriteria,
      alternativeNames: currentAlternatives,
      targetAlternativeIndex,
    });

    renderRecommendationResults(recResults, result);
  } catch (err) {
    recResults.innerHTML = `<p class="error">${(err as Error).message}</p>`;
  }
}
