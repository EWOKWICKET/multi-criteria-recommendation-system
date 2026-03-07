# Experiment Results: Algorithm Comparison (1000 Random + 46 Edge Cases)

**Date:** 2026-03-07
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
| Global Leader     |     197.8 |          189 | 1046/1046 (100%) | +0.0006 |          15.4 |         2 |       479 |
| Local Leader      |     189.4 |          180 | 1046/1046 (100%) | +0.0006 |          15.6 |         2 |       479 |
| Global Average    |     197.2 |          191 |   139/1046 (13%) | -0.0673 |          10.9 |         0 |       474 |
| Local Average     |     193.8 |          188 |     25/1046 (2%) | -0.0648 |          11.6 |         1 |       381 |
| Adaptive Strategy |     260.0 |          254 | 1046/1046 (100%) | +0.0012 |          15.9 |         2 |       557 |

### Random vs Edge Case Experiments

| Category   | Experiments | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| ---------- | ----------: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Random     |        1000 |                     203.2 |                    194.5 |                      204.2 |                     198.9 |                         266.6 |
| Edge Cases |          46 |                      80.6 |                     80.4 |                       46.7 |                      84.5 |                         116.1 |

### Edge Case Leaderboard (fewest steps, smallest gap)

| Rank | Algorithm         |    Wins |
| ---: | ----------------- | ------: |
|    1 | Local Leader      | 42 / 46 |
|    2 | Global Leader     | 41 / 46 |
|    3 | Adaptive Strategy | 10 / 46 |
|    4 | Local Average     |  1 / 46 |
|    5 | Global Average    |  0 / 46 |

### Performance by Problem Size

| Size      | Experiments | Global Leader (avg steps / avg ms) | Local Leader (avg steps / avg ms) | Global Average (avg steps / avg ms) | Local Average (avg steps / avg ms) | Adaptive Strategy (avg steps / avg ms) |
| --------- | ----------: | ---------------------------------: | --------------------------------: | ----------------------------------: | ---------------------------------: | -------------------------------------: |
| 4C x 4A   |           2 |                            6 / 0.3 |                           6 / 0.2 |                            10 / 0.3 |                           23 / 0.3 |                               25 / 0.3 |
| 4C x 5A   |           3 |                           46 / 0.7 |                          44 / 0.7 |                            11 / 0.3 |                           31 / 0.5 |                               57 / 0.8 |
| 5C x 4A   |           2 |                           22 / 0.4 |                          22 / 0.4 |                            37 / 0.5 |                           33 / 0.5 |                               38 / 0.5 |
| 5C x 5A   |           5 |                           45 / 1.0 |                          45 / 0.9 |                            20 / 0.5 |                           48 / 0.8 |                               70 / 1.2 |
| 5C x 6A   |          39 |                           95 / 2.6 |                          93 / 2.7 |                           107 / 2.3 |                          107 / 2.6 |                              136 / 3.1 |
| 5C x 7A   |          37 |                          101 / 3.7 |                          97 / 3.8 |                           120 / 3.2 |                          117 / 3.4 |                              148 / 4.2 |
| 5C x 8A   |          36 |                          142 / 6.8 |                         138 / 7.0 |                           140 / 5.0 |                          134 / 5.1 |                              190 / 7.2 |
| 5C x 9A   |          36 |                          162 / 9.7 |                         158 / 9.4 |                           148 / 6.2 |                          144 / 6.5 |                              205 / 9.6 |
| 5C x 10A  |          36 |                         180 / 12.9 |                        174 / 12.8 |                           143 / 7.5 |                          144 / 9.1 |                             216 / 13.7 |
| 6C x 4A   |           1 |                           57 / 1.1 |                          57 / 1.2 |                            78 / 0.8 |                           68 / 0.8 |                               78 / 0.9 |
| 6C x 5A   |           6 |                           90 / 2.0 |                          90 / 1.9 |                            36 / 0.7 |                           83 / 1.4 |                              118 / 1.9 |
| 6C x 6A   |          40 |                          109 / 3.3 |                         107 / 3.5 |                           120 / 2.8 |                          125 / 3.0 |                              161 / 3.7 |
| 6C x 7A   |          37 |                          137 / 5.4 |                         133 / 5.6 |                           139 / 4.0 |                          139 / 4.3 |                              185 / 5.7 |
| 6C x 8A   |          36 |                          167 / 8.8 |                         157 / 8.5 |                           160 / 6.2 |                          157 / 6.5 |                              210 / 8.6 |
| 6C x 9A   |          36 |                         193 / 13.0 |                        187 / 12.8 |                           176 / 8.4 |                          177 / 9.4 |                             250 / 12.9 |
| 6C x 10A  |          36 |                         209 / 16.8 |                        196 / 16.7 |                          209 / 12.7 |                         187 / 12.3 |                             261 / 18.2 |
| 7C x 5A   |           4 |                          111 / 2.6 |                         111 / 2.7 |                            47 / 1.1 |                           99 / 1.9 |                              133 / 2.6 |
| 7C x 6A   |          38 |                          129 / 4.4 |                         128 / 4.5 |                           135 / 3.4 |                          146 / 3.9 |                              186 / 4.8 |
| 7C x 7A   |          36 |                          148 / 7.0 |                         144 / 7.1 |                           171 / 5.8 |                          171 / 6.1 |                              210 / 7.4 |
| 7C x 8A   |          36 |                         192 / 11.2 |                        185 / 12.0 |                           184 / 8.2 |                          183 / 8.5 |                             246 / 11.4 |
| 7C x 9A   |          36 |                         213 / 16.5 |                        205 / 16.3 |                          219 / 13.8 |                         215 / 13.3 |                             284 / 17.9 |
| 7C x 10A  |          36 |                         245 / 24.2 |                        236 / 24.3 |                          236 / 17.1 |                         215 / 16.4 |                             304 / 24.3 |
| 8C x 5A   |           2 |                          137 / 3.4 |                         137 / 3.6 |                            70 / 1.4 |                          134 / 3.0 |                              180 / 3.9 |
| 8C x 6A   |          37 |                          134 / 5.2 |                         130 / 5.4 |                           172 / 4.8 |                          170 / 5.1 |                              202 / 5.9 |
| 8C x 7A   |          36 |                          177 / 9.5 |                         172 / 9.5 |                           189 / 7.0 |                          195 / 8.0 |                             253 / 10.3 |
| 8C x 8A   |          37 |                         214 / 14.5 |                        208 / 15.2 |                          222 / 10.7 |                         211 / 11.0 |                             287 / 15.0 |
| 8C x 9A   |          36 |                         238 / 21.0 |                        227 / 21.3 |                          244 / 14.7 |                         233 / 15.7 |                             311 / 21.2 |
| 8C x 10A  |          36 |                         298 / 33.8 |                        282 / 34.5 |                          268 / 21.9 |                         250 / 23.0 |                             361 / 34.6 |
| 9C x 7A   |          35 |                         214 / 13.4 |                        204 / 13.8 |                           228 / 9.4 |                         225 / 10.6 |                             291 / 14.4 |
| 9C x 8A   |          35 |                         253 / 19.8 |                        242 / 19.4 |                          248 / 13.9 |                         243 / 14.6 |                             327 / 20.5 |
| 9C x 9A   |          35 |                         282 / 27.7 |                        271 / 27.5 |                          269 / 18.7 |                         263 / 19.5 |                             358 / 28.0 |
| 9C x 10A  |          35 |                         317 / 38.3 |                        295 / 39.2 |                          294 / 26.7 |                         283 / 28.8 |                             386 / 39.1 |
| 10C x 5A  |           1 |                           38 / 1.5 |                          38 / 1.4 |                            68 / 1.5 |                          122 / 2.3 |                              135 / 2.6 |
| 10C x 7A  |          35 |                         220 / 14.3 |                        205 / 14.1 |                          258 / 12.2 |                         248 / 12.9 |                             302 / 15.0 |
| 10C x 8A  |          36 |                         255 / 22.3 |                        247 / 24.4 |                          280 / 16.6 |                         268 / 17.5 |                             349 / 22.3 |
| 10C x 9A  |          35 |                         308 / 33.0 |                        287 / 32.8 |                          282 / 21.5 |                         286 / 23.5 |                             390 / 33.7 |
| 10C x 10A |          36 |                         354 / 49.1 |                        330 / 48.5 |                          326 / 32.5 |                         311 / 37.3 |                             437 / 49.7 |
| 12C x 5A  |           1 |                           77 / 3.2 |                          77 / 3.4 |                           100 / 2.6 |                          193 / 5.8 |                              211 / 6.1 |
| 12C x 6A  |           1 |                          109 / 6.1 |                         109 / 6.0 |                           111 / 3.6 |                          190 / 8.0 |                              210 / 8.9 |
| 13C x 5A  |           1 |                           91 / 4.4 |                          91 / 4.1 |                           123 / 3.1 |                          201 / 6.9 |                              217 / 7.1 |
| 14C x 5A  |           1 |                          111 / 5.6 |                         111 / 5.9 |                           122 / 3.7 |                          235 / 8.5 |                              253 / 9.3 |
| 15C x 5A  |           1 |                          165 / 8.6 |                         165 / 8.6 |                           109 / 3.2 |                         253 / 10.2 |                             271 / 10.8 |

