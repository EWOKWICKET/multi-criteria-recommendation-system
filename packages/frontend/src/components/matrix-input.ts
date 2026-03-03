export function createMatrixInput(container: HTMLElement, size: number, label: string): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'matrix-input';

  const title = document.createElement('h4');
  title.textContent = label;
  wrapper.appendChild(title);

  const table = document.createElement('table');
  table.dataset['label'] = label;

  for (let i = 0; i < size; i++) {
    const row = document.createElement('tr');

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

  rows.forEach((row) => {
    const cells: number[] = [];

    row.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
      cells.push(parseFloat(input.value) || 0);
    });

    matrix.push(cells);
  });

  return matrix;
}
