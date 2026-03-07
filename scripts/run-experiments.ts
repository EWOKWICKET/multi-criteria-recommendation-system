/**
 * Generates 100 hard experiments with many criteria/alternatives and high gaps,
 * runs all 5 recommendation algorithms on each, and writes results to experiments.md.
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

// Seeded pseudo-random number generator for reproducibility
function mulberry32(seed: number): () => number {
  let s = seed | 0;

  return (): number => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generate a criteria matrix that creates strong dominance hierarchies (high gaps)
function generateCriteriaMatrix(n: number, rng: () => number): number[][] {
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(1));
  // Use higher Saaty values to create more extreme weight distributions
  const saatyValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Bias toward extreme values for higher gaps
      const r = rng();
      let idx: number;

      if (r < 0.4)
        idx = Math.floor(rng() * 3) + 6; // 7,8,9 — strong dominance
      else if (r < 0.7)
        idx = Math.floor(rng() * 3) + 3; // 4,5,6 — moderate
      else idx = Math.floor(rng() * 3); // 1,2,3 — weak

      const val = saatyValues[idx];
      matrix[i][j] = val;
      matrix[j][i] = 1 / val;
    }
  }

  return matrix;
}

type DominanceMatrixParams = {
  m: number;
  dominantIdx: number;
  weakIdx: number;
  rng: () => number;
};

// Generate alternative matrices with strong dominance (one alternative dominates others)
function generateAlternativeMatrixWithDominance({ m, dominantIdx, weakIdx, rng }: DominanceMatrixParams): number[][] {
  const matrix: number[][] = Array.from({ length: m }, () => Array(m).fill(1));
  const saatyValues = [1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < m; i++) {
    for (let j = i + 1; j < m; j++) {
      let val: number;

      if (i === dominantIdx) {
        // Dominant alternative strongly preferred over others
        const idx = Math.floor(rng() * 4) + 13; // values 6,7,8,9
        val = saatyValues[idx];
      } else if (j === weakIdx || i === weakIdx) {
        // Weak alternative strongly inferior
        if (i === weakIdx) {
          const idx = Math.floor(rng() * 4); // values 1/9,1/8,1/7,1/6
          val = saatyValues[idx];
        } else {
          const idx = Math.floor(rng() * 4) + 13; // j is weak, i dominates
          val = saatyValues[idx];
        }
      } else {
        // Other alternatives: random middle values
        const idx = Math.floor(rng() * saatyValues.length);
        val = saatyValues[idx];
      }

      matrix[i][j] = val;
      matrix[j][i] = 1 / val;
    }
  }

  return matrix;
}

type ExperimentParams = {
  id: number;
  nCriteria: number;
  nAlternatives: number;
  seed: number;
};

function generateHardExperiment({ id, nCriteria, nAlternatives, seed }: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = Array.from({ length: nCriteria }, (_, i) => `C${i + 1}`);
  const alternativeNames = Array.from({ length: nAlternatives }, (_, i) => `A${i + 1}`);

  const criteriaMatrix = generateCriteriaMatrix(nCriteria, rng);

  // Pick a dominant and weak alternative for most criteria to create high gap
  const dominantIdx = Math.floor(rng() * nAlternatives);
  let weakIdx = Math.floor(rng() * nAlternatives);

  while (weakIdx === dominantIdx) weakIdx = Math.floor(rng() * nAlternatives);

  const alternativeMatrices: Record<string, number[][]> = {};

  for (let c = 0; c < nCriteria; c++) {
    // Most criteria: dominant wins, weak loses. Some criteria: randomize for variety
    if (rng() < 0.8) {
      alternativeMatrices[criteriaNames[c]] = generateAlternativeMatrixWithDominance({
        m: nAlternatives,
        dominantIdx,
        weakIdx,
        rng,
      });
    } else {
      // Occasional random criterion to add noise
      alternativeMatrices[criteriaNames[c]] = generateAlternativeMatrixWithDominance({
        m: nAlternatives,
        dominantIdx: Math.floor(rng() * nAlternatives),
        weakIdx,
        rng,
      });
    }
  }

  return {
    id,
    name: `Exp ${id}: ${nCriteria}C x ${nAlternatives}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

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

  // Pick the worst alternative as target (hardest case — biggest gap to leader)
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
      const timeMs = performance.now() - start;
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
        timeMs,
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

function formatResults(experiments: ExperimentResult[]): string {
  const randomCount = experiments.filter((e) => !e.config.name.startsWith('Edge')).length;
  const edgeCount = experiments.filter((e) => e.config.name.startsWith('Edge')).length;
  let md = `# Experiment Results: Algorithm Comparison (${randomCount} Random + ${edgeCount} Edge Cases)\n\n`;
  md += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
  md += `**Total experiments:** ${experiments.length}\n`;
  md += `**Algorithms:** ${ALGORITHMS.map((a) => ALGO_LABELS[a]).join(', ')}\n`;
  md += `**Strategy:** Always target the worst alternative (maximum gap to leader)\n`;
  md += `**Edge cases:** Low-weight criteria listed first with large local gaps to penalize sequential processing\n\n`;
  md += '---\n\n';

  // Per-experiment tables
  for (const exp of experiments) {
    const size = `${exp.config.criteriaNames.length}C x ${exp.config.alternativeNames.length}A`;
    md += `## ${exp.config.name}\n\n`;
    md += `- **Size:** ${size}\n`;
    md += `- **AHP Winner:** ${exp.ahpWinner} (${exp.winnerPriority.toFixed(4)})\n`;
    md += `- **Target (worst):** ${exp.targetAlternative} (${exp.targetOriginalPriority.toFixed(4)})\n`;
    md += `- **Initial gap:** ${exp.priorityGapBeforeImprovement.toFixed(4)}\n\n`;

    md += '| Algorithm | Steps | Winner | Gap | Time (ms) |\n';
    md += '|-----------|------:|:------:|------:|----------:|\n';

    for (const r of exp.results) {
      const gap = r.totalSteps >= 0 ? (r.gap >= 0 ? '+' : '') + r.gap.toFixed(4) : 'ERR';
      const winner = r.totalSteps >= 0 ? (r.isWinner ? 'Yes' : 'No') : 'ERR';
      const steps = r.totalSteps >= 0 ? String(r.totalSteps) : 'ERR';
      md += `| ${r.label} | ${steps} | ${winner} | ${gap} | ${r.timeMs.toFixed(1)} |\n`;
    }

    md += '\n';
  }

  // ===== GLOBAL SUMMARY =====
  md += '---\n\n## Global Summary\n\n';

  // Per-algorithm aggregates
  md += '### Overall Statistics\n\n';
  md +=
    '| Algorithm | Avg Steps | Median Steps | Win Rate | Avg Gap | Avg Time (ms) | Min Steps | Max Steps | Max Time (ms) |\n';
  md +=
    '|-----------|----------:|-------------:|---------:|--------:|--------------:|----------:|----------:|--------------:|\n';

  for (const algo of ALGORITHMS) {
    const runs = experiments.map((e) => e.results.find((r) => r.algorithm === algo)!).filter((r) => r.totalSteps >= 0);
    const wins = runs.filter((r) => r.isWinner).length;
    const steps = runs.map((r) => r.totalSteps).sort((a, b) => a - b);
    const avgSteps = steps.reduce((s, v) => s + v, 0) / steps.length;
    const medianSteps = steps[Math.floor(steps.length / 2)];
    const avgGap = runs.reduce((s, r) => s + r.gap, 0) / runs.length;
    const times = runs.map((r) => r.timeMs);
    const avgTime = times.reduce((s, v) => s + v, 0) / times.length;
    const maxTime = Math.max(...times);
    const minSteps = steps[0];
    const maxSteps = steps[steps.length - 1];

    md += `| ${ALGO_LABELS[algo]} | ${avgSteps.toFixed(1)} | ${medianSteps} | ${wins}/${runs.length} (${((wins / runs.length) * 100).toFixed(0)}%) | ${(avgGap >= 0 ? '+' : '') + avgGap.toFixed(4)} | ${avgTime.toFixed(1)} | ${minSteps} | ${maxSteps} | ${maxTime.toFixed(1)} |\n`;
  }

  md += '\n';

  // Breakdown: Random vs Edge Cases
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
      const avgSteps = runs.reduce((s, r) => s + r.totalSteps, 0) / runs.length;
      md += `${avgSteps.toFixed(1)} | `;
    }

    md += '\n';
  }

  md += '\n';

  // Edge case leaderboard
  const edgeExperiments = experiments.filter((e) => e.config.name.startsWith('Edge'));

  if (edgeExperiments.length > 0) {
    md += '### Edge Case Leaderboard (fewest steps among winners)\n\n';
    const edgeBestCounts: Record<string, number> = {};

    for (const algo of ALGORITHMS) edgeBestCounts[algo] = 0;

    for (const exp of edgeExperiments) {
      const winners = exp.results.filter((r) => r.isWinner && r.totalSteps >= 0);

      if (winners.length === 0) continue;

      const minSteps = Math.min(...winners.map((r) => r.totalSteps));
      const bests = winners.filter((r) => r.totalSteps === minSteps);

      for (const b of bests) edgeBestCounts[b.algorithm]++;
    }

    const edgeLeaderboard = Object.entries(edgeBestCounts).sort((a, b) => b[1] - a[1]);
    md += '| Rank | Algorithm | Wins (fewest steps) |\n';
    md += '|-----:|-----------|--------------------:|\n';
    edgeLeaderboard.forEach(([algo, wins], i) => {
      md += `| ${i + 1} | ${ALGO_LABELS[algo]} | ${wins} / ${edgeExperiments.length} |\n`;
    });
    md += '\n';
  }

  // Breakdown by problem size
  md += '### Performance by Problem Size\n\n';

  const sizeBuckets: Record<string, ExperimentResult[]> = {};

  for (const exp of experiments) {
    const nC = exp.config.criteriaNames.length;
    const nA = exp.config.alternativeNames.length;
    const bucket = `${nC}C x ${nA}A`;

    if (!sizeBuckets[bucket]) sizeBuckets[bucket] = [];
    sizeBuckets[bucket].push(exp);
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

  // Breakdown by initial gap size
  md += '### Performance by Initial Gap (difficulty)\n\n';

  const gapBuckets: [string, number, number, ExperimentResult[]][] = [
    ['Small (< 0.15)', 0, 0.15, []],
    ['Medium (0.15 - 0.30)', 0.15, 0.3, []],
    ['Large (0.30 - 0.50)', 0.3, 0.5, []],
    ['Extreme (> 0.50)', 0.5, 1.0, []],
  ];

  for (const exp of experiments) {
    for (const bucket of gapBuckets) {
      if (exp.priorityGapBeforeImprovement >= bucket[1] && exp.priorityGapBeforeImprovement < bucket[2]) {
        bucket[3].push(exp);

        break;
      }
    }
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

      if (runs.length === 0) {
        md += '- | ';

        continue;
      }

      const avgSteps = runs.reduce((s, r) => s + r.totalSteps, 0) / runs.length;
      md += `${avgSteps.toFixed(1)} | `;
    }

    md += '\n';
  }

  md += '\n';

  // Best algorithm per experiment (compact: just counts)
  md += '### Algorithm Leaderboard (fewest steps among winners)\n\n';
  const bestCounts: Record<string, number> = {};
  const tieCounts: Record<string, number> = {};

  for (const algo of ALGORITHMS) {
    bestCounts[algo] = 0;
    tieCounts[algo] = 0;
  }

  for (const exp of experiments) {
    const winners = exp.results.filter((r) => r.isWinner && r.totalSteps >= 0);

    if (winners.length === 0) continue;

    const minSteps = Math.min(...winners.map((r) => r.totalSteps));
    const bests = winners.filter((r) => r.totalSteps === minSteps);

    if (bests.length === 1) {
      bestCounts[bests[0].algorithm]++;
    } else {
      for (const b of bests) tieCounts[b.algorithm]++;
    }
  }

  const leaderboard = Object.entries(bestCounts).sort((a, b) => b[1] - a[1]);
  md += '| Rank | Algorithm | Solo Wins | Tied Wins | Total |\n';
  md += '|-----:|-----------|----------:|----------:|------:|\n';

  leaderboard.forEach(([algo, solo], i) => {
    const tied = tieCounts[algo];
    md += `| ${i + 1} | ${ALGO_LABELS[algo]} | ${solo} | ${tied} | ${solo + tied} |\n`;
  });

  md += '\n';

  // Step efficiency: steps per unit of initial gap
  md += '### Step Efficiency (steps per 0.01 initial gap)\n\n';
  md += '| Algorithm | Avg Efficiency | Median Efficiency | Best (lowest) | Worst (highest) |\n';
  md += '|-----------|---------------:|------------------:|--------------:|----------------:|\n';

  for (const algo of ALGORITHMS) {
    const efficiencies: number[] = [];

    for (const exp of experiments) {
      const r = exp.results.find((r) => r.algorithm === algo);

      if (!r || r.totalSteps < 0 || exp.priorityGapBeforeImprovement <= 0) continue;
      efficiencies.push(r.totalSteps / (exp.priorityGapBeforeImprovement / 0.01));
    }

    efficiencies.sort((a, b) => a - b);
    const avg = efficiencies.reduce((s, v) => s + v, 0) / efficiencies.length;
    const median = efficiencies[Math.floor(efficiencies.length / 2)];

    md += `| ${ALGO_LABELS[algo]} | ${avg.toFixed(2)} | ${median.toFixed(2)} | ${efficiencies[0].toFixed(2)} | ${efficiencies[efficiencies.length - 1].toFixed(2)} |\n`;
  }

  md += '\n';

  // Time efficiency
  md += '### Time Efficiency (ms per 100 steps)\n\n';
  md += '| Algorithm | Avg ms/100 steps | Min | Max |\n';
  md += '|-----------|------------------:|----:|----:|\n';

  for (const algo of ALGORITHMS) {
    const ratios: number[] = [];

    for (const exp of experiments) {
      const r = exp.results.find((r) => r.algorithm === algo);

      if (!r || r.totalSteps <= 0) continue;
      ratios.push((r.timeMs / r.totalSteps) * 100);
    }

    const avg = ratios.reduce((s, v) => s + v, 0) / ratios.length;
    md += `| ${ALGO_LABELS[algo]} | ${avg.toFixed(2)} | ${Math.min(...ratios).toFixed(2)} | ${Math.max(...ratios).toFixed(2)} |\n`;
  }

  return md;
}

/**
 * Edge-case experiment: criteria are ordered so that LOW-weight criteria come first
 * with large local gaps (target far from local max). HIGH-weight criteria come last
 * with small gaps. This forces Local Leader to grind through unimportant criteria
 * while greedy algorithms skip straight to the high-weight ones.
 */
