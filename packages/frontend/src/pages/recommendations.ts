import type { Algorithm } from '../api/client';
import { runRecommendation } from '../api/client';
import { createCriteriaForm } from '../components/criteria-form';
import { createMatrixInput, readMatrix } from '../components/matrix-input';
import { renderRecommendationResults } from '../components/results-display';

const ALGORITHMS: { value: Algorithm; label: string }[] = [
  { value: 'global-leader', label: 'Global Leader' },
  { value: 'local-leader', label: 'Local Leader' },
  { value: 'global-average', label: 'Global Average' },
  { value: 'local-average', label: 'Local Average' },
  { value: 'adaptive-strategy', label: 'Adaptive Strategy' },
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
      buildAlgorithmPicker(root.querySelector('#algorithm-picker')!);
      buildMatrices(root.querySelector('#matrices-container')!, criteria, alternatives);
    },
  });
}

function buildAlgorithmPicker(container: HTMLElement): void {
  container.innerHTML = `
    <div class="form-group">
      <label>Algorithm:</label>
      <select id="algorithm-select">
        ${ALGORITHMS.map((a) => `<option value="${a.value}">${a.label}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Target alternative index (0-based):</label>
      <input type="number" id="target-index-input" value="0" min="0" />
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
  const targetInput = document.querySelector<HTMLInputElement>('#target-index-input')!;

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
  const targetAlternativeIndex = parseInt(targetInput.value, 10);

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
