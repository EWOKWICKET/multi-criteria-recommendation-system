# Experiment Results: Algorithm Comparison (1000 Random + 46 Edge Cases)

**Date:** 2026-03-09
**Total experiments:** 1046
**Algorithms:** Global Leader, Local Leader, Global Average, Local Average, Adaptive Strategy
**Strategy:** Always target the worst alternative (maximum gap to leader)

## Edge Case Types

- **Low-weight first:** Low-weight criteria come first with large local gaps; high-weight criteria last with small gaps. Forces Local Leader to grind through unimportant criteria.
- **LL-Excessive:** Non-leader alternative holds local max (Saaty 7-9). Leader is moderate (3-4). Local Leader grinds to reach high local max while Global Leader/Adaptive match the moderate leader.
- **Conservative wins:** Target already above average on low-weight criteria. Conservative algorithms (Global/Local Average) skip those and do 1-2 steps on high-weight criteria.
- **Adaptive-only:** Leader holds max on half the criteria, different alt on the other half. Single-strategy matching may not suffice, but Adaptive's two-stage approach succeeds.
- **High-criteria stress:** 12-15 criteria with extreme weight skew. First 10 low-weight, last 2-3 high-weight. Penalizes algorithms that grind through all criteria.
- **Dominant criterion:** One criterion has ~70% weight. Tested with dominant criterion first vs last in array. When last, algorithms waste steps on unimportant criteria.
- **Equal weights:** All criteria have exactly equal weight (identity matrix). Pure comparison of step counts without weight effects.
- **Close second:** Target is second-best with tiny gap. Only 1 criterion has a deficit. Conservative algorithms win with 1-2 steps.

---

## Global Summary

### Overall Statistics

| Algorithm         | Avg Steps | Median Steps |         Win Rate | Avg Gap | Avg Time (ms) | Min Steps | Max Steps |
| ----------------- | --------: | -----------: | ---------------: | ------: | ------------: | --------: | --------: |
| Global Leader     |       7.0 |            7 | 1046/1046 (100%) | +0.0001 |          15.6 |         1 |        15 |
| Local Leader      |       6.3 |            6 | 1046/1046 (100%) | +0.0002 |          18.9 |         1 |        15 |
| Global Average    |       7.1 |            7 |     64/1046 (6%) | -0.0726 |          12.9 |         0 |        15 |
| Local Average     |       7.2 |            7 |     23/1046 (2%) | -0.0643 |          13.4 |         1 |        15 |
| Adaptive Strategy |       7.2 |            7 | 1046/1046 (100%) | +0.0007 |          16.6 |         1 |        15 |

### Random vs Edge Case Experiments

| Category   | Experiments | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| ---------- | ----------: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Random     |        1000 |                       7.1 |                      6.3 |                        7.2 |                       7.2 |                           7.3 |
| Edge Cases |          46 |                       6.3 |                      6.5 |                        6.0 |                       6.5 |                           6.5 |

### Edge Case Leaderboard (fewest steps, smallest gap)

| Rank | Algorithm         |    Wins |
| ---: | ----------------- | ------: |
|    1 | Local Leader      | 30 / 46 |
|    2 | Adaptive Strategy | 29 / 46 |
|    3 | Global Leader     | 15 / 46 |
|    4 | Local Average     |  3 / 46 |
|    5 | Global Average    |  2 / 46 |

### Performance by Problem Size