function generateEdgeCaseExperiment({ id, nCriteria, nAlternatives, seed }: ExperimentParams): ExperimentConfig {
  const rng = mulberry32(seed);
  const criteriaNames = Array.from({ length: nCriteria }, (_, i) => `C${i + 1}`);
  const alternativeNames = Array.from({ length: nAlternatives }, (_, i) => `A${i + 1}`);

  // Create criteria matrix with extreme weight distribution:
  // First criteria get very low weights, last criteria get very high weights.
  // This is achieved by making later criteria dominate earlier ones in pairwise comparisons.
  const criteriaMatrix: number[][] = Array.from({ length: nCriteria }, () => Array(nCriteria).fill(1));

  for (let i = 0; i < nCriteria; i++) {
    for (let j = i + 1; j < nCriteria; j++) {
      // Later criteria (higher index) are more important
      // The further apart, the stronger the dominance
      const diff = j - i;
      const val = Math.min(9, 1 + diff * 2 + Math.floor(rng() * 2));
      // j dominates i → a[i][j] = 1/val, a[j][i] = val
      criteriaMatrix[i][j] = 1 / val;
      criteriaMatrix[j][i] = val;
    }
  }

  // Pick dominant and weak alternatives
  const dominantIdx = 0;
  const weakIdx = nAlternatives - 1; // target = worst alternative

  const alternativeMatrices: Record<string, number[][]> = {};

  for (let c = 0; c < nCriteria; c++) {
    const isLowWeight = c < Math.floor(nCriteria / 2);

    if (isLowWeight) {
      // Low-weight criteria: dominant STRONGLY dominates, target is at minimum
      // This creates a huge local gap that Local Leader will waste steps on
      alternativeMatrices[criteriaNames[c]] = generateAlternativeMatrixWithDominance({
        m: nAlternatives,
        dominantIdx,
        weakIdx,
        rng,
      });
    } else {
      // High-weight criteria: target is only slightly behind
      // A few greedy steps here would give massive global priority gains
      const matrix: number[][] = Array.from({ length: nAlternatives }, () => Array(nAlternatives).fill(1));

      for (let i = 0; i < nAlternatives; i++) {
        for (let j = i + 1; j < nAlternatives; j++) {
          let val: number;

          if (i === dominantIdx) {
            // Dominant is only slightly better (Saaty 2 or 3)
            val = 2 + Math.floor(rng() * 2);
          } else if (j === weakIdx) {
            // Others slightly better than target
            val = 1 + Math.floor(rng() * 2);
          } else {
            val = 1 + Math.floor(rng() * 2);
          }

          matrix[i][j] = val;
          matrix[j][i] = 1 / val;
        }
      }

      alternativeMatrices[criteriaNames[c]] = matrix;
    }
  }

  return {
    id,
    name: `Edge ${id}: ${nCriteria}C x ${nAlternatives}A`,
    criteriaNames,
    alternativeNames,
    criteriaMatrix,
    alternativeMatrices,
  };
}