### Performance by Initial Gap (difficulty)

| Gap Category         | Count | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| -------------------- | ----: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Small (< 0.15)       |   155 |                     191.0 |                    173.8 |                      247.5 |                     224.0 |                         258.7 |
| Medium (0.15 - 0.30) |   745 |                     202.6 |                    194.5 |                      202.7 |                     196.8 |                         265.5 |
| Large (0.30 - 0.50)  |   142 |                     182.0 |                    181.2 |                      117.1 |                     147.7 |                         235.2 |
| Extreme (> 0.50)     |     4 |                     137.0 |                    137.0 |                       77.8 |                     111.8 |                         157.0 |

### Algorithm Leaderboard (fewest steps among winners, smallest gap tiebreaker)

| Rank | Algorithm         | Solo Wins | Tied Wins | Total |
| ---: | ----------------- | --------: | --------: | ----: |
|    1 | Local Leader      |       463 |       385 |   848 |
|    2 | Global Leader     |       186 |       384 |   570 |
|    3 | Adaptive Strategy |         7 |         6 |    13 |
|    4 | Global Average    |         5 |         1 |     6 |
|    5 | Local Average     |         0 |         1 |     1 |

### Time Efficiency (ms per 100 steps)

| Algorithm         | Avg ms/100 steps |  Min |   Max |
| ----------------- | ---------------: | ---: | ----: |
| Global Leader     |             6.87 | 1.27 | 27.03 |
| Local Leader      |             7.31 | 1.27 | 30.48 |
| Global Average    |             5.08 | 1.04 | 33.16 |
| Local Average     |             5.48 | 0.93 | 56.76 |
| Adaptive Strategy |             5.44 | 0.90 | 28.66 |
