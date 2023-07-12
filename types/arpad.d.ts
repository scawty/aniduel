type KFactorType = number | { [key: string]: number; default?: number };

declare module "arpad" {
  export default class ELO {
    private static PERF: number;
    private static OUTCOME_LOST: number;
    private static OUTCOME_TIED: number;
    private static OUTCOME_WON: number;
    private minimum: number;
    private maximum: number;
    private k_factor: KFactorType;

    constructor(k_factor?: KFactorType, min?: number, max?: number);

    getKFactor(rating: number): number;

    getMin(): number;

    getMax(): number;

    setKFactor(k_factor: KFactorType): this;

    setMin(minimum: number): this;

    setMax(maximum: number): this;

    expectedScore(rating: number, opponent_rating: number): number;

    bothExpectedScores(
      player_1_rating: number,
      player_2_rating: number
    ): [number, number];

    newRating(
      expected_score: number,
      actual_score: number,
      previous_rating: number
    ): number;

    newRatingIfWon(rating: number, opponent_rating: number): number;

    newRatingIfLost(rating: number, opponent_rating: number): number;

    newRatingIfTied(rating: number, opponent_rating: number): number;
  }
}
