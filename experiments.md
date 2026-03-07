# Experiment Results: Algorithm Comparison (100 Random + 20 Edge Cases)

**Date:** 2026-03-07
**Total experiments:** 120
**Algorithms:** Global Leader, Local Leader, Global Average, Local Average, Adaptive Strategy
**Strategy:** Always target the worst alternative (maximum gap to leader)
**Edge cases:** Low-weight criteria listed first with large local gaps to penalize sequential processing

---

## Exp 1: 5C x 6A

- **Size:** 5C x 6A
- **AHP Winner:** A3 (0.2785)
- **Target (worst):** A6 (0.0160)
- **Initial gap:** 0.2625

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   200 |  Yes   | -0.0000 |       5.9 |
| Local Leader      |   131 |  Yes   | +0.0070 |       3.6 |
| Global Average    |   178 |   No   | -0.0591 |       2.7 |
| Local Average     |   191 |   No   | -0.0513 |       1.9 |
| Adaptive Strategy |   200 |  Yes   | -0.0000 |       2.0 |

## Exp 2: 5C x 7A

- **Size:** 5C x 7A
- **AHP Winner:** A6 (0.2287)
- **Target (worst):** A4 (0.0614)
- **Initial gap:** 0.1673

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   100 |  Yes   | +0.0015 |       1.7 |
| Local Leader      |    55 |  Yes   | +0.0009 |       2.0 |
| Global Average    |   184 |   No   | -0.0621 |       1.9 |
| Local Average     |   180 |   No   | -0.0441 |       6.3 |
| Adaptive Strategy |   100 |  Yes   | +0.0015 |       1.7 |

## Exp 3: 5C x 8A

- **Size:** 5C x 8A
- **AHP Winner:** A5 (0.1838)
- **Target (worst):** A8 (0.0107)
- **Initial gap:** 0.1732

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   239 |  Yes   | -0.0001 |       1.8 |
| Local Leader      |   157 |  Yes   | +0.0003 |       1.7 |
| Global Average    |   264 |   No   | -0.0206 |       2.3 |
| Local Average     |   264 |   No   | -0.0324 |       1.9 |
| Adaptive Strategy |   239 |  Yes   | -0.0001 |       3.2 |

## Exp 4: 5C x 9A

- **Size:** 5C x 9A
- **AHP Winner:** A4 (0.2086)
- **Target (worst):** A6 (0.0087)
- **Initial gap:** 0.1999

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   368 |  Yes   | +0.0003 |       3.7 |
| Local Leader      |   254 |  Yes   | +0.0001 |       2.0 |
| Global Average    |   327 |   No   | -0.0715 |       1.4 |
| Local Average     |   316 |   No   | -0.0696 |       1.7 |
| Adaptive Strategy |   368 |  Yes   | +0.0003 |       2.3 |

## Exp 5: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A4 (0.2290)
- **Target (worst):** A1 (0.0091)
- **Initial gap:** 0.2200

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   339 |  Yes   | +0.0004 |       3.1 |
| Local Leader      |   278 |  Yes   | +0.0002 |       2.4 |
| Global Average    |   307 |   No   | -0.1234 |       2.0 |
| Local Average     |   325 |   No   | -0.1032 |       2.0 |
| Adaptive Strategy |   339 |  Yes   | +0.0004 |       2.1 |

## Exp 6: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A3 (0.2929)
- **Target (worst):** A5 (0.0192)
- **Initial gap:** 0.2737

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   192 |  Yes   | -0.0001 |       1.3 |
| Local Leader      |   128 |  Yes   | +0.0012 |       0.9 |
| Global Average    |   209 |   No   | -0.0985 |       0.9 |
| Local Average     |   221 |   No   | -0.0662 |       1.0 |
| Adaptive Strategy |   192 |  Yes   | -0.0001 |       1.0 |

## Exp 7: 6C x 7A

- **Size:** 6C x 7A
- **AHP Winner:** A1 (0.2741)
- **Target (worst):** A5 (0.0168)
- **Initial gap:** 0.2573

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   317 |  Yes   | +0.0001 |       1.1 |
| Local Leader      |   179 |  Yes   | +0.0002 |       0.9 |
| Global Average    |   237 |   No   | -0.0795 |       1.2 |
| Local Average     |   246 |   No   | -0.0801 |       0.9 |
| Adaptive Strategy |   317 |  Yes   | +0.0001 |       1.6 |

## Exp 8: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A7 (0.1646)
- **Target (worst):** A5 (0.0111)
- **Initial gap:** 0.1535

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   277 |  Yes   | +0.0006 |       1.3 |
| Local Leader      |   171 |  Yes   | +0.0014 |       1.1 |
| Global Average    |   311 |   No   | -0.0196 |       1.8 |
| Local Average     |   315 |   No   | -0.0138 |       1.8 |
| Adaptive Strategy |   277 |  Yes   | +0.0006 |       1.9 |

## Exp 9: 6C x 9A

- **Size:** 6C x 9A
- **AHP Winner:** A1 (0.2276)
- **Target (worst):** A6 (0.0204)
- **Initial gap:** 0.2072

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   341 |  Yes   | +0.0001 |       3.5 |
| Local Leader      |   163 |  Yes   | +0.0004 |       1.8 |
| Global Average    |   274 |   No   | -0.0886 |       2.9 |
| Local Average     |   305 |   No   | -0.0834 |       2.6 |
| Adaptive Strategy |   341 |  Yes   | +0.0001 |       2.7 |

## Exp 10: 6C x 10A

- **Size:** 6C x 10A
- **AHP Winner:** A6 (0.1591)
- **Target (worst):** A1 (0.0081)
- **Initial gap:** 0.1510

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   470 |  Yes   | +0.0001 |       2.4 |
| Local Leader      |   264 |  Yes   | +0.0009 |       1.6 |
| Global Average    |   409 |   No   | -0.0483 |       2.0 |
| Local Average     |   401 |   No   | -0.0406 |       1.8 |
| Adaptive Strategy |   470 |  Yes   | +0.0001 |       2.0 |

## Exp 11: 7C x 6A

- **Size:** 7C x 6A
- **AHP Winner:** A2 (0.3387)
- **Target (worst):** A4 (0.0333)
- **Initial gap:** 0.3054

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   232 |  Yes   | +0.0002 |       1.6 |
| Local Leader      |   164 |  Yes   | +0.0012 |       1.4 |
| Global Average    |   220 |   No   | -0.1228 |       1.1 |
| Local Average     |   214 |   No   | -0.1041 |       1.2 |
| Adaptive Strategy |   232 |  Yes   | +0.0002 |       1.2 |

## Exp 12: 7C x 7A

- **Size:** 7C x 7A
- **AHP Winner:** A3 (0.2107)
- **Target (worst):** A1 (0.0128)
- **Initial gap:** 0.1978

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   287 |  Yes   | -0.0000 |       2.2 |
| Local Leader      |   161 |  Yes   | -0.0001 |       1.4 |
| Global Average    |   282 |   No   | -0.0524 |       1.7 |
| Local Average     |   302 |   No   | -0.0339 |       1.2 |
| Adaptive Strategy |   287 |  Yes   | -0.0000 |       1.2 |

## Exp 13: 7C x 8A

- **Size:** 7C x 8A
- **AHP Winner:** A1 (0.1872)
- **Target (worst):** A2 (0.0112)
- **Initial gap:** 0.1759

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   374 |  Yes   | +0.0007 |       2.0 |
| Local Leader      |   231 |  Yes   | +0.0000 |       1.4 |
| Global Average    |   363 |   No   | -0.0352 |       1.4 |
| Local Average     |   360 |   No   | -0.0282 |       1.5 |
| Adaptive Strategy |   374 |  Yes   | +0.0007 |       1.8 |

## Exp 14: 7C x 9A

- **Size:** 7C x 9A
- **AHP Winner:** A1 (0.3029)
- **Target (worst):** A6 (0.0128)
- **Initial gap:** 0.2901

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   530 |  Yes   | -0.0000 |       2.3 |
| Local Leader      |   283 |  Yes   | +0.0014 |       1.5 |
| Global Average    |   375 |   No   | -0.1684 |       2.0 |
| Local Average     |   399 |   No   | -0.1442 |       1.8 |
| Adaptive Strategy |   530 |  Yes   | -0.0000 |       2.4 |

## Exp 15: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A8 (0.1404)
- **Target (worst):** A5 (0.0073)
- **Initial gap:** 0.1332

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   454 |  Yes   | +0.0001 |       3.0 |
| Local Leader      |   259 |  Yes   | +0.0007 |       1.6 |
| Global Average    |   497 |   No   | -0.0246 |       2.6 |
| Local Average     |   495 |   No   | -0.0255 |       2.3 |
| Adaptive Strategy |   454 |  Yes   | +0.0001 |       1.8 |

## Exp 16: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A2 (0.2406)
- **Target (worst):** A5 (0.0190)
- **Initial gap:** 0.2216

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   295 |  Yes   | +0.0138 |       2.2 |
| Local Leader      |   171 |  Yes   | +0.0009 |       1.9 |
| Global Average    |   301 |   No   | -0.0301 |       1.6 |
| Local Average     |   298 |   No   | -0.0134 |       1.5 |
| Adaptive Strategy |   295 |  Yes   | +0.0138 |       1.9 |

## Exp 17: 8C x 7A

- **Size:** 8C x 7A
- **AHP Winner:** A3 (0.2775)
- **Target (worst):** A4 (0.0160)
- **Initial gap:** 0.2615

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   358 |  Yes   | -0.0000 |       3.0 |
| Local Leader      |   236 |  Yes   | +0.0022 |       3.3 |
| Global Average    |   327 |   No   | -0.1238 |       4.2 |
| Local Average     |   347 |   No   | -0.0904 |       3.3 |
| Adaptive Strategy |   358 |  Yes   | -0.0000 |       2.3 |

## Exp 18: 8C x 8A

