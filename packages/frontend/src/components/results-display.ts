import type { AhpResponse, RecommendationResponse } from '../api/client';
import { CriterionDirection, type RawCriterionData } from './raw-value-input';

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

type RenderRecommendationParams = {
  container: HTMLElement;
  result: RecommendationResponse;
  rawValues?: Record<string, RawCriterionData>;
  alternativeNames?: string[];
  targetIndex?: number;
};

function formatRealValue(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

type RealValueContext = {
  rawValues: Record<string, RawCriterionData>;
  modifiedMatrices: Record<string, number[][]>;
  targetIndex: number;
};

function computeNewRealValue(criterion: string, ctx: RealValueContext): string | null {
  const raw = ctx.rawValues[criterion];

  if (!raw) return null;

  const matrix = ctx.modifiedMatrices[criterion];

  if (!matrix) return null;

  // Find a reference alternative (any j != targetIndex) to back-compute the real value
  for (let j = 0; j < raw.values.length; j++) {
    if (j === ctx.targetIndex || !raw.values[j]) continue;

    const pairwise = matrix[ctx.targetIndex][j];

    if (raw.direction === CriterionDirection.Higher) {
      return formatRealValue(pairwise * raw.values[j]);
    }

    return formatRealValue(raw.values[j] / pairwise);
  }

  return null;
}

export function renderRecommendationResults({
  container,
  result,
  rawValues,
  alternativeNames,
  targetIndex,
}: RenderRecommendationParams): void {
  const hasRaw = rawValues && alternativeNames && targetIndex !== undefined;

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

  if (result.actions.length > 0) {
    const targetName = hasRaw ? alternativeNames[targetIndex] : '';
    const showRealValues = hasRaw;

    html += `
      <h4>Actions (${result.actions.length} criteria, ${result.totalSteps} steps)</h4>
      <table class="results-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Criterion</th>
            ${showRealValues ? `<th>Old (${targetName})</th><th>New (${targetName})</th>` : ''}
            <th>Steps</th>
            <th>LP Before</th>
            <th>LP After</th>
            <th>Global Priority</th>
          </tr>
        </thead>
        <tbody>
    `;

    result.actions.forEach((a, i) => {
      let realCols = '';

      if (showRealValues) {
        const oldReal = formatRealValue(rawValues[a.criterion]?.values[targetIndex] ?? 0);
        const newReal =
          computeNewRealValue(a.criterion, { rawValues, modifiedMatrices: result.modifiedMatrices, targetIndex }) ??
          '-';
        realCols = `<td>${oldReal}</td><td>${newReal}</td>`;
      }

      html += `<tr>
        <td>${i + 1}</td>
        <td>${a.criterion}</td>
        ${realCols}
        <td>${a.steps}</td>
        <td>${a.localPriorityBefore.toFixed(4)}</td>
        <td>${a.localPriorityAfter.toFixed(4)}</td>
        <td>${a.globalPriorityAfter.toFixed(4)}</td>
      </tr>`;
    });

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
            <th>Winner</th>
            <th>Gap</th>
            <th>Time (ms)</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Find best: among winners, fewest steps; tiebreak by smallest gap
  const winnersWithSteps = entries.filter((e) => e.result.isWinner && e.result.totalSteps > 0);
  let bestSteps = Infinity;
  let bestGap = Infinity;

  for (const e of winnersWithSteps) {
    const gap = Math.abs(e.result.newGlobalPriority - e.result.leaderGlobalPriorityAfter);

    if (e.result.totalSteps < bestSteps || (e.result.totalSteps === bestSteps && gap < bestGap)) {
      bestSteps = e.result.totalSteps;
      bestGap = gap;
    }
  }

  for (const e of entries) {
    const gap = e.result.newGlobalPriority - e.result.leaderGlobalPriorityAfter;
    const gapStr = (gap >= 0 ? '+' : '') + gap.toFixed(4);
    const gapClass = gap >= 0 ? 'consistent' : 'inconsistent';
    const absGap = Math.abs(gap);
    const isBest = e.result.isWinner && e.result.totalSteps === bestSteps && Math.abs(absGap - bestGap) < 1e-6;
    const winnerStr = e.result.isWinner ? (isBest ? 'Best' : 'Yes') : 'No';
    const winnerClass = isBest ? 'consistent' : e.result.isWinner ? '' : 'inconsistent';

    html += `<tr>
      <td>${e.label}</td>
      <td>${e.result.totalSteps}</td>
      <td class="${winnerClass}">${winnerStr}</td>
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
