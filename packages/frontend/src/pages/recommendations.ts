import type { Algorithm } from '../api/client';
import { runRecommendation } from '../api/client';
import { createCriteriaForm } from '../components/criteria-form';
import { createMatrixInput, readMatrix } from '../components/matrix-input';
import { renderRecommendationResults } from '../components/results-display';

const ALGORITHMS: { value: Algorithm; label: string; description: string }[] = [
  { value: 'global-leader', label: 'Global Leader', description: 'Match the overall winner' },
  { value: 'local-leader', label: 'Local Leader', description: 'Match the best per criterion' },
  { value: 'global-average', label: 'Global Average', description: 'Match the median-ranked alternative' },
  { value: 'local-average', label: 'Local Average', description: 'Match the per-criterion average' },
  { value: 'adaptive-strategy', label: 'Adaptive Strategy', description: 'Greedy min-cost optimization' },
];

export function renderRecommendations(root: HTMLElement): void {
  root.innerHTML = `
    <h2>Recommendations</h2>
    <div id="criteria-form"></div>
    <div id="algorithm-picker"></div>
    <div id="matrices-container"></div>
    <div id="results-container"></div>
  `;

  createCriteriaForm(root.querySelector('#criteria-form')!, {
    onUpdate(criteria, alternatives) {
      buildAlgorithmPicker(root.querySelector('#algorithm-picker')!, alternatives);
      buildMatrices(root.querySelector('#matrices-container')!, criteria, alternatives);
    },
  });
}

function buildAlgorithmPicker(container: HTMLElement, alternatives: string[]): void {
  const algorithmOptions = ALGORITHMS.map(
    (a) => `<option value="${a.value}">${a.label} — ${a.description}</option>`
  ).join('');

  const targetOptions = alternatives.map((name, i) => `<option value="${i}">${name} (index ${i})</option>`).join('');

  container.innerHTML = `
    <div class="form-group">
      <label>Algorithm:</label>
      <select id="algorithm-select">${algorithmOptions}</select>
    </div>
    <div class="form-group">
      <label>Target alternative:</label>
      <select id="target-index-input">${targetOptions}</select>
    </div>
  `;
}

function buildMatrices(container: HTMLElement, criteria: string[], alternatives: string[]): void {
  container.innerHTML = '<h3>Pairwise Comparison Matrices</h3>';

  createMatrixInput({ container, size: criteria.length, label: 'Criteria', names: criteria });

  for (const name of criteria) {
    createMatrixInput({ container, size: alternatives.length, label: name, names: alternatives });
  }

  const runBtn = document.createElement('button');
  runBtn.textContent = 'Run Recommendation';
  runBtn.className = 'primary-btn';
  runBtn.addEventListener('click', () => handleRun(container));
  container.appendChild(runBtn);
}

async function handleRun(container: HTMLElement): Promise<void> {
  const tables = container.querySelectorAll<HTMLTableElement>('table');
  const criteriaInput = document.querySelector<HTMLInputElement>('#criteria-input')!;
  const alternativesInput = document.querySelector<HTMLInputElement>('#alternatives-input')!;
  const algorithmSelect = document.querySelector<HTMLSelectElement>('#algorithm-select')!;
  const targetSelect = document.querySelector<HTMLSelectElement>('#target-index-input')!;

  const criteriaNames = criteriaInput.value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s);
  const alternativeNames = alternativesInput.value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s);

  const criteriaMatrix = readMatrix(tables[0]);

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let i = 0; i < criteriaNames.length; i++) {
    alternativeMatrices[criteriaNames[i]] = readMatrix(tables[i + 1]);
  }

  const algorithm = algorithmSelect.value as Algorithm;
  const targetAlternativeIndex = parseInt(targetSelect.value, 10);

  const resultsContainer = document.querySelector('#results-container')!;

  try {
    const result = await runRecommendation(algorithm, {
      criteriaMatrix,
      alternativeMatrices,
      criteriaNames,
      alternativeNames,
      targetAlternativeIndex,
    });

    renderRecommendationResults(resultsContainer as HTMLElement, result);
  } catch (err) {
    resultsContainer.innerHTML = `<p class="error">${(err as Error).message}</p>`;
  }
}
