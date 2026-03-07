# Experiment Results: Algorithm Comparison (100 Random + 46 Edge Cases)

**Date:** 2026-03-07
**Total experiments:** 146
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

| Algorithm         | Avg Steps | Median Steps |       Win Rate | Avg Gap | Avg Efficiency | Avg Time (ms) | Min Steps | Max Steps |
| ----------------- | --------: | -----------: | -------------: | ------: | -------------: | ------------: | --------: | --------: |
| Global Leader     |     310.1 |          295 |  144/146 (99%) | +0.0022 |           1.23 |           1.7 |         2 |       847 |
| Local Leader      |     214.3 |          195 | 146/146 (100%) | +0.0025 |           1.53 |           1.2 |         2 |       666 |
| Global Average    |     273.3 |          272 |     3/146 (2%) | -0.1084 |           0.90 |           1.5 |         0 |       653 |
| Local Average     |     285.6 |          298 |     6/146 (4%) | -0.0753 |           1.10 |           1.5 |         2 |       676 |
| Adaptive Strategy |     310.1 |          295 | 146/146 (100%) | +0.0023 |           1.23 |           1.5 |         2 |       847 |

### Random vs Edge Case Experiments

| Category   | Experiments | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| ---------- | ----------: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Random     |         100 |                     377.4 |                    220.3 |                      352.8 |                     362.2 |                         377.4 |
| Edge Cases |          46 |                     163.7 |                    201.2 |                      100.6 |                     119.3 |                         163.7 |

### Edge Case Leaderboard (highest efficiency)

| Rank | Algorithm         | Wins (highest efficiency) |
| ---: | ----------------- | ------------------------: |
|    1 | Global Leader     |                   24 / 46 |
|    2 | Adaptive Strategy |                   24 / 46 |
|    3 | Local Leader      |                   20 / 46 |
|    4 | Local Average     |                    6 / 46 |
|    5 | Global Average    |                    3 / 46 |

### Performance by Problem Size

