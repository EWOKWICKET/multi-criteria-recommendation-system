import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../../src/app.js';

const app = buildApp();

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

const VALID_BODY = {
  criteriaMatrix: [
    [1, 3, 5],
    [1 / 3, 1, 3],
    [1 / 5, 1 / 3, 1],
  ],
  alternativeMatrices: {
    Price: [
      [1, 3, 5],
      [1 / 3, 1, 3],
      [1 / 5, 1 / 3, 1],
    ],
    Quality: [
      [1, 1 / 2, 2],
      [2, 1, 3],
      [1 / 2, 1 / 3, 1],
    ],
    Delivery: [
      [1, 2, 1 / 2],
      [1 / 2, 1, 1 / 3],
      [2, 3, 1],
    ],
  },
  criteriaNames: ['Price', 'Quality', 'Delivery'],
  alternativeNames: ['A1', 'A2', 'A3'],
  targetAlternativeIndex: 2,
};

const ENDPOINTS = [
  '/api/recommendations/global-leader',
  '/api/recommendations/local-leader',
  '/api/recommendations/global-average',
  '/api/recommendations/local-average',
  '/api/recommendations/adaptive-strategy',
];

describe('recommendation endpoints', () => {
  describe('schema validation', () => {
    for (const url of ENDPOINTS) {
      describe(`POST ${url}`, () => {
        it('returns 400 for empty body', async () => {
          const res = await app.inject({ method: 'POST', url, payload: {} });

          expect(res.statusCode).toBe(400);
        });

        it('returns 400 for missing targetAlternativeIndex', async () => {
          const { targetAlternativeIndex: _, ...body } = VALID_BODY;
          const res = await app.inject({ method: 'POST', url, payload: body });

          expect(res.statusCode).toBe(400);
        });

        it('returns 400 for negative targetAlternativeIndex', async () => {
          const res = await app.inject({
            method: 'POST',
            url,
            payload: { ...VALID_BODY, targetAlternativeIndex: -1 },
          });

          expect(res.statusCode).toBe(400);
        });

        it('returns 400 for float targetAlternativeIndex', async () => {
          const res = await app.inject({
            method: 'POST',
            url,
            payload: { ...VALID_BODY, targetAlternativeIndex: 1.5 },
          });

          expect(res.statusCode).toBe(400);
        });

        it('returns 400 when alternativeNames has fewer than 2 items', async () => {
          const res = await app.inject({
            method: 'POST',
            url,
            payload: { ...VALID_BODY, alternativeNames: ['A1'] },
          });

          expect(res.statusCode).toBe(400);
        });

        it('returns 400 when criteriaNames is empty', async () => {
          const res = await app.inject({
            method: 'POST',
            url,
            payload: { ...VALID_BODY, criteriaNames: [] },
          });

          expect(res.statusCode).toBe(400);
        });

        it('returns 400 when criteriaMatrix contains non-numbers', async () => {
          const res = await app.inject({
            method: 'POST',
            url,
            payload: {
              ...VALID_BODY,
              criteriaMatrix: [
                ['a', 'b'],
                ['c', 'd'],
              ],
            },
          });

          expect(res.statusCode).toBe(400);
        });
      });
    }
  });

  describe('different input sizes', () => {
    it('handles a 2-alternative, 2-criteria problem', async () => {
      const body = {
        criteriaMatrix: [
          [1, 3],
          [1 / 3, 1],
        ],
        alternativeMatrices: {
          C1: [
            [1, 5],
            [1 / 5, 1],
          ],
          C2: [
            [1, 1 / 3],
            [3, 1],
          ],
        },
        criteriaNames: ['C1', 'C2'],
        alternativeNames: ['A', 'B'],
        targetAlternativeIndex: 1,
      };

      for (const url of ENDPOINTS) {
        const res = await app.inject({ method: 'POST', url, payload: body });

        expect(res.statusCode).toBe(200);

        const result = res.json();
        expect(result.totalSteps).toBeGreaterThanOrEqual(0);
        expect(Object.keys(result.modifiedMatrices)).toHaveLength(2);
      }
    });

    it('handles a 4-alternative problem', async () => {
      const body = {
        criteriaMatrix: [
          [1, 2],
          [1 / 2, 1],
        ],
        alternativeMatrices: {
          C1: [
            [1, 2, 3, 4],
            [1 / 2, 1, 2, 3],
            [1 / 3, 1 / 2, 1, 2],
            [1 / 4, 1 / 3, 1 / 2, 1],
          ],
          C2: [
            [1, 1 / 3, 1 / 2, 1],
            [3, 1, 2, 3],
            [2, 1 / 2, 1, 2],
            [1, 1 / 3, 1 / 2, 1],
          ],
        },
        criteriaNames: ['C1', 'C2'],
        alternativeNames: ['A1', 'A2', 'A3', 'A4'],
        targetAlternativeIndex: 3,
      };

      for (const url of ENDPOINTS) {
        const res = await app.inject({ method: 'POST', url, payload: body });

        expect(res.statusCode).toBe(200);

        const result = res.json();
        expect(result.totalSteps).toBeGreaterThanOrEqual(0);
        expect(result.newGlobalPriority).toBeGreaterThanOrEqual(result.originalGlobalPriority);
      }
    });
  });

  describe('cross-endpoint consistency', () => {
    it('all endpoints agree on originalGlobalPriority and leaderGlobalPriority', async () => {
      const results = await Promise.all(
        ENDPOINTS.map((url) => app.inject({ method: 'POST', url, payload: VALID_BODY }).then((res) => res.json()))
      );

      for (let i = 1; i < results.length; i++) {
        expect(results[i].originalGlobalPriority).toBeCloseTo(results[0].originalGlobalPriority, 10);
        expect(results[i].leaderGlobalPriority).toBeCloseTo(results[0].leaderGlobalPriority, 10);
      }
    });

    it('all endpoints improve or maintain global priority', async () => {
      const results = await Promise.all(
        ENDPOINTS.map((url) => app.inject({ method: 'POST', url, payload: VALID_BODY }).then((res) => res.json()))
      );

      for (const result of results) {
        expect(result.newGlobalPriority).toBeGreaterThanOrEqual(result.originalGlobalPriority);
      }
    });

    it('global-leader and adaptive-strategy return 0 steps for the winner', async () => {
      const winnerBody = { ...VALID_BODY, targetAlternativeIndex: 0 };
      const earlyStopEndpoints = ['/api/recommendations/global-leader', '/api/recommendations/adaptive-strategy'];

      for (const url of earlyStopEndpoints) {
        const res = await app.inject({ method: 'POST', url, payload: winnerBody });
        const result = res.json();

        expect(result.totalSteps).toBe(0);
        expect(result.isWinner).toBe(true);
      }
    });

    it('modifiedMatrices keys match criteriaNames for all endpoints', async () => {
      const results = await Promise.all(
        ENDPOINTS.map((url) => app.inject({ method: 'POST', url, payload: VALID_BODY }).then((res) => res.json()))
      );

      for (const result of results) {
        const keys = Object.keys(result.modifiedMatrices).sort();
        expect(keys).toEqual([...VALID_BODY.criteriaNames].sort());
      }
    });
  });
});
