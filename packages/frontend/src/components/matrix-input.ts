type MatrixInputParams = {
  container: HTMLElement;
  size: number;
  label: string;
  names: string[];
};

function createMatrixInput({ container, size, label, names }: MatrixInputParams): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'matrix-input';

  const title = document.createElement('h4');
  title.textContent = label;
  wrapper.appendChild(title);

  const table = document.createElement('table');
  table.dataset['label'] = label;

  const thead = document.createElement('tr');
  thead.appendChild(document.createElement('th')); // empty corner cell

  for (const name of names) {
    const th = document.createElement('th');
    th.textContent = name;
    thead.appendChild(th);
  }

  table.appendChild(thead);

  for (let i = 0; i < size; i++) {
    const row = document.createElement('tr');

    const rowLabel = document.createElement('th');
    rowLabel.textContent = names[i] ?? `${i + 1}`;
    row.appendChild(rowLabel);

    for (let j = 0; j < size; j++) {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      input.step = 'any';
      input.value = i === j ? '1' : '';
      input.disabled = i === j;
      input.dataset['row'] = String(i);
      input.dataset['col'] = String(j);
      input.title = `${names[i]} vs ${names[j]}`;

      input.addEventListener('input', () => {
        fillReciprocal({ table, row: i, col: j, value: input.value });
      });

      cell.appendChild(input);
      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  wrapper.appendChild(table);
  container.appendChild(wrapper);
}

type ReciprocalParams = {
  table: HTMLTableElement;
  row: number;
  col: number;
  value: string;
};

function fillReciprocal({ table, row, col, value }: ReciprocalParams): void {
  const val = parseFloat(value);
  if (!val || val === 0) return;

  const reciprocal = table.querySelector<HTMLInputElement>(`input[data-row="${col}"][data-col="${row}"]`);

  if (reciprocal) {
    reciprocal.value = String(+(1 / val).toFixed(4));
  }
}

function readMatrix(table: HTMLTableElement): number[][] {
  const rows = table.querySelectorAll('tr');
  const matrix: number[][] = [];

  rows.forEach((row, idx) => {
    if (idx === 0) return;

    const cells: number[] = [];

    row.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
      cells.push(parseFloat(input.value) || 0);
    });

    matrix.push(cells);
  });

  return matrix;
}

type CriteriaMatrixParams = {
  container: HTMLElement;
  criteria: string[];
};

export function createCriteriaMatrixInput({ container, criteria }: CriteriaMatrixParams): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'criteria-matrix-wrapper';

  // Mode toggle
  const toggle = document.createElement('div');
  toggle.className = 'criteria-mode-toggle';

  const pairwiseBtn = document.createElement('button');
  pairwiseBtn.type = 'button';
  pairwiseBtn.textContent = 'Pairwise Comparison';
  pairwiseBtn.className = 'toggle-btn active';

  const simpleBtn = document.createElement('button');
  simpleBtn.type = 'button';
  simpleBtn.textContent = 'Simple Ratings';
  simpleBtn.className = 'toggle-btn';

  toggle.appendChild(pairwiseBtn);
  toggle.appendChild(simpleBtn);
  wrapper.appendChild(toggle);

  // Pairwise mode
  const pairwiseSection = document.createElement('div');
  pairwiseSection.className = 'criteria-pairwise-section';

  const explanation = document.createElement('p');
  explanation.className = 'section-description';
  explanation.textContent =
    'Rate how much more important each row criterion is compared to each column. ' +
    'Value 3 means the row is 3x more important. Reciprocals are filled automatically.';
  pairwiseSection.appendChild(explanation);

  createMatrixInput({
    container: pairwiseSection,
    size: criteria.length,
    label: 'Criteria',
    names: criteria,
  });
  wrapper.appendChild(pairwiseSection);

  // Simple ratings mode
  const simpleSection = document.createElement('div');
  simpleSection.className = 'criteria-simple-section';
  simpleSection.style.display = 'none';

  const simpleExplanation = document.createElement('p');
  simpleExplanation.className = 'section-description';
  simpleExplanation.textContent =
    'Rate the importance of each criterion with any positive number. ' +
    'Higher number means more important. The system will convert to comparison ratios.';
  simpleSection.appendChild(simpleExplanation);

  const ratingsList = document.createElement('div');
  ratingsList.className = 'simple-ratings';

  for (let i = 0; i < criteria.length; i++) {
    const item = document.createElement('div');
    item.className = 'simple-rating-item';

    const label = document.createElement('label');
    label.textContent = criteria[i];
    item.appendChild(label);

    const input = document.createElement('input');
    input.type = 'number';
    input.step = 'any';
    input.min = '0';
    input.placeholder = '1';
    input.dataset['criterionRating'] = String(i);
    item.appendChild(input);

    ratingsList.appendChild(item);
  }

  simpleSection.appendChild(ratingsList);
  wrapper.appendChild(simpleSection);

  // Toggle logic
  pairwiseBtn.addEventListener('click', () => {
    pairwiseBtn.classList.add('active');
    simpleBtn.classList.remove('active');
    pairwiseSection.style.display = '';
    simpleSection.style.display = 'none';
  });

  simpleBtn.addEventListener('click', () => {
    simpleBtn.classList.add('active');
    pairwiseBtn.classList.remove('active');
    simpleSection.style.display = '';
    pairwiseSection.style.display = 'none';
  });

  container.appendChild(wrapper);
}

export function readCriteriaMatrix(wrapper: HTMLElement): number[][] {
  const pairwiseSection = wrapper.querySelector<HTMLElement>('.criteria-pairwise-section');
  const simpleSection = wrapper.querySelector<HTMLElement>('.criteria-simple-section');

  const isPairwise = pairwiseSection?.style.display !== 'none';

  if (isPairwise) {
    const table = pairwiseSection?.querySelector<HTMLTableElement>('table');

    if (!table) return [];

    return readMatrix(table);
  }

  // Simple ratings mode: convert ratings to pairwise matrix
  const inputs = simpleSection?.querySelectorAll<HTMLInputElement>('input[data-criterion-rating]');

  if (!inputs) return [];

  const ratings: number[] = [];

  for (const input of inputs) {
    const val = parseFloat(input.value) || 1;
    ratings.push(val > 0 ? val : 1);
  }

  const n = ratings.length;
  const matrix: number[][] = [];

  for (let i = 0; i < n; i++) {
    const row: number[] = [];

    for (let j = 0; j < n; j++) {
      row.push(ratings[i] / ratings[j]);
    }

    matrix.push(row);
  }

  return matrix;
}
