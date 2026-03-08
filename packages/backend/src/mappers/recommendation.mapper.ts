import type { RecommendationResult, Action, PositionStep } from '../types/index.js';

function mergeStepsIntoActions(steps: PositionStep[]): Action[] {
  const seen = new Set<string>();
  const actions: Action[] = [];

  for (const step of steps) {
    if (!seen.has(step.criterion)) {
      seen.add(step.criterion);
      actions.push({ criterion: step.criterion });
    }
  }

  return actions;
}

export function toResponse(result: RecommendationResult): Omit<RecommendationResult, 'steps' | 'totalSteps'> & { totalSteps: number; actions: Action[] } {
  const { steps, modifiedMatrices, ...rest } = result;
  const actions = mergeStepsIntoActions(steps);

  return { ...rest, totalSteps: actions.length, actions, modifiedMatrices };
}