// Generate 100 random hard experiments + 20 edge cases
function generateExperimentConfigs(): { type: 'random' | 'edge'; nC: number; nA: number; seed: number }[] {
  const configs: { type: 'random' | 'edge'; nC: number; nA: number; seed: number }[] = [];
  // Mix of sizes, all on the larger/harder side
  const sizes: [number, number][] = [
    // [criteria, alternatives]
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

  // 100 random hard experiments
  while (configs.length < 100) {
    for (const [c, a] of sizes) {
      if (configs.length >= 100) break;
      id++;
      configs.push({ type: 'random', nC: c, nA: a, seed: id * 37 + 13 });
    }
  }

  // 20 edge-case experiments: low-weight criteria first with large gaps
  const edgeSizes: [number, number][] = [
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 8],
    [6, 4],
    [6, 5],
    [6, 6],
    [6, 8],
    [8, 4],
    [8, 5],
    [8, 6],
    [8, 8],
    [10, 4],
    [10, 5],
    [10, 6],
    [10, 8],
    [5, 10],
    [7, 10],
    [9, 10],
    [10, 10],
  ];

  for (const [c, a] of edgeSizes) {
    id++;
    configs.push({ type: 'edge', nC: c, nA: a, seed: id * 53 + 7 });
  }

  return configs;
}

