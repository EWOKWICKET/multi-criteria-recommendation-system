type FormConfig = {
  onUpdate: (criteriaNames: string[], alternativeNames: string[]) => void;
};

export function createCriteriaForm(container: HTMLElement, config: FormConfig): void {
  const form = document.createElement('div');
  form.className = 'criteria-form';

  const criteriaSection = document.createElement('div');
  criteriaSection.className = 'form-group';
  criteriaSection.innerHTML = '<label>Criteria</label>';
  const criteriaList = createDynamicList(criteriaSection, 'Criterion name', 1);
  form.appendChild(criteriaSection);

  const alternativesSection = document.createElement('div');
  alternativesSection.className = 'form-group';
  alternativesSection.innerHTML = '<label>Alternatives</label>';
  const alternativesList = createDynamicList(alternativesSection, 'Alternative name', 2);
  form.appendChild(alternativesSection);

  const btn = document.createElement('button');
  btn.id = 'generate-matrices-btn';
  btn.type = 'button';
  btn.textContent = 'Generate Matrices';
  btn.className = 'primary-btn';
  form.appendChild(btn);

  container.appendChild(form);

  btn.addEventListener('click', () => {
    const criteria = criteriaList.getValues();
    const alternatives = alternativesList.getValues();

    if (criteria.length < 1 || alternatives.length < 2) {
      alert('Need at least 1 criterion and 2 alternatives.');

      return;
    }

    config.onUpdate(criteria, alternatives);
  });
}

type DynamicList = {
  getValues: () => string[];
};

function createDynamicList(container: HTMLElement, placeholder: string, minCount: number): DynamicList {
  const list = document.createElement('div');
  list.className = 'dynamic-list';
  container.appendChild(list);

  function addItem(value = ''): void {
    const item = document.createElement('div');
    item.className = 'dynamic-list-item';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.value = value;
    item.appendChild(input);

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '\u00d7';
    removeBtn.title = 'Remove';
    removeBtn.addEventListener('click', () => {
      if (list.children.length > minCount) {
        item.remove();
        updateRemoveButtons();
      }
    });
    item.appendChild(removeBtn);

    list.appendChild(item);
    updateRemoveButtons();
  }

  function updateRemoveButtons(): void {
    const items = list.querySelectorAll('.dynamic-list-item');
    const removeBtns = list.querySelectorAll<HTMLButtonElement>('.remove-btn');

    removeBtns.forEach((btn) => {
      btn.style.visibility = items.length > minCount ? 'visible' : 'hidden';
    });
  }

  // Add button
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'add-btn';
  addBtn.textContent = '+ Add';
  addBtn.addEventListener('click', () => addItem());
  container.appendChild(addBtn);

  // Initialize with minCount empty fields
  for (let i = 0; i < Math.max(minCount, 2); i++) {
    addItem();
  }

  return {
    getValues(): string[] {
      return Array.from(list.querySelectorAll<HTMLInputElement>('input'))
        .map((input) => input.value.trim())
        .filter((v) => v.length > 0);
    },
  };
}
