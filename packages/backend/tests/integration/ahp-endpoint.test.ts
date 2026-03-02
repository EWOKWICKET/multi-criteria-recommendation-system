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
};

describe('POST /api/ahp/solve', () => {
  it('returns 200 with correct structure for valid input', async () => {
    const res = await app.inject({ method: 'POST', url: '/api/ahp/solve', payload: VALID_BODY });

    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.criteriaWeights).toHaveLength(3);
    expect(body.globalPriorities).toHaveLength(3);
    expect(body.winner).toBeDefined();
    expect(typeof body.isConsistent).toBe('boolean');
    expect(body.consistencyRatios).toHaveProperty('criteria');
  });

  it('returns sorted global priorities with a winner', async () => {
    const res = await app.inject({ method: 'POST', url: '/api/ahp/solve', payload: VALID_BODY });
    const body = res.json();

    expect(body.globalPriorities[0].name).toBe(body.winner);
    for (let i = 1; i < body.globalPriorities.length; i++) {
      expect(body.globalPriorities[i - 1].priority).toBeGreaterThanOrEqual(body.globalPriorities[i].priority);
    }
  });

  it('returns 400 for missing required fields', async () => {
    const res = await app.inject({ method: 'POST', url: '/api/ahp/solve', payload: {} });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when alternativeNames has fewer than 2 items', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/ahp/solve',
      payload: { ...VALID_BODY, alternativeNames: ['A1'] },
    });
    expect(res.statusCode).toBe(400);
  });

  it('handles a 2-alternative problem (CR always 0 for 2x2)', async () => {
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
      alternativeNames: ['A1', 'A2'],
    };

    const res = await app.inject({ method: 'POST', url: '/api/ahp/solve', payload: body });
    const result = res.json();

    expect(res.statusCode).toBe(200);
    expect(result.consistencyRatios.criteria).toBe(0);
    expect(result.consistencyRatios.C1).toBe(0);
    expect(result.globalPriorities).toHaveLength(2);
  });
});
