# Experiment Results: Algorithm Comparison (1000 Random + 46 Edge Cases)

**Date:** 2026-03-08
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

| Algorithm         | Avg Steps | Median Steps |       Win Rate | Avg Gap | Avg Time (ms) | Min Steps | Max Steps |
| ----------------- | --------: | -----------: | -------------: | ------: | ------------: | --------: | --------: |
| Global Leader     |       7.0 |            7 | 678/1046 (65%) | -0.0029 |          21.6 |         1 |        15 |
| Local Leader      |       6.5 |            6 | 928/1046 (89%) | -0.0011 |          20.0 |         1 |        15 |
| Global Average    |       7.2 |            7 |   39/1046 (4%) | -0.0800 |          17.9 |         0 |        15 |
| Local Average     |       7.2 |            7 |   15/1046 (1%) | -0.0703 |          18.0 |         1 |        15 |
| Adaptive Strategy |       7.2 |            7 | 928/1046 (89%) | -0.0008 |          20.9 |         1 |        15 |

### Random vs Edge Case Experiments

| Category   | Experiments | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| ---------- | ----------: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Random     |        1000 |                       7.0 |                      6.5 |                        7.2 |                       7.2 |                           7.3 |
| Edge Cases |          46 |                       6.5 |                      6.5 |                        5.8 |                       6.2 |                           6.5 |

### Edge Case Leaderboard (fewest steps, smallest gap)

| Rank | Algorithm         |    Wins |
| ---: | ----------------- | ------: |
|    1 | Global Leader     | 44 / 46 |
|    2 | Local Leader      | 44 / 46 |
|    3 | Adaptive Strategy | 43 / 46 |
|    4 | Local Average     |  2 / 46 |
|    5 | Global Average    |  0 / 46 |

### Performance by Problem Size