| Size      | Experiments | Global Leader (avg steps / avg ms) | Local Leader (avg steps / avg ms) | Global Average (avg steps / avg ms) | Local Average (avg steps / avg ms) | Adaptive Strategy (avg steps / avg ms) |
| --------- | ----------: | ---------------------------------: | --------------------------------: | ----------------------------------: | ---------------------------------: | -------------------------------------: |
| 4C x 4A   |           2 |                           32 / 0.6 |                          49 / 0.7 |                            19 / 0.5 |                           26 / 0.5 |                               32 / 0.3 |
| 4C x 5A   |           3 |                           50 / 0.4 |                          57 / 0.4 |                            32 / 0.3 |                           39 / 0.3 |                               50 / 0.5 |
| 5C x 4A   |           2 |                           37 / 0.4 |                          23 / 0.3 |                            30 / 0.3 |                           33 / 0.3 |                               37 / 0.3 |
| 5C x 5A   |           5 |                           73 / 0.6 |                          69 / 0.7 |                            40 / 0.5 |                           54 / 0.4 |                               73 / 0.4 |
| 5C x 6A   |           7 |                          134 / 1.1 |                          88 / 0.7 |                           111 / 0.8 |                          121 / 0.8 |                              134 / 0.8 |
| 5C x 7A   |           5 |                          164 / 1.1 |                          98 / 0.9 |                           164 / 0.9 |                          169 / 0.8 |                              164 / 1.1 |
| 5C x 8A   |           4 |                          272 / 1.5 |                         172 / 1.2 |                           248 / 1.2 |                          257 / 1.5 |                              272 / 1.6 |
| 5C x 9A   |           4 |                          322 / 1.6 |                         214 / 1.3 |                           290 / 1.8 |                          284 / 1.6 |                              322 / 1.7 |
| 5C x 10A  |           4 |                          345 / 1.9 |                         226 / 1.4 |                           316 / 2.5 |                          330 / 2.9 |                              345 / 2.0 |
| 6C x 4A   |           1 |                           72 / 0.4 |                          57 / 0.3 |                            64 / 0.4 |                           71 / 0.3 |                               72 / 0.4 |
| 6C x 5A   |           6 |                          133 / 0.6 |                         141 / 0.5 |                            81 / 0.4 |                          100 / 0.5 |                              133 / 0.6 |
| 6C x 6A   |           8 |                          174 / 0.9 |                         142 / 0.7 |                           141 / 0.8 |                          156 / 0.8 |                              174 / 0.8 |
| 6C x 7A   |           5 |                          204 / 1.4 |                         129 / 0.8 |                           162 / 0.8 |                          173 / 0.8 |                              204 / 0.9 |
| 6C x 8A   |           4 |                          295 / 1.4 |                         164 / 1.4 |                           317 / 1.7 |                          316 / 1.3 |                              296 / 1.4 |
| 6C x 9A   |           4 |                          397 / 1.5 |                         233 / 1.1 |                           321 / 1.5 |                          340 / 1.7 |                              397 / 1.8 |
| 6C x 10A  |           4 |                          407 / 1.9 |                         222 / 1.4 |                           384 / 2.3 |                          378 / 1.8 |                              407 / 1.8 |
| 7C x 5A   |           4 |                          160 / 0.8 |                         165 / 0.7 |                            97 / 0.5 |                          121 / 0.5 |                              160 / 0.6 |
| 7C x 6A   |           6 |                          215 / 0.9 |                         164 / 0.8 |                           183 / 0.9 |                          193 / 0.8 |                              215 / 1.0 |
| 7C x 7A   |           4 |                          294 / 1.1 |                         162 / 0.8 |                           297 / 1.0 |                          307 / 1.2 |                              294 / 1.3 |
| 7C x 8A   |           4 |                          342 / 1.5 |                         207 / 1.6 |                           340 / 2.1 |                          347 / 2.6 |                              342 / 2.0 |
| 7C x 9A   |           4 |                          477 / 2.1 |                         295 / 1.4 |                           397 / 1.9 |                          415 / 2.2 |                              477 / 2.4 |
| 7C x 10A  |           4 |                          404 / 1.8 |                         244 / 1.5 |                           424 / 2.2 |                          440 / 2.2 |                              404 / 1.7 |
| 8C x 5A   |           2 |                          218 / 0.8 |                         262 / 0.8 |                           144 / 0.5 |                          169 / 0.6 |                              218 / 1.0 |
| 8C x 6A   |           5 |                          243 / 1.1 |                         187 / 1.0 |                           236 / 1.1 |                          239 / 1.0 |                              243 / 1.1 |
| 8C x 7A   |           3 |                          357 / 1.3 |                         217 / 0.9 |                           322 / 1.4 |                          338 / 1.6 |                              357 / 1.4 |
| 8C x 8A   |           4 |                          413 / 1.5 |                         314 / 1.3 |                           326 / 1.5 |                          346 / 1.8 |                              413 / 1.9 |
| 8C x 9A   |           3 |                          488 / 2.1 |                         293 / 1.5 |                           474 / 2.9 |                          475 / 2.8 |                              488 / 3.6 |
| 8C x 10A  |           3 |                          566 / 3.1 |                         322 / 1.9 |                           534 / 2.8 |                          534 / 2.8 |                              566 / 2.5 |
| 9C x 7A   |           3 |                          368 / 1.6 |                         188 / 0.9 |                           392 / 1.4 |                          394 / 1.3 |                              368 / 1.3 |
| 9C x 8A   |           3 |                          541 / 2.4 |                         320 / 1.5 |                           436 / 1.7 |                          452 / 1.7 |                              541 / 2.0 |
| 9C x 9A   |           3 |                         532 / 11.2 |                         294 / 2.5 |                           539 / 3.3 |                          536 / 7.6 |                              534 / 2.8 |
| 9C x 10A  |           3 |                          612 / 5.3 |                         335 / 2.8 |                           604 / 3.1 |                          609 / 2.8 |                              612 / 3.1 |
| 10C x 5A  |           1 |                          198 / 0.8 |                         295 / 0.8 |                           111 / 0.6 |                          149 / 0.7 |                              198 / 0.7 |
| 10C x 7A  |           3 |                          362 / 1.7 |                         226 / 1.2 |                           310 / 2.9 |                          339 / 1.7 |                              362 / 1.8 |
| 10C x 8A  |           4 |                          488 / 2.5 |                         336 / 1.4 |                           436 / 1.8 |                          457 / 2.0 |                              488 / 2.2 |
| 10C x 9A  |           3 |                          542 / 2.5 |                         246 / 1.4 |                           532 / 2.5 |                          552 / 2.0 |                              542 / 2.4 |
| 10C x 10A |           4 |                          726 / 3.3 |                         519 / 2.7 |                           563 / 3.4 |                          583 / 2.8 |                              726 / 3.1 |
| 12C x 5A  |           1 |                          349 / 1.0 |                         502 / 1.1 |                           244 / 0.7 |                          275 / 1.0 |                              349 / 1.3 |
| 12C x 6A  |           1 |                          434 / 1.1 |                         618 / 2.0 |                           272 / 2.0 |                          317 / 1.1 |                              434 / 1.2 |
| 13C x 5A  |           1 |                          371 / 1.1 |                         541 / 1.4 |                           252 / 0.9 |                          288 / 0.8 |                              371 / 1.1 |
| 14C x 5A  |           1 |                          394 / 1.0 |                         589 / 1.7 |                           255 / 0.9 |                          306 / 1.0 |                              394 / 1.1 |
| 15C x 5A  |           1 |                          432 / 1.0 |                         649 / 1.4 |                           285 / 1.3 |                          330 / 1.2 |                              432 / 1.4 |

