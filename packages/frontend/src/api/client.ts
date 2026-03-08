const BASE = '/api';

type AhpRequest = {
  criteriaMatrix: number[][];
  alternativeMatrices: Record<string, number[][]>;
  criteriaNames: string[];
  alternativeNames: string[];
};

type AhpResponse = {
  criteriaWeights: number[];
  localPriorities: Record<string, number[]>;
  globalPriorities: { name: string; priority: number }[];
  winner: string;
  consistencyRatios: Record<string, number>;
  isConsistent: boolean;
};

type RecommendationRequest = AhpRequest & {
  targetAlternativeIndex: number;
};

type Action = {
  criterion: string;
  steps: number;
  localPriorityBefore: number;
  localPriorityAfter: number;
  globalPriorityAfter: number;
};

type RecommendationResponse = {
  originalGlobalPriority: number;
  newGlobalPriority: number;
  leaderGlobalPriority: number;
  leaderGlobalPriorityAfter: number;
  isWinner: boolean;
  totalSteps: number;
  actions: Action[];
  modifiedMatrices: Record<string, number[][]>;
};

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export function solveAhp(body: AhpRequest): Promise<AhpResponse> {
  return post(`${BASE}/ahp/solve`, body);
}

export enum Algorithm {
  GlobalLeader = 'global-leader',
  LocalLeader = 'local-leader',
  GlobalAverage = 'global-average',
  LocalAverage = 'local-average',
  AdaptiveStrategy = 'adaptive-strategy',
}

export function runRecommendation(algorithm: Algorithm, body: RecommendationRequest): Promise<RecommendationResponse> {
  return post(`${BASE}/recommendations/${algorithm}`, body);
}

export type { AhpRequest, AhpResponse, RecommendationRequest, RecommendationResponse, Action };
