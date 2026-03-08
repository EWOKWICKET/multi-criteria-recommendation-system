import type { AhpResponse } from './api/client';
import { Algorithm, solveAhp, runRecommendation } from './api/client';
import { createCriteriaForm } from './components/criteria-form';
import { createCriteriaMatrixInput, readCriteriaMatrix } from './components/matrix-input';
import { createRawValueInput, readAlternativeMatrices, readRawValues } from './components/raw-value-input';
import { renderAhpResults, renderRecommendationResults, renderComparisonResults } from './components/results-display';
import type { ComparisonEntry } from './components/results-display';

const ALGORITHMS: { value: Algorithm; label: string; description: string }[] = [
  { value: Algorithm.GlobalLeader, label: 'Global Leader', description: 'Match the overall winner' },
  { value: Algorithm.LocalLeader, label: 'Local Leader', description: 'Match the best per criterion' },
  { value: Algorithm.GlobalAverage, label: 'Global Average', description: 'Match the median-ranked alternative' },
  { value: Algorithm.LocalAverage, label: 'Local Average', description: 'Match the per-criterion average' },
  { value: Algorithm.AdaptiveStrategy, label: 'Adaptive Strategy', description: 'Greedy min-cost optimization' },
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
  container.innerHTML = '';

  // Criteria importance section
  const criteriaHeader = document.createElement('h3');
  criteriaHeader.textContent = 'Criteria Importance';
  container.appendChild(criteriaHeader);

  const criteriaWrapper = document.createElement('div');
  criteriaWrapper.id = 'criteria-matrix-wrapper';
  createCriteriaMatrixInput({ container: criteriaWrapper, criteria });
  container.appendChild(criteriaWrapper);

  // Alternative values section
  const altHeader = document.createElement('h3');
  altHeader.textContent = 'Alternative Values per Criterion';
  container.appendChild(altHeader);

  const altDescription = document.createElement('p');
  altDescription.className = 'section-description';
  altDescription.textContent =
    'Enter actual values for each alternative under each criterion. ' +
    'The system converts these to comparison ratios automatically. ' +
    'Select "Lower is better" for criteria like price where less is preferred.';
  container.appendChild(altDescription);

  const altWrapper = document.createElement('div');
  altWrapper.id = 'alternatives-raw-values';
  createRawValueInput({ container: altWrapper, criteria, alternatives });
  container.appendChild(altWrapper);

  // Solve button
  const solveBtn = document.createElement('button');
  solveBtn.textContent = 'Solve AHP';
  solveBtn.className = 'primary-btn';
  solveBtn.addEventListener('click', () => handleSolve());
  container.appendChild(solveBtn);
}

function readCurrentMatrices(): { criteriaMatrix: number[][]; alternativeMatrices: Record<string, number[][]> } | null {
  const criteriaWrapper = app.querySelector<HTMLElement>('#criteria-matrix-wrapper');

  if (!criteriaWrapper) return null;

  const criteriaMatrix = readCriteriaMatrix(criteriaWrapper);

  const altContainer = app.querySelector<HTMLElement>('#alternatives-raw-values');

  if (!altContainer) return null;

  const alternativeMatrices = readAlternativeMatrices(altContainer, currentCriteria);

  return { criteriaMatrix, alternativeMatrices };
}

async function handleSolve(): Promise<void> {
  const matrices = readCurrentMatrices();

  if (!matrices) return;

  const resultsContainer = app.querySelector<HTMLElement>('#ahp-results')!;
  const recControls = app.querySelector<HTMLElement>('#recommendation-controls')!;
  const recResults = app.querySelector<HTMLElement>('#recommendation-results')!;

  recControls.innerHTML = '';
  recResults.innerHTML = '';

  try {
    const result = await solveAhp({
      criteriaMatrix: matrices.criteriaMatrix,
      alternativeMatrices: matrices.alternativeMatrices,
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

  const algorithmOptions =
    `<option value="all">Compare All — Run all algorithms and compare</option>` +
    ALGORITHMS.map((a) => `<option value="${a.value}">${a.label} — ${a.description}</option>`).join('');

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
  const matrices = readCurrentMatrices();

  if (!matrices) return;

  const algorithmSelect = app.querySelector<HTMLSelectElement>('#algorithm-select')!;
  const targetSelect = app.querySelector<HTMLSelectElement>('#target-select')!;
  const algorithm = algorithmSelect.value;
  const targetAlternativeIndex = parseInt(targetSelect.value, 10);

  const recResults = app.querySelector<HTMLElement>('#recommendation-results')!;

  const body = {
    criteriaMatrix: matrices.criteriaMatrix,
    alternativeMatrices: matrices.alternativeMatrices,
    criteriaNames: currentCriteria,
    alternativeNames: currentAlternatives,
    targetAlternativeIndex,
  };

  try {
    const altContainer = app.querySelector<HTMLElement>('#alternatives-raw-values');
    const rawValues = altContainer ? readRawValues(altContainer, currentCriteria) : undefined;

    if (algorithm === 'all') {
      const entries = await Promise.all(
        ALGORITHMS.map(async (a): Promise<ComparisonEntry> => {
          const start = performance.now();
          const result = await runRecommendation(a.value, body);
          const timeMs = performance.now() - start;

          return { label: a.label, result, timeMs };
        })
      );

      renderComparisonResults(recResults, entries);
    } else {
      const result = await runRecommendation(algorithm as Algorithm, body);

      renderRecommendationResults({
        container: recResults,
        result,
        rawValues,
        alternativeNames: currentAlternatives,
        targetIndex: targetAlternativeIndex,
      });
    }
  } catch (err) {
    recResults.innerHTML = `<p class="error">${(err as Error).message}</p>`;
  }
}