- **Size:** 8C x 8A
- **AHP Winner:** A1 (0.2508)
- **Target (worst):** A4 (0.0147)
- **Initial gap:** 0.2362

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   403 |  Yes   | -0.0001 |       1.5 |
| Local Leader      |   199 |  Yes   | +0.0000 |       1.1 |
| Global Average    |   399 |   No   | -0.1007 |       1.8 |
| Local Average     |   397 |   No   | -0.0870 |       2.0 |
| Adaptive Strategy |   403 |  Yes   | -0.0001 |       1.5 |

## Exp 19: 8C x 9A

- **Size:** 8C x 9A
- **AHP Winner:** A2 (0.1447)
- **Target (worst):** A5 (0.0092)
- **Initial gap:** 0.1356

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   437 |  Yes   | +0.0012 |       2.0 |
| Local Leader      |   215 |  Yes   | +0.0006 |       1.4 |
| Global Average    |   480 |   No   | -0.0099 |       2.2 |
| Local Average     |   483 |   No   | -0.0138 |       2.1 |
| Adaptive Strategy |   437 |  Yes   | +0.0012 |       2.4 |

## Exp 20: 8C x 10A

- **Size:** 8C x 10A
- **AHP Winner:** A7 (0.1387)
- **Target (worst):** A6 (0.0077)
- **Initial gap:** 0.1310

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   575 |  Yes   | -0.0001 |       2.8 |
| Local Leader      |   323 |  Yes   | -0.0000 |       1.8 |
| Global Average    |   551 |   No   | -0.0255 |       2.6 |
| Local Average     |   554 |   No   | -0.0252 |       2.2 |
| Adaptive Strategy |   575 |  Yes   | -0.0001 |       2.2 |

## Exp 21: 9C x 7A

- **Size:** 9C x 7A
- **AHP Winner:** A6 (0.2278)
- **Target (worst):** A5 (0.0157)
- **Initial gap:** 0.2121

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   317 |  Yes   | +0.0003 |       2.6 |
| Local Leader      |   215 |  Yes   | +0.0002 |       1.6 |
| Global Average    |   349 |   No   | -0.0769 |       1.5 |
| Local Average     |   370 |   No   | -0.0461 |       1.5 |
| Adaptive Strategy |   317 |  Yes   | +0.0003 |       1.5 |

## Exp 22: 9C x 8A

- **Size:** 9C x 8A
- **AHP Winner:** A1 (0.3247)
- **Target (worst):** A8 (0.0152)
- **Initial gap:** 0.3095

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   535 |  Yes   | +0.0002 |       2.6 |
| Local Leader      |   324 |  Yes   | +0.0005 |       1.6 |
| Global Average    |   425 |   No   | -0.1679 |       1.9 |
| Local Average     |   440 |   No   | -0.1465 |       1.7 |
| Adaptive Strategy |   535 |  Yes   | +0.0002 |       3.6 |

## Exp 23: 9C x 9A

- **Size:** 9C x 9A
- **AHP Winner:** A4 (0.2176)
- **Target (worst):** A5 (0.0100)
- **Initial gap:** 0.2076

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   545 |  Yes   | +0.0000 |       2.6 |
| Local Leader      |   343 |  Yes   | +0.0004 |       2.3 |
| Global Average    |   524 |   No   | -0.0929 |       3.4 |
| Local Average     |   541 |   No   | -0.0788 |       3.6 |
| Adaptive Strategy |   545 |  Yes   | +0.0000 |       4.7 |

## Exp 24: 9C x 10A

- **Size:** 9C x 10A
- **AHP Winner:** A1 (0.1386)
- **Target (worst):** A9 (0.0079)
- **Initial gap:** 0.1306

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   610 |  Yes   | +0.0000 |       5.7 |
| Local Leader      |   332 |  Yes   | +0.0003 |       2.2 |
| Global Average    |   598 |   No   | -0.0171 |       3.4 |
| Local Average     |   600 |   No   | -0.0189 |       4.1 |
| Adaptive Strategy |   610 |  Yes   | +0.0000 |       2.8 |

## Exp 25: 10C x 7A

- **Size:** 10C x 7A
- **AHP Winner:** A2 (0.3332)
- **Target (worst):** A7 (0.0171)
- **Initial gap:** 0.3161

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   521 |  Yes   | +0.0001 |       2.2 |
| Local Leader      |   329 |  Yes   | +0.0012 |       1.9 |
| Global Average    |   390 |   No   | -0.1779 |       1.8 |
| Local Average     |   426 |   No   | -0.1308 |       2.3 |
| Adaptive Strategy |   521 |  Yes   | +0.0001 |       2.4 |

## Exp 26: 10C x 8A

- **Size:** 10C x 8A
- **AHP Winner:** A4 (0.1673)
- **Target (worst):** A5 (0.0104)
- **Initial gap:** 0.1569

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   500 |  Yes   | +0.0002 |       2.3 |
| Local Leader      |   228 |  Yes   | +0.0002 |       1.5 |
| Global Average    |   531 |   No   | -0.0247 |       2.3 |
| Local Average     |   545 |   No   | -0.0178 |       2.1 |
| Adaptive Strategy |   500 |  Yes   | +0.0002 |       1.7 |

## Exp 27: 10C x 9A

- **Size:** 10C x 9A
- **AHP Winner:** A3 (0.1922)
- **Target (worst):** A5 (0.0333)
- **Initial gap:** 0.1589

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   402 |  Yes   | +0.0001 |       2.9 |
| Local Leader      |   236 |  Yes   | -0.0001 |       2.4 |
| Global Average    |   462 |   No   | -0.0557 |       1.9 |
| Local Average     |   463 |   No   | -0.0476 |       2.0 |
| Adaptive Strategy |   402 |  Yes   | +0.0001 |       2.8 |

## Exp 28: 10C x 10A

- **Size:** 10C x 10A
- **AHP Winner:** A6 (0.1770)
- **Target (worst):** A8 (0.0079)
- **Initial gap:** 0.1691

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   774 |  Yes   | +0.0002 |       4.1 |
| Local Leader      |   430 |  Yes   | +0.0001 |       2.3 |
| Global Average    |   653 |   No   | -0.0684 |       2.7 |
| Local Average     |   676 |   No   | -0.0579 |       9.2 |
| Adaptive Strategy |   774 |  Yes   | +0.0002 |       5.1 |

## Exp 29: 5C x 6A

- **Size:** 5C x 6A
- **AHP Winner:** A1 (0.2485)
- **Target (worst):** A6 (0.0134)
- **Initial gap:** 0.2351

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   205 |  Yes   | +0.0011 |       0.8 |
| Local Leader      |    96 |  Yes   | +0.0016 |       0.6 |
| Global Average    |   189 |   No   | -0.0265 |       1.1 |
| Local Average     |   195 |   No   | -0.0269 |       0.7 |
| Adaptive Strategy |   205 |  Yes   | +0.0011 |       0.8 |

## Exp 30: 5C x 7A

- **Size:** 5C x 7A
- **AHP Winner:** A6 (0.2385)
- **Target (worst):** A3 (0.0148)
- **Initial gap:** 0.2238

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   230 |  Yes   | +0.0001 |       1.0 |
| Local Leader      |   149 |  Yes   | +0.0019 |       0.9 |
| Global Average    |   206 |   No   | -0.0686 |       0.8 |
| Local Average     |   216 |   No   | -0.0484 |       0.7 |
| Adaptive Strategy |   230 |  Yes   | +0.0001 |       0.8 |

## Exp 31: 5C x 8A

- **Size:** 5C x 8A
- **AHP Winner:** A3 (0.1600)
- **Target (worst):** A2 (0.0096)
- **Initial gap:** 0.1504

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   271 |  Yes   | +0.0031 |       1.1 |
| Local Leader      |   186 |  Yes   | +0.0001 |       1.0 |
| Global Average    |   271 |   No   | -0.0186 |       1.4 |
| Local Average     |   267 |   No   | -0.0113 |       1.4 |
| Adaptive Strategy |   271 |  Yes   | +0.0031 |       1.1 |

## Exp 32: 5C x 9A

- **Size:** 5C x 9A
- **AHP Winner:** A3 (0.2297)
- **Target (worst):** A7 (0.0111)
- **Initial gap:** 0.2186

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   347 |  Yes   | +0.0002 |       2.1 |
| Local Leader      |   240 |  Yes   | +0.0014 |       1.2 |
| Global Average    |   285 |   No   | -0.0995 |       1.7 |
| Local Average     |   284 |   No   | -0.0918 |       1.6 |
| Adaptive Strategy |   347 |  Yes   | +0.0002 |       1.4 |

## Exp 33: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A3 (0.1787)
- **Target (worst):** A10 (0.0105)
- **Initial gap:** 0.1682

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   252 |  Yes   | -0.0000 |       1.2 |
| Local Leader      |   105 |  Yes   | +0.0007 |       0.7 |
| Global Average    |   305 |   No   | -0.0710 |       1.6 |
| Local Average     |   326 |   No   | -0.0564 |       1.6 |
| Adaptive Strategy |   252 |  Yes   | -0.0000 |       1.1 |

## Exp 34: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A3 (0.3003)
- **Target (worst):** A4 (0.0283)
- **Initial gap:** 0.2720

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   155 |  Yes   | +0.0007 |       0.6 |
| Local Leader      |    98 |  Yes   | +0.0005 |       0.5 |
| Global Average    |   170 |   No   | -0.0890 |       0.8 |
| Local Average     |   176 |   No   | -0.0745 |       0.8 |
| Adaptive Strategy |   155 |  Yes   | +0.0007 |       0.7 |

## Exp 35: 6C x 7A