### Performance by Initial Gap (difficulty)

| Gap Category         | Count | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| -------------------- | ----: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Small (< 0.15)       |    26 |                     308.0 |                    179.3 |                      311.7 |                     315.3 |                         308.2 |
| Medium (0.15 - 0.30) |    83 |                     343.5 |                    226.2 |                      309.4 |                     320.1 |                         343.5 |
| Large (0.30 - 0.50)  |    36 |                     241.2 |                    216.6 |                      168.3 |                     190.7 |                         241.2 |
| Extreme (> 0.50)     |     1 |                      72.0 |                     57.0 |                       64.0 |                      71.0 |                          72.0 |

### Algorithm Leaderboard (highest efficiency)

| Rank | Algorithm         | Solo Wins | Tied Wins | Total |
| ---: | ----------------- | --------: | --------: | ----: |
|    1 | Local Leader      |       116 |         4 |   120 |
|    2 | Global Average    |         3 |         0 |     3 |
|    3 | Local Average     |         3 |         3 |     6 |
|    4 | Global Leader     |         0 |        24 |    24 |
|    5 | Adaptive Strategy |         0 |        24 |    24 |

### Step Efficiency (steps per 0.01 initial gap)

| Algorithm         | Avg Efficiency | Median Efficiency | Best (lowest) | Worst (highest) |
| ----------------- | -------------: | ----------------: | ------------: | --------------: |
| Global Leader     |          15.76 |             13.80 |          0.41 |           47.60 |
| Local Leader      |          10.38 |              9.07 |          0.41 |           42.18 |
| Global Average    |          14.48 |             12.34 |          0.00 |           45.78 |
| Local Average     |          15.01 |             12.99 |          0.41 |           52.98 |
| Adaptive Strategy |          15.76 |             13.80 |          0.41 |           47.60 |

### Time Efficiency (ms per 100 steps)

| Algorithm         | Avg ms/100 steps |  Min |   Max |
| ----------------- | ---------------: | ---: | ----: |
| Global Leader     |             1.38 | 0.24 | 37.33 |
| Local Leader      |             1.32 | 0.22 | 56.18 |
| Global Average    |             1.70 | 0.28 | 76.60 |
| Local Average     |             1.25 | 0.27 | 35.83 |
| Adaptive Strategy |             0.93 | 0.25 | 17.87 |
