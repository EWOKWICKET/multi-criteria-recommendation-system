import type { AhpResponse, RecommendationResponse } from '../api/client';

export type ComparisonEntry = {
  label: string;
  result: RecommendationResponse;
  timeMs: number;
};

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
    <table class="results-table">
      <thead><tr><th>Criterion</th><th>Weight</th><th>CR</th></tr></thead>
      <tbody>
  `;

  const criteriaNames = Object.keys(result.localPriorities);
  result.criteriaWeights.forEach((w, i) => {
    const name = criteriaNames[i] ?? `C${i + 1}`;
    const cr = result.consistencyRatios[name] ?? 0;

    html += `<tr>
      <td>${name}</td>
      <td>${w.toFixed(4)}</td>
      <td>${cr.toFixed(4)}</td>
    </tr>`;
  });

  html += `</tbody></table>
    <p>Criteria CR: ${(result.consistencyRatios['criteria'] ?? 0).toFixed(4)}</p>

    <h4>Local Priorities</h4>
    <table class="results-table">
      <thead><tr><th>Alternative</th>`;

  for (const name of criteriaNames) {
    html += `<th>${name}</th>`;
  }

  html += `</tr></thead><tbody>`;

  const altNames = result.globalPriorities.map((g) => g.name);
  const firstCriterion = criteriaNames[0];
  const originalAltCount = firstCriterion ? (result.localPriorities[firstCriterion]?.length ?? 0) : 0;

  for (let j = 0; j < originalAltCount; j++) {
    html += `<tr><td>${altNames[j] ?? `A${j + 1}`}</td>`;

    for (const criterion of criteriaNames) {
      const lp = result.localPriorities[criterion];
      html += `<td>${lp ? (lp[j]?.toFixed(4) ?? '-') : '-'}</td>`;
    }

    html += `</tr>`;
  }

  html += `</tbody></table></div>`;

  container.innerHTML = html;
}

export function renderRecommendationResults(container: HTMLElement, result: RecommendationResponse): void {
  let html = `
    <div class="results">
      <h3>Recommendation Results</h3>
      <div class="summary">
        <p>Original global priority: <strong>${result.originalGlobalPriority.toFixed(4)}</strong></p>
        <p>New global priority: <strong>${result.newGlobalPriority.toFixed(4)}</strong></p>
        <p>Leader global priority (before): <strong>${result.leaderGlobalPriority.toFixed(4)}</strong></p>
        <p>Leader global priority (after): <strong>${result.leaderGlobalPriorityAfter.toFixed(4)}</strong></p>
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

export function renderComparisonResults(container: HTMLElement, entries: ComparisonEntry[]): void {
  let html = `
    <div class="results">
      <h3>Algorithm Comparison</h3>
      <table class="results-table comparison-table">
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Steps</th>
            <th>Gap</th>
            <th>Time (ms)</th>
          </tr>
        </thead>
        <tbody>
  `;

  for (const e of entries) {
    const gap = e.result.newGlobalPriority - e.result.leaderGlobalPriorityAfter;
    const gapStr = (gap >= 0 ? '+' : '') + gap.toFixed(4);
    const gapClass = gap >= 0 ? 'consistent' : 'inconsistent';

    html += `<tr>
      <td>${e.label}</td>
      <td>${e.result.totalSteps}</td>
      <td class="${gapClass}">${gapStr}</td>
      <td>${e.timeMs.toFixed(1)}</td>
    </tr>`;
  }

  html += `</tbody></table>`;

  const totalAlgos = entries.length;
  const avgSteps = entries.reduce((sum, e) => sum + e.result.totalSteps, 0) / totalAlgos;
  const avgTime = entries.reduce((sum, e) => sum + e.timeMs, 0) / totalAlgos;

  html += `
    <div class="comparison-summary">
      <h4>Summary</h4>
      <p>Average steps: <strong>${avgSteps.toFixed(1)}</strong></p>
      <p>Average time: <strong>${avgTime.toFixed(1)} ms</strong></p>
    </div>
  `;

  html += `</div>`;

  container.innerHTML = html;
}