- **Size:** 6C x 7A
- **AHP Winner:** A4 (0.2640)
- **Target (worst):** A1 (0.0154)
- **Initial gap:** 0.2486

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   293 |  Yes   | +0.0020 |       1.1 |
| Local Leader      |   198 |  Yes   | +0.0010 |       0.8 |
| Global Average    |   234 |   No   | -0.1081 |       0.8 |
| Local Average     |   256 |   No   | -0.0759 |       0.9 |
| Adaptive Strategy |   293 |  Yes   | +0.0020 |       1.0 |

## Exp 36: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A6 (0.1684)
- **Target (worst):** A1 (0.0098)
- **Initial gap:** 0.1585

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   323 |  Yes   | +0.0012 |       1.1 |
| Local Leader      |   175 |  Yes   | +0.0062 |       0.7 |
| Global Average    |   328 |   No   | -0.0022 |       1.2 |
| Local Average     |   322 |   No   | -0.0180 |       1.7 |
| Adaptive Strategy |   323 |  Yes   | +0.0012 |      11.8 |

## Exp 37: 6C x 9A

- **Size:** 6C x 9A
- **AHP Winner:** A2 (0.1443)
- **Target (worst):** A6 (0.0086)
- **Initial gap:** 0.1357

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   378 |  Yes   | +0.0017 |      15.3 |
| Local Leader      |   250 |  Yes   | -0.0000 |       3.2 |
| Global Average    |   355 |   No   | -0.0156 |       8.4 |
| Local Average     |   363 |   No   | -0.0126 |       6.4 |
| Adaptive Strategy |   378 |  Yes   | +0.0017 |       8.7 |

## Exp 38: 6C x 10A

- **Size:** 6C x 10A
- **AHP Winner:** A1 (0.1413)
- **Target (worst):** A10 (0.0084)
- **Initial gap:** 0.1329

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   399 |  Yes   | +0.0001 |       2.8 |
| Local Leader      |   224 |  Yes   | +0.0002 |       1.4 |
| Global Average    |   425 |   No   | -0.0250 |       2.3 |
| Local Average     |   399 |   No   | -0.0227 |       2.3 |
| Adaptive Strategy |   399 |  Yes   | +0.0001 |       2.5 |

## Exp 39: 7C x 6A

- **Size:** 7C x 6A
- **AHP Winner:** A1 (0.4418)
- **Target (worst):** A2 (0.0224)
- **Initial gap:** 0.4194

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   295 |  Yes   | +0.0001 |       3.3 |
| Local Leader      |   161 |  Yes   | +0.0013 |       2.6 |
| Global Average    |   215 |   No   | -0.2519 |       4.6 |
| Local Average     |   243 |   No   | -0.1829 |       1.3 |
| Adaptive Strategy |   295 |  Yes   | +0.0001 |       1.1 |

## Exp 40: 7C x 7A

- **Size:** 7C x 7A
- **AHP Winner:** A4 (0.2253)
- **Target (worst):** A6 (0.0148)
- **Initial gap:** 0.2105

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   292 |  Yes   | -0.0001 |       1.4 |
| Local Leader      |   186 |  Yes   | +0.0003 |       0.9 |
| Global Average    |   297 |   No   | -0.0601 |       1.6 |
| Local Average     |   306 |   No   | -0.0493 |       1.3 |
| Adaptive Strategy |   292 |  Yes   | -0.0001 |       1.1 |

## Exp 41: 7C x 8A

- **Size:** 7C x 8A
- **AHP Winner:** A7 (0.1729)
- **Target (worst):** A3 (0.0119)
- **Initial gap:** 0.1610

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   361 |  Yes   | -0.0001 |       1.4 |
| Local Leader      |   181 |  Yes   | +0.0040 |       1.5 |
| Global Average    |   344 |   No   | -0.0419 |       1.6 |
| Local Average     |   351 |   No   | -0.0262 |       1.4 |
| Adaptive Strategy |   361 |  Yes   | -0.0001 |       1.4 |

## Exp 42: 7C x 9A

- **Size:** 7C x 9A
- **AHP Winner:** A5 (0.2056)
- **Target (worst):** A1 (0.0086)
- **Initial gap:** 0.1969

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   484 |  Yes   | +0.0002 |       1.8 |
| Local Leader      |   315 |  Yes   | +0.0003 |       1.7 |
| Global Average    |   405 |   No   | -0.0745 |       1.9 |
| Local Average     |   423 |   No   | -0.0705 |       1.7 |
| Adaptive Strategy |   484 |  Yes   | +0.0002 |       2.1 |

## Exp 43: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A5 (0.1318)
- **Target (worst):** A6 (0.0680)
- **Initial gap:** 0.0638

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   216 |  Yes   | +0.0009 |       1.5 |
| Local Leader      |   171 |  Yes   | +0.0004 |       6.4 |
| Global Average    |   271 |  Yes   | +0.0002 |      15.5 |
| Local Average     |   338 |  Yes   | +0.0005 |      14.2 |
| Adaptive Strategy |   216 |  Yes   | +0.0009 |       8.5 |

## Exp 44: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A2 (0.2794)
- **Target (worst):** A6 (0.0195)
- **Initial gap:** 0.2599

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   258 |  Yes   | +0.0001 |       8.4 |
| Local Leader      |   177 |  Yes   | +0.0051 |       4.8 |
| Global Average    |   269 |   No   | -0.0708 |       1.6 |
| Local Average     |   283 |   No   | -0.0509 |       2.1 |
| Adaptive Strategy |   258 |  Yes   | +0.0001 |       1.4 |

## Exp 45: 8C x 7A

- **Size:** 8C x 7A
- **AHP Winner:** A2 (0.3658)
- **Target (worst):** A7 (0.0185)
- **Initial gap:** 0.3473

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   403 |  Yes   | +0.0004 |       1.4 |
| Local Leader      |   253 |  Yes   | +0.0037 |       1.0 |
| Global Average    |   293 |   No   | -0.2134 |       2.3 |
| Local Average     |   319 |   No   | -0.1508 |       1.9 |
| Adaptive Strategy |   403 |  Yes   | +0.0004 |       1.5 |

## Exp 46: 8C x 8A

- **Size:** 8C x 8A
- **AHP Winner:** A2 (0.3519)
- **Target (worst):** A6 (0.0167)
- **Initial gap:** 0.3352

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   460 |  Yes   | -0.0001 |       2.0 |
| Local Leader      |   305 |  Yes   | +0.0012 |       4.8 |
| Global Average    |   342 |   No   | -0.1985 |       5.7 |
| Local Average     |   377 |   No   | -0.1671 |       1.8 |
| Adaptive Strategy |   460 |  Yes   | -0.0001 |       1.5 |

## Exp 47: 8C x 9A

- **Size:** 8C x 9A
- **AHP Winner:** A5 (0.1870)
- **Target (worst):** A8 (0.0098)
- **Initial gap:** 0.1772

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   462 |  Yes   | +0.0001 |       2.0 |
| Local Leader      |   289 |  Yes   | +0.0005 |       1.6 |
| Global Average    |   493 |   No   | -0.0687 |       2.7 |
| Local Average     |   477 |   No   | -0.0542 |       2.2 |
| Adaptive Strategy |   462 |  Yes   | +0.0001 |       2.3 |

## Exp 48: 8C x 10A

- **Size:** 8C x 10A
- **AHP Winner:** A7 (0.1523)
- **Target (worst):** A5 (0.0089)
- **Initial gap:** 0.1433

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   537 |  Yes   | +0.0005 |       2.8 |
| Local Leader      |   313 |  Yes   | +0.0002 |       1.9 |
| Global Average    |   510 |   No   | -0.0461 |       3.8 |
| Local Average     |   510 |   No   | -0.0361 |       4.3 |
| Adaptive Strategy |   537 |  Yes   | +0.0005 |       2.7 |

## Exp 49: 9C x 7A

- **Size:** 9C x 7A
- **AHP Winner:** A5 (0.2279)
- **Target (worst):** A7 (0.0138)
- **Initial gap:** 0.2141

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   355 |  Yes   | -0.0001 |       1.4 |
| Local Leader      |   172 |  Yes   | +0.0000 |       0.9 |
| Global Average    |   406 |   No   | -0.0610 |       1.4 |
| Local Average     |   402 |   No   | -0.0488 |       1.5 |
| Adaptive Strategy |   355 |  Yes   | -0.0001 |       1.7 |

## Exp 50: 9C x 8A

- **Size:** 9C x 8A
- **AHP Winner:** A3 (0.2348)
- **Target (worst):** A4 (0.0136)
- **Initial gap:** 0.2212

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   525 |  Yes   | +0.0000 |       2.2 |
| Local Leader      |   384 |  Yes   | +0.0017 |       1.6 |
| Global Average    |   423 |   No   | -0.0912 |       1.6 |
| Local Average     |   438 |   No   | -0.0761 |       2.1 |
| Adaptive Strategy |   525 |  Yes   | +0.0000 |       2.3 |

## Exp 51: 9C x 9A

- **Size:** 9C x 9A
- **AHP Winner:** A1 (0.1394)
- **Target (worst):** A2 (0.0105)
- **Initial gap:** 0.1289

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   559 |   No   | +0.0041 |       2.0 |
| Local Leader      |   232 |  Yes   | +0.0002 |       1.0 |
| Global Average    |   542 |   No   | -0.0021 |       2.4 |
| Local Average     |   530 |   No   | -0.0069 |       3.2 |
| Adaptive Strategy |   564 |  Yes   | +0.0106 |       1.9 |

## Exp 52: 9C x 10A

- **Size:** 9C x 10A
- **AHP Winner:** A1 (0.1645)
- **Target (worst):** A8 (0.0094)
- **Initial gap:** 0.1552

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   568 |  Yes   | -0.0000 |       2.3 |
| Local Leader      |   263 |  Yes   | +0.0028 |       2.1 |
| Global Average    |   613 |   No   | -0.0460 |       2.6 |
| Local Average     |   614 |   No   | -0.0440 |       2.3 |
| Adaptive Strategy |   568 |  Yes   | -0.0000 |       2.7 |