| Size      | Experiments | Global Leader (avg steps / avg ms) | Local Leader (avg steps / avg ms) | Global Average (avg steps / avg ms) | Local Average (avg steps / avg ms) | Adaptive Strategy (avg steps / avg ms) |
| --------- | ----------: | ---------------------------------: | --------------------------------: | ----------------------------------: | ---------------------------------: | -------------------------------------: |
| 4C x 4A   |           2 |                            3 / 0.5 |                           3 / 0.4 |                             2 / 0.3 |                            3 / 0.3 |                                3 / 0.4 |
| 4C x 5A   |           3 |                            3 / 0.6 |                           3 / 0.6 |                             3 / 0.4 |                            3 / 0.5 |                                3 / 0.6 |
| 5C x 4A   |           2 |                            3 / 0.5 |                           3 / 0.5 |                             3 / 0.6 |                            3 / 0.6 |                                3 / 0.6 |
| 5C x 5A   |           5 |                            4 / 1.0 |                           4 / 1.0 |                             4 / 0.6 |                            4 / 1.7 |                                4 / 1.1 |
| 5C x 6A   |          39 |                            5 / 4.3 |                           4 / 3.5 |                             5 / 2.9 |                            5 / 2.9 |                                5 / 3.2 |
| 5C x 7A   |          37 |                            5 / 4.7 |                           4 / 4.9 |                             5 / 4.7 |                            5 / 4.5 |                                5 / 4.8 |
| 5C x 8A   |          36 |                            5 / 8.2 |                           5 / 8.2 |                             5 / 6.9 |                            5 / 7.1 |                                5 / 8.2 |
| 5C x 9A   |          36 |                           5 / 11.3 |                          4 / 11.6 |                            5 / 10.2 |                           5 / 10.1 |                               5 / 12.3 |
| 5C x 10A  |          36 |                           5 / 20.2 |                          5 / 17.6 |                            5 / 14.0 |                           5 / 14.9 |                               5 / 17.1 |
| 6C x 4A   |           1 |                            6 / 1.1 |                           6 / 1.0 |                             6 / 0.8 |                            6 / 1.2 |                                6 / 1.2 |
| 6C x 5A   |           6 |                            6 / 2.1 |                           6 / 2.3 |                             6 / 1.2 |                            6 / 1.9 |                                6 / 2.0 |
| 6C x 6A   |          40 |                            6 / 4.1 |                           5 / 4.3 |                             6 / 3.7 |                            6 / 4.1 |                                6 / 4.3 |
| 6C x 7A   |          37 |                            6 / 9.9 |                           5 / 8.0 |                             6 / 6.8 |                            6 / 6.6 |                                6 / 7.9 |
| 6C x 8A   |          36 |                           6 / 14.0 |                          6 / 13.5 |                            6 / 11.2 |                           6 / 10.0 |                               6 / 11.3 |
| 6C x 9A   |          36 |                           6 / 19.5 |                          5 / 16.1 |                            6 / 13.5 |                           6 / 14.6 |                               6 / 17.0 |
| 6C x 10A  |          36 |                           6 / 24.9 |                          5 / 23.2 |                            6 / 22.7 |                           6 / 20.8 |                               6 / 25.0 |
| 7C x 5A   |           4 |                            7 / 3.8 |                           7 / 3.3 |                             7 / 1.6 |                            7 / 2.3 |                                7 / 2.9 |
| 7C x 6A   |          38 |                            7 / 5.8 |                           6 / 5.9 |                             7 / 5.1 |                            7 / 5.1 |                                7 / 5.7 |
| 7C x 7A   |          36 |                           7 / 13.3 |                          6 / 10.8 |                             7 / 8.8 |                            7 / 9.1 |                                7 / 9.6 |
| 7C x 8A   |          36 |                           7 / 15.5 |                          6 / 14.4 |                            7 / 13.1 |                           7 / 13.0 |                               7 / 16.0 |
| 7C x 9A   |          36 |                           7 / 22.5 |                          6 / 21.9 |                            7 / 18.7 |                           7 / 19.3 |                               7 / 23.5 |
| 7C x 10A  |          36 |                           7 / 32.1 |                          6 / 29.5 |                            7 / 26.9 |                           7 / 26.8 |                               7 / 33.0 |
| 8C x 5A   |           2 |                            8 / 3.9 |                           8 / 4.3 |                             8 / 2.8 |                            8 / 3.6 |                                8 / 4.2 |
| 8C x 6A   |          37 |                            7 / 7.3 |                           7 / 7.3 |                             8 / 6.6 |                            8 / 6.3 |                                8 / 7.3 |
| 8C x 7A   |          36 |                           8 / 15.5 |                          7 / 12.4 |                            8 / 11.9 |                           8 / 11.8 |                               8 / 12.9 |
| 8C x 8A   |          37 |                           8 / 20.0 |                          7 / 18.7 |                            8 / 17.1 |                           8 / 18.4 |                               8 / 19.5 |
| 8C x 9A   |          36 |                           8 / 28.3 |                          7 / 28.4 |                            8 / 25.0 |                           8 / 25.5 |                               8 / 28.4 |
| 8C x 10A  |          36 |                           8 / 44.5 |                          7 / 42.6 |                            8 / 36.6 |                           8 / 36.0 |                               8 / 43.6 |
| 9C x 7A   |          35 |                           9 / 18.0 |                          8 / 16.4 |                            9 / 13.8 |                           9 / 15.5 |                               9 / 16.8 |
| 9C x 8A   |          35 |                           9 / 25.9 |                          8 / 24.0 |                            9 / 21.9 |                           9 / 21.4 |                               9 / 25.3 |
| 9C x 9A   |          35 |                           9 / 37.9 |                          8 / 34.5 |                            9 / 34.4 |                           9 / 32.2 |                               9 / 38.5 |
| 9C x 10A  |          35 |                           9 / 54.2 |                          8 / 50.3 |                            9 / 44.5 |                           9 / 45.2 |                               9 / 53.6 |
| 10C x 5A  |           1 |                           10 / 3.6 |                          10 / 4.2 |                            10 / 2.6 |                           10 / 2.9 |                               10 / 4.3 |
| 10C x 7A  |          35 |                          10 / 24.4 |                          8 / 17.9 |                           10 / 16.8 |                          10 / 18.2 |                              10 / 19.7 |
| 10C x 8A  |          36 |                          10 / 29.6 |                          9 / 31.6 |                           10 / 31.0 |                          10 / 30.0 |                              10 / 31.7 |
| 10C x 9A  |          35 |                          10 / 45.4 |                          9 / 44.4 |                           10 / 36.8 |                          10 / 37.9 |                              10 / 45.6 |
| 10C x 10A |          36 |                          10 / 65.8 |                          9 / 60.3 |                           10 / 55.8 |                          10 / 54.8 |                              10 / 64.8 |
| 12C x 5A  |           1 |                           12 / 8.7 |                          12 / 8.7 |                            11 / 5.2 |                           12 / 7.6 |                               12 / 9.5 |
| 12C x 6A  |           1 |                          12 / 14.3 |                         12 / 14.2 |                            12 / 9.1 |                          12 / 11.2 |                              12 / 15.0 |
| 13C x 5A  |           1 |                           13 / 9.7 |                          13 / 9.5 |                            12 / 6.6 |                           13 / 9.7 |                              13 / 12.5 |
| 14C x 5A  |           1 |                          14 / 12.5 |                         14 / 12.2 |                            12 / 7.6 |                           14 / 9.6 |                              14 / 12.7 |
| 15C x 5A  |           1 |                          15 / 14.0 |                         15 / 14.0 |                            15 / 8.8 |                          15 / 11.8 |                              15 / 14.9 |

### Performance by Initial Gap (difficulty)

| Gap Category         | Count | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| -------------------- | ----: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Small (< 0.15)       |   155 |                       6.7 |                      5.8 |                        7.0 |                       7.1 |                           7.2 |
| Medium (0.15 - 0.30) |   745 |                       7.1 |                      6.6 |                        7.2 |                       7.3 |                           7.3 |
| Large (0.30 - 0.50)  |   142 |                       6.9 |                      6.9 |                        6.9 |                       7.0 |                           7.0 |
| Extreme (> 0.50)     |     4 |                       6.5 |                      6.5 |                        6.5 |                       6.5 |                           6.5 |

### Algorithm Leaderboard (fewest steps among winners, smallest gap tiebreaker)

| Rank | Algorithm         | Solo Wins | Tied Wins | Total |
| ---: | ----------------- | --------: | --------: | ----: |
|    1 | Local Leader      |       495 |       206 |   701 |
|    2 | Global Leader     |       122 |       191 |   313 |
|    3 | Adaptive Strategy |        98 |       158 |   256 |
|    4 | Global Average    |         3 |         0 |     3 |
|    5 | Local Average     |         0 |         3 |     3 |

### Time Efficiency (ms per 100 steps)

| Algorithm         | Avg ms/100 steps |   Min |     Max |
| ----------------- | ---------------: | ----: | ------: |
| Global Leader     |           288.83 | 16.45 | 2307.42 |
| Local Leader      |           292.30 | 15.97 | 2193.93 |
| Global Average    |           233.74 | 12.59 | 1612.31 |
| Local Average     |           232.99 | 10.49 | 1491.26 |
| Adaptive Strategy |           269.77 | 11.71 | 1258.47 |
