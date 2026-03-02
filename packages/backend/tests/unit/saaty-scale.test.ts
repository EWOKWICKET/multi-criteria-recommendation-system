import { describe, it, expect } from 'vitest';
import { StepDirection, SAATY_SCALE, findClosestSaatyIndex, getNextSaatyValue, applySaatyStep } from '../../src/utils';

describe('SAATY_SCALE', () => {
  it('has 17 elements from 1/9 to 9', () => {
    expect(SAATY_SCALE).toHaveLength(17);
    expect(SAATY_SCALE[0]).toBeCloseTo(1 / 9);
    expect(SAATY_SCALE[8]).toBe(1);
    expect(SAATY_SCALE[16]).toBe(9);
  });
});

describe('findClosestSaatyIndex', () => {
  it('finds exact matches', () => {
    expect(findClosestSaatyIndex(1)).toBe(8);
    expect(findClosestSaatyIndex(3)).toBe(10);
    expect(findClosestSaatyIndex(1 / 3)).toBe(6);
    expect(findClosestSaatyIndex(9)).toBe(16);
    expect(findClosestSaatyIndex(1 / 9)).toBe(0);
  });

  it('snaps to nearest value for approximate inputs', () => {
    expect(findClosestSaatyIndex(0.34)).toBe(6); // ~1/3
    expect(findClosestSaatyIndex(2.8)).toBe(10); // ~3
    expect(findClosestSaatyIndex(0.51)).toBe(7); // ~1/2
  });
});

describe('getNextSaatyValue', () => {
  it('steps up from 1 to 2', () => {
    expect(getNextSaatyValue(1, StepDirection.Up)).toBe(2);
  });

  it('steps down from 1 to 1/2', () => {
    expect(getNextSaatyValue(1, StepDirection.Down)).toBe(0.5);
  });

  it('steps up from 3 to 4', () => {
    expect(getNextSaatyValue(3, StepDirection.Up)).toBe(4);
  });

  it('steps down from 1/3 to 1/4', () => {
    expect(getNextSaatyValue(1 / 3, StepDirection.Down)).toBe(0.25);
  });

  it('clamps at upper boundary (9)', () => {
    expect(getNextSaatyValue(9, StepDirection.Up)).toBe(9);
  });

  it('clamps at lower boundary (1/9)', () => {
    expect(getNextSaatyValue(1 / 9, StepDirection.Down)).toBeCloseTo(1 / 9);
  });
});

describe('applySaatyStep', () => {
  it('applies a step and maintains reciprocal', () => {
    const matrix = [
      [1, 3],
      [1 / 3, 1],
    ];
    const result = applySaatyStep({ matrix, row: 0, col: 1, direction: StepDirection.Up });

    expect(result[0][1]).toBe(4);
    expect(result[1][0]).toBeCloseTo(1 / 4);
  });

  it('does not mutate the original matrix', () => {
    const matrix = [
      [1, 3],
      [1 / 3, 1],
    ];
    applySaatyStep({ matrix, row: 0, col: 1, direction: StepDirection.Up });

    expect(matrix[0][1]).toBe(3);
    expect(matrix[1][0]).toBeCloseTo(1 / 3);
  });

  it('steps down and maintains reciprocal', () => {
    const matrix = [
      [1, 5],
      [1 / 5, 1],
    ];
    const result = applySaatyStep({ matrix, row: 0, col: 1, direction: StepDirection.Down });

    expect(result[0][1]).toBe(4);
    expect(result[1][0]).toBeCloseTo(1 / 4);
  });

  it('keeps diagonal unchanged', () => {
    const matrix = [
      [1, 2, 3],
      [0.5, 1, 2],
      [1 / 3, 0.5, 1],
    ];
    const result = applySaatyStep({ matrix, row: 0, col: 2, direction: StepDirection.Up });

    expect(result[0][0]).toBe(1);
    expect(result[1][1]).toBe(1);
    expect(result[2][2]).toBe(1);
  });
});