## Exp 53: 10C x 7A

- **Size:** 10C x 7A
- **AHP Winner:** A3 (0.2816)
- **Target (worst):** A4 (0.0142)
- **Initial gap:** 0.2675

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   465 |  Yes   | -0.0001 |       1.7 |
| Local Leader      |   284 |  Yes   | +0.0001 |       1.2 |
| Global Average    |   415 |   No   | -0.1197 |       1.7 |
| Local Average     |   443 |   No   | -0.0894 |       2.1 |
| Adaptive Strategy |   465 |  Yes   | -0.0001 |       2.0 |

## Exp 54: 10C x 8A

- **Size:** 10C x 8A
- **AHP Winner:** A4 (0.1798)
- **Target (worst):** A5 (0.0111)
- **Initial gap:** 0.1687

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   494 |  Yes   | -0.0001 |       2.4 |
| Local Leader      |   277 |  Yes   | +0.0002 |       1.3 |
| Global Average    |   492 |   No   | -0.0348 |       2.5 |
| Local Average     |   509 |   No   | -0.0296 |       2.6 |
| Adaptive Strategy |   494 |  Yes   | -0.0001 |       1.7 |

## Exp 55: 10C x 9A

- **Size:** 10C x 9A
- **AHP Winner:** A6 (0.1826)
- **Target (worst):** A5 (0.0101)
- **Initial gap:** 0.1725

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   660 |  Yes   | +0.0001 |       3.0 |
| Local Leader      |   267 |  Yes   | +0.0002 |       1.6 |
| Global Average    |   575 |   No   | -0.0757 |       2.5 |
| Local Average     |   603 |   No   | -0.0463 |       2.2 |
| Adaptive Strategy |   660 |  Yes   | +0.0001 |       3.2 |

## Exp 56: 10C x 10A

- **Size:** 10C x 10A
- **AHP Winner:** A1 (0.2654)
- **Target (worst):** A9 (0.0109)
- **Initial gap:** 0.2545

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   847 |  Yes   | +0.0002 |       3.8 |
| Local Leader      |   562 |  Yes   | -0.0001 |       2.7 |
| Global Average    |   616 |   No   | -0.1549 |       3.2 |
| Local Average     |   635 |   No   | -0.1309 |       2.9 |
| Adaptive Strategy |   847 |  Yes   | +0.0002 |       4.7 |

## Exp 57: 5C x 6A

- **Size:** 5C x 6A
- **AHP Winner:** A4 (0.3342)
- **Target (worst):** A1 (0.0186)
- **Initial gap:** 0.3156

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   203 |  Yes   | +0.0010 |       0.9 |
| Local Leader      |   144 |  Yes   | +0.0005 |       0.7 |
| Global Average    |   179 |   No   | -0.1242 |       0.7 |
| Local Average     |   185 |   No   | -0.1011 |       0.8 |
| Adaptive Strategy |   203 |  Yes   | +0.0010 |       0.8 |

## Exp 58: 5C x 7A

- **Size:** 5C x 7A
- **AHP Winner:** A5 (0.2536)
- **Target (worst):** A4 (0.0124)
- **Initial gap:** 0.2412

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   245 |  Yes   | +0.0001 |       1.4 |
| Local Leader      |   114 |  Yes   | +0.0023 |       0.6 |
| Global Average    |   237 |   No   | -0.0694 |       0.9 |
| Local Average     |   227 |   No   | -0.0637 |       0.9 |
| Adaptive Strategy |   245 |  Yes   | +0.0001 |       1.0 |

## Exp 59: 5C x 8A

- **Size:** 5C x 8A
- **AHP Winner:** A1 (0.3020)
- **Target (worst):** A3 (0.0149)
- **Initial gap:** 0.2871

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   292 |  Yes   | +0.0002 |       1.5 |
| Local Leader      |   155 |  Yes   | +0.0008 |       1.8 |
| Global Average    |   220 |   No   | -0.1657 |       1.5 |
| Local Average     |   250 |   No   | -0.1288 |       1.3 |
| Adaptive Strategy |   292 |  Yes   | +0.0002 |       1.1 |

## Exp 60: 5C x 9A

- **Size:** 5C x 9A
- **AHP Winner:** A4 (0.1491)
- **Target (worst):** A9 (0.0096)
- **Initial gap:** 0.1395

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   291 |  Yes   | +0.0003 |       1.2 |
| Local Leader      |   197 |  Yes   | +0.0005 |       1.1 |
| Global Average    |   300 |   No   | -0.0218 |       2.0 |
| Local Average     |   294 |   No   | -0.0169 |       1.5 |
| Adaptive Strategy |   291 |  Yes   | +0.0003 |       2.4 |

## Exp 61: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A2 (0.2699)
- **Target (worst):** A4 (0.0105)
- **Initial gap:** 0.2594

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   437 |  Yes   | -0.0000 |       3.5 |
| Local Leader      |   294 |  Yes   | -0.0000 |       2.1 |
| Global Average    |   314 |   No   | -0.1456 |       2.2 |
| Local Average     |   330 |   No   | -0.1327 |       1.9 |
| Adaptive Strategy |   437 |  Yes   | -0.0000 |       2.3 |

## Exp 62: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A4 (0.2763)
- **Target (worst):** A3 (0.0185)
- **Initial gap:** 0.2578

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   194 |  Yes   | +0.0011 |       1.1 |
| Local Leader      |    90 |  Yes   | +0.0043 |       0.6 |
| Global Average    |   206 |   No   | -0.0833 |       1.1 |
| Local Average     |   218 |   No   | -0.0484 |       0.8 |
| Adaptive Strategy |   194 |  Yes   | +0.0011 |       0.7 |

## Exp 63: 6C x 7A

- **Size:** 6C x 7A
- **AHP Winner:** A3 (0.2673)
- **Target (worst):** A7 (0.0151)
- **Initial gap:** 0.2522

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   249 |  Yes   | -0.0001 |       1.3 |
| Local Leader      |   126 |  Yes   | +0.0016 |       0.9 |
| Global Average    |   242 |   No   | -0.1195 |       1.7 |
| Local Average     |   254 |   No   | -0.0719 |       1.5 |
| Adaptive Strategy |   249 |  Yes   | -0.0001 |       1.1 |

## Exp 64: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A6 (0.1537)
- **Target (worst):** A2 (0.0108)
- **Initial gap:** 0.1429

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   311 |   No   | +0.0033 |       1.5 |
| Local Leader      |   135 |  Yes   | +0.0091 |       0.8 |
| Global Average    |   314 |   No   | -0.0059 |       2.0 |
| Local Average     |   313 |   No   | -0.0043 |       2.6 |
| Adaptive Strategy |   313 |  Yes   | +0.0117 |       1.5 |

## Exp 65: 6C x 9A

- **Size:** 6C x 9A
- **AHP Winner:** A4 (0.1870)
- **Target (worst):** A6 (0.0086)
- **Initial gap:** 0.1784

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   403 |  Yes   | +0.0001 |       2.3 |
| Local Leader      |   245 |  Yes   | +0.0000 |       1.2 |
| Global Average    |   356 |   No   | -0.0561 |       2.5 |
| Local Average     |   364 |   No   | -0.0512 |       2.4 |
| Adaptive Strategy |   403 |  Yes   | +0.0001 |       2.2 |

## Exp 66: 6C x 10A

- **Size:** 6C x 10A
- **AHP Winner:** A1 (0.1802)
- **Target (worst):** A10 (0.0087)
- **Initial gap:** 0.1715

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   474 |  Yes   | -0.0001 |       4.0 |
| Local Leader      |   243 |  Yes   | +0.0000 |       1.9 |
| Global Average    |   369 |   No   | -0.0560 |       2.6 |
| Local Average     |   382 |   No   | -0.0497 |       3.3 |
| Adaptive Strategy |   474 |  Yes   | -0.0001 |       2.9 |

## Exp 67: 7C x 6A

- **Size:** 7C x 6A
- **AHP Winner:** A2 (0.2062)
- **Target (worst):** A1 (0.0379)
- **Initial gap:** 0.1683

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   155 |  Yes   | -0.0001 |       0.8 |
| Local Leader      |   122 |  Yes   | +0.0005 |       0.8 |
| Global Average    |   155 |  Yes   | -0.0001 |       0.7 |
| Local Average     |   172 |  Yes   | -0.0000 |       1.1 |
| Adaptive Strategy |   155 |  Yes   | -0.0001 |       1.1 |

## Exp 68: 7C x 7A

- **Size:** 7C x 7A
- **AHP Winner:** A4 (0.2194)
- **Target (worst):** A6 (0.0129)
- **Initial gap:** 0.2066

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   287 |  Yes   | +0.0002 |       1.0 |
| Local Leader      |   172 |  Yes   | +0.0018 |       0.7 |
| Global Average    |   312 |   No   | -0.0661 |       1.0 |
| Local Average     |   308 |   No   | -0.0433 |       0.9 |
| Adaptive Strategy |   287 |  Yes   | +0.0002 |       1.8 |

## Exp 69: 7C x 8A

- **Size:** 7C x 8A
- **AHP Winner:** A4 (0.2323)
- **Target (worst):** A8 (0.0112)
- **Initial gap:** 0.2211

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   356 |  Yes   | +0.0000 |       1.4 |
| Local Leader      |   222 |  Yes   | +0.0003 |       1.0 |
| Global Average    |   346 |   No   | -0.0858 |       1.2 |
| Local Average     |   361 |   No   | -0.0706 |       1.3 |
| Adaptive Strategy |   356 |  Yes   | +0.0000 |       1.6 |

## Exp 70: 7C x 9A

