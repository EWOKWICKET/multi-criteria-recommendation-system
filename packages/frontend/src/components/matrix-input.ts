type MatrixInputParams = {
  container: HTMLElement;
  size: number;
  label: string;
  names: string[];
};

export function createMatrixInput({ container, size, label, names }: MatrixInputParams): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'matrix-input';

  const title = document.createElement('h4');
  title.textContent = label;
  wrapper.appendChild(title);

  const table = document.createElement('table');
  table.dataset['label'] = label;

  // Header row with names
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

    // Row label
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

export function readMatrix(table: HTMLTableElement): number[][] {
  const rows = table.querySelectorAll('tr');
  const matrix: number[][] = [];

  // Skip first row (header)
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
