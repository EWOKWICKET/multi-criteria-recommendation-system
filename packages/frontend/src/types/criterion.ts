export enum CriterionDirection {
  Higher = 'higher',
  Lower = 'lower',
}

export type RawCriterionData = {
  values: number[];
  direction: CriterionDirection;
};