- **Size:** 7C x 9A
- **AHP Winner:** A3 (0.2444)
- **Target (worst):** A4 (0.0104)
- **Initial gap:** 0.2340

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   497 |  Yes   | +0.0004 |       2.4 |
| Local Leader      |   320 |  Yes   | +0.0001 |       1.8 |
| Global Average    |   393 |   No   | -0.1170 |       2.2 |
| Local Average     |   406 |   No   | -0.1039 |       2.1 |
| Adaptive Strategy |   497 |  Yes   | +0.0004 |       2.0 |

## Exp 71: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A4 (0.1283)
- **Target (worst):** A3 (0.0075)
- **Initial gap:** 0.1208

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   466 |  Yes   | +0.0001 |       1.8 |
| Local Leader      |   255 |  Yes   | +0.0001 |       1.4 |
| Global Average    |   471 |   No   | -0.0136 |       2.7 |
| Local Average     |   467 |   No   | -0.0143 |       2.0 |
| Adaptive Strategy |   466 |  Yes   | +0.0001 |       1.8 |

## Exp 72: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A5 (0.2337)
- **Target (worst):** A1 (0.1010)
- **Initial gap:** 0.1327

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   116 |  Yes   | +0.0049 |       0.6 |
| Local Leader      |   115 |  Yes   | +0.0018 |       1.1 |
| Global Average    |   187 |  Yes   | +0.0006 |       1.5 |
| Local Average     |   183 |  Yes   | +0.0008 |       0.8 |
| Adaptive Strategy |   116 |  Yes   | +0.0049 |       0.8 |

## Exp 73: 8C x 7A

- **Size:** 8C x 7A
- **AHP Winner:** A1 (0.1982)
- **Target (worst):** A4 (0.0152)
- **Initial gap:** 0.1831

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   309 |  Yes   | +0.0047 |       1.1 |
| Local Leader      |   161 |  Yes   | +0.0005 |       0.8 |
| Global Average    |   346 |   No   | -0.0338 |       1.2 |
| Local Average     |   347 |   No   | -0.0197 |       2.3 |
| Adaptive Strategy |   309 |  Yes   | +0.0047 |       1.9 |

## Exp 74: 8C x 8A

- **Size:** 8C x 8A
- **AHP Winner:** A1 (0.3518)
- **Target (worst):** A6 (0.0154)
- **Initial gap:** 0.3364

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   477 |  Yes   | +0.0001 |       2.3 |
| Local Leader      |   337 |  Yes   | +0.0009 |       5.4 |
| Global Average    |   373 |   No   | -0.2060 |       1.6 |
| Local Average     |   400 |   No   | -0.1673 |       1.5 |
| Adaptive Strategy |   477 |  Yes   | +0.0001 |       2.9 |

## Exp 75: 8C x 9A

- **Size:** 8C x 9A
- **AHP Winner:** A2 (0.2171)
- **Target (worst):** A7 (0.0103)
- **Initial gap:** 0.2068

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   564 |  Yes   | -0.0001 |       2.8 |
| Local Leader      |   376 |  Yes   | -0.0001 |       2.1 |
| Global Average    |   450 |   No   | -0.0986 |       2.2 |
| Local Average     |   465 |   No   | -0.0803 |       2.9 |
| Adaptive Strategy |   564 |  Yes   | -0.0001 |       2.2 |

## Exp 76: 8C x 10A

- **Size:** 8C x 10A
- **AHP Winner:** A6 (0.1621)
- **Target (worst):** A2 (0.0079)
- **Initial gap:** 0.1542

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   587 |  Yes   | -0.0001 |       2.9 |
| Local Leader      |   329 |  Yes   | +0.0002 |       1.9 |
| Global Average    |   542 |   No   | -0.0526 |       2.1 |
| Local Average     |   537 |   No   | -0.0457 |       2.1 |
| Adaptive Strategy |   587 |  Yes   | -0.0001 |       3.4 |

## Exp 77: 9C x 7A

- **Size:** 9C x 7A
- **AHP Winner:** A4 (0.2023)
- **Target (worst):** A5 (0.0131)
- **Initial gap:** 0.1892

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   433 |  Yes   | +0.0003 |       1.4 |
| Local Leader      |   177 |  Yes   | +0.0003 |       0.7 |
| Global Average    |   422 |   No   | -0.0284 |       1.3 |
| Local Average     |   409 |   No   | -0.0273 |       2.0 |
| Adaptive Strategy |   433 |  Yes   | +0.0003 |       1.7 |

## Exp 78: 9C x 8A

- **Size:** 9C x 8A
- **AHP Winner:** A4 (0.2860)
- **Target (worst):** A1 (0.0132)
- **Initial gap:** 0.2728

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   562 |  Yes   | -0.0000 |       2.6 |
| Local Leader      |   253 |  Yes   | +0.0009 |       1.3 |
| Global Average    |   461 |   No   | -0.1367 |       2.1 |
| Local Average     |   477 |   No   | -0.1172 |       2.1 |
| Adaptive Strategy |   562 |  Yes   | -0.0000 |       2.2 |

## Exp 79: 9C x 9A

- **Size:** 9C x 9A
- **AHP Winner:** A3 (0.1695)
- **Target (worst):** A7 (0.0118)
- **Initial gap:** 0.1577

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   493 |  Yes   | +0.0003 |       2.2 |
| Local Leader      |   307 |  Yes   | +0.0002 |       2.6 |
| Global Average    |   550 |   No   | -0.0541 |       2.1 |
| Local Average     |   536 |   No   | -0.0363 |       2.7 |
| Adaptive Strategy |   493 |  Yes   | +0.0003 |       1.9 |

## Exp 80: 9C x 10A

- **Size:** 9C x 10A
- **AHP Winner:** A7 (0.1517)
- **Target (worst):** A8 (0.0076)
- **Initial gap:** 0.1441

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   657 |  Yes   | -0.0000 |       3.1 |
| Local Leader      |   411 |  Yes   | +0.0012 |       2.2 |
| Global Average    |   602 |   No   | -0.0421 |       3.0 |
| Local Average     |   613 |   No   | -0.0363 |       3.0 |
| Adaptive Strategy |   657 |  Yes   | -0.0000 |       2.9 |

## Exp 81: 10C x 7A

- **Size:** 10C x 7A
- **AHP Winner:** A2 (0.1969)
- **Target (worst):** A7 (0.0996)
- **Initial gap:** 0.0973

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   100 |  Yes   | -0.0000 |       0.7 |
| Local Leader      |    66 |  Yes   | +0.0004 |       0.5 |
| Global Average    |   125 |   No   | -0.0322 |       1.1 |
| Local Average     |   149 |   No   | -0.0331 |       0.9 |
| Adaptive Strategy |   100 |  Yes   | -0.0000 |       1.0 |

## Exp 82: 10C x 8A

- **Size:** 10C x 8A
- **AHP Winner:** A2 (0.2053)
- **Target (worst):** A3 (0.0116)
- **Initial gap:** 0.1937

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   564 |  Yes   | +0.0007 |       3.0 |
| Local Leader      |   324 |  Yes   | +0.0003 |       1.6 |
| Global Average    |   487 |   No   | -0.0668 |       2.7 |
| Local Average     |   511 |   No   | -0.0523 |       2.1 |
| Adaptive Strategy |   564 |  Yes   | +0.0007 |       2.3 |

## Exp 83: 10C x 9A

- **Size:** 10C x 9A
- **AHP Winner:** A1 (0.1807)
- **Target (worst):** A3 (0.0112)
- **Initial gap:** 0.1695

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   563 |  Yes   | -0.0000 |       2.4 |
| Local Leader      |   236 |  Yes   | +0.0002 |       1.2 |
| Global Average    |   560 |   No   | -0.0423 |       2.9 |
| Local Average     |   590 |   No   | -0.0382 |       2.1 |
| Adaptive Strategy |   563 |  Yes   | -0.0000 |       2.8 |

## Exp 84: 10C x 10A

- **Size:** 10C x 10A
- **AHP Winner:** A5 (0.1639)
- **Target (worst):** A6 (0.0085)
- **Initial gap:** 0.1555

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   740 |  Yes   | -0.0001 |       2.9 |
| Local Leader      |   419 |  Yes   | +0.0002 |       2.4 |
| Global Average    |   650 |   No   | -0.0491 |       3.3 |
| Local Average     |   656 |   No   | -0.0490 |       3.1 |
| Adaptive Strategy |   740 |  Yes   | -0.0001 |       3.5 |

## Exp 85: 5C x 6A

- **Size:** 5C x 6A
- **AHP Winner:** A2 (0.2368)
- **Target (worst):** A5 (0.0196)
- **Initial gap:** 0.2172

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   170 |  Yes   | +0.0004 |       0.7 |
| Local Leader      |    84 |  Yes   | +0.0018 |       0.4 |
| Global Average    |   164 |   No   | -0.0323 |       0.6 |
| Local Average     |   179 |   No   | -0.0145 |       0.7 |
| Adaptive Strategy |   170 |  Yes   | +0.0004 |       0.6 |

## Exp 86: 5C x 7A

- **Size:** 5C x 7A
- **AHP Winner:** A1 (0.2337)
- **Target (worst):** A3 (0.0165)
- **Initial gap:** 0.2172

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   192 |  Yes   | +0.0004 |       1.2 |
| Local Leader      |   105 |  Yes   | +0.0013 |       0.8 |
| Global Average    |   181 |   No   | -0.0589 |       0.7 |
| Local Average     |   205 |   No   | -0.0497 |       0.9 |
| Adaptive Strategy |   192 |  Yes   | +0.0004 |       0.8 |

## Exp 87: 5C x 8A

- **Size:** 5C x 8A
- **AHP Winner:** A2 (0.2668)
- **Target (worst):** A7 (0.0124)
- **Initial gap:** 0.2545

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   284 |  Yes   | +0.0000 |       2.4 |
| Local Leader      |   188 |  Yes   | +0.0015 |       1.2 |
| Global Average    |   238 |   No   | -0.1174 |       1.3 |
| Local Average     |   248 |   No   | -0.1084 |       1.7 |
| Adaptive Strategy |   284 |  Yes   | +0.0000 |       1.4 |

