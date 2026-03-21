import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app.js';

const app = buildApp();

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

/**
 * Sample AHP problem: choosing a laptop.
 * 3 criteria: Performance, Price, Battery
 * 4 alternatives: Laptop A, Laptop B, Laptop C, Laptop D
 * Matrices use consistent Saaty-scale values.
 */
const SAMPLE_PROBLEM = {
  criteriaMatrix: [
    [1, 3, 5],
    [1 / 3, 1, 2],
    [1 / 5, 1 / 2, 1],
  ],
  alternativeMatrices: {
    Performance: [
      [1, 5, 3, 7],
      [1 / 5, 1, 1 / 2, 3],
      [1 / 3, 2, 1, 4],
      [1 / 7, 1 / 3, 1 / 4, 1],
    ],
    Price: [
      [1, 1 / 3, 1 / 2, 2],
      [3, 1, 2, 5],
      [2, 1 / 2, 1, 3],
      [1 / 2, 1 / 5, 1 / 3, 1],
    ],
    Battery: [
      [1, 2, 4, 3],
      [1 / 2, 1, 3, 2],
      [1 / 4, 1 / 3, 1, 1 / 2],
      [1 / 3, 1 / 2, 2, 1],
    ],
  },
  criteriaNames: ['Performance', 'Price', 'Battery'],
  alternativeNames: ['Laptop A', 'Laptop B', 'Laptop C', 'Laptop D'],
};

