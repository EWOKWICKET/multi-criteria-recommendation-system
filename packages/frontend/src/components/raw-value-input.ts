type RawValueInputParams = {
  container: HTMLElement;
  criteria: string[];
  alternatives: string[];
};

type CriterionDirection = 'higher' | 'lower';

export function createRawValueInput({ container, criteria, alternatives }: RawValueInputParams): void {
  for (const criterion of criteria) {
    const section = document.createElement('div');
    section.className = 'raw-value-section';
    section.dataset['criterion'] = criterion;

    // Header: criterion name + direction toggle
    const header = document.createElement('div');
    header.className = 'raw-value-header';

    const title = document.createElement('h4');
    title.textContent = criterion;
    header.appendChild(title);

    const directionLabel = document.createElement('label');
    directionLabel.textContent = 'Direction: ';
    directionLabel.className = 'direction-label';

    const directionSelect = document.createElement('select');
    directionSelect.className = 'direction-select';
    directionSelect.dataset['criterionDirection'] = criterion;
    directionSelect.innerHTML = `
      <option value="higher">Higher is better</option>
      <option value="lower">Lower is better</option>
    `;
    directionLabel.appendChild(directionSelect);
    header.appendChild(directionLabel);

    section.appendChild(header);

    // Value inputs table
    const table = document.createElement('table');
    table.className = 'raw-value-table';

    const thead = document.createElement('tr');

    for (const alt of alternatives) {
      const th = document.createElement('th');
      th.textContent = alt;
      thead.appendChild(th);
    }

    table.appendChild(thead);

    const dataRow = document.createElement('tr');

    for (let j = 0; j < alternatives.length; j++) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      input.step = 'any';
      input.placeholder = '0';
      input.dataset['alternativeIndex'] = String(j);
      td.appendChild(input);
      dataRow.appendChild(td);
    }

    table.appendChild(dataRow);
    section.appendChild(table);

    // Validation error placeholder
    const errorEl = document.createElement('div');
    errorEl.className = 'validation-error';
    section.appendChild(errorEl);

    container.appendChild(section);
  }
}

export function readAlternativeMatrices(container: HTMLElement, criteria: string[]): Record<string, number[][]> {
  const result: Record<string, number[][]> = {};

  for (const criterion of criteria) {
    const section = container.querySelector<HTMLElement>(`[data-criterion="${criterion}"]`);

    if (!section) continue;

    const directionSelect = section.querySelector<HTMLSelectElement>(`[data-criterion-direction="${criterion}"]`);
    const direction: CriterionDirection = (directionSelect?.value as CriterionDirection) || 'higher';

    const inputs = section.querySelectorAll<HTMLInputElement>('input[data-alternative-index]');
    const values: number[] = [];

    for (const input of inputs) {
      values.push(parseFloat(input.value) || 0);
    }

    const errorEl = section.querySelector<HTMLElement>('.validation-error');

    if (values.some((v) => v <= 0)) {
      if (errorEl) errorEl.textContent = 'All values must be positive numbers.';
      result[criterion] = values.map(() => values.map(() => 1));

      continue;
    }

    if (errorEl) errorEl.textContent = '';

    result[criterion] = convertToMatrix(values, direction);
  }

  return result;
}

function convertToMatrix(values: number[], direction: CriterionDirection): number[][] {
  const n = values.length;
  const matrix: number[][] = [];

  for (let i = 0; i < n; i++) {
    const row: number[] = [];

    for (let j = 0; j < n; j++) {
      if (i === j) {
        row.push(1);
      } else if (direction === 'higher') {
        row.push(values[i] / values[j]);
      } else {
        row.push(values[j] / values[i]);
      }
    }

    matrix.push(row);
  }

  return matrix;
}