## Exp 88: 5C x 9A

- **Size:** 5C x 9A
- **AHP Winner:** A2 (0.1641)
- **Target (worst):** A6 (0.0306)
- **Initial gap:** 0.1335

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   281 |  Yes   | -0.0001 |       1.1 |
| Local Leader      |   165 |  Yes   | +0.0014 |       0.8 |
| Global Average    |   246 |   No   | -0.0515 |       1.3 |
| Local Average     |   243 |   No   | -0.0355 |       1.1 |
| Adaptive Strategy |   281 |  Yes   | -0.0001 |       1.3 |

## Exp 89: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A1 (0.1507)
- **Target (worst):** A6 (0.0082)
- **Initial gap:** 0.1426

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   353 |  Yes   | -0.0000 |       1.5 |
| Local Leader      |   228 |  Yes   | +0.0004 |       1.2 |
| Global Average    |   337 |   No   | -0.0361 |       1.5 |
| Local Average     |   340 |   No   | -0.0307 |       1.9 |
| Adaptive Strategy |   353 |  Yes   | -0.0000 |       1.5 |

## Exp 90: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A2 (0.3800)
- **Target (worst):** A4 (0.0251)
- **Initial gap:** 0.3550

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   224 |  Yes   | +0.0005 |       1.6 |
| Local Leader      |   106 |  Yes   | +0.0021 |       0.9 |
| Global Average    |   183 |   No   | -0.1916 |       0.8 |
| Local Average     |   207 |   No   | -0.1305 |       0.9 |
| Adaptive Strategy |   224 |  Yes   | +0.0005 |       2.1 |

## Exp 91: 6C x 7A

- **Size:** 6C x 7A
- **AHP Winner:** A3 (0.1949)
- **Target (worst):** A7 (0.0732)
- **Initial gap:** 0.1217

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |    96 |  Yes   | +0.0006 |       0.6 |
| Local Leader      |    51 |  Yes   | +0.0020 |       0.6 |
| Global Average    |    84 |   No   | -0.0461 |       0.5 |
| Local Average     |    92 |   No   | -0.0380 |       0.8 |
| Adaptive Strategy |    96 |  Yes   | +0.0006 |       0.7 |

## Exp 92: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A5 (0.1723)
- **Target (worst):** A3 (0.0108)
- **Initial gap:** 0.1615

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   269 |  Yes   | -0.0000 |       1.1 |
| Local Leader      |   173 |  Yes   | +0.0014 |       1.0 |
| Global Average    |   314 |   No   | -0.0213 |       1.1 |
| Local Average     |   315 |   No   | -0.0251 |       1.0 |
| Adaptive Strategy |   269 |  Yes   | -0.0000 |       1.0 |

## Exp 93: 6C x 9A

- **Size:** 6C x 9A
- **AHP Winner:** A1 (0.3364)
- **Target (worst):** A4 (0.0142)
- **Initial gap:** 0.3222

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   465 |  Yes   | +0.0000 |       2.1 |
| Local Leader      |   273 |  Yes   | +0.0004 |       1.3 |
| Global Average    |   298 |   No   | -0.1985 |       1.4 |
| Local Average     |   328 |   No   | -0.1763 |       1.6 |
| Adaptive Strategy |   465 |  Yes   | +0.0000 |       1.6 |

## Exp 94: 6C x 10A

- **Size:** 6C x 10A
- **AHP Winner:** A1 (0.1542)
- **Target (worst):** A4 (0.0230)
- **Initial gap:** 0.1312

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   284 |  Yes   | -0.0000 |       1.6 |
| Local Leader      |   157 |  Yes   | +0.0008 |       1.0 |
| Global Average    |   334 |   No   | -0.0381 |       2.2 |
| Local Average     |   330 |   No   | -0.0306 |       1.5 |
| Adaptive Strategy |   284 |  Yes   | -0.0000 |       1.2 |

## Exp 95: 7C x 6A

- **Size:** 7C x 6A
- **AHP Winner:** A6 (0.2328)
- **Target (worst):** A2 (0.0152)
- **Initial gap:** 0.2177

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   221 |  Yes   | +0.0002 |       1.0 |
| Local Leader      |   139 |  Yes   | +0.0047 |       1.0 |
| Global Average    |   271 |   No   | -0.0156 |       1.4 |
| Local Average     |   264 |   No   | -0.0139 |       1.0 |
| Adaptive Strategy |   221 |  Yes   | +0.0002 |       1.1 |

## Exp 96: 7C x 7A

- **Size:** 7C x 7A
- **AHP Winner:** A3 (0.2501)
- **Target (worst):** A2 (0.0162)
- **Initial gap:** 0.2339

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   310 |  Yes   | +0.0000 |       1.1 |
| Local Leader      |   128 |  Yes   | +0.0002 |       0.8 |
| Global Average    |   297 |   No   | -0.0824 |       1.4 |
| Local Average     |   310 |   No   | -0.0610 |       1.5 |
| Adaptive Strategy |   310 |  Yes   | +0.0000 |       1.1 |

## Exp 97: 7C x 8A

- **Size:** 7C x 8A
- **AHP Winner:** A4 (0.1782)
- **Target (worst):** A3 (0.0181)
- **Initial gap:** 0.1600

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   275 |  Yes   | +0.0016 |       1.4 |
| Local Leader      |   195 |  Yes   | +0.0016 |       0.9 |
| Global Average    |   307 |   No   | -0.0298 |       1.7 |
| Local Average     |   314 |   No   | -0.0256 |       1.8 |
| Adaptive Strategy |   275 |  Yes   | +0.0016 |       1.5 |

## Exp 98: 7C x 9A

- **Size:** 7C x 9A
- **AHP Winner:** A8 (0.1576)
- **Target (worst):** A3 (0.0086)
- **Initial gap:** 0.1489

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   396 |  Yes   | +0.0001 |       1.5 |
| Local Leader      |   261 |  Yes   | +0.0002 |       1.0 |
| Global Average    |   415 |   No   | -0.0298 |       2.0 |
| Local Average     |   433 |   No   | -0.0285 |       1.9 |
| Adaptive Strategy |   396 |  Yes   | +0.0001 |       2.7 |

## Exp 99: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A8 (0.1418)
- **Target (worst):** A1 (0.0080)
- **Initial gap:** 0.1338

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   479 |  Yes   | -0.0000 |       1.9 |
| Local Leader      |   290 |  Yes   | -0.0001 |       1.5 |
| Global Average    |   457 |   No   | -0.0292 |       2.5 |
| Local Average     |   459 |   No   | -0.0273 |       2.0 |
| Adaptive Strategy |   479 |  Yes   | -0.0000 |       1.9 |

## Exp 100: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A2 (0.4332)
- **Target (worst):** A1 (0.0224)
- **Initial gap:** 0.4108

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   328 |  Yes   | +0.0009 |       1.2 |
| Local Leader      |   173 |  Yes   | +0.0007 |       1.1 |
| Global Average    |   266 |   No   | -0.2108 |       0.9 |
| Local Average     |   268 |   No   | -0.1749 |       1.0 |
| Adaptive Strategy |   328 |  Yes   | +0.0009 |       1.2 |

## Edge 101: 4C x 4A

- **Size:** 4C x 4A
- **AHP Winner:** A1 (0.4906)
- **Target (worst):** A4 (0.1174)
- **Initial gap:** 0.3732

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |    62 |  Yes   | +0.0296 |       0.7 |
| Local Leader      |    95 |  Yes   | +0.0168 |       0.9 |
| Global Average    |    36 |   No   | -0.2148 |       0.4 |
| Local Average     |    49 |   No   | -0.0684 |       0.4 |
| Adaptive Strategy |    62 |  Yes   | +0.0296 |       1.3 |

## Edge 102: 4C x 5A

- **Size:** 4C x 5A
- **AHP Winner:** A1 (0.3969)
- **Target (worst):** A5 (0.1070)
- **Initial gap:** 0.2899

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |    78 |  Yes   | +0.0146 |       0.6 |
| Local Leader      |   108 |  Yes   | +0.0005 |       0.5 |
| Global Average    |    55 |   No   | -0.1470 |       0.5 |
| Local Average     |    60 |   No   | -0.0783 |       0.4 |
| Adaptive Strategy |    78 |  Yes   | +0.0146 |       0.4 |

## Edge 103: 4C x 6A

- **Size:** 4C x 6A
- **AHP Winner:** A1 (0.3349)
- **Target (worst):** A6 (0.0953)
- **Initial gap:** 0.2396

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   105 |  Yes   | +0.0061 |       0.5 |
| Local Leader      |   146 |  Yes   | +0.0108 |       0.5 |
| Global Average    |    76 |   No   | -0.1353 |       0.8 |
| Local Average     |    79 |   No   | -0.0854 |       0.5 |
| Adaptive Strategy |   105 |  Yes   | +0.0061 |       1.4 |

## Edge 104: 4C x 8A

- **Size:** 4C x 8A
- **AHP Winner:** A1 (0.2701)
- **Target (worst):** A8 (0.0603)
- **Initial gap:** 0.2098

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   167 |  Yes   | +0.0006 |       0.8 |
| Local Leader      |   211 |  Yes   | +0.0052 |       0.9 |
| Global Average    |   109 |   No   | -0.1438 |       0.8 |
| Local Average     |   116 |   No   | -0.0981 |       0.7 |
| Adaptive Strategy |   167 |  Yes   | +0.0006 |       1.0 |

## Edge 105: 6C x 4A

- **Size:** 6C x 4A
- **AHP Winner:** A1 (0.4653)
- **Target (worst):** A4 (0.1472)
- **Initial gap:** 0.3182

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |    84 |  Yes   | +0.0210 |       0.6 |
| Local Leader      |   129 |  Yes   | +0.0095 |       0.6 |
| Global Average    |    61 |   No   | -0.1438 |       0.4 |
| Local Average     |    69 |   No   | -0.0453 |       0.4 |
| Adaptive Strategy |    84 |  Yes   | +0.0210 |       0.4 |