describe('e2e: full AHP + recommendation flow', () => {
  describe('baseline AHP', () => {
    it('solves the sample problem and returns correct rankings', async () => {
      const res = await app.inject({ method: 'POST', url: '/api/ahp/solve', payload: SAMPLE_PROBLEM });

      expect(res.statusCode).toBe(200);

      const body = res.json();

      expect(body.criteriaWeights).toHaveLength(3);
      expect(body.globalPriorities).toHaveLength(4);
      expect(body.isConsistent).toBe(true);

      const weightSum = body.criteriaWeights.reduce((s: number, w: number) => s + w, 0);
      expect(weightSum).toBeCloseTo(1, 4);

      const prioritySum = body.globalPriorities.reduce((s: number, p: { priority: number }) => s + p.priority, 0);
      expect(prioritySum).toBeCloseTo(1, 4);

      expect(body.globalPriorities[0].name).toBe(body.winner);

      for (let i = 1; i < body.globalPriorities.length; i++) {
        expect(body.globalPriorities[i - 1].priority).toBeGreaterThanOrEqual(body.globalPriorities[i].priority);
      }

      for (const name of SAMPLE_PROBLEM.criteriaNames) {
        const lp: number[] = body.localPriorities[name];
        const lpSum = lp.reduce((s, v) => s + v, 0);
        expect(lpSum).toBeCloseTo(1, 4);
      }

      for (const [_, cr] of Object.entries(body.consistencyRatios)) {
        expect(cr as number).toBeLessThan(0.1);
      }

      expect(body.warnings).toBeUndefined();
    });
  });

  describe('recommendation flow: improve the weakest alternative', () => {
    let baselineResult: {
      globalPriorities: { name: string; priority: number }[];
      winner: string;
    };

    let weakestIndex: number;

    beforeAll(async () => {
      const res = await app.inject({ method: 'POST', url: '/api/ahp/solve', payload: SAMPLE_PROBLEM });
      baselineResult = res.json();

      const weakestName = baselineResult.globalPriorities[baselineResult.globalPriorities.length - 1].name;
      weakestIndex = SAMPLE_PROBLEM.alternativeNames.indexOf(weakestName);
    });

    const ALGORITHMS = [
      { path: 'global-leader', name: 'Global Leader' },
      { path: 'local-leader', name: 'Local Leader' },
      { path: 'global-average', name: 'Global Average' },
      { path: 'local-average', name: 'Local Average' },
      { path: 'adaptive-strategy', name: 'Adaptive Strategy' },
    ];

    for (const algo of ALGORITHMS) {
      it(`${algo.name}: improves the weakest alternative`, async () => {
        const res = await app.inject({
          method: 'POST',
          url: `/api/recommendations/${algo.path}`,
          payload: { ...SAMPLE_PROBLEM, targetAlternativeIndex: weakestIndex },
        });

        expect(res.statusCode).toBe(200);

        const result = res.json();

        // Original priority should match baseline
        const baselinePriority = baselineResult.globalPriorities.find(
          (p) => p.name === SAMPLE_PROBLEM.alternativeNames[weakestIndex]
        )!.priority;

        expect(result.originalGlobalPriority).toBeCloseTo(baselinePriority, 4);
        expect(result.newGlobalPriority).toBeGreaterThanOrEqual(result.originalGlobalPriority);

        expect(result.actions.length).toBeGreaterThan(0);
        expect(result.actions.length).toBeLessThanOrEqual(SAMPLE_PROBLEM.criteriaNames.length);
        expect(result.totalSteps).toBe(result.actions.length);

        for (const action of result.actions) {
          expect(action.criterion).toBeDefined();
        }

        expect(Object.keys(result.modifiedMatrices).sort()).toEqual([...SAMPLE_PROBLEM.criteriaNames].sort());

        for (const name of SAMPLE_PROBLEM.criteriaNames) {
          const matrix = result.modifiedMatrices[name];
          expect(matrix).toHaveLength(4);

          for (const row of matrix) {
            expect(row).toHaveLength(4);
          }
        }
      });
    }

    it('all algorithms agree on baseline values', async () => {
      const results = await Promise.all(
        ALGORITHMS.map((algo) =>
          app
            .inject({
              method: 'POST',
              url: `/api/recommendations/${algo.path}`,
              payload: { ...SAMPLE_PROBLEM, targetAlternativeIndex: weakestIndex },
            })
            .then((res) => res.json())
        )
      );

      const original = results[0].originalGlobalPriority;
      const leader = results[0].leaderGlobalPriority;

      for (const result of results) {
        expect(result.originalGlobalPriority).toBeCloseTo(original, 10);
        expect(result.leaderGlobalPriority).toBeCloseTo(leader, 10);
      }
    });

    it('targeting the winner returns 0 steps for global-leader', async () => {
      const winnerIndex = SAMPLE_PROBLEM.alternativeNames.indexOf(baselineResult.winner);

      const res = await app.inject({
        method: 'POST',
        url: '/api/recommendations/global-leader',
        payload: { ...SAMPLE_PROBLEM, targetAlternativeIndex: winnerIndex },
      });

      const result = res.json();

      expect(result.totalSteps).toBe(0);
      expect(result.isWinner).toBe(true);
      expect(result.originalGlobalPriority).toBeCloseTo(result.newGlobalPriority, 10);
    });
  });

  describe('error handling', () => {
    it('returns 404 for unknown routes', async () => {
      const res = await app.inject({ method: 'GET', url: '/api/unknown' });

      expect(res.statusCode).toBe(404);

      const body = res.json();
      expect(body.error).toBe('Route not found');
    });

    it('returns 404 for non-api routes', async () => {
      const res = await app.inject({ method: 'GET', url: '/foo/bar' });

      expect(res.statusCode).toBe(404);
    });

    it('returns 400 for mismatched criteria matrix dimensions', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/ahp/solve',
        payload: {
          ...SAMPLE_PROBLEM,
          criteriaMatrix: [
            [1, 2],
            [1 / 2, 1],
          ],
        },
      });

      expect(res.statusCode).toBe(400);

      const body = res.json();
      expect(body.message).toContain('Criteria matrix');
    });

    it('returns 400 for mismatched alternative matrix dimensions', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/ahp/solve',
        payload: {
          ...SAMPLE_PROBLEM,
          alternativeMatrices: {
            ...SAMPLE_PROBLEM.alternativeMatrices,
            Performance: [
              [1, 2],
              [1 / 2, 1],
            ],
          },
        },
      });

      expect(res.statusCode).toBe(400);

      const body = res.json();
      expect(body.message).toContain('Performance');
    });

    it('returns 400 for missing alternative matrix', async () => {
      const { Performance: _, ...partial } = SAMPLE_PROBLEM.alternativeMatrices;

      const res = await app.inject({
        method: 'POST',
        url: '/api/ahp/solve',
        payload: { ...SAMPLE_PROBLEM, alternativeMatrices: partial },
      });

      expect(res.statusCode).toBe(400);

      const body = res.json();
      expect(body.message).toContain('Performance');
    });

    it('returns 400 for targetAlternativeIndex out of bounds', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/recommendations/global-leader',
        payload: { ...SAMPLE_PROBLEM, targetAlternativeIndex: 99 },
      });

      expect(res.statusCode).toBe(400);

      const body = res.json();
      expect(body.message).toContain('targetAlternativeIndex');
    });
  });

  describe('CR warning', () => {
    it('returns warnings when matrices are inconsistent', async () => {
      const inconsistentProblem = {
        criteriaMatrix: [
          [1, 9, 1 / 9],
          [1 / 9, 1, 9],
          [9, 1 / 9, 1],
        ],
        alternativeMatrices: {
          C1: [
            [1, 3],
            [1 / 3, 1],
          ],
          C2: [
            [1, 5],
            [1 / 5, 1],
          ],
          C3: [
            [1, 2],
            [1 / 2, 1],
          ],
        },
        criteriaNames: ['C1', 'C2', 'C3'],
        alternativeNames: ['A', 'B'],
      };

      const res = await app.inject({ method: 'POST', url: '/api/ahp/solve', payload: inconsistentProblem });

      expect(res.statusCode).toBe(200);

      const body = res.json();
      expect(body.isConsistent).toBe(false);
      expect(body.warnings).toBeDefined();
      expect(body.warnings.length).toBeGreaterThan(0);
      expect(body.warnings[0]).toContain('Consistency ratio exceeds 0.1');
    });
  });
});