const EXPERIMENT_CONFIGS = generateExperimentConfigs();

async function main(): Promise<void> {
  const total = EXPERIMENT_CONFIGS.length;
  console.log(`Starting ${total} experiments (100 random + 20 edge cases)...\n`);

  const results: ExperimentResult[] = [];

  for (let i = 0; i < total; i++) {
    const { type, nC, nA, seed } = EXPERIMENT_CONFIGS[i];
    const params = { id: i + 1, nCriteria: nC, nAlternatives: nA, seed };
    const config = type === 'edge' ? generateEdgeCaseExperiment(params) : generateHardExperiment(params);

    process.stdout.write(`[${String(i + 1).padStart(3)}/${total}] ${config.name.padEnd(22)}`);

    const result = await runExperiment(config);
    results.push(result);

    const winners = result.results.filter((r) => r.isWinner).length;
    const bestSteps = Math.min(...result.results.filter((r) => r.isWinner).map((r) => r.totalSteps), Infinity);
    const maxTime = Math.max(...result.results.map((r) => r.timeMs));
    console.log(
      `gap=${result.priorityGapBeforeImprovement.toFixed(3)} | win=${winners}/5 | best=${bestSteps === Infinity ? 'N/A' : String(bestSteps).padStart(4)} | maxT=${maxTime.toFixed(1)}ms`
    );
  }

  const md = formatResults(results);

  const fs = await import('fs');
  fs.writeFileSync('experiments.md', md);
  console.log(`\nResults written to experiments.md (${(md.length / 1024).toFixed(0)} KB)`);
}

main().catch(console.error);