## Edge 106: 6C x 5A

- **Size:** 6C x 5A
- **AHP Winner:** A1 (0.4012)
- **Target (worst):** A5 (0.1003)
- **Initial gap:** 0.3009

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   121 |  Yes   | +0.0107 |       0.6 |
| Local Leader      |   180 |  Yes   | +0.0029 |       0.8 |
| Global Average    |    80 |   No   | -0.1728 |       1.1 |
| Local Average     |    91 |   No   | -0.0893 |       0.5 |
| Adaptive Strategy |   121 |  Yes   | +0.0107 |       0.5 |

## Edge 107: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A1 (0.3400)
- **Target (worst):** A6 (0.1029)
- **Initial gap:** 0.2370

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   157 |  Yes   | +0.0005 |       0.6 |
| Local Leader      |   226 |  Yes   | +0.0141 |       0.7 |
| Global Average    |    89 |   No   | -0.1341 |       0.8 |
| Local Average     |   111 |   No   | -0.0961 |       0.5 |
| Adaptive Strategy |   157 |  Yes   | +0.0005 |       0.8 |

## Edge 108: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A1 (0.2672)
- **Target (worst):** A8 (0.0713)
- **Initial gap:** 0.1959

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   245 |  Yes   | +0.0022 |       1.1 |
| Local Leader      |   306 |  Yes   | +0.0046 |       1.1 |
| Global Average    |   152 |   No   | -0.1252 |       0.8 |
| Local Average     |   175 |   No   | -0.0931 |       0.7 |
| Adaptive Strategy |   245 |  Yes   | +0.0022 |       1.0 |

## Edge 109: 8C x 4A

- **Size:** 8C x 4A
- **AHP Winner:** A1 (0.4453)
- **Target (worst):** A4 (0.1306)
- **Initial gap:** 0.3147

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   109 |  Yes   | +0.0013 |       1.2 |
| Local Leader      |   175 |  Yes   | +0.0116 |       1.6 |
| Global Average    |    75 |   No   | -0.1412 |       1.4 |
| Local Average     |    91 |   No   | -0.0327 |       1.7 |
| Adaptive Strategy |   109 |  Yes   | +0.0013 |       1.4 |

## Edge 110: 8C x 5A

- **Size:** 8C x 5A
- **AHP Winner:** A1 (0.4100)
- **Target (worst):** A5 (0.1072)
- **Initial gap:** 0.3028

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   164 |  Yes   | +0.0076 |       1.5 |
| Local Leader      |   238 |  Yes   | +0.0042 |       1.7 |
| Global Average    |    93 |   No   | -0.1889 |       1.1 |
| Local Average     |   123 |   No   | -0.0928 |       1.0 |
| Adaptive Strategy |   164 |  Yes   | +0.0076 |       1.0 |

## Edge 111: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A1 (0.3369)
- **Target (worst):** A6 (0.0935)
- **Initial gap:** 0.2434

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   210 |  Yes   | +0.0077 |       0.9 |
| Local Leader      |   285 |  Yes   | +0.0054 |       1.2 |
| Global Average    |   133 |   No   | -0.1555 |       1.3 |
| Local Average     |   153 |   No   | -0.0943 |       1.0 |
| Adaptive Strategy |   210 |  Yes   | +0.0077 |       1.1 |

## Edge 112: 8C x 8A

- **Size:** 8C x 8A
- **AHP Winner:** A1 (0.2664)
- **Target (worst):** A8 (0.0699)
- **Initial gap:** 0.1964

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   323 |  Yes   | +0.0020 |       1.5 |
| Local Leader      |   430 |  Yes   | +0.0026 |       1.8 |
| Global Average    |   190 |   No   | -0.1293 |       1.3 |
| Local Average     |   216 |   No   | -0.0948 |       1.8 |
| Adaptive Strategy |   323 |  Yes   | +0.0020 |       1.6 |

## Edge 113: 10C x 4A

- **Size:** 10C x 4A
- **AHP Winner:** A1 (0.4642)
- **Target (worst):** A4 (0.1337)
- **Initial gap:** 0.3305

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   146 |  Yes   | +0.0178 |       0.9 |
| Local Leader      |   233 |  Yes   | +0.0152 |       1.0 |
| Global Average    |    92 |   No   | -0.1828 |       0.7 |
| Local Average     |   118 |   No   | -0.0566 |       0.8 |
| Adaptive Strategy |   146 |  Yes   | +0.0178 |       2.1 |

## Edge 114: 10C x 5A

- **Size:** 10C x 5A
- **AHP Winner:** A1 (0.3941)
- **Target (worst):** A5 (0.1118)
- **Initial gap:** 0.2823

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   212 |  Yes   | +0.0111 |       0.9 |
| Local Leader      |   306 |  Yes   | +0.0055 |       0.9 |
| Global Average    |   139 |   No   | -0.1609 |       1.6 |
| Local Average     |   162 |   No   | -0.0757 |       2.4 |
| Adaptive Strategy |   212 |  Yes   | +0.0111 |       2.1 |

## Edge 115: 10C x 6A

- **Size:** 10C x 6A
- **AHP Winner:** A1 (0.3248)
- **Target (worst):** A6 (0.0957)
- **Initial gap:** 0.2291

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   258 |  Yes   | +0.0034 |       1.6 |
| Local Leader      |   351 |  Yes   | +0.0035 |       1.9 |
| Global Average    |   165 |   No   | -0.1416 |       1.2 |
| Local Average     |   190 |   No   | -0.0808 |       1.6 |
| Adaptive Strategy |   258 |  Yes   | +0.0034 |       1.7 |

## Edge 116: 10C x 8A

- **Size:** 10C x 8A
- **AHP Winner:** A1 (0.2694)
- **Target (worst):** A8 (0.0704)
- **Initial gap:** 0.1990

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   390 |  Yes   | +0.0001 |       2.7 |
| Local Leader      |   501 |  Yes   | +0.0037 |       3.0 |
| Global Average    |   230 |   No   | -0.1355 |       2.1 |
| Local Average     |   269 |   No   | -0.0961 |       1.5 |
| Adaptive Strategy |   390 |  Yes   | +0.0001 |       1.8 |

## Edge 117: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A1 (0.2185)
- **Target (worst):** A10 (0.0588)
- **Initial gap:** 0.1596

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   226 |  Yes   | +0.0043 |       1.9 |
| Local Leader      |   278 |  Yes   | +0.0001 |       2.2 |
| Global Average    |   125 |   No   | -0.1080 |       1.4 |
| Local Average     |   141 |   No   | -0.0905 |       0.9 |
| Adaptive Strategy |   226 |  Yes   | +0.0043 |       1.1 |

## Edge 118: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A1 (0.2242)
- **Target (worst):** A10 (0.0626)
- **Initial gap:** 0.1616

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   330 |  Yes   | +0.0039 |       2.0 |
| Local Leader      |   404 |  Yes   | +0.0009 |       1.9 |
| Global Average    |   204 |   No   | -0.1106 |       1.4 |
| Local Average     |   209 |   No   | -0.0918 |       1.9 |
| Adaptive Strategy |   330 |  Yes   | +0.0039 |       1.8 |

## Edge 119: 9C x 10A

- **Size:** 9C x 10A
- **AHP Winner:** A1 (0.2172)
- **Target (worst):** A10 (0.0613)
- **Initial gap:** 0.1558

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   425 |  Yes   | +0.0007 |       2.5 |
| Local Leader      |   512 |  Yes   | +0.0010 |       2.4 |
| Global Average    |   257 |   No   | -0.1068 |       1.9 |
| Local Average     |   285 |   No   | -0.0844 |       1.7 |
| Adaptive Strategy |   425 |  Yes   | +0.0007 |       1.9 |

## Edge 120: 10C x 10A

- **Size:** 10C x 10A
- **AHP Winner:** A1 (0.2123)
- **Target (worst):** A10 (0.0602)
- **Initial gap:** 0.1521

| Algorithm         | Steps | Winner |     Gap | Time (ms) |
| ----------------- | ----: | :----: | ------: | --------: |
| Global Leader     |   510 |  Yes   | +0.0005 |       2.7 |
| Local Leader      |   621 |  Yes   | +0.0003 |       2.5 |
| Global Average    |   290 |   No   | -0.1044 |       1.5 |
| Local Average     |   337 |   No   | -0.0833 |       1.6 |
| Adaptive Strategy |   510 |  Yes   | +0.0005 |       2.3 |

---

## Global Summary

### Overall Statistics

| Algorithm         | Avg Steps | Median Steps |       Win Rate | Avg Gap | Avg Time (ms) | Min Steps | Max Steps | Max Time (ms) |
| ----------------- | --------: | -----------: | -------------: | ------: | ------------: | --------: | --------: | ------------: |
| Global Leader     |     350.5 |          328 |  118/120 (98%) | +0.0017 |           2.1 |        62 |       847 |          15.3 |
| Local Leader      |     231.4 |          226 | 120/120 (100%) | +0.0019 |           1.5 |        51 |       621 |           6.4 |
| Global Average    |     316.1 |          307 |     3/120 (3%) | -0.0852 |           2.0 |        36 |       653 |          15.5 |
| Local Average     |     327.2 |          316 |     3/120 (3%) | -0.0633 |           1.9 |        49 |       676 |          14.2 |
| Adaptive Strategy |     350.6 |          328 | 120/120 (100%) | +0.0018 |           2.0 |        62 |       847 |          11.8 |

### Random vs Edge Case Experiments

| Category   | Experiments | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| ---------- | ----------: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Random     |         100 |                     377.4 |                    220.3 |                      352.8 |                     362.2 |                         377.4 |
| Edge Cases |          20 |                     216.1 |                    286.8 |                      132.6 |                     152.2 |                         216.1 |

