/**
 * Generates 1000 hard experiments + edge cases, runs all 5 recommendation algorithms,
 * and writes summary statistics to experiments.md.
 */

const BASE = 'http://localhost:3000/api';
const ALGORITHMS = ['global-leader', 'local-leader', 'global-average', 'local-average', 'adaptive-strategy'] as const;
const ALGO_LABELS: Record<string, string> = {
  'global-leader': 'Global Leader',
  'local-leader': 'Local Leader',
  'global-average': 'Global Average',
  'local-average': 'Local Average',
  'adaptive-strategy': 'Adaptive Strategy',
};

type ExperimentConfig = {
  id: number;
  name: string;
  criteriaNames: string[];
  alternativeNames: string[];
  criteriaMatrix: number[][];
  alternativeMatrices: Record<string, number[][]>;
};

type AlgoResult = {
  algorithm: string;
  label: string;
  totalSteps: number;
  isWinner: boolean;
  originalGlobalPriority: number;
  newGlobalPriority: number;
  leaderGlobalPriority: number;
  leaderGlobalPriorityAfter: number;
  gap: number;
  timeMs: number;
};

type ExperimentResult = {
  config: ExperimentConfig;
  ahpWinner: string;
  winnerPriority: number;
  targetAlternative: string;
  targetIndex: number;
  targetOriginalPriority: number;
  priorityGapBeforeImprovement: number;
  results: AlgoResult[];
};

// --- RNG & Matrix Generators ---

function mulberry32(seed: number): () => number {
  let s = seed | 0;

  return (): number => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNames(prefix: string, n: number): string[] {
  return Array.from({ length: n }, (_, i) => `${prefix}${i + 1}`);
}

function emptyMatrix(n: number): number[][] {
  return Array.from({ length: n }, () => Array(n).fill(1));
}

// eslint-disable-next-line max-params
function fillSymmetric(matrix: number[][], i: number, j: number, val: number): void {
  const v = Math.min(val, 9);
  matrix[i][j] = v;
  matrix[j][i] = 1 / v;
}

const SAATY_17 = [1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function generateCriteriaMatrix(n: number, rng: () => number): number[][] {
  const m = emptyMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const r = rng();
      const idx = r < 0.4 ? Math.floor(rng() * 3) + 6 : r < 0.7 ? Math.floor(rng() * 3) + 3 : Math.floor(rng() * 3);
      fillSymmetric(m, i, j, [1, 2, 3, 4, 5, 6, 7, 8, 9][idx]);
    }
  }

  return m;
}

type DominanceParams = { m: number; dominantIdx: number; weakIdx: number; rng: () => number };

function generateDominanceMatrix({ m, dominantIdx, weakIdx, rng }: DominanceParams): number[][] {
  const matrix = emptyMatrix(m);
  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      let val: number;
      if (i === dominantIdx) {
        val = SAATY_17[Math.floor(rng() * 4) + 13]; // 6-9
      } else if (j === weakIdx || i === weakIdx) {
        val = i === weakIdx ? SAATY_17[Math.floor(rng() * 4)] : SAATY_17[Math.floor(rng() * 4) + 13];
      } else {
        val = SAATY_17[Math.floor(rng() * SAATY_17.length)];
      }
      matrix[i][j] = val;
      matrix[j][i] = 1 / val;
    }
  }

  return matrix;
}

// Build alternative matrix with per-pair value rules
type PairRule = (i: number, j: number, rng: () => number) => number;

function buildAltMatrix(n: number, rng: () => number, rule: PairRule): number[][] {
  const m = emptyMatrix(n);
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) fillSymmetric(m, i, j, rule(i, j, rng));

  return m;
}

// --- Experiment Generators ---

type ExperimentParams = { id: number; nCriteria: number; nAlternatives: number; seed: number };

