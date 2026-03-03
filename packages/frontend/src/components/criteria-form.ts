type FormConfig = {
  onUpdate: (criteriaNames: string[], alternativeNames: string[]) => void;
};

export function createCriteriaForm(container: HTMLElement, config: FormConfig): void {
  const form = document.createElement('div');
  form.className = 'criteria-form';
  form.innerHTML = `
    <div class="form-group">
      <label>Criteria (comma-separated):</label>
      <input type="text" id="criteria-input" placeholder="Price, Quality, Delivery" />
    </div>
    <div class="form-group">
      <label>Alternatives (comma-separated):</label>
      <input type="text" id="alternatives-input" placeholder="A1, A2, A3" />
    </div>
    <button id="generate-matrices-btn" type="button">Generate Matrices</button>
  `;

  container.appendChild(form);

  form.querySelector('#generate-matrices-btn')!.addEventListener('click', () => {
    const criteriaInput = form.querySelector<HTMLInputElement>('#criteria-input')!;
    const alternativesInput = form.querySelector<HTMLInputElement>('#alternatives-input')!;

    const criteria = parseCsv(criteriaInput.value);
    const alternatives = parseCsv(alternativesInput.value);

    if (criteria.length < 1 || alternatives.length < 2) {
      alert('Need at least 1 criterion and 2 alternatives.');

      return;
    }

    config.onUpdate(criteria, alternatives);
  });
}

function parseCsv(value: string): string[] {
  return value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