### Edge Case Leaderboard (fewest steps among winners)

| Rank | Algorithm         | Wins (fewest steps) |
| ---: | ----------------- | ------------------: |
|    1 | Global Leader     |             20 / 20 |
|    2 | Adaptive Strategy |             20 / 20 |
|    3 | Local Leader      |              0 / 20 |
|    4 | Global Average    |              0 / 20 |
|    5 | Local Average     |              0 / 20 |

### Performance by Problem Size

| Size      | Experiments | Global Leader (avg steps / avg ms) | Local Leader (avg steps / avg ms) | Global Average (avg steps / avg ms) | Local Average (avg steps / avg ms) | Adaptive Strategy (avg steps / avg ms) |
| --------- | ----------: | ---------------------------------: | --------------------------------: | ----------------------------------: | ---------------------------------: | -------------------------------------: |
| 4C x 4A   |           1 |                           62 / 0.7 |                          95 / 0.9 |                            36 / 0.4 |                           49 / 0.4 |                               62 / 1.3 |
| 4C x 5A   |           1 |                           78 / 0.6 |                         108 / 0.5 |                            55 / 0.5 |                           60 / 0.4 |                               78 / 0.4 |
| 4C x 6A   |           1 |                          105 / 0.5 |                         146 / 0.5 |                            76 / 0.8 |                           79 / 0.5 |                              105 / 1.4 |
| 4C x 8A   |           1 |                          167 / 0.8 |                         211 / 0.9 |                           109 / 0.8 |                          116 / 0.7 |                              167 / 1.0 |
| 5C x 6A   |           4 |                          195 / 2.1 |                         114 / 1.3 |                           178 / 1.3 |                          188 / 1.0 |                              195 / 1.1 |
| 5C x 7A   |           4 |                          192 / 1.3 |                         106 / 1.1 |                           202 / 1.1 |                          207 / 2.2 |                              192 / 1.1 |
| 5C x 8A   |           4 |                          272 / 1.7 |                         172 / 1.4 |                           248 / 1.6 |                          257 / 1.6 |                              272 / 1.7 |
| 5C x 9A   |           4 |                          322 / 2.0 |                         214 / 1.3 |                           290 / 1.6 |                          284 / 1.5 |                              322 / 1.8 |
| 5C x 10A  |           5 |                          321 / 2.3 |                         237 / 1.7 |                           278 / 1.8 |                          292 / 1.7 |                              321 / 1.6 |
| 6C x 4A   |           1 |                           84 / 0.6 |                         129 / 0.6 |                            61 / 0.4 |                           69 / 0.4 |                               84 / 0.4 |
| 6C x 5A   |           1 |                          121 / 0.6 |                         180 / 0.8 |                            80 / 1.1 |                           91 / 0.5 |                              121 / 0.5 |
| 6C x 6A   |           5 |                          184 / 1.1 |                         130 / 0.7 |                           171 / 0.9 |                          187 / 0.8 |                              184 / 1.1 |
| 6C x 7A   |           4 |                          239 / 1.1 |                         139 / 0.8 |                           199 / 1.1 |                          212 / 1.0 |                              239 / 1.1 |
| 6C x 8A   |           5 |                          285 / 1.2 |                         192 / 0.9 |                           284 / 1.4 |                          288 / 1.6 |                              285 / 3.4 |
| 6C x 9A   |           4 |                          397 / 5.8 |                         233 / 1.9 |                           321 / 3.8 |                          340 / 3.3 |                              397 / 3.8 |
| 6C x 10A  |           4 |                          407 / 2.7 |                         222 / 1.5 |                           384 / 2.3 |                          378 / 2.2 |                              407 / 2.2 |
| 7C x 6A   |           4 |                          226 / 1.7 |                         147 / 1.5 |                           215 / 1.9 |                          223 / 1.2 |                              226 / 1.1 |
| 7C x 7A   |           4 |                          294 / 1.4 |                         162 / 1.0 |                           297 / 1.4 |                          307 / 1.2 |                              294 / 1.3 |
| 7C x 8A   |           4 |                          342 / 1.5 |                         207 / 1.2 |                           340 / 1.5 |                          347 / 1.5 |                              342 / 1.6 |
| 7C x 9A   |           4 |                          477 / 2.0 |                         295 / 1.5 |                           397 / 2.0 |                          415 / 1.9 |                              477 / 2.3 |
| 7C x 10A  |           5 |                          389 / 2.0 |                         276 / 2.6 |                           380 / 4.9 |                          394 / 4.5 |                              389 / 3.2 |
| 8C x 4A   |           1 |                          109 / 1.2 |                         175 / 1.6 |                            75 / 1.4 |                           91 / 1.7 |                              109 / 1.4 |
| 8C x 5A   |           1 |                          164 / 1.5 |                         238 / 1.7 |                            93 / 1.1 |                          123 / 1.0 |                              164 / 1.0 |
| 8C x 6A   |           5 |                          241 / 2.7 |                         184 / 2.0 |                           231 / 1.4 |                          237 / 1.3 |                              241 / 1.3 |
| 8C x 7A   |           3 |                          357 / 1.8 |                         217 / 1.7 |                           322 / 2.6 |                          338 / 2.5 |                              357 / 1.9 |
| 8C x 8A   |           4 |                          416 / 1.8 |                         318 / 3.3 |                           326 / 2.6 |                          348 / 1.8 |                              416 / 1.9 |
| 8C x 9A   |           3 |                          488 / 2.3 |                         293 / 1.7 |                           474 / 2.4 |                          475 / 2.4 |                              488 / 2.3 |
| 8C x 10A  |           3 |                          566 / 2.8 |                         322 / 1.9 |                           534 / 2.9 |                          534 / 2.9 |                              566 / 2.8 |
| 9C x 7A   |           3 |                          368 / 1.8 |                         188 / 1.1 |                           392 / 1.4 |                          394 / 1.7 |                              368 / 1.6 |
| 9C x 8A   |           3 |                          541 / 2.5 |                         320 / 1.5 |                           436 / 1.9 |                          452 / 2.0 |                              541 / 2.7 |
| 9C x 9A   |           3 |                          532 / 2.3 |                         294 / 2.0 |                           539 / 2.6 |                          536 / 3.2 |                              534 / 2.8 |
| 9C x 10A  |           4 |                          565 / 3.4 |                         380 / 2.2 |                           518 / 2.7 |                          528 / 2.8 |                              565 / 2.6 |
| 10C x 4A  |           1 |                          146 / 0.9 |                         233 / 1.0 |                            92 / 0.7 |                          118 / 0.8 |                              146 / 2.1 |
| 10C x 5A  |           1 |                          212 / 0.9 |                         306 / 0.9 |                           139 / 1.6 |                          162 / 2.4 |                              212 / 2.1 |
| 10C x 6A  |           1 |                          258 / 1.6 |                         351 / 1.9 |                           165 / 1.2 |                          190 / 1.6 |                              258 / 1.7 |
| 10C x 7A  |           3 |                          362 / 1.5 |                         226 / 1.2 |                           310 / 1.6 |                          339 / 1.8 |                              362 / 1.8 |
| 10C x 8A  |           4 |                          487 / 2.6 |                         333 / 1.8 |                           435 / 2.4 |                          459 / 2.1 |                              487 / 1.9 |
| 10C x 9A  |           3 |                          542 / 2.8 |                         246 / 1.7 |                           532 / 2.4 |                          552 / 2.1 |                              542 / 2.9 |
| 10C x 10A |           4 |                          718 / 3.4 |                         508 / 2.5 |                           552 / 2.7 |                          576 / 4.2 |                              718 / 3.9 |

### Performance by Initial Gap (difficulty)

| Gap Category         | Count | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) |
| -------------------- | ----: | ------------------------: | -----------------------: | -------------------------: | ------------------------: | ----------------------------: |
| Small (< 0.15)       |    21 |                     380.7 |                    221.4 |                      385.8 |                     389.9 |                         381.0 |
| Medium (0.15 - 0.30) |    82 |                     356.5 |                    237.8 |                      319.6 |                     330.8 |                         356.5 |
| Large (0.30 - 0.50)  |    17 |                     284.1 |                    212.9 |                      213.0 |                     232.2 |                         284.1 |

### Algorithm Leaderboard (fewest steps among winners)

| Rank | Algorithm         | Solo Wins | Tied Wins | Total |
| ---: | ----------------- | --------: | --------: | ----: |
|    1 | Local Leader      |       100 |         0 |   100 |
|    2 | Global Leader     |         0 |        20 |    20 |
|    3 | Global Average    |         0 |         0 |     0 |
|    4 | Local Average     |         0 |         0 |     0 |
|    5 | Adaptive Strategy |         0 |        20 |    20 |

### Step Efficiency (steps per 0.01 initial gap)

| Algorithm         | Avg Efficiency | Median Efficiency | Best (lowest) | Worst (highest) |
| ----------------- | -------------: | ----------------: | ------------: | --------------: |
| Global Leader     |          18.78 |             16.58 |          1.66 |           47.60 |
| Local Leader      |          12.21 |             10.62 |          2.55 |           40.83 |
| Global Average    |          17.39 |             15.11 |          0.96 |           45.78 |
| Local Average     |          17.95 |             15.27 |          1.31 |           52.98 |
| Adaptive Strategy |          18.79 |             16.58 |          1.66 |           47.60 |

### Time Efficiency (ms per 100 steps)

| Algorithm         | Avg ms/100 steps |  Min |  Max |
| ----------------- | ---------------: | ---: | ---: |
| Global Leader     |             0.63 | 0.32 | 4.04 |
| Local Leader      |             0.73 | 0.29 | 3.77 |
| Global Average    |             0.69 | 0.30 | 5.70 |
| Local Average     |             0.62 | 0.30 | 4.21 |
| Adaptive Strategy |             0.63 | 0.33 | 3.92 |
