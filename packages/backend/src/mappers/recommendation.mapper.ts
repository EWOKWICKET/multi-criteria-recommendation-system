import type { RecommendationResult, Action, PositionStep } from '../types/index.js';

function mergeStepsIntoActions(steps: PositionStep[], initialLP: Record<string, number>): Action[] {
  const actions: Action[] = [];

  for (const step of steps) {
    const existing = actions.find((a) => a.criterion === step.criterion);

    if (existing) {
      existing.steps++;
      existing.localPriorityAfter = step.localPriorityAfterStep;
      existing.globalPriorityAfter = step.globalPriorityAfterStep;
    } else {
      actions.push({
        criterion: step.criterion,
        steps: 1,
        localPriorityBefore: initialLP[step.criterion] ?? 0,
        localPriorityAfter: step.localPriorityAfterStep,
        globalPriorityAfter: step.globalPriorityAfterStep,
      });
    }
  }

  return actions;
}

export function toResponse(result: RecommendationResult): Omit<RecommendationResult, 'steps' | 'initialLocalPriorities'> & { actions: Action[] } {
  const { steps, initialLocalPriorities, modifiedMatrices, ...rest } = result;

  return { ...rest, actions: mergeStepsIntoActions(steps, initialLocalPriorities), modifiedMatrices };
}