function generateHardExperiment({ id, nCriteria: nC, nAlternatives: nA, seed }: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = makeNames('C', nC);
  const alternativeNames = makeNames('A', nA);
  const criteriaMatrix = generateCriteriaMatrix(nC, rng);

  const dominantIdx = Math.floor(rng() * nA);
  let weakIdx = Math.floor(rng() * nA);
  while (weakIdx === dominantIdx) weakIdx = Math.floor(rng() * nA);

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let c = 0; c < nC; c++) {
    const d = rng() < 0.8 ? dominantIdx : Math.floor(rng() * nA);
    alternativeMatrices[criteriaNames[c]] = generateDominanceMatrix({ m: nA, dominantIdx: d, weakIdx, rng });
  }

  return {
    id,
    name: `Exp ${id}: ${nC}C x ${nA}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// Edge: low-weight criteria first with large gaps, high-weight last with small gaps
function generateEdgeCaseExperiment({
  id,
  nCriteria: nC,
  nAlternatives: nA,
  seed,
}: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = makeNames('C', nC);
  const alternativeNames = makeNames('A', nA);

  const criteriaMatrix = emptyMatrix(nC);
  for (let i = 0; i < nC; i++)
    for (let j = i + 1; j < nC; j++) {
      const val = Math.min(9, 1 + (j - i) * 2 + Math.floor(rng() * 2));
      criteriaMatrix[i][j] = 1 / val;
      criteriaMatrix[j][i] = val;
    }

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let c = 0; c < nC; c++) {
    if (c < Math.floor(nC / 2)) {
      alternativeMatrices[criteriaNames[c]] = generateDominanceMatrix({ m: nA, dominantIdx: 0, weakIdx: nA - 1, rng });
    } else {
      alternativeMatrices[criteriaNames[c]] = buildAltMatrix(nA, rng, (i, j) =>
        i === 0 ? 2 + Math.floor(rng() * 2) : j === nA - 1 ? 1 + Math.floor(rng() * 2) : 1 + Math.floor(rng() * 2)
      );
    }
  }

  return {
    id,
    name: `Edge ${id}: ${nC}C x ${nA}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// Edge 1: Non-leader alt holds local max, leader moderate — Local Leader grinds excessively
function generateLLExcessiveExperiment({
  id,
  nCriteria: nC,
  nAlternatives: nA,
  seed,
}: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = makeNames('C', nC);
  const alternativeNames = makeNames('A', nA);

  const criteriaMatrix = emptyMatrix(nC);
  for (let i = 0; i < nC; i++)
    for (let j = i + 1; j < nC; j++) fillSymmetric(criteriaMatrix, i, j, 1 + Math.floor(rng() * 2));

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let c = 0; c < nC; c++) {
    alternativeMatrices[criteriaNames[c]] = buildAltMatrix(nA, rng, (i, j) => {
      if (i === 1) return 7 + Math.floor(rng() * 3); // local dominator (alt 1)
      if (i === 0) return 3 + Math.floor(rng() * 2); // leader moderate
      if (j === nA - 1) return 2 + Math.floor(rng() * 3); // others beat target

      return 1 + Math.floor(rng() * 2);
    });
  }

  return {
    id,
    name: `Edge LL-Excess ${id}: ${nC}C x ${nA}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// Edge 2: Target above average on low-weight criteria — conservative algorithms skip and win
function generateConservativeExperiment({
  id,
  nCriteria: nC,
  nAlternatives: nA,
  seed,
}: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = makeNames('C', nC);
  const alternativeNames = makeNames('A', nA);
  const w = nA - 1; // weak/target index

  const criteriaMatrix = emptyMatrix(nC);
  for (let i = 0; i < nC; i++)
    for (let j = i + 1; j < nC; j++) {
      const val = Math.min(9, 1 + (j - i) * 3);
      criteriaMatrix[i][j] = 1 / val;
      criteriaMatrix[j][i] = val;
    }

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let c = 0; c < nC; c++) {
    const isLow = c < Math.ceil(nC * 0.6);
    alternativeMatrices[criteriaNames[c]] = buildAltMatrix(nA, rng, (i, j) => {
      if (isLow) {
        if (j === w) return 1;
        if (i === w) return 2 + Math.floor(rng() * 2);
        if (i === 0) return 3 + Math.floor(rng() * 3);

        return 1 + Math.floor(rng() * 2);
      }
      if (i === 0) return 2 + Math.floor(rng() * 2);
      if (j === w) return 2;
      if (i === w) return 1;

      return 1 + Math.floor(rng() * 2);
    });
  }

  return {
    id,
    name: `Edge Conserv ${id}: ${nC}C x ${nA}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// Edge 3: Only Adaptive wins — leader holds max on half, different alt on other half
function generateAdaptiveOnlyExperiment({
  id,
  nCriteria: nC,
  nAlternatives: nA,
  seed,
}: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = makeNames('C', nC);
  const alternativeNames = makeNames('A', nA);
  const w = nA - 1;

  const criteriaMatrix = emptyMatrix(nC);
  for (let i = 0; i < nC; i++)
    for (let j = i + 1; j < nC; j++) fillSymmetric(criteriaMatrix, i, j, 2 + Math.floor(rng() * 3));

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let c = 0; c < nC; c++) {
    const leaderMax = c < Math.floor(nC / 2);
    alternativeMatrices[criteriaNames[c]] = buildAltMatrix(nA, rng, (i, j) => {
      if (leaderMax) {
        if (i === 0) return 5 + Math.floor(rng() * 3);
        if (j === w) return 3 + Math.floor(rng() * 2);

        return 1 + Math.floor(rng() * 2);
      }
      if (i === 1) return 6 + Math.floor(rng() * 3); // alt 1 holds local max
      if (i === 0) return 3 + Math.floor(rng() * 2); // leader moderate
      if (j === w) return 4 + Math.floor(rng() * 2);

      return 1 + Math.floor(rng() * 3);
    });
  }

  return {
    id,
    name: `Edge Adaptive ${id}: ${nC}C x ${nA}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// Edge 4: 12-15 criteria, extreme weight skew — last 3 high-weight, rest low
function generateHighCriteriaExperiment({
  id,
  nCriteria: nC,
  nAlternatives: nA,
  seed,
}: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = makeNames('C', nC);
  const alternativeNames = makeNames('A', nA);
  const hw = nC - 3;

  const criteriaMatrix = emptyMatrix(nC);
  for (let i = 0; i < nC; i++)
    for (let j = i + 1; j < nC; j++) {
      const val = j >= hw && i < hw ? 7 + Math.floor(rng() * 3) : 1 + Math.floor(rng() * 2);
      criteriaMatrix[i][j] = 1 / val;
      criteriaMatrix[j][i] = val;
    }

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let c = 0; c < nC; c++) {
    if (c < hw) {
      alternativeMatrices[criteriaNames[c]] = generateDominanceMatrix({ m: nA, dominantIdx: 0, weakIdx: nA - 1, rng });
    } else {
      alternativeMatrices[criteriaNames[c]] = buildAltMatrix(nA, rng, (i) =>
        i === 0 ? 2 + Math.floor(rng() * 2) : 1 + Math.floor(rng() * 2)
      );
    }
  }

  return {
    id,
    name: `Edge HiCrit ${id}: ${nC}C x ${nA}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// Edge 5: One dominant criterion (~70% weight), position first or last
function generateDominantCriterionExperiment(
  { id, nCriteria: nC, nAlternatives: nA, seed }: ExperimentParams,
  first: boolean
): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = makeNames('C', nC);
  const alternativeNames = makeNames('A', nA);
  const domIdx = first ? 0 : nC - 1;
  const w = nA - 1;

  const criteriaMatrix = emptyMatrix(nC);
  for (let i = 0; i < nC; i++)
    for (let j = i + 1; j < nC; j++) {
      if (i === domIdx || j === domIdx) {
        const val = 9;
        criteriaMatrix[i === domIdx ? i : j][i === domIdx ? j : i] = val;
        criteriaMatrix[i === domIdx ? j : i][i === domIdx ? i : j] = 1 / val;
      } else {
        fillSymmetric(criteriaMatrix, i, j, 1 + Math.floor(rng() * 2));
      }
    }

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let c = 0; c < nC; c++) {
    const isDom = c === domIdx;
    alternativeMatrices[criteriaNames[c]] = buildAltMatrix(nA, rng, (i, j) => {
      if (isDom) {
        if (i === 0) return 3 + Math.floor(rng() * 2);
        if (j === w) return 2;

        return 1 + Math.floor(rng() * 2);
      }
      if (i === 0) return 5 + Math.floor(rng() * 4);
      if (j === w) return 3 + Math.floor(rng() * 3);

      return 1 + Math.floor(rng() * 3);
    });
  }

  const label = first ? 'DomFirst' : 'DomLast';

  return {
    id,
    name: `Edge ${label} ${id}: ${nC}C x ${nA}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// Edge 6: All criteria equal weight (identity criteria matrix)
function generateEqualWeightsExperiment({
  id,
  nCriteria: nC,
  nAlternatives: nA,
  seed,
}: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = makeNames('C', nC);
  const alternativeNames = makeNames('A', nA);
  const criteriaMatrix = emptyMatrix(nC);

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let c = 0; c < nC; c++)
    alternativeMatrices[criteriaNames[c]] = generateDominanceMatrix({ m: nA, dominantIdx: 0, weakIdx: nA - 1, rng });

  return {
    id,
    name: `Edge EqWt ${id}: ${nC}C x ${nA}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// Edge 7: Target is close second, tiny gap — 1 step on 1 criterion suffices
function generateCloseSecondExperiment({
  id,
  nCriteria: nC,
  nAlternatives: nA,
  seed,
}: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = makeNames('C', nC);
  const alternativeNames = makeNames('A', nA);
  const w = nA - 1;

  const criteriaMatrix = emptyMatrix(nC);
  for (let i = 0; i < nC; i++)
    for (let j = i + 1; j < nC; j++) fillSymmetric(criteriaMatrix, i, j, 1 + Math.floor(rng() * 2));

  const alternativeMatrices: Record<string, number[][]> = {};
  for (let c = 0; c < nC; c++) {
    alternativeMatrices[criteriaNames[c]] = buildAltMatrix(nA, rng, (i, j) => {
      if (c === 0) {
        // only criterion 0 has a deficit
        if (i === 0 && j === w) return 2;
        if (i === 0) return 1 + Math.floor(rng() * 2);

        return 1;
      }
      if (i === 0 && j === w) return 1;

      return 1 + Math.floor(rng() * 1);
    });
  }

  return {
    id,
    name: `Edge Close ${id}: ${nC}C x ${nA}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// --- HTTP & Runner ---

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`${res.status}: ${(err as { message?: string }).message || 'unknown'}`);
  }

  return res.json() as T;
}

async function runExperiment(config: ExperimentConfig): Promise<ExperimentResult> {
  const ahp = await post<{ globalPriorities: { name: string; priority: number }[]; winner: string }>(
    `${BASE}/ahp/solve`,
    {
      criteriaMatrix: config.criteriaMatrix,
      alternativeMatrices: config.alternativeMatrices,
      criteriaNames: config.criteriaNames,
      alternativeNames: config.alternativeNames,
    }
  );

  const sorted = [...ahp.globalPriorities].sort((a, b) => a.priority - b.priority);
  const target = sorted[0];
  const targetIndex = config.alternativeNames.indexOf(target.name);
  const winnerPriority = ahp.globalPriorities[0].priority;

  const body = {
    criteriaMatrix: config.criteriaMatrix,
    alternativeMatrices: config.alternativeMatrices,
    criteriaNames: config.criteriaNames,
    alternativeNames: config.alternativeNames,
    targetAlternativeIndex: targetIndex,
  };

  const results: AlgoResult[] = [];
  for (const algo of ALGORITHMS) {
    const start = performance.now();
    try {
      const res = await post<{
        totalSteps: number;
        isWinner: boolean;
        originalGlobalPriority: number;
        newGlobalPriority: number;
        leaderGlobalPriority: number;
        leaderGlobalPriorityAfter: number;
      }>(`${BASE}/recommendations/${algo}`, body);
      const timeMs = performance.now() - start;

      results.push({
        algorithm: algo,
        label: ALGO_LABELS[algo],
        totalSteps: res.totalSteps,
        isWinner: res.isWinner,
        originalGlobalPriority: res.originalGlobalPriority,
        newGlobalPriority: res.newGlobalPriority,
        leaderGlobalPriority: res.leaderGlobalPriority,
        leaderGlobalPriorityAfter: res.leaderGlobalPriorityAfter,
        gap: res.newGlobalPriority - res.leaderGlobalPriorityAfter,
        timeMs,
      });
    } catch (err) {
      results.push({
        algorithm: algo,
        label: ALGO_LABELS[algo],
        totalSteps: -1,
        isWinner: false,
        originalGlobalPriority: 0,
        newGlobalPriority: 0,
        leaderGlobalPriority: 0,
        leaderGlobalPriorityAfter: 0,
        gap: 0,
        timeMs: performance.now() - start,
      });
      console.error(`  [FAIL] ${algo}: ${(err as Error).message}`);
    }
  }

  return {
    config,
    ahpWinner: ahp.winner,
    winnerPriority,
    targetAlternative: target.name,
    targetIndex,
    targetOriginalPriority: target.priority,
    priorityGapBeforeImprovement: winnerPriority - target.priority,
    results,
  };
}

// --- Formatting ---

const EDGE_CASE_DESCRIPTIONS = [
  [
    'Low-weight first',
    'Low-weight criteria come first with large local gaps; high-weight criteria last with small gaps. Forces Local Leader to grind through unimportant criteria.',
  ],
  [
    'LL-Excessive',
    'Non-leader alternative holds local max (Saaty 7-9). Leader is moderate (3-4). Local Leader grinds to reach high local max while Global Leader/Adaptive match the moderate leader.',
  ],
  [
    'Conservative wins',
    'Target already above average on low-weight criteria. Conservative algorithms (Global/Local Average) skip those and do 1-2 steps on high-weight criteria.',
  ],
  [
    'Adaptive-only',
    "Leader holds max on half the criteria, different alt on the other half. Single-strategy matching may not suffice, but Adaptive's two-stage approach succeeds.",
  ],
  [
    'High-criteria stress',
    '12-15 criteria with extreme weight skew. First 10 low-weight, last 2-3 high-weight. Penalizes algorithms that grind through all criteria.',
  ],
  [
    'Dominant criterion',
    'One criterion has ~70% weight. Tested with dominant criterion first vs last in array. When last, algorithms waste steps on unimportant criteria.',
  ],
  [
    'Equal weights',
    'All criteria have exactly equal weight (identity matrix). Pure comparison of step counts without weight effects.',
  ],
  [
    'Close second',
    'Target is second-best with tiny gap. Only 1 criterion has a deficit. Conservative algorithms win with 1-2 steps.',
  ],
];

/**
 * Find the best algorithm(s) for an experiment.
 * Among winners: fewest steps wins. Tiebreaker: smallest gap (least overshoot).
 */
function findBestAlgorithms(exp: ExperimentResult): AlgoResult[] {
  const winners = exp.results.filter((r) => r.isWinner && r.totalSteps > 0);

  if (winners.length === 0) return [];

  const minSteps = Math.min(...winners.map((r) => r.totalSteps));
  const fewestSteps = winners.filter((r) => r.totalSteps === minSteps);

  const minGap = Math.min(...fewestSteps.map((r) => Math.abs(r.gap)));

  return fewestSteps.filter((r) => Math.abs(Math.abs(r.gap) - minGap) < 1e-6);
}

function formatResults(experiments: ExperimentResult[]): string {
  const randomCount = experiments.filter((e) => !e.config.name.startsWith('Edge')).length;
  const edgeCount = experiments.filter((e) => e.config.name.startsWith('Edge')).length;
  let md = `# Experiment Results: Algorithm Comparison (${randomCount} Random + ${edgeCount} Edge Cases)\n\n`;
  md += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
  md += `**Total experiments:** ${experiments.length}\n`;
  md += `**Algorithms:** ${ALGORITHMS.map((a) => ALGO_LABELS[a]).join(', ')}\n`;
  md += `**Strategy:** Always target the worst alternative (maximum gap to leader)\n\n`;

  // Edge case descriptions
  md += '## Edge Case Types\n\n';
  for (const [name, desc] of EDGE_CASE_DESCRIPTIONS) {
    md += `- **${name}:** ${desc}\n`;
  }
  md += '\n---\n\n';

  // ===== GLOBAL SUMMARY =====
  md += '## Global Summary\n\n';

  // Overall Statistics
  md += '### Overall Statistics\n\n';
  md += '| Algorithm | Avg Steps | Median Steps | Win Rate | Avg Gap | Avg Time (ms) | Min Steps | Max Steps |\n';
  md += '|-----------|----------:|-------------:|---------:|--------:|--------------:|----------:|----------:|\n';

  for (const algo of ALGORITHMS) {
    const runs = experiments.map((e) => e.results.find((r) => r.algorithm === algo)!).filter((r) => r.totalSteps >= 0);
    const wins = runs.filter((r) => r.isWinner).length;
    const steps = runs.map((r) => r.totalSteps).sort((a, b) => a - b);
    const avgSteps = steps.reduce((s, v) => s + v, 0) / steps.length;
    const medianSteps = steps[Math.floor(steps.length / 2)];
    const avgGap = runs.reduce((s, r) => s + r.gap, 0) / runs.length;
    const avgTime = runs.reduce((s, r) => s + r.timeMs, 0) / runs.length;

    md += `| ${ALGO_LABELS[algo]} | ${avgSteps.toFixed(1)} | ${medianSteps} | ${wins}/${runs.length} (${((wins / runs.length) * 100).toFixed(0)}%) | ${(avgGap >= 0 ? '+' : '') + avgGap.toFixed(4)} | ${avgTime.toFixed(1)} | ${steps[0]} | ${steps[steps.length - 1]} |\n`;
  }
  md += '\n';

  // Random vs Edge Cases
  md += '### Random vs Edge Case Experiments\n\n';
  md += '| Category | Experiments | ';
  for (const algo of ALGORITHMS) md += `${ALGO_LABELS[algo]} (avg steps) | `;
  md += '\n|----------|------------:|';
  for (let i = 0; i < ALGORITHMS.length; i++) md += '---:|';
  md += '\n';

  for (const [label, filterFn] of [
    ['Random', (e: ExperimentResult): boolean => !e.config.name.startsWith('Edge')] as const,
    ['Edge Cases', (e: ExperimentResult): boolean => e.config.name.startsWith('Edge')] as const,
  ]) {
    const subset = experiments.filter(filterFn);
    if (subset.length === 0) continue;
    md += `| ${label} | ${subset.length} | `;
    for (const algo of ALGORITHMS) {
      const runs = subset.flatMap((e) => e.results.filter((r) => r.algorithm === algo && r.totalSteps >= 0));
      md += `${(runs.reduce((s, r) => s + r.totalSteps, 0) / runs.length).toFixed(1)} | `;
    }
    md += '\n';
  }
  md += '\n';

  // Edge Case Leaderboard
  const edgeExperiments = experiments.filter((e) => e.config.name.startsWith('Edge'));
  if (edgeExperiments.length > 0) {
    md += '### Edge Case Leaderboard (fewest steps, smallest gap)\n\n';
    const edgeBestCounts: Record<string, number> = {};

    for (const algo of ALGORITHMS) edgeBestCounts[algo] = 0;

    for (const exp of edgeExperiments) {
      const bests = findBestAlgorithms(exp);

      for (const b of bests) edgeBestCounts[b.algorithm]++;
    }

    const edgeLeaderboard = Object.entries(edgeBestCounts).sort((a, b) => b[1] - a[1]);
    md += '| Rank | Algorithm | Wins |\n';
    md += '|-----:|-----------|-----:|\n';
    edgeLeaderboard.forEach(([algo, wins], i) => {
      md += `| ${i + 1} | ${ALGO_LABELS[algo]} | ${wins} / ${edgeExperiments.length} |\n`;
    });
    md += '\n';
  }

  // Performance by Problem Size
  md += '### Performance by Problem Size\n\n';
  const sizeBuckets: Record<string, ExperimentResult[]> = {};
  for (const exp of experiments) {
    const bucket = `${exp.config.criteriaNames.length}C x ${exp.config.alternativeNames.length}A`;
    (sizeBuckets[bucket] ??= []).push(exp);
  }

  md += '| Size | Experiments | ';
  for (const algo of ALGORITHMS) md += `${ALGO_LABELS[algo]} (avg steps / avg ms) | `;
  md += '\n|------|------------:|';
  for (let i = 0; i < ALGORITHMS.length; i++) md += '---:|';
  md += '\n';

  const sortedBuckets = Object.entries(sizeBuckets).sort((a, b) => {
    const [aCrit, aAlt] = a[0].split(' x ').map((s) => parseInt(s));
    const [bCrit, bAlt] = b[0].split(' x ').map((s) => parseInt(s));

    return aCrit * 100 + aAlt - (bCrit * 100 + bAlt);
  });

  for (const [size, exps] of sortedBuckets) {
    md += `| ${size} | ${exps.length} | `;
    for (const algo of ALGORITHMS) {
      const runs = exps.flatMap((e) => e.results.filter((r) => r.algorithm === algo && r.totalSteps >= 0));
      const avgSteps = runs.reduce((s, r) => s + r.totalSteps, 0) / runs.length;
      const avgTime = runs.reduce((s, r) => s + r.timeMs, 0) / runs.length;
      md += `${avgSteps.toFixed(0)} / ${avgTime.toFixed(1)} | `;
    }
    md += '\n';
  }
  md += '\n';

  // Performance by Initial Gap
  md += '### Performance by Initial Gap (difficulty)\n\n';
  const gapBuckets: [string, number, number, ExperimentResult[]][] = [
    ['Small (< 0.15)', 0, 0.15, []],
    ['Medium (0.15 - 0.30)', 0.15, 0.3, []],
    ['Large (0.30 - 0.50)', 0.3, 0.5, []],
    ['Extreme (> 0.50)', 0.5, 1.0, []],
  ];
  for (const exp of experiments)
    for (const bucket of gapBuckets)
      if (exp.priorityGapBeforeImprovement >= bucket[1] && exp.priorityGapBeforeImprovement < bucket[2]) {
        bucket[3].push(exp);
        break;
      }

  md += '| Gap Category | Count | ';
  for (const algo of ALGORITHMS) md += `${ALGO_LABELS[algo]} (avg steps) | `;
  md += '\n|-------------|------:|';
  for (let i = 0; i < ALGORITHMS.length; i++) md += '---:|';
  md += '\n';

  for (const [label, , , exps] of gapBuckets) {
    if (exps.length === 0) continue;
    md += `| ${label} | ${exps.length} | `;
    for (const algo of ALGORITHMS) {
      const runs = exps.flatMap((e) => e.results.filter((r) => r.algorithm === algo && r.totalSteps >= 0));
      md += runs.length === 0 ? '- | ' : `${(runs.reduce((s, r) => s + r.totalSteps, 0) / runs.length).toFixed(1)} | `;
    }
    md += '\n';
  }
  md += '\n';

  // Algorithm Leaderboard
  md += '### Algorithm Leaderboard (fewest steps among winners, smallest gap tiebreaker)\n\n';
  const bestCounts: Record<string, number> = {};
  const tieCounts: Record<string, number> = {};

  for (const algo of ALGORITHMS) {
    bestCounts[algo] = 0;
    tieCounts[algo] = 0;
  }

  for (const exp of experiments) {
    const bests = findBestAlgorithms(exp);

    if (bests.length === 1) bestCounts[bests[0].algorithm]++;
    else for (const b of bests) tieCounts[b.algorithm]++;
  }

  const leaderboard = Object.entries(bestCounts).sort((a, b) => b[1] - a[1]);
  md += '| Rank | Algorithm | Solo Wins | Tied Wins | Total |\n';
  md += '|-----:|-----------|----------:|----------:|------:|\n';
  leaderboard.forEach(([algo, solo], i) => {
    md += `| ${i + 1} | ${ALGO_LABELS[algo]} | ${solo} | ${tieCounts[algo]} | ${solo + tieCounts[algo]} |\n`;
  });
  md += '\n';

  // Time Efficiency
  md += '### Time Efficiency (ms per 100 steps)\n\n';
  md += '| Algorithm | Avg ms/100 steps | Min | Max |\n';
  md += '|-----------|------------------:|----:|----:|\n';

  for (const algo of ALGORITHMS) {
    const ratios: number[] = [];
    for (const exp of experiments) {
      const r = exp.results.find((r) => r.algorithm === algo);
      if (!r || r.totalSteps < 1) continue;
      ratios.push((r.timeMs / r.totalSteps) * 100);
    }
    const avg = ratios.reduce((s, v) => s + v, 0) / ratios.length;
    md += `| ${ALGO_LABELS[algo]} | ${avg.toFixed(2)} | ${Math.min(...ratios).toFixed(2)} | ${Math.max(...ratios).toFixed(2)} |\n`;
  }

  return md;
}

// --- Config Generation & Main ---

type EdgeType =
  | 'edge'
  | 'edge-ll-excessive'
  | 'edge-conservative'
  | 'edge-adaptive-only'
  | 'edge-high-criteria'
  | 'edge-dominant-first'
  | 'edge-dominant-last'
  | 'edge-equal-weights'
  | 'edge-close-second';
type ConfigEntry = { type: 'random' | EdgeType; nC: number; nA: number; seed: number };

function generateExperimentConfigs(): ConfigEntry[] {
  const configs: ConfigEntry[] = [];
  const sizes: [number, number][] = [
    [5, 6],
    [5, 7],
    [5, 8],
    [5, 9],
    [5, 10],
    [6, 6],
    [6, 7],
    [6, 8],
    [6, 9],
    [6, 10],
    [7, 6],
    [7, 7],
    [7, 8],
    [7, 9],
    [7, 10],
    [8, 6],
    [8, 7],
    [8, 8],
    [8, 9],
    [8, 10],
    [9, 7],
    [9, 8],
    [9, 9],
    [9, 10],
    [10, 7],
    [10, 8],
    [10, 9],
    [10, 10],
  ];

  let id = 0;
  while (configs.length < 1000) {
    for (const [c, a] of sizes) {
      if (configs.length >= 1000) break;
      id++;
      configs.push({ type: 'random', nC: c, nA: a, seed: id * 37 + 13 });
    }
  }

  const addEdge = (type: EdgeType, pairs: [number, number][], seed: { mul: number; add: number }): void => {
    const { mul: seedMul, add: seedAdd } = seed;
    for (const [c, a] of pairs) {
      id++;
      configs.push({ type, nC: c, nA: a, seed: id * seedMul + seedAdd });
    }
  };

  addEdge(
    'edge',
    [
      [4, 4],
      [4, 5],
      [6, 5],
      [6, 6],
      [8, 5],
      [8, 6],
      [8, 8],
      [10, 5],
      [10, 8],
      [10, 10],
    ],
    { mul: 53, add: 7 }
  );
  addEdge(
    'edge-ll-excessive',
    [
      [4, 5],
      [5, 5],
      [5, 6],
      [6, 5],
      [6, 6],
    ],
    { mul: 59, add: 11 }
  );
  addEdge(
    'edge-conservative',
    [
      [5, 6],
      [5, 7],
      [6, 6],
      [6, 7],
      [7, 6],
    ],
    { mul: 61, add: 17 }
  );
  addEdge(
    'edge-adaptive-only',
    [
      [5, 4],
      [5, 5],
      [6, 4],
      [6, 5],
      [7, 5],
    ],
    { mul: 67, add: 23 }
  );
  addEdge(
    'edge-high-criteria',
    [
      [12, 5],
      [13, 5],
      [14, 5],
      [15, 5],
      [12, 6],
    ],
    { mul: 71, add: 29 }
  );
  addEdge(
    'edge-dominant-first',
    [
      [5, 5],
      [6, 5],
      [7, 5],
    ],
    { mul: 73, add: 31 }
  );
  addEdge(
    'edge-dominant-last',
    [
      [5, 5],
      [6, 5],
      [7, 5],
    ],
    { mul: 79, add: 37 }
  );
  addEdge(
    'edge-equal-weights',
    [
      [6, 5],
      [6, 6],
      [7, 5],
      [7, 6],
      [8, 5],
    ],
    { mul: 83, add: 41 }
  );
  addEdge(
    'edge-close-second',
    [
      [4, 4],
      [4, 5],
      [5, 4],
      [5, 5],
      [5, 6],
    ],
    { mul: 89, add: 43 }
  );

  return configs;
}

const EXPERIMENT_CONFIGS = generateExperimentConfigs();

function buildConfig(type: string, params: ExperimentParams): ExperimentConfig {
  switch (type) {
    case 'edge':
      return generateEdgeCaseExperiment(params);
    case 'edge-ll-excessive':
      return generateLLExcessiveExperiment(params);
    case 'edge-conservative':
      return generateConservativeExperiment(params);
    case 'edge-adaptive-only':
      return generateAdaptiveOnlyExperiment(params);
    case 'edge-high-criteria':
      return generateHighCriteriaExperiment(params);
    case 'edge-dominant-first':
      return generateDominantCriterionExperiment(params, true);
    case 'edge-dominant-last':
      return generateDominantCriterionExperiment(params, false);
    case 'edge-equal-weights':
      return generateEqualWeightsExperiment(params);
    case 'edge-close-second':
      return generateCloseSecondExperiment(params);
    default:
      return generateHardExperiment(params);
  }
}

async function main(): Promise<void> {
  const total = EXPERIMENT_CONFIGS.length;
  const edgeCount = EXPERIMENT_CONFIGS.filter((c) => c.type !== 'random').length;
  console.log(`Starting ${total} experiments (${total - edgeCount} random + ${edgeCount} edge cases)...\n`);

  const results: ExperimentResult[] = [];
  for (let i = 0; i < total; i++) {
    const { type, nC, nA, seed } = EXPERIMENT_CONFIGS[i];
    const config = buildConfig(type, { id: i + 1, nCriteria: nC, nAlternatives: nA, seed });

    process.stdout.write(`[${String(i + 1).padStart(3)}/${total}] ${config.name.padEnd(22)}`);
    const result = await runExperiment(config);
    results.push(result);

    const winners = result.results.filter((r) => r.isWinner).length;
    const bests = findBestAlgorithms(result);
    const bestLabel = bests.length > 0 ? bests.map((b) => b.label).join('/') : '-';
    const maxTime = Math.max(...result.results.map((r) => r.timeMs));
    console.log(
      `gap=${result.priorityGapBeforeImprovement.toFixed(3)} | win=${winners}/5 | best=${bestLabel} | maxT=${maxTime.toFixed(1)}ms`
    );
  }

  const md = formatResults(results);
  const fs = await import('fs');
  fs.writeFileSync('experiments.md', md);
  console.log(`\nResults written to experiments.md (${(md.length / 1024).toFixed(0)} KB)`);
}

main().catch(console.error);