| Size      | Experiments | Global Leader (avg steps / avg ms) | Local Leader (avg steps / avg ms) | Global Average (avg steps / avg ms) | Local Average (avg steps / avg ms) | Adaptive Strategy (avg steps / avg ms) |
| --------- | ----------: | ---------------------------------: | --------------------------------: | ----------------------------------: | ---------------------------------: | -------------------------------------: |
| 4C x 4A   |           2 |                            3 / 0.4 |                           3 / 0.3 |                             3 / 0.2 |                            3 / 0.3 |                                3 / 0.3 |
| 4C x 5A   |           3 |                            3 / 0.6 |                           3 / 0.6 |                             3 / 0.3 |                            3 / 0.5 |                                3 / 0.5 |
| 5C x 4A   |           2 |                            3 / 0.6 |                           3 / 0.5 |                             3 / 0.4 |                            3 / 0.4 |                                3 / 0.4 |
| 5C x 5A   |           5 |                            4 / 1.1 |                           4 / 1.0 |                             4 / 0.4 |                            4 / 0.7 |                                4 / 0.9 |
| 5C x 6A   |          39 |                            5 / 2.7 |                           4 / 2.9 |                             5 / 2.3 |                            5 / 2.2 |                                5 / 2.8 |
| 5C x 7A   |          37 |                            5 / 3.9 |                           4 / 4.5 |                             5 / 3.3 |                            5 / 3.5 |                                5 / 3.9 |
| 5C x 8A   |          36 |                            5 / 6.4 |                           5 / 7.3 |                             5 / 5.1 |                            5 / 5.2 |                                5 / 6.4 |
| 5C x 9A   |          36 |                            5 / 8.9 |                          4 / 11.1 |                             5 / 7.7 |                           5 / 10.2 |                               5 / 10.0 |
| 5C x 10A  |          36 |                           5 / 13.1 |                          5 / 15.6 |                             5 / 9.7 |                           5 / 10.6 |                               5 / 14.2 |
| 6C x 4A   |           1 |                            6 / 0.8 |                           6 / 1.0 |                             6 / 1.0 |                            6 / 0.7 |                                6 / 0.8 |
| 6C x 5A   |           6 |                            6 / 2.0 |                           6 / 1.8 |                             6 / 0.7 |                            6 / 1.2 |                                6 / 1.6 |
| 6C x 6A   |          40 |                            6 / 3.0 |                           5 / 3.9 |                             6 / 2.7 |                            6 / 2.9 |                                6 / 3.4 |
| 6C x 7A   |          37 |                            6 / 5.3 |                           5 / 6.4 |                             6 / 4.2 |                            6 / 4.6 |                                6 / 5.7 |
| 6C x 8A   |          36 |                            6 / 8.0 |                          5 / 10.2 |                             6 / 7.1 |                            6 / 7.2 |                                6 / 8.6 |
| 6C x 9A   |          36 |                           6 / 13.5 |                          5 / 16.5 |                            6 / 10.4 |                           6 / 11.5 |                               6 / 14.0 |
| 6C x 10A  |          36 |                           6 / 17.6 |                          5 / 23.0 |                            6 / 15.2 |                           6 / 15.0 |                               6 / 20.2 |
| 7C x 5A   |           4 |                            7 / 2.6 |                           7 / 2.7 |                             7 / 0.9 |                            7 / 1.6 |                                7 / 2.3 |
| 7C x 6A   |          38 |                            6 / 4.5 |                           6 / 5.1 |                             7 / 3.7 |                            7 / 3.9 |                                7 / 4.5 |
| 7C x 7A   |          36 |                            7 / 6.3 |                           6 / 8.0 |                             7 / 6.8 |                            7 / 7.6 |                                7 / 7.6 |
| 7C x 8A   |          36 |                           7 / 10.9 |                          6 / 13.7 |                            7 / 10.0 |                           7 / 11.5 |                               7 / 13.4 |
| 7C x 9A   |          36 |                           7 / 17.0 |                          6 / 22.8 |                            7 / 14.6 |                           7 / 14.7 |                               7 / 18.0 |
| 7C x 10A  |          36 |                           7 / 29.2 |                          6 / 33.4 |                            7 / 21.4 |                           7 / 20.0 |                               7 / 25.8 |
| 8C x 5A   |           2 |                            8 / 2.9 |                           8 / 3.6 |                             8 / 1.7 |                            8 / 2.3 |                                8 / 3.1 |
| 8C x 6A   |          37 |                            7 / 5.1 |                           6 / 6.0 |                             8 / 4.8 |                            8 / 5.1 |                                8 / 6.0 |
| 8C x 7A   |          36 |                            8 / 9.5 |                          7 / 12.2 |                             8 / 7.6 |                            8 / 8.2 |                                8 / 9.9 |
| 8C x 8A   |          37 |                           8 / 15.7 |                          7 / 17.6 |                            8 / 11.9 |                           8 / 12.2 |                               8 / 15.5 |
| 8C x 9A   |          36 |                           8 / 20.3 |                          7 / 24.5 |                            8 / 17.0 |                           8 / 17.8 |                               8 / 23.5 |
| 8C x 10A  |          36 |                           8 / 38.1 |                          7 / 41.5 |                            8 / 25.4 |                           8 / 27.7 |                               8 / 35.4 |
| 9C x 7A   |          35 |                           9 / 12.4 |                          8 / 14.4 |                            9 / 10.1 |                           9 / 11.1 |                               9 / 13.6 |
| 9C x 8A   |          35 |                           9 / 19.3 |                          8 / 25.6 |                            9 / 16.8 |                           9 / 17.1 |                               9 / 23.2 |
| 9C x 9A   |          35 |                           9 / 29.1 |                          8 / 34.2 |                            9 / 23.5 |                           9 / 24.4 |                               9 / 29.4 |
| 9C x 10A  |          35 |                           9 / 38.8 |                          8 / 46.8 |                            9 / 32.2 |                           9 / 33.9 |                               9 / 41.6 |
| 10C x 5A  |           1 |                            8 / 2.0 |                          10 / 3.5 |                            10 / 1.5 |                           10 / 2.0 |                               10 / 3.1 |
| 10C x 7A  |          35 |                          10 / 13.9 |                          8 / 16.2 |                           10 / 13.2 |                          10 / 13.5 |                              10 / 15.0 |
| 10C x 8A  |          36 |                          10 / 21.2 |                          8 / 27.4 |                           10 / 18.2 |                          10 / 19.0 |                              10 / 23.0 |
| 10C x 9A  |          35 |                          10 / 32.0 |                          8 / 40.8 |                           10 / 28.3 |                          10 / 28.0 |                              10 / 36.6 |
| 10C x 10A |          36 |                          10 / 48.4 |                          9 / 58.4 |                           10 / 42.3 |                          10 / 41.4 |                              10 / 51.5 |
| 12C x 5A  |           1 |                           12 / 7.1 |                          12 / 8.0 |                            11 / 3.2 |                           12 / 5.0 |                               12 / 6.8 |
| 12C x 6A  |           1 |                          12 / 11.2 |                         12 / 13.8 |                            12 / 5.5 |                           12 / 7.3 |                              12 / 11.8 |
| 13C x 5A  |           1 |                           13 / 7.4 |                          13 / 9.0 |                            12 / 3.1 |                           13 / 5.6 |                               13 / 7.7 |
| 14C x 5A  |           1 |                           14 / 9.3 |                         14 / 12.7 |                            13 / 4.9 |                           14 / 7.3 |                              14 / 10.0 |
| 15C x 5A  |           1 |                          15 / 12.3 |                         15 / 13.9 |                            15 / 4.2 |                           15 / 8.3 |                              15 / 11.9 |

