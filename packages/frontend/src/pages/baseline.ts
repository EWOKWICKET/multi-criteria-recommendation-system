import { solveAhp } from '../api/client';
import { createCriteriaForm } from '../components/criteria-form';
import { createMatrixInput, readMatrix } from '../components/matrix-input';
import { renderAhpResults } from '../components/results-display';

export function renderBaseline(root: HTMLElement): void {
  root.innerHTML = `
    <h2>Baseline AHP</h2>
    <div id="criteria-form"></div>
    <div id="matrices-container"></div>
    <div id="results-container"></div>
  `;

  createCriteriaForm(root.querySelector('#criteria-form')!, {
    onUpdate(criteria, alternatives) {
      buildMatrices(root.querySelector('#matrices-container')!, criteria, alternatives);
    },
  });
}

function buildMatrices(container: HTMLElement, criteria: string[], alternatives: string[]): void {
  container.innerHTML = '<h3>Pairwise Comparison Matrices</h3>';

  createMatrixInput(container, criteria.length, 'Criteria');

  for (const name of criteria) {
    createMatrixInput(container, alternatives.length, name);
  }

  const solveBtn = document.createElement('button');
  solveBtn.textContent = 'Solve AHP';
  solveBtn.className = 'primary-btn';
  solveBtn.addEventListener('click', () => handleSolve(container));
  container.appendChild(solveBtn);
}

async function handleSolve(container: HTMLElement): Promise<void> {
  const tables = container.querySelectorAll<HTMLTableElement>('table');
  const criteriaInput = document.querySelector<HTMLInputElement>('#criteria-input')!;
  const alternativesInput = document.querySelector<HTMLInputElement>('#alternatives-input')!;

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

  const resultsContainer = document.querySelector('#results-container')!;

  try {
    const result = await solveAhp({
      criteriaMatrix,
      alternativeMatrices,
      criteriaNames,
      alternativeNames,
    });

    renderAhpResults(resultsContainer as HTMLElement, result);
  } catch (err) {
    resultsContainer.innerHTML = `<p class="error">${(err as Error).message}</p>`;
  }
}
