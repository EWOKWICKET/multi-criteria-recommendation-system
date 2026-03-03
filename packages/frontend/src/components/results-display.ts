import type { AhpResponse, RecommendationResponse } from '../api/client';

export function renderAhpResults(container: HTMLElement, result: AhpResponse): void {
  const consistencyClass = result.isConsistent ? 'consistent' : 'inconsistent';
  const consistencyLabel = result.isConsistent ? 'Consistent' : 'Inconsistent';

  let html = `
    <div class="results">
      <h3>Results</h3>
      <p class="${consistencyClass}">Consistency: ${consistencyLabel}</p>

      <h4>Global Ranking</h4>
      <table class="results-table">
        <thead><tr><th>Rank</th><th>Alternative</th><th>Priority</th></tr></thead>
        <tbody>
  `;

  result.globalPriorities.forEach((item, i) => {
    const highlight = i === 0 ? ' class="winner"' : '';
    html += `<tr${highlight}>
      <td>${i + 1}</td>
      <td>${item.name}</td>
      <td>${item.priority.toFixed(4)}</td>
    </tr>`;
  });

  html += `</tbody></table>
    <p><strong>Winner: ${result.winner}</strong></p>

    <h4>Criteria Weights</h4>
    <ul>`;

  Object.entries(result.consistencyRatios).forEach(([name, cr]) => {
    html += `<li>${name}: CR = ${cr.toFixed(4)}</li>`;
  });

  html += `</ul></div>`;

  container.innerHTML = html;
}

export function renderRecommendationResults(container: HTMLElement, result: RecommendationResponse): void {
  let html = `
    <div class="results">
      <h3>Recommendation Results</h3>
      <div class="summary">
        <p>Original global priority: <strong>${result.originalGlobalPriority.toFixed(4)}</strong></p>
        <p>New global priority: <strong>${result.newGlobalPriority.toFixed(4)}</strong></p>
        <p>Leader global priority: <strong>${result.leaderGlobalPriority.toFixed(4)}</strong></p>
        <p>Became winner: <strong class="${result.isWinner ? 'consistent' : 'inconsistent'}">${result.isWinner ? 'Yes' : 'No'}</strong></p>
        <p>Total steps: <strong>${result.totalSteps}</strong></p>
      </div>
  `;

  if (result.steps.length > 0) {
    html += `
      <h4>Steps</h4>
      <table class="results-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Criterion</th>
            <th>Compared To</th>
            <th>Old Value</th>
            <th>New Value</th>
            <th>Local Priority</th>
            <th>Global Priority</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const step of result.steps) {
      html += `<tr>
        <td>${step.stepNumber}</td>
        <td>${step.criterion}</td>
        <td>${step.comparedTo}</td>
        <td>${step.oldValue.toFixed(4)}</td>
        <td>${step.newValue.toFixed(4)}</td>
        <td>${step.localPriorityAfterStep.toFixed(4)}</td>
        <td>${step.globalPriorityAfterStep.toFixed(4)}</td>
      </tr>`;
    }

    html += `</tbody></table>`;
  }

  html += `</div>`;

  container.innerHTML = html;
}