### Performance by Initial Gap (difficulty)

| Gap Category         | Count | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| -------------------- | ----: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Small (< 0.15)       |   155 |                       6.7 |                      5.6 |                        7.0 |                       7.0 |                           7.2 |
| Medium (0.15 - 0.30) |   745 |                       7.1 |                      6.4 |                        7.2 |                       7.3 |                           7.3 |
| Large (0.30 - 0.50)  |   142 |                       6.9 |                      6.8 |                        6.9 |                       7.0 |                           7.0 |
| Extreme (> 0.50)     |     4 |                       6.5 |                      6.5 |                        6.5 |                       6.5 |                           6.5 |

### Algorithm Leaderboard (fewest steps among winners, smallest gap tiebreaker)

| Rank | Algorithm         | Solo Wins | Tied Wins | Total |
| ---: | ----------------- | --------: | --------: | ----: |
|    1 | Local Leader      |       620 |        93 |   713 |
|    2 | Global Leader     |       242 |         6 |   248 |
|    3 | Adaptive Strategy |        82 |        92 |   174 |
|    4 | Global Average    |         7 |         3 |    10 |
|    5 | Local Average     |         0 |         3 |     3 |

### Time Efficiency (ms per 100 steps)

| Algorithm         | Avg ms/100 steps |   Min |     Max |
| ----------------- | ---------------: | ----: | ------: |
| Global Leader     |           207.54 | 11.40 | 2683.21 |
| Local Leader      |           281.41 | 12.12 | 2839.39 |
| Global Average    |           168.34 |  7.40 |  775.67 |
| Local Average     |           174.74 |  7.99 | 2094.96 |
| Adaptive Strategy |           214.64 |  9.51 |  923.57 |
