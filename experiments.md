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

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 200 | Yes | -0.0000 | 5.5 |
| Local Leader | 131 | Yes | +0.0070 | 3.1 |
| Global Average | 186 | Yes | +0.0078 | 4.0 |
| Local Average | 197 | Yes | +0.0083 | 2.5 |
| Adaptive Strategy | 201 | Yes | +0.0018 | 4.0 |

## Exp 2: 5C x 7A

- **Size:** 5C x 7A
- **AHP Winner:** A6 (0.2287)
- **Target (worst):** A4 (0.0614)
- **Initial gap:** 0.1673

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 100 | Yes | +0.0015 | 2.0 |
| Local Leader | 55 | Yes | +0.0009 | 2.3 |
| Global Average | 190 | Yes | +0.0029 | 2.8 |
| Local Average | 183 | Yes | +0.0020 | 3.6 |
| Adaptive Strategy | 183 | Yes | +0.0020 | 3.9 |

## Exp 3: 5C x 8A

- **Size:** 5C x 8A
- **AHP Winner:** A5 (0.1838)
- **Target (worst):** A8 (0.0107)
- **Initial gap:** 0.1732

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 239 | Yes | -0.0001 | 2.9 |
| Local Leader | 157 | Yes | +0.0003 | 2.5 |
| Global Average | 270 | Yes | +0.0024 | 2.0 |
| Local Average | 273 | Yes | +0.0022 | 2.6 |
| Adaptive Strategy | 272 | Yes | +0.0002 | 3.0 |

## Exp 4: 5C x 9A

- **Size:** 5C x 9A
- **AHP Winner:** A4 (0.2086)
- **Target (worst):** A6 (0.0087)
- **Initial gap:** 0.1999

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 368 | Yes | +0.0003 | 2.4 |
| Local Leader | 254 | Yes | +0.0001 | 2.1 |
| Global Average | 355 | Yes | +0.0009 | 5.1 |
| Local Average | 345 | Yes | -0.0000 | 3.4 |
| Adaptive Strategy | 357 | Yes | +0.0007 | 5.2 |

## Exp 5: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A4 (0.2290)
- **Target (worst):** A1 (0.0091)
- **Initial gap:** 0.2200

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 339 | Yes | +0.0004 | 2.6 |
| Local Leader | 278 | Yes | +0.0002 | 2.0 |
| Global Average | 372 | Yes | +0.0003 | 7.8 |
| Local Average | 378 | Yes | +0.0005 | 7.2 |
| Adaptive Strategy | 386 | Yes | +0.0000 | 6.7 |

## Exp 6: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A3 (0.2929)
- **Target (worst):** A5 (0.0192)
- **Initial gap:** 0.2737

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 192 | Yes | -0.0001 | 2.5 |
| Local Leader | 128 | Yes | +0.0012 | 1.5 |
| Global Average | 223 | Yes | +0.0001 | 2.1 |
| Local Average | 229 | Yes | +0.0005 | 2.0 |
| Adaptive Strategy | 230 | Yes | +0.0007 | 3.2 |

## Exp 7: 6C x 7A

- **Size:** 6C x 7A
- **AHP Winner:** A1 (0.2741)
- **Target (worst):** A5 (0.0168)
- **Initial gap:** 0.2573

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 317 | Yes | +0.0001 | 3.1 |
| Local Leader | 179 | Yes | +0.0002 | 2.8 |
| Global Average | 257 | Yes | +0.0017 | 2.8 |
| Local Average | 266 | Yes | +0.0018 | 3.1 |
| Adaptive Strategy | 272 | Yes | +0.0005 | 3.4 |

## Exp 8: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A7 (0.1646)
- **Target (worst):** A5 (0.0111)
- **Initial gap:** 0.1535

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 277 | Yes | +0.0006 | 1.3 |
| Local Leader | 171 | Yes | +0.0014 | 1.0 |
| Global Average | 316 | Yes | +0.0005 | 3.4 |
| Local Average | 319 | Yes | +0.0024 | 2.0 |
| Adaptive Strategy | 319 | Yes | +0.0024 | 2.3 |

## Exp 9: 6C x 9A

- **Size:** 6C x 9A
- **AHP Winner:** A1 (0.2276)
- **Target (worst):** A6 (0.0204)
- **Initial gap:** 0.2072

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 341 | Yes | +0.0001 | 1.8 |
| Local Leader | 163 | Yes | +0.0004 | 1.1 |
| Global Average | 306 | Yes | +0.0010 | 4.2 |
| Local Average | 334 | Yes | +0.0017 | 5.5 |
| Adaptive Strategy | 336 | Yes | -0.0000 | 5.7 |

## Exp 10: 6C x 10A

- **Size:** 6C x 10A
- **AHP Winner:** A6 (0.1591)
- **Target (worst):** A1 (0.0081)
- **Initial gap:** 0.1510

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 470 | Yes | +0.0001 | 2.5 |
| Local Leader | 264 | Yes | +0.0009 | 1.3 |
| Global Average | 439 | Yes | +0.0014 | 5.8 |
| Local Average | 428 | Yes | +0.0023 | 4.6 |
| Adaptive Strategy | 426 | Yes | +0.0001 | 5.2 |

## Exp 11: 7C x 6A

- **Size:** 7C x 6A
- **AHP Winner:** A2 (0.3387)
- **Target (worst):** A4 (0.0333)
- **Initial gap:** 0.3054

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 232 | Yes | +0.0002 | 1.0 |
| Local Leader | 164 | Yes | +0.0012 | 0.8 |
| Global Average | 247 | Yes | +0.0021 | 2.5 |
| Local Average | 240 | Yes | +0.0033 | 2.1 |
| Adaptive Strategy | 240 | Yes | +0.0013 | 1.9 |

## Exp 12: 7C x 7A

- **Size:** 7C x 7A
- **AHP Winner:** A3 (0.2107)
- **Target (worst):** A1 (0.0128)
- **Initial gap:** 0.1978

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 287 | Yes | -0.0000 | 1.4 |
| Local Leader | 161 | Yes | -0.0001 | 0.9 |
| Global Average | 299 | Yes | +0.0006 | 2.1 |
| Local Average | 313 | Yes | +0.0012 | 2.4 |
| Adaptive Strategy | 313 | Yes | +0.0012 | 2.9 |

## Exp 13: 7C x 8A

- **Size:** 7C x 8A
- **AHP Winner:** A1 (0.1872)
- **Target (worst):** A2 (0.0112)
- **Initial gap:** 0.1759

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 374 | Yes | +0.0007 | 2.2 |
| Local Leader | 231 | Yes | +0.0000 | 1.4 |
| Global Average | 376 | Yes | +0.0016 | 2.5 |
| Local Average | 370 | Yes | +0.0005 | 3.8 |
| Adaptive Strategy | 370 | Yes | +0.0010 | 2.7 |

## Exp 14: 7C x 9A

- **Size:** 7C x 9A
- **AHP Winner:** A1 (0.3029)
- **Target (worst):** A6 (0.0128)
- **Initial gap:** 0.2901

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 530 | Yes | -0.0000 | 2.7 |
| Local Leader | 283 | Yes | +0.0014 | 2.2 |
| Global Average | 441 | Yes | +0.0019 | 8.0 |
| Local Average | 453 | Yes | +0.0001 | 6.9 |
| Adaptive Strategy | 497 | Yes | +0.0003 | 9.1 |

## Exp 15: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A8 (0.1404)
- **Target (worst):** A5 (0.0073)
- **Initial gap:** 0.1332

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 454 | Yes | +0.0001 | 2.3 |
| Local Leader | 259 | Yes | +0.0007 | 1.8 |
| Global Average | 509 | Yes | +0.0012 | 5.3 |
| Local Average | 508 | Yes | +0.0008 | 4.5 |
| Adaptive Strategy | 508 | Yes | +0.0015 | 5.3 |

## Exp 16: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A2 (0.2406)
- **Target (worst):** A5 (0.0190)
- **Initial gap:** 0.2216

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 295 | Yes | +0.0138 | 1.2 |
| Local Leader | 171 | Yes | +0.0009 | 1.9 |
| Global Average | 307 | Yes | +0.0057 | 1.8 |
| Local Average | 301 | Yes | +0.0008 | 1.3 |
| Adaptive Strategy | 301 | Yes | +0.0008 | 1.5 |

## Exp 17: 8C x 7A

- **Size:** 8C x 7A
- **AHP Winner:** A3 (0.2775)
- **Target (worst):** A4 (0.0160)
- **Initial gap:** 0.2615

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 358 | Yes | -0.0000 | 3.2 |
| Local Leader | 236 | Yes | +0.0022 | 3.2 |
| Global Average | 376 | Yes | +0.0008 | 5.7 |
| Local Average | 382 | Yes | +0.0009 | 5.7 |
| Adaptive Strategy | 383 | Yes | +0.0018 | 5.3 |

## Exp 18: 8C x 8A

- **Size:** 8C x 8A
- **AHP Winner:** A1 (0.2508)
- **Target (worst):** A4 (0.0147)
- **Initial gap:** 0.2362

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 403 | Yes | -0.0001 | 1.5 |
| Local Leader | 199 | Yes | +0.0000 | 1.3 |
| Global Average | 435 | Yes | +0.0014 | 5.3 |
| Local Average | 429 | Yes | +0.0004 | 4.4 |
| Adaptive Strategy | 432 | Yes | +0.0010 | 4.6 |

## Exp 19: 8C x 9A

- **Size:** 8C x 9A
- **AHP Winner:** A2 (0.1447)
- **Target (worst):** A5 (0.0092)
- **Initial gap:** 0.1356

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 437 | Yes | +0.0012 | 2.0 |
| Local Leader | 215 | Yes | +0.0006 | 1.5 |
| Global Average | 483 | Yes | +0.0025 | 2.7 |
| Local Average | 487 | Yes | +0.0023 | 2.5 |
| Adaptive Strategy | 487 | Yes | +0.0023 | 5.3 |

## Exp 20: 8C x 10A

- **Size:** 8C x 10A
- **AHP Winner:** A7 (0.1387)
- **Target (worst):** A6 (0.0077)
- **Initial gap:** 0.1310

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 575 | Yes | -0.0001 | 3.7 |
| Local Leader | 323 | Yes | -0.0000 | 1.9 |
| Global Average | 571 | Yes | +0.0006 | 5.4 |
| Local Average | 573 | Yes | +0.0004 | 5.1 |
| Adaptive Strategy | 574 | Yes | +0.0001 | 5.8 |

## Exp 21: 9C x 7A

- **Size:** 9C x 7A
- **AHP Winner:** A6 (0.2278)
- **Target (worst):** A5 (0.0157)
- **Initial gap:** 0.2121

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 317 | Yes | +0.0003 | 1.3 |
| Local Leader | 215 | Yes | +0.0002 | 0.9 |
| Global Average | 373 | Yes | -0.0001 | 3.2 |
| Local Average | 384 | Yes | +0.0010 | 2.0 |
| Adaptive Strategy | 384 | Yes | +0.0003 | 2.7 |

## Exp 22: 9C x 8A

- **Size:** 9C x 8A
- **AHP Winner:** A1 (0.3247)
- **Target (worst):** A8 (0.0152)
- **Initial gap:** 0.3095

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 535 | Yes | +0.0002 | 1.8 |
| Local Leader | 324 | Yes | +0.0005 | 1.4 |
| Global Average | 505 | Yes | +0.0003 | 8.5 |
| Local Average | 508 | Yes | +0.0009 | 7.7 |
| Adaptive Strategy | 537 | Yes | +0.0006 | 9.4 |

## Exp 23: 9C x 9A

- **Size:** 9C x 9A
- **AHP Winner:** A4 (0.2176)
- **Target (worst):** A5 (0.0100)
- **Initial gap:** 0.2076

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 545 | Yes | +0.0000 | 2.1 |
| Local Leader | 343 | Yes | +0.0004 | 1.6 |
| Global Average | 586 | Yes | -0.0000 | 9.4 |
| Local Average | 591 | Yes | -0.0000 | 7.7 |
| Adaptive Strategy | 600 | Yes | +0.0003 | 9.3 |

## Exp 24: 9C x 10A

- **Size:** 9C x 10A
- **AHP Winner:** A1 (0.1386)
- **Target (worst):** A9 (0.0079)
- **Initial gap:** 0.1306

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 610 | Yes | +0.0000 | 3.1 |
| Local Leader | 332 | Yes | +0.0003 | 1.8 |
| Global Average | 609 | Yes | -0.0000 | 5.1 |
| Local Average | 611 | Yes | +0.0009 | 5.7 |
| Adaptive Strategy | 611 | Yes | +0.0009 | 5.6 |

## Exp 25: 10C x 7A

- **Size:** 10C x 7A
- **AHP Winner:** A2 (0.3332)
- **Target (worst):** A7 (0.0171)
- **Initial gap:** 0.3161

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 521 | Yes | +0.0001 | 2.3 |
| Local Leader | 329 | Yes | +0.0012 | 1.8 |
| Global Average | 478 | Yes | +0.0003 | 9.6 |
| Local Average | 491 | Yes | +0.0006 | 8.2 |
| Adaptive Strategy | 504 | Yes | +0.0004 | 8.2 |

## Exp 26: 10C x 8A

- **Size:** 10C x 8A
- **AHP Winner:** A4 (0.1673)
- **Target (worst):** A5 (0.0104)
- **Initial gap:** 0.1569

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 500 | Yes | +0.0002 | 2.3 |
| Local Leader | 228 | Yes | +0.0002 | 2.0 |
| Global Average | 540 | Yes | +0.0011 | 3.9 |
| Local Average | 552 | Yes | +0.0023 | 4.1 |
| Adaptive Strategy | 552 | Yes | +0.0023 | 3.8 |

## Exp 27: 10C x 9A

- **Size:** 10C x 9A
- **AHP Winner:** A3 (0.1922)
- **Target (worst):** A5 (0.0333)
- **Initial gap:** 0.1589

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 402 | Yes | +0.0001 | 2.2 |
| Local Leader | 236 | Yes | -0.0001 | 1.7 |
| Global Average | 494 | Yes | +0.0003 | 8.5 |
| Local Average | 490 | Yes | +0.0005 | 7.6 |
| Adaptive Strategy | 490 | Yes | +0.0002 | 7.1 |

## Exp 28: 10C x 10A

- **Size:** 10C x 10A
- **AHP Winner:** A6 (0.1770)
- **Target (worst):** A8 (0.0079)
- **Initial gap:** 0.1691

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 774 | Yes | +0.0002 | 4.5 |
| Local Leader | 430 | Yes | +0.0001 | 3.2 |
| Global Average | 709 | Yes | +0.0005 | 15.0 |
| Local Average | 723 | Yes | +0.0003 | 12.2 |
| Adaptive Strategy | 736 | Yes | +0.0000 | 14.8 |

## Exp 29: 5C x 6A

- **Size:** 5C x 6A
- **AHP Winner:** A1 (0.2485)
- **Target (worst):** A6 (0.0134)
- **Initial gap:** 0.2351

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 205 | Yes | +0.0011 | 1.1 |
| Local Leader | 96 | Yes | +0.0016 | 0.8 |
| Global Average | 195 | Yes | +0.0041 | 1.7 |
| Local Average | 201 | Yes | +0.0040 | 1.6 |
| Adaptive Strategy | 201 | Yes | +0.0028 | 1.8 |

## Exp 30: 5C x 7A

- **Size:** 5C x 7A
- **AHP Winner:** A6 (0.2385)
- **Target (worst):** A3 (0.0148)
- **Initial gap:** 0.2238

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 230 | Yes | +0.0001 | 2.1 |
| Local Leader | 149 | Yes | +0.0019 | 1.1 |
| Global Average | 217 | Yes | +0.0035 | 1.5 |
| Local Average | 226 | Yes | +0.0036 | 1.6 |
| Adaptive Strategy | 226 | Yes | +0.0022 | 2.2 |

## Exp 31: 5C x 8A

- **Size:** 5C x 8A
- **AHP Winner:** A3 (0.1600)
- **Target (worst):** A2 (0.0096)
- **Initial gap:** 0.1504

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 271 | Yes | +0.0031 | 1.1 |
| Local Leader | 186 | Yes | +0.0001 | 0.8 |
| Global Average | 278 | Yes | +0.0010 | 1.6 |
| Local Average | 271 | Yes | +0.0002 | 1.7 |
| Adaptive Strategy | 271 | Yes | +0.0002 | 1.6 |

## Exp 32: 5C x 9A

- **Size:** 5C x 9A
- **AHP Winner:** A3 (0.2297)
- **Target (worst):** A7 (0.0111)
- **Initial gap:** 0.2186

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 347 | Yes | +0.0002 | 1.3 |
| Local Leader | 240 | Yes | +0.0014 | 1.2 |
| Global Average | 326 | Yes | +0.0013 | 4.4 |
| Local Average | 320 | Yes | +0.0000 | 3.7 |
| Adaptive Strategy | 329 | Yes | +0.0005 | 4.1 |

## Exp 33: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A3 (0.1787)
- **Target (worst):** A10 (0.0105)
- **Initial gap:** 0.1682

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 252 | Yes | -0.0000 | 1.3 |
| Local Leader | 105 | Yes | +0.0007 | 0.7 |
| Global Average | 329 | Yes | +0.0013 | 3.9 |
| Local Average | 343 | Yes | -0.0000 | 2.6 |
| Adaptive Strategy | 343 | Yes | -0.0000 | 4.1 |

## Exp 34: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A3 (0.3003)
- **Target (worst):** A4 (0.0283)
- **Initial gap:** 0.2720

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 155 | Yes | +0.0007 | 0.8 |
| Local Leader | 98 | Yes | +0.0005 | 0.9 |
| Global Average | 185 | Yes | +0.0009 | 1.1 |
| Local Average | 189 | Yes | +0.0050 | 1.0 |
| Adaptive Strategy | 188 | Yes | +0.0003 | 1.5 |

## Exp 35: 6C x 7A

- **Size:** 6C x 7A
- **AHP Winner:** A4 (0.2640)
- **Target (worst):** A1 (0.0154)
- **Initial gap:** 0.2486

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 293 | Yes | +0.0020 | 1.3 |
| Local Leader | 198 | Yes | +0.0010 | 0.8 |
| Global Average | 261 | Yes | +0.0012 | 1.9 |
| Local Average | 273 | Yes | +0.0004 | 1.9 |
| Adaptive Strategy | 281 | Yes | -0.0001 | 1.9 |

## Exp 36: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A6 (0.1684)
- **Target (worst):** A1 (0.0098)
- **Initial gap:** 0.1585

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 323 | Yes | +0.0012 | 1.4 |
| Local Leader | 175 | Yes | +0.0062 | 1.2 |
| Global Average | 330 | Yes | +0.0053 | 1.3 |
| Local Average | 329 | Yes | +0.0089 | 1.6 |
| Adaptive Strategy | 329 | Yes | +0.0091 | 1.7 |

## Exp 37: 6C x 9A

- **Size:** 6C x 9A
- **AHP Winner:** A2 (0.1443)
- **Target (worst):** A6 (0.0086)
- **Initial gap:** 0.1357

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 378 | Yes | +0.0017 | 1.7 |
| Local Leader | 250 | Yes | -0.0000 | 1.1 |
| Global Average | 362 | Yes | +0.0010 | 2.0 |
| Local Average | 368 | Yes | +0.0001 | 2.0 |
| Adaptive Strategy | 368 | Yes | +0.0001 | 2.6 |

## Exp 38: 6C x 10A

- **Size:** 6C x 10A
- **AHP Winner:** A1 (0.1413)
- **Target (worst):** A10 (0.0084)
- **Initial gap:** 0.1329

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 399 | Yes | +0.0001 | 1.6 |
| Local Leader | 224 | Yes | +0.0002 | 1.1 |
| Global Average | 436 | Yes | -0.0001 | 2.8 |
| Local Average | 411 | Yes | +0.0016 | 3.1 |
| Adaptive Strategy | 411 | Yes | +0.0016 | 3.2 |

## Exp 39: 7C x 6A

- **Size:** 7C x 6A
- **AHP Winner:** A1 (0.4418)
- **Target (worst):** A2 (0.0224)
- **Initial gap:** 0.4194

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 295 | Yes | +0.0001 | 0.9 |
| Local Leader | 161 | Yes | +0.0013 | 0.6 |
| Global Average | 256 | Yes | +0.0003 | 2.1 |
| Local Average | 273 | Yes | +0.0018 | 1.9 |
| Adaptive Strategy | 288 | Yes | +0.0004 | 2.3 |

## Exp 40: 7C x 7A

- **Size:** 7C x 7A
- **AHP Winner:** A4 (0.2253)
- **Target (worst):** A6 (0.0148)
- **Initial gap:** 0.2105

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 292 | Yes | -0.0001 | 1.0 |
| Local Leader | 186 | Yes | +0.0003 | 0.9 |
| Global Average | 309 | Yes | +0.0003 | 2.0 |
| Local Average | 316 | Yes | +0.0039 | 1.6 |
| Adaptive Strategy | 319 | Yes | +0.0005 | 2.2 |

## Exp 41: 7C x 8A

- **Size:** 7C x 8A
- **AHP Winner:** A7 (0.1729)
- **Target (worst):** A3 (0.0119)
- **Initial gap:** 0.1610

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 361 | Yes | -0.0001 | 1.2 |
| Local Leader | 181 | Yes | +0.0040 | 0.9 |
| Global Average | 358 | Yes | +0.0019 | 2.5 |
| Local Average | 360 | Yes | +0.0012 | 1.7 |
| Adaptive Strategy | 360 | Yes | +0.0012 | 2.0 |

## Exp 42: 7C x 9A

- **Size:** 7C x 9A
- **AHP Winner:** A5 (0.2056)
- **Target (worst):** A1 (0.0086)
- **Initial gap:** 0.1969

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 484 | Yes | +0.0002 | 1.7 |
| Local Leader | 315 | Yes | +0.0003 | 1.3 |
| Global Average | 439 | Yes | +0.0013 | 4.4 |
| Local Average | 450 | Yes | +0.0016 | 4.1 |
| Adaptive Strategy | 476 | Yes | +0.0002 | 5.1 |

## Exp 43: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A5 (0.1318)
- **Target (worst):** A6 (0.0680)
- **Initial gap:** 0.0638

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 216 | Yes | +0.0009 | 1.1 |
| Local Leader | 171 | Yes | +0.0004 | 1.0 |
| Global Average | 271 | Yes | +0.0002 | 1.2 |
| Local Average | 338 | Yes | +0.0005 | 1.5 |
| Adaptive Strategy | 399 | Yes | +0.0000 | 2.1 |

## Exp 44: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A2 (0.2794)
- **Target (worst):** A6 (0.0195)
- **Initial gap:** 0.2599

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 258 | Yes | +0.0001 | 0.8 |
| Local Leader | 177 | Yes | +0.0051 | 0.9 |
| Global Average | 283 | Yes | +0.0047 | 2.1 |
| Local Average | 293 | Yes | +0.0030 | 1.4 |
| Adaptive Strategy | 298 | Yes | +0.0009 | 1.6 |

## Exp 45: 8C x 7A

- **Size:** 8C x 7A
- **AHP Winner:** A2 (0.3658)
- **Target (worst):** A7 (0.0185)
- **Initial gap:** 0.3473

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 403 | Yes | +0.0004 | 1.3 |
| Local Leader | 253 | Yes | +0.0037 | 0.9 |
| Global Average | 367 | Yes | +0.0013 | 5.4 |
| Local Average | 375 | Yes | +0.0004 | 4.0 |
| Adaptive Strategy | 393 | Yes | +0.0002 | 4.6 |

## Exp 46: 8C x 8A

- **Size:** 8C x 8A
- **AHP Winner:** A2 (0.3519)
- **Target (worst):** A6 (0.0167)
- **Initial gap:** 0.3352

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 460 | Yes | -0.0001 | 1.3 |
| Local Leader | 305 | Yes | +0.0012 | 1.5 |
| Global Average | 439 | Yes | +0.0007 | 8.3 |
| Local Average | 462 | Yes | +0.0016 | 7.6 |
| Adaptive Strategy | 502 | Yes | +0.0000 | 7.9 |

## Exp 47: 8C x 9A

- **Size:** 8C x 9A
- **AHP Winner:** A5 (0.1870)
- **Target (worst):** A8 (0.0098)
- **Initial gap:** 0.1772

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 462 | Yes | +0.0001 | 1.7 |
| Local Leader | 289 | Yes | +0.0005 | 1.2 |
| Global Average | 517 | Yes | +0.0014 | 4.3 |
| Local Average | 497 | Yes | +0.0013 | 4.8 |
| Adaptive Strategy | 504 | Yes | +0.0009 | 5.1 |

## Exp 48: 8C x 10A

- **Size:** 8C x 10A
- **AHP Winner:** A7 (0.1523)
- **Target (worst):** A5 (0.0089)
- **Initial gap:** 0.1433

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 537 | Yes | +0.0005 | 2.2 |
| Local Leader | 313 | Yes | +0.0002 | 1.4 |
| Global Average | 536 | Yes | +0.0000 | 5.9 |
| Local Average | 530 | Yes | +0.0002 | 5.1 |
| Adaptive Strategy | 530 | Yes | +0.0007 | 5.3 |

## Exp 49: 9C x 7A

- **Size:** 9C x 7A
- **AHP Winner:** A5 (0.2279)
- **Target (worst):** A7 (0.0138)
- **Initial gap:** 0.2141

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 355 | Yes | -0.0001 | 1.2 |
| Local Leader | 172 | Yes | +0.0000 | 1.5 |
| Global Average | 422 | Yes | +0.0028 | 3.5 |
| Local Average | 414 | Yes | +0.0010 | 2.1 |
| Adaptive Strategy | 415 | Yes | +0.0020 | 2.4 |

## Exp 50: 9C x 8A

- **Size:** 9C x 8A
- **AHP Winner:** A3 (0.2348)
- **Target (worst):** A4 (0.0136)
- **Initial gap:** 0.2212

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 525 | Yes | +0.0000 | 2.1 |
| Local Leader | 384 | Yes | +0.0017 | 1.2 |
| Global Average | 474 | Yes | -0.0000 | 5.8 |
| Local Average | 480 | Yes | +0.0004 | 5.0 |
| Adaptive Strategy | 488 | Yes | +0.0002 | 5.3 |

## Exp 51: 9C x 9A

- **Size:** 9C x 9A
- **AHP Winner:** A1 (0.1394)
- **Target (worst):** A2 (0.0105)
- **Initial gap:** 0.1289

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 562 | Yes | +0.0104 | 2.1 |
| Local Leader | 232 | Yes | +0.0002 | 0.9 |
| Global Average | 545 | Yes | +0.0041 | 2.5 |
| Local Average | 536 | Yes | +0.0048 | 2.4 |
| Adaptive Strategy | 536 | Yes | +0.0048 | 3.0 |

## Exp 52: 9C x 10A

- **Size:** 9C x 10A
- **AHP Winner:** A1 (0.1645)
- **Target (worst):** A8 (0.0094)
- **Initial gap:** 0.1552

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 568 | Yes | -0.0000 | 2.6 |
| Local Leader | 263 | Yes | +0.0028 | 1.2 |
| Global Average | 639 | Yes | +0.0010 | 6.4 |
| Local Average | 638 | Yes | +0.0001 | 5.5 |
| Adaptive Strategy | 638 | Yes | +0.0001 | 6.6 |

## Exp 53: 10C x 7A

- **Size:** 10C x 7A
- **AHP Winner:** A3 (0.2816)
- **Target (worst):** A4 (0.0142)
- **Initial gap:** 0.2675

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 465 | Yes | -0.0001 | 1.4 |
| Local Leader | 284 | Yes | +0.0001 | 0.9 |
| Global Average | 460 | Yes | +0.0015 | 4.6 |
| Local Average | 476 | Yes | +0.0023 | 3.7 |
| Adaptive Strategy | 492 | Yes | -0.0000 | 4.6 |

## Exp 54: 10C x 8A

- **Size:** 10C x 8A
- **AHP Winner:** A4 (0.1798)
- **Target (worst):** A5 (0.0111)
- **Initial gap:** 0.1687

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 494 | Yes | -0.0001 | 1.6 |
| Local Leader | 277 | Yes | +0.0002 | 1.1 |
| Global Average | 508 | Yes | +0.0005 | 4.2 |
| Local Average | 522 | Yes | -0.0000 | 2.8 |
| Adaptive Strategy | 523 | Yes | +0.0004 | 4.5 |

## Exp 55: 10C x 9A

- **Size:** 10C x 9A
- **AHP Winner:** A6 (0.1826)
- **Target (worst):** A5 (0.0101)
- **Initial gap:** 0.1725

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 660 | Yes | +0.0001 | 2.1 |
| Local Leader | 267 | Yes | +0.0002 | 1.1 |
| Global Average | 628 | Yes | +0.0004 | 8.9 |
| Local Average | 634 | Yes | +0.0002 | 5.7 |
| Adaptive Strategy | 634 | Yes | +0.0002 | 7.0 |

## Exp 56: 10C x 10A

- **Size:** 10C x 10A
- **AHP Winner:** A1 (0.2654)
- **Target (worst):** A9 (0.0109)
- **Initial gap:** 0.2545

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 847 | Yes | +0.0002 | 2.8 |
| Local Leader | 562 | Yes | -0.0001 | 2.1 |
| Global Average | 763 | Yes | +0.0004 | 25.2 |
| Local Average | 766 | Yes | +0.0005 | 22.4 |
| Adaptive Strategy | 830 | Yes | +0.0000 | 23.3 |

## Exp 57: 5C x 6A

- **Size:** 5C x 6A
- **AHP Winner:** A4 (0.3342)
- **Target (worst):** A1 (0.0186)
- **Initial gap:** 0.3156

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 203 | Yes | +0.0010 | 1.3 |
| Local Leader | 144 | Yes | +0.0005 | 1.4 |
| Global Average | 197 | Yes | +0.0014 | 1.4 |
| Local Average | 199 | Yes | +0.0031 | 1.1 |
| Adaptive Strategy | 206 | Yes | +0.0003 | 1.2 |

## Exp 58: 5C x 7A

- **Size:** 5C x 7A
- **AHP Winner:** A5 (0.2536)
- **Target (worst):** A4 (0.0124)
- **Initial gap:** 0.2412

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 245 | Yes | +0.0001 | 0.9 |
| Local Leader | 114 | Yes | +0.0023 | 0.7 |
| Global Average | 248 | Yes | +0.0048 | 1.3 |
| Local Average | 236 | Yes | +0.0018 | 1.1 |
| Adaptive Strategy | 241 | Yes | +0.0014 | 1.5 |

## Exp 59: 5C x 8A

- **Size:** 5C x 8A
- **AHP Winner:** A1 (0.3020)
- **Target (worst):** A3 (0.0149)
- **Initial gap:** 0.2871

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 292 | Yes | +0.0002 | 1.0 |
| Local Leader | 155 | Yes | +0.0008 | 0.8 |
| Global Average | 269 | Yes | +0.0014 | 3.1 |
| Local Average | 287 | Yes | +0.0002 | 2.7 |
| Adaptive Strategy | 293 | Yes | +0.0001 | 2.6 |

## Exp 60: 5C x 9A

- **Size:** 5C x 9A
- **AHP Winner:** A4 (0.1491)
- **Target (worst):** A9 (0.0096)
- **Initial gap:** 0.1395

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 291 | Yes | +0.0003 | 1.0 |
| Local Leader | 197 | Yes | +0.0005 | 1.1 |
| Global Average | 308 | Yes | +0.0015 | 1.8 |
| Local Average | 301 | Yes | +0.0026 | 1.4 |
| Adaptive Strategy | 301 | Yes | +0.0026 | 1.8 |

## Exp 61: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A2 (0.2699)
- **Target (worst):** A4 (0.0105)
- **Initial gap:** 0.2594

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 437 | Yes | -0.0000 | 1.5 |
| Local Leader | 294 | Yes | -0.0000 | 1.3 |
| Global Average | 397 | Yes | +0.0015 | 8.1 |
| Local Average | 403 | Yes | +0.0004 | 6.9 |
| Adaptive Strategy | 432 | Yes | -0.0000 | 7.3 |

## Exp 62: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A4 (0.2763)
- **Target (worst):** A3 (0.0185)
- **Initial gap:** 0.2578

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 194 | Yes | +0.0011 | 0.8 |
| Local Leader | 90 | Yes | +0.0043 | 0.8 |
| Global Average | 217 | Yes | +0.0014 | 1.1 |
| Local Average | 226 | Yes | +0.0045 | 1.0 |
| Adaptive Strategy | 226 | Yes | +0.0045 | 1.2 |

## Exp 63: 6C x 7A

- **Size:** 6C x 7A
- **AHP Winner:** A3 (0.2673)
- **Target (worst):** A7 (0.0151)
- **Initial gap:** 0.2522

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 249 | Yes | -0.0001 | 0.8 |
| Local Leader | 126 | Yes | +0.0016 | 0.6 |
| Global Average | 270 | Yes | +0.0020 | 1.8 |
| Local Average | 273 | Yes | +0.0031 | 1.8 |
| Adaptive Strategy | 273 | Yes | +0.0031 | 1.8 |

## Exp 64: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A6 (0.1537)
- **Target (worst):** A2 (0.0108)
- **Initial gap:** 0.1429

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 313 | Yes | +0.0114 | 1.2 |
| Local Leader | 135 | Yes | +0.0091 | 0.7 |
| Global Average | 316 | Yes | +0.0018 | 1.1 |
| Local Average | 315 | Yes | +0.0041 | 1.3 |
| Adaptive Strategy | 315 | Yes | +0.0041 | 1.7 |

## Exp 65: 6C x 9A

- **Size:** 6C x 9A
- **AHP Winner:** A4 (0.1870)
- **Target (worst):** A6 (0.0086)
- **Initial gap:** 0.1784

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 403 | Yes | +0.0001 | 1.4 |
| Local Leader | 245 | Yes | +0.0000 | 1.0 |
| Global Average | 378 | Yes | +0.0001 | 2.9 |
| Local Average | 385 | Yes | +0.0003 | 3.0 |
| Adaptive Strategy | 398 | Yes | +0.0006 | 4.1 |

## Exp 66: 6C x 10A

- **Size:** 6C x 10A
- **AHP Winner:** A1 (0.1802)
- **Target (worst):** A10 (0.0087)
- **Initial gap:** 0.1715

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 474 | Yes | -0.0001 | 2.3 |
| Local Leader | 243 | Yes | +0.0000 | 1.2 |
| Global Average | 396 | Yes | +0.0010 | 4.2 |
| Local Average | 408 | Yes | +0.0001 | 4.0 |
| Adaptive Strategy | 409 | Yes | +0.0015 | 4.7 |

## Exp 67: 7C x 6A

- **Size:** 7C x 6A
- **AHP Winner:** A2 (0.2062)
- **Target (worst):** A1 (0.0379)
- **Initial gap:** 0.1683

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 155 | Yes | -0.0001 | 1.9 |
| Local Leader | 122 | Yes | +0.0005 | 1.7 |
| Global Average | 155 | Yes | -0.0001 | 0.9 |
| Local Average | 172 | Yes | -0.0000 | 0.7 |
| Adaptive Strategy | 210 | Yes | +0.0081 | 1.0 |

## Exp 68: 7C x 7A

- **Size:** 7C x 7A
- **AHP Winner:** A4 (0.2194)
- **Target (worst):** A6 (0.0129)
- **Initial gap:** 0.2066

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 287 | Yes | +0.0002 | 0.9 |
| Local Leader | 172 | Yes | +0.0018 | 0.8 |
| Global Average | 332 | Yes | +0.0028 | 6.0 |
| Local Average | 320 | Yes | +0.0016 | 2.8 |
| Adaptive Strategy | 321 | Yes | +0.0021 | 2.3 |

## Exp 69: 7C x 8A

- **Size:** 7C x 8A
- **AHP Winner:** A4 (0.2323)
- **Target (worst):** A8 (0.0112)
- **Initial gap:** 0.2211

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 356 | Yes | +0.0000 | 1.1 |
| Local Leader | 222 | Yes | +0.0003 | 0.8 |
| Global Average | 376 | Yes | +0.0022 | 3.0 |
| Local Average | 387 | Yes | +0.0013 | 3.3 |
| Adaptive Strategy | 387 | Yes | +0.0003 | 3.0 |

## Exp 70: 7C x 9A

- **Size:** 7C x 9A
- **AHP Winner:** A3 (0.2444)
- **Target (worst):** A4 (0.0104)
- **Initial gap:** 0.2340

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 497 | Yes | +0.0004 | 1.7 |
| Local Leader | 320 | Yes | +0.0001 | 1.4 |
| Global Average | 448 | Yes | +0.0004 | 5.9 |
| Local Average | 455 | Yes | -0.0001 | 5.6 |
| Adaptive Strategy | 479 | Yes | -0.0001 | 6.7 |

## Exp 71: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A4 (0.1283)
- **Target (worst):** A3 (0.0075)
- **Initial gap:** 0.1208

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 466 | Yes | +0.0001 | 1.6 |
| Local Leader | 255 | Yes | +0.0001 | 1.1 |
| Global Average | 481 | Yes | +0.0012 | 3.5 |
| Local Average | 477 | Yes | +0.0016 | 2.7 |
| Adaptive Strategy | 477 | Yes | +0.0016 | 4.1 |

## Exp 72: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A5 (0.2337)
- **Target (worst):** A1 (0.1010)
- **Initial gap:** 0.1327

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 116 | Yes | +0.0049 | 0.9 |
| Local Leader | 115 | Yes | +0.0018 | 0.6 |
| Global Average | 187 | Yes | +0.0006 | 1.0 |
| Local Average | 183 | Yes | +0.0008 | 0.7 |
| Adaptive Strategy | 247 | Yes | +0.0023 | 1.3 |

## Exp 73: 8C x 7A

- **Size:** 8C x 7A
- **AHP Winner:** A1 (0.1982)
- **Target (worst):** A4 (0.0152)
- **Initial gap:** 0.1831

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 309 | Yes | +0.0047 | 1.0 |
| Local Leader | 161 | Yes | +0.0005 | 0.7 |
| Global Average | 356 | Yes | +0.0047 | 1.9 |
| Local Average | 352 | Yes | +0.0010 | 1.6 |
| Adaptive Strategy | 352 | Yes | +0.0010 | 1.8 |

## Exp 74: 8C x 8A

- **Size:** 8C x 8A
- **AHP Winner:** A1 (0.3518)
- **Target (worst):** A6 (0.0154)
- **Initial gap:** 0.3364

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 477 | Yes | +0.0001 | 1.4 |
| Local Leader | 337 | Yes | +0.0009 | 1.2 |
| Global Average | 478 | Yes | +0.0006 | 9.2 |
| Local Average | 486 | Yes | +0.0003 | 8.1 |
| Adaptive Strategy | 519 | Yes | +0.0002 | 7.7 |

## Exp 75: 8C x 9A

- **Size:** 8C x 9A
- **AHP Winner:** A2 (0.2171)
- **Target (worst):** A7 (0.0103)
- **Initial gap:** 0.2068

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 564 | Yes | -0.0001 | 1.8 |
| Local Leader | 376 | Yes | -0.0001 | 1.6 |
| Global Average | 518 | Yes | +0.0003 | 8.8 |
| Local Average | 523 | Yes | +0.0011 | 7.4 |
| Adaptive Strategy | 527 | Yes | +0.0006 | 7.4 |

## Exp 76: 8C x 10A

- **Size:** 8C x 10A
- **AHP Winner:** A6 (0.1621)
- **Target (worst):** A2 (0.0079)
- **Initial gap:** 0.1542

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 587 | Yes | -0.0001 | 2.2 |
| Local Leader | 329 | Yes | +0.0002 | 1.3 |
| Global Average | 578 | Yes | +0.0004 | 6.9 |
| Local Average | 569 | Yes | +0.0012 | 6.3 |
| Adaptive Strategy | 572 | Yes | +0.0004 | 6.5 |

## Exp 77: 9C x 7A

- **Size:** 9C x 7A
- **AHP Winner:** A4 (0.2023)
- **Target (worst):** A5 (0.0131)
- **Initial gap:** 0.1892

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 433 | Yes | +0.0003 | 1.3 |
| Local Leader | 177 | Yes | +0.0003 | 0.7 |
| Global Average | 430 | Yes | +0.0036 | 1.6 |
| Local Average | 417 | Yes | +0.0026 | 1.8 |
| Adaptive Strategy | 417 | Yes | +0.0004 | 2.3 |

## Exp 78: 9C x 8A

- **Size:** 9C x 8A
- **AHP Winner:** A4 (0.2860)
- **Target (worst):** A1 (0.0132)
- **Initial gap:** 0.2728

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 562 | Yes | -0.0000 | 1.6 |
| Local Leader | 253 | Yes | +0.0009 | 1.1 |
| Global Average | 524 | Yes | +0.0014 | 6.8 |
| Local Average | 528 | Yes | +0.0012 | 5.7 |
| Adaptive Strategy | 546 | Yes | +0.0001 | 6.8 |

## Exp 79: 9C x 9A

- **Size:** 9C x 9A
- **AHP Winner:** A3 (0.1695)
- **Target (worst):** A7 (0.0118)
- **Initial gap:** 0.1577

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 493 | Yes | +0.0003 | 2.0 |
| Local Leader | 307 | Yes | +0.0002 | 1.2 |
| Global Average | 574 | Yes | +0.0022 | 4.3 |
| Local Average | 552 | Yes | +0.0013 | 3.7 |
| Adaptive Strategy | 553 | Yes | +0.0006 | 4.2 |

## Exp 80: 9C x 10A

- **Size:** 9C x 10A
- **AHP Winner:** A7 (0.1517)
- **Target (worst):** A8 (0.0076)
- **Initial gap:** 0.1441

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 657 | Yes | -0.0000 | 2.4 |
| Local Leader | 411 | Yes | +0.0012 | 1.6 |
| Global Average | 636 | Yes | +0.0006 | 7.5 |
| Local Average | 641 | Yes | -0.0001 | 6.3 |
| Adaptive Strategy | 644 | Yes | +0.0002 | 6.5 |

## Exp 81: 10C x 7A

- **Size:** 10C x 7A
- **AHP Winner:** A2 (0.1969)
- **Target (worst):** A7 (0.0996)
- **Initial gap:** 0.0973

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 100 | Yes | -0.0000 | 2.7 |
| Local Leader | 66 | Yes | +0.0004 | 0.9 |
| Global Average | 137 | Yes | +0.0023 | 1.5 |
| Local Average | 157 | Yes | +0.0022 | 1.2 |
| Adaptive Strategy | 157 | Yes | +0.0002 | 1.4 |

## Exp 82: 10C x 8A

- **Size:** 10C x 8A
- **AHP Winner:** A2 (0.2053)
- **Target (worst):** A3 (0.0116)
- **Initial gap:** 0.1937

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 564 | Yes | +0.0007 | 2.0 |
| Local Leader | 324 | Yes | +0.0003 | 1.5 |
| Global Average | 529 | Yes | +0.0006 | 5.5 |
| Local Average | 544 | Yes | +0.0007 | 5.2 |
| Adaptive Strategy | 547 | Yes | +0.0007 | 5.6 |

## Exp 83: 10C x 9A

- **Size:** 10C x 9A
- **AHP Winner:** A1 (0.1807)
- **Target (worst):** A3 (0.0112)
- **Initial gap:** 0.1695

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 563 | Yes | -0.0000 | 1.9 |
| Local Leader | 236 | Yes | +0.0002 | 1.0 |
| Global Average | 583 | Yes | +0.0009 | 7.7 |
| Local Average | 610 | Yes | +0.0015 | 5.6 |
| Adaptive Strategy | 609 | Yes | -0.0001 | 6.1 |

## Exp 84: 10C x 10A

- **Size:** 10C x 10A
- **AHP Winner:** A5 (0.1639)
- **Target (worst):** A6 (0.0085)
- **Initial gap:** 0.1555

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 740 | Yes | -0.0001 | 3.1 |
| Local Leader | 419 | Yes | +0.0002 | 3.0 |
| Global Average | 691 | Yes | +0.0007 | 10.7 |
| Local Average | 699 | Yes | +0.0008 | 11.1 |
| Adaptive Strategy | 708 | Yes | +0.0001 | 12.1 |

## Exp 85: 5C x 6A

- **Size:** 5C x 6A
- **AHP Winner:** A2 (0.2368)
- **Target (worst):** A5 (0.0196)
- **Initial gap:** 0.2172

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 170 | Yes | +0.0004 | 0.9 |
| Local Leader | 84 | Yes | +0.0018 | 0.7 |
| Global Average | 169 | Yes | +0.0015 | 0.8 |
| Local Average | 182 | Yes | +0.0059 | 1.2 |
| Adaptive Strategy | 182 | Yes | +0.0059 | 1.1 |

## Exp 86: 5C x 7A

- **Size:** 5C x 7A
- **AHP Winner:** A1 (0.2337)
- **Target (worst):** A3 (0.0165)
- **Initial gap:** 0.2172

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 192 | Yes | +0.0004 | 1.1 |
| Local Leader | 105 | Yes | +0.0013 | 0.6 |
| Global Average | 191 | Yes | +0.0010 | 1.5 |
| Local Average | 212 | Yes | +0.0014 | 1.2 |
| Adaptive Strategy | 213 | Yes | +0.0006 | 1.4 |

## Exp 87: 5C x 8A

- **Size:** 5C x 8A
- **AHP Winner:** A2 (0.2668)
- **Target (worst):** A7 (0.0124)
- **Initial gap:** 0.2545

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 284 | Yes | +0.0000 | 1.5 |
| Local Leader | 188 | Yes | +0.0015 | 1.5 |
| Global Average | 270 | Yes | -0.0000 | 3.3 |
| Local Average | 278 | Yes | +0.0017 | 2.7 |
| Adaptive Strategy | 285 | Yes | +0.0008 | 2.8 |

## Exp 88: 5C x 9A

- **Size:** 5C x 9A
- **AHP Winner:** A2 (0.1641)
- **Target (worst):** A6 (0.0306)
- **Initial gap:** 0.1335

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 281 | Yes | -0.0001 | 1.6 |
| Local Leader | 165 | Yes | +0.0014 | 1.7 |
| Global Average | 270 | Yes | +0.0005 | 3.4 |
| Local Average | 261 | Yes | +0.0008 | 2.2 |
| Adaptive Strategy | 261 | Yes | +0.0005 | 3.4 |

## Exp 89: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A1 (0.1507)
- **Target (worst):** A6 (0.0082)
- **Initial gap:** 0.1426

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 353 | Yes | -0.0000 | 1.5 |
| Local Leader | 228 | Yes | +0.0004 | 1.4 |
| Global Average | 354 | Yes | +0.0011 | 3.8 |
| Local Average | 353 | Yes | +0.0002 | 2.9 |
| Adaptive Strategy | 353 | Yes | +0.0007 | 4.5 |

## Exp 90: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A2 (0.3800)
- **Target (worst):** A4 (0.0251)
- **Initial gap:** 0.3550

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 224 | Yes | +0.0005 | 1.2 |
| Local Leader | 106 | Yes | +0.0021 | 0.7 |
| Global Average | 216 | Yes | +0.0024 | 1.7 |
| Local Average | 230 | Yes | +0.0003 | 1.6 |
| Adaptive Strategy | 233 | Yes | +0.0009 | 2.3 |

## Exp 91: 6C x 7A

- **Size:** 6C x 7A
- **AHP Winner:** A3 (0.1949)
- **Target (worst):** A7 (0.0732)
- **Initial gap:** 0.1217

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 96 | Yes | +0.0006 | 0.7 |
| Local Leader | 51 | Yes | +0.0020 | 0.7 |
| Global Average | 94 | Yes | +0.0028 | 1.3 |
| Local Average | 99 | Yes | +0.0005 | 2.3 |
| Adaptive Strategy | 99 | Yes | +0.0005 | 2.9 |

## Exp 92: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A5 (0.1723)
- **Target (worst):** A3 (0.0108)
- **Initial gap:** 0.1615

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 269 | Yes | -0.0000 | 1.1 |
| Local Leader | 173 | Yes | +0.0014 | 0.8 |
| Global Average | 320 | Yes | +0.0013 | 1.4 |
| Local Average | 322 | Yes | +0.0003 | 1.6 |
| Adaptive Strategy | 322 | Yes | +0.0011 | 2.2 |

## Exp 93: 6C x 9A

- **Size:** 6C x 9A
- **AHP Winner:** A1 (0.3364)
- **Target (worst):** A4 (0.0142)
- **Initial gap:** 0.3222

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 465 | Yes | +0.0000 | 2.6 |
| Local Leader | 273 | Yes | +0.0004 | 1.1 |
| Global Average | 395 | Yes | +0.0005 | 10.6 |
| Local Average | 413 | Yes | +0.0006 | 8.2 |
| Adaptive Strategy | 457 | Yes | -0.0001 | 7.4 |

## Exp 94: 6C x 10A

- **Size:** 6C x 10A
- **AHP Winner:** A1 (0.1542)
- **Target (worst):** A4 (0.0230)
- **Initial gap:** 0.1312

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 284 | Yes | -0.0000 | 1.3 |
| Local Leader | 157 | Yes | +0.0008 | 0.8 |
| Global Average | 351 | Yes | +0.0007 | 2.7 |
| Local Average | 343 | Yes | +0.0003 | 2.4 |
| Adaptive Strategy | 343 | Yes | +0.0003 | 3.1 |

## Exp 95: 7C x 6A

- **Size:** 7C x 6A
- **AHP Winner:** A6 (0.2328)
- **Target (worst):** A2 (0.0152)
- **Initial gap:** 0.2177

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 221 | Yes | +0.0002 | 0.8 |
| Local Leader | 139 | Yes | +0.0047 | 0.6 |
| Global Average | 273 | Yes | +0.0013 | 0.8 |
| Local Average | 267 | Yes | +0.0030 | 0.9 |
| Adaptive Strategy | 267 | Yes | +0.0030 | 1.3 |

## Exp 96: 7C x 7A

- **Size:** 7C x 7A
- **AHP Winner:** A3 (0.2501)
- **Target (worst):** A2 (0.0162)
- **Initial gap:** 0.2339

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 310 | Yes | +0.0000 | 1.1 |
| Local Leader | 128 | Yes | +0.0002 | 0.6 |
| Global Average | 312 | Yes | +0.0047 | 1.5 |
| Local Average | 323 | Yes | +0.0026 | 1.5 |
| Adaptive Strategy | 323 | Yes | +0.0026 | 1.7 |

## Exp 97: 7C x 8A

- **Size:** 7C x 8A
- **AHP Winner:** A4 (0.1782)
- **Target (worst):** A3 (0.0181)
- **Initial gap:** 0.1600

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 275 | Yes | +0.0016 | 1.0 |
| Local Leader | 195 | Yes | +0.0016 | 0.9 |
| Global Average | 318 | Yes | +0.0001 | 2.0 |
| Local Average | 323 | Yes | +0.0014 | 1.7 |
| Adaptive Strategy | 323 | Yes | +0.0014 | 1.9 |

## Exp 98: 7C x 9A

- **Size:** 7C x 9A
- **AHP Winner:** A8 (0.1576)
- **Target (worst):** A3 (0.0086)
- **Initial gap:** 0.1489

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 396 | Yes | +0.0001 | 1.7 |
| Local Leader | 261 | Yes | +0.0002 | 1.3 |
| Global Average | 425 | Yes | +0.0010 | 2.5 |
| Local Average | 443 | Yes | +0.0019 | 2.2 |
| Adaptive Strategy | 445 | Yes | +0.0011 | 3.1 |

## Exp 99: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A8 (0.1418)
- **Target (worst):** A1 (0.0080)
- **Initial gap:** 0.1338

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 479 | Yes | -0.0000 | 1.8 |
| Local Leader | 290 | Yes | -0.0001 | 1.1 |
| Global Average | 474 | Yes | +0.0005 | 3.8 |
| Local Average | 475 | Yes | +0.0009 | 3.6 |
| Adaptive Strategy | 475 | Yes | +0.0004 | 3.8 |

## Exp 100: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A2 (0.4332)
- **Target (worst):** A1 (0.0224)
- **Initial gap:** 0.4108

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 328 | Yes | +0.0009 | 1.2 |
| Local Leader | 173 | Yes | +0.0007 | 0.7 |
| Global Average | 314 | Yes | +0.0020 | 2.5 |
| Local Average | 308 | Yes | +0.0001 | 2.4 |
| Adaptive Strategy | 326 | Yes | +0.0006 | 2.6 |

## Edge 101: 4C x 4A

- **Size:** 4C x 4A
- **AHP Winner:** A1 (0.4906)
- **Target (worst):** A4 (0.1174)
- **Initial gap:** 0.3732

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 62 | Yes | +0.0296 | 0.4 |
| Local Leader | 95 | Yes | +0.0168 | 0.4 |
| Global Average | 43 | Yes | +0.0073 | 0.4 |
| Local Average | 52 | Yes | +0.0303 | 0.6 |
| Adaptive Strategy | 54 | Yes | +0.0010 | 0.9 |

## Edge 102: 4C x 5A

- **Size:** 4C x 5A
- **AHP Winner:** A1 (0.3969)
- **Target (worst):** A5 (0.1070)
- **Initial gap:** 0.2899

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 78 | Yes | +0.0146 | 0.5 |
| Local Leader | 108 | Yes | +0.0005 | 0.5 |
| Global Average | 62 | Yes | +0.0047 | 0.4 |
| Local Average | 64 | Yes | +0.0042 | 0.4 |
| Adaptive Strategy | 69 | Yes | +0.0025 | 0.5 |

## Edge 103: 4C x 6A

- **Size:** 4C x 6A
- **AHP Winner:** A1 (0.3349)
- **Target (worst):** A6 (0.0953)
- **Initial gap:** 0.2396

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 105 | Yes | +0.0061 | 0.8 |
| Local Leader | 146 | Yes | +0.0108 | 0.6 |
| Global Average | 85 | Yes | +0.0087 | 0.6 |
| Local Average | 85 | Yes | +0.0052 | 0.5 |
| Adaptive Strategy | 97 | Yes | +0.0010 | 1.0 |

## Edge 104: 4C x 8A

- **Size:** 4C x 8A
- **AHP Winner:** A1 (0.2701)
- **Target (worst):** A8 (0.0603)
- **Initial gap:** 0.2098

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 167 | Yes | +0.0006 | 0.6 |
| Local Leader | 211 | Yes | +0.0052 | 0.6 |
| Global Average | 127 | Yes | +0.0017 | 1.0 |
| Local Average | 128 | Yes | +0.0002 | 1.0 |
| Adaptive Strategy | 155 | Yes | -0.0001 | 1.8 |

## Edge 105: 6C x 4A

- **Size:** 6C x 4A
- **AHP Winner:** A1 (0.4653)
- **Target (worst):** A4 (0.1472)
- **Initial gap:** 0.3182

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 84 | Yes | +0.0210 | 0.4 |
| Local Leader | 129 | Yes | +0.0095 | 0.5 |
| Global Average | 67 | Yes | +0.0120 | 0.5 |
| Local Average | 71 | Yes | +0.0043 | 0.4 |
| Adaptive Strategy | 74 | Yes | +0.0025 | 0.5 |

## Edge 106: 6C x 5A

- **Size:** 6C x 5A
- **AHP Winner:** A1 (0.4012)
- **Target (worst):** A5 (0.1003)
- **Initial gap:** 0.3009

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 121 | Yes | +0.0107 | 0.5 |
| Local Leader | 180 | Yes | +0.0029 | 0.5 |
| Global Average | 91 | Yes | +0.0010 | 0.7 |
| Local Average | 97 | Yes | +0.0075 | 0.5 |
| Adaptive Strategy | 107 | Yes | -0.0000 | 0.8 |

## Edge 107: 6C x 6A

- **Size:** 6C x 6A
- **AHP Winner:** A1 (0.3400)
- **Target (worst):** A6 (0.1029)
- **Initial gap:** 0.2370

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 157 | Yes | +0.0005 | 0.6 |
| Local Leader | 226 | Yes | +0.0141 | 0.7 |
| Global Average | 102 | Yes | +0.0022 | 0.7 |
| Local Average | 120 | Yes | +0.0004 | 0.9 |
| Adaptive Strategy | 136 | Yes | +0.0006 | 1.0 |

## Edge 108: 6C x 8A

- **Size:** 6C x 8A
- **AHP Winner:** A1 (0.2672)
- **Target (worst):** A8 (0.0713)
- **Initial gap:** 0.1959

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 245 | Yes | +0.0022 | 0.8 |
| Local Leader | 306 | Yes | +0.0046 | 0.9 |
| Global Average | 172 | Yes | +0.0026 | 1.5 |
| Local Average | 191 | Yes | +0.0037 | 1.8 |
| Adaptive Strategy | 211 | Yes | +0.0004 | 2.3 |

## Edge 109: 8C x 4A

- **Size:** 8C x 4A
- **AHP Winner:** A1 (0.4453)
- **Target (worst):** A4 (0.1306)
- **Initial gap:** 0.3147

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 109 | Yes | +0.0013 | 0.5 |
| Local Leader | 175 | Yes | +0.0116 | 0.5 |
| Global Average | 82 | Yes | +0.0170 | 0.6 |
| Local Average | 93 | Yes | +0.0098 | 0.7 |
| Adaptive Strategy | 94 | Yes | +0.0018 | 0.6 |

## Edge 110: 8C x 5A

- **Size:** 8C x 5A
- **AHP Winner:** A1 (0.4100)
- **Target (worst):** A5 (0.1072)
- **Initial gap:** 0.3028

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 164 | Yes | +0.0076 | 0.7 |
| Local Leader | 238 | Yes | +0.0042 | 0.7 |
| Global Average | 110 | Yes | +0.0031 | 1.0 |
| Local Average | 131 | Yes | +0.0020 | 0.7 |
| Adaptive Strategy | 140 | Yes | +0.0010 | 1.1 |

## Edge 111: 8C x 6A

- **Size:** 8C x 6A
- **AHP Winner:** A1 (0.3369)
- **Target (worst):** A6 (0.0935)
- **Initial gap:** 0.2434

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 210 | Yes | +0.0077 | 0.7 |
| Local Leader | 285 | Yes | +0.0054 | 0.8 |
| Global Average | 151 | Yes | +0.0027 | 1.1 |
| Local Average | 164 | Yes | +0.0018 | 0.9 |
| Adaptive Strategy | 186 | Yes | +0.0005 | 1.8 |

## Edge 112: 8C x 8A

- **Size:** 8C x 8A
- **AHP Winner:** A1 (0.2664)
- **Target (worst):** A8 (0.0699)
- **Initial gap:** 0.1964

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 323 | Yes | +0.0020 | 1.2 |
| Local Leader | 430 | Yes | +0.0026 | 1.2 |
| Global Average | 218 | Yes | +0.0027 | 2.9 |
| Local Average | 237 | Yes | +0.0018 | 2.1 |
| Adaptive Strategy | 270 | Yes | -0.0000 | 3.8 |

## Edge 113: 10C x 4A

- **Size:** 10C x 4A
- **AHP Winner:** A1 (0.4642)
- **Target (worst):** A4 (0.1337)
- **Initial gap:** 0.3305

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 146 | Yes | +0.0178 | 0.5 |
| Local Leader | 233 | Yes | +0.0152 | 0.6 |
| Global Average | 105 | Yes | +0.0131 | 0.7 |
| Local Average | 122 | Yes | +0.0110 | 0.5 |
| Adaptive Strategy | 123 | Yes | +0.0032 | 0.7 |

## Edge 114: 10C x 5A

- **Size:** 10C x 5A
- **AHP Winner:** A1 (0.3941)
- **Target (worst):** A5 (0.1118)
- **Initial gap:** 0.2823

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 212 | Yes | +0.0111 | 0.8 |
| Local Leader | 306 | Yes | +0.0055 | 1.2 |
| Global Average | 155 | Yes | +0.0007 | 1.1 |
| Local Average | 169 | Yes | +0.0001 | 0.8 |
| Adaptive Strategy | 178 | Yes | +0.0012 | 1.1 |

## Edge 115: 10C x 6A

- **Size:** 10C x 6A
- **AHP Winner:** A1 (0.3248)
- **Target (worst):** A6 (0.0957)
- **Initial gap:** 0.2291

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 258 | Yes | +0.0034 | 1.0 |
| Local Leader | 351 | Yes | +0.0035 | 1.0 |
| Global Average | 185 | Yes | +0.0044 | 1.5 |
| Local Average | 201 | Yes | +0.0020 | 1.2 |
| Adaptive Strategy | 231 | Yes | +0.0003 | 2.4 |

## Edge 116: 10C x 8A

- **Size:** 10C x 8A
- **AHP Winner:** A1 (0.2694)
- **Target (worst):** A8 (0.0704)
- **Initial gap:** 0.1990

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 390 | Yes | +0.0001 | 1.2 |
| Local Leader | 501 | Yes | +0.0037 | 1.4 |
| Global Average | 266 | Yes | +0.0018 | 4.5 |
| Local Average | 295 | Yes | +0.0019 | 3.3 |
| Adaptive Strategy | 344 | Yes | -0.0000 | 5.4 |

## Edge 117: 5C x 10A

- **Size:** 5C x 10A
- **AHP Winner:** A1 (0.2185)
- **Target (worst):** A10 (0.0588)
- **Initial gap:** 0.1596

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 226 | Yes | +0.0043 | 2.1 |
| Local Leader | 278 | Yes | +0.0001 | 1.0 |
| Global Average | 149 | Yes | +0.0009 | 3.0 |
| Local Average | 161 | Yes | +0.0025 | 2.2 |
| Adaptive Strategy | 201 | Yes | -0.0000 | 3.4 |

## Edge 118: 7C x 10A

- **Size:** 7C x 10A
- **AHP Winner:** A1 (0.2242)
- **Target (worst):** A10 (0.0626)
- **Initial gap:** 0.1616

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 330 | Yes | +0.0039 | 1.6 |
| Local Leader | 404 | Yes | +0.0009 | 1.4 |
| Global Average | 237 | Yes | +0.0013 | 4.5 |
| Local Average | 237 | Yes | +0.0020 | 4.1 |
| Adaptive Strategy | 283 | Yes | -0.0000 | 6.1 |

## Edge 119: 9C x 10A

- **Size:** 9C x 10A
- **AHP Winner:** A1 (0.2172)
- **Target (worst):** A10 (0.0613)
- **Initial gap:** 0.1558

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 425 | Yes | +0.0007 | 1.5 |
| Local Leader | 512 | Yes | +0.0010 | 1.7 |
| Global Average | 293 | Yes | +0.0005 | 6.8 |
| Local Average | 315 | Yes | +0.0021 | 5.5 |
| Adaptive Strategy | 369 | Yes | -0.0001 | 9.5 |

## Edge 120: 10C x 10A

- **Size:** 10C x 10A
- **AHP Winner:** A1 (0.2123)
- **Target (worst):** A10 (0.0602)
- **Initial gap:** 0.1521

| Algorithm | Steps | Winner | Gap | Time (ms) |
|-----------|------:|:------:|------:|----------:|
| Global Leader | 510 | Yes | +0.0005 | 2.0 |
| Local Leader | 621 | Yes | +0.0003 | 2.7 |
| Global Average | 330 | Yes | -0.0000 | 9.5 |
| Local Average | 369 | Yes | +0.0007 | 7.1 |
| Adaptive Strategy | 445 | Yes | -0.0000 | 11.7 |

---

## Global Summary

### Overall Statistics

| Algorithm | Avg Steps | Median Steps | Win Rate | Avg Gap | Avg Time (ms) | Min Steps | Max Steps | Max Time (ms) |
|-----------|----------:|-------------:|---------:|--------:|--------------:|----------:|----------:|--------------:|
| Global Leader | 350.5 | 328 | 120/120 (100%) | +0.0018 | 1.6 | 62 | 847 | 5.5 |
| Local Leader | 231.4 | 226 | 120/120 (100%) | +0.0019 | 1.2 | 51 | 621 | 3.2 |
| Global Average | 343.1 | 329 | 120/120 (100%) | +0.0019 | 3.9 | 43 | 763 | 25.2 |
| Local Average | 349.1 | 334 | 120/120 (100%) | +0.0020 | 3.4 | 52 | 766 | 22.4 |
| Adaptive Strategy | 359.3 | 343 | 120/120 (100%) | +0.0011 | 4.0 | 54 | 830 | 23.3 |

### Random vs Edge Case Experiments

| Category | Experiments | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) | 
|----------|------------:|---:|---:|---:|---:|---:|
| Random | 100 | 377.4 | 220.3 | 381.4 | 385.9 | 393.5 | 
| Edge Cases | 20 | 216.1 | 286.8 | 151.5 | 165.1 | 188.3 | 

### Edge Case Leaderboard (fewest steps among winners)

| Rank | Algorithm | Wins (fewest steps) |
|-----:|-----------|--------------------:|
| 1 | Global Average | 20 / 20 |
| 2 | Local Average | 2 / 20 |
| 3 | Global Leader | 0 / 20 |
| 4 | Local Leader | 0 / 20 |
| 5 | Adaptive Strategy | 0 / 20 |

### Performance by Problem Size

| Size | Experiments | Global Leader (avg steps / avg ms) | Local Leader (avg steps / avg ms) | Global Average (avg steps / avg ms) | Local Average (avg steps / avg ms) | Adaptive Strategy (avg steps / avg ms) | 
|------|------------:|---:|---:|---:|---:|---:|
| 4C x 4A | 1 | 62 / 0.4 | 95 / 0.4 | 43 / 0.4 | 52 / 0.6 | 54 / 0.9 | 
| 4C x 5A | 1 | 78 / 0.5 | 108 / 0.5 | 62 / 0.4 | 64 / 0.4 | 69 / 0.5 | 
| 4C x 6A | 1 | 105 / 0.8 | 146 / 0.6 | 85 / 0.6 | 85 / 0.5 | 97 / 1.0 | 
| 4C x 8A | 1 | 167 / 0.6 | 211 / 0.6 | 127 / 1.0 | 128 / 1.0 | 155 / 1.8 | 
| 5C x 6A | 4 | 195 / 2.2 | 114 / 1.5 | 187 / 2.0 | 195 / 1.6 | 198 / 2.0 | 
| 5C x 7A | 4 | 192 / 1.5 | 106 / 1.2 | 212 / 1.8 | 214 / 1.9 | 216 / 2.2 | 
| 5C x 8A | 4 | 272 / 1.6 | 172 / 1.4 | 272 / 2.5 | 277 / 2.4 | 280 / 2.5 | 
| 5C x 9A | 4 | 322 / 1.6 | 214 / 1.5 | 315 / 3.7 | 307 / 2.7 | 312 / 3.6 | 
| 5C x 10A | 5 | 321 / 1.8 | 237 / 1.3 | 320 / 5.3 | 328 / 4.4 | 343 / 5.2 | 
| 6C x 4A | 1 | 84 / 0.4 | 129 / 0.5 | 67 / 0.5 | 71 / 0.4 | 74 / 0.5 | 
| 6C x 5A | 1 | 121 / 0.5 | 180 / 0.5 | 91 / 0.7 | 97 / 0.5 | 107 / 0.8 | 
| 6C x 6A | 5 | 184 / 1.2 | 130 / 0.9 | 189 / 1.3 | 199 / 1.3 | 203 / 1.8 | 
| 6C x 7A | 4 | 239 / 1.5 | 139 / 1.2 | 221 / 1.9 | 228 / 2.3 | 231 / 2.5 | 
| 6C x 8A | 5 | 285 / 1.2 | 192 / 0.9 | 291 / 1.7 | 295 / 1.6 | 299 / 2.0 | 
| 6C x 9A | 4 | 397 / 1.9 | 233 / 1.1 | 360 / 4.9 | 375 / 4.7 | 390 / 4.9 | 
| 6C x 10A | 4 | 407 / 1.9 | 222 / 1.1 | 406 / 3.9 | 398 / 3.5 | 397 / 4.0 | 
| 7C x 6A | 4 | 226 / 1.1 | 147 / 0.9 | 233 / 1.6 | 238 / 1.4 | 251 / 1.6 | 
| 7C x 7A | 4 | 294 / 1.1 | 162 / 0.8 | 313 / 2.9 | 318 / 2.1 | 319 / 2.3 | 
| 7C x 8A | 4 | 342 / 1.4 | 207 / 1.0 | 357 / 2.5 | 360 / 2.6 | 360 / 2.4 | 
| 7C x 9A | 4 | 477 / 1.9 | 295 / 1.5 | 438 / 5.2 | 450 / 4.7 | 474 / 6.0 | 
| 7C x 10A | 5 | 389 / 1.7 | 276 / 1.3 | 394 / 3.6 | 407 / 3.3 | 428 / 4.3 | 
| 8C x 4A | 1 | 109 / 0.5 | 175 / 0.5 | 82 / 0.6 | 93 / 0.7 | 94 / 0.6 | 
| 8C x 5A | 1 | 164 / 0.7 | 238 / 0.7 | 110 / 1.0 | 131 / 0.7 | 140 / 1.1 | 
| 8C x 6A | 5 | 241 / 1.0 | 184 / 1.0 | 248 / 1.7 | 250 / 1.3 | 272 / 1.8 | 
| 8C x 7A | 3 | 357 / 1.9 | 217 / 1.6 | 366 / 4.3 | 370 / 3.8 | 376 / 3.9 | 
| 8C x 8A | 4 | 416 / 1.4 | 318 / 1.3 | 393 / 6.4 | 404 / 5.5 | 431 / 6.0 | 
| 8C x 9A | 3 | 488 / 1.8 | 293 / 1.4 | 506 / 5.3 | 502 / 4.9 | 506 / 5.9 | 
| 8C x 10A | 3 | 566 / 2.7 | 322 / 1.5 | 562 / 6.1 | 557 / 5.5 | 559 / 5.9 | 
| 9C x 7A | 3 | 368 / 1.2 | 188 / 1.0 | 408 / 2.8 | 405 / 2.0 | 405 / 2.5 | 
| 9C x 8A | 3 | 541 / 1.8 | 320 / 1.2 | 501 / 7.0 | 505 / 6.1 | 524 / 7.2 | 
| 9C x 9A | 3 | 533 / 2.1 | 294 / 1.2 | 568 / 5.4 | 560 / 4.6 | 563 / 5.5 | 
| 9C x 10A | 4 | 565 / 2.4 | 380 / 1.6 | 544 / 6.4 | 551 / 5.7 | 566 / 7.1 | 
| 10C x 4A | 1 | 146 / 0.5 | 233 / 0.6 | 105 / 0.7 | 122 / 0.5 | 123 / 0.7 | 
| 10C x 5A | 1 | 212 / 0.8 | 306 / 1.2 | 155 / 1.1 | 169 / 0.8 | 178 / 1.1 | 
| 10C x 6A | 1 | 258 / 1.0 | 351 / 1.0 | 185 / 1.5 | 201 / 1.2 | 231 / 2.4 | 
| 10C x 7A | 3 | 362 / 2.1 | 226 / 1.2 | 358 / 5.2 | 375 / 4.3 | 384 / 4.7 | 
| 10C x 8A | 4 | 487 / 1.8 | 333 / 1.5 | 461 / 4.5 | 478 / 3.9 | 492 / 4.8 | 
| 10C x 9A | 3 | 542 / 2.0 | 246 / 1.3 | 568 / 8.4 | 578 / 6.3 | 578 / 6.7 | 
| 10C x 10A | 4 | 718 / 3.1 | 508 / 2.7 | 623 / 15.1 | 639 / 13.2 | 680 / 15.5 | 

### Performance by Initial Gap (difficulty)

| Gap Category | Count | Global Leader (avg steps) | Local Leader (avg steps) | Global Average (avg steps) | Local Average (avg steps) | Adaptive Strategy (avg steps) | 
|-------------|------:|---:|---:|---:|---:|---:|
| Small (< 0.15) | 21 | 381.0 | 221.4 | 397.9 | 400.5 | 406.7 | 
| Medium (0.15 - 0.30) | 82 | 356.5 | 237.8 | 346.6 | 352.8 | 363.1 | 
| Large (0.30 - 0.50) | 17 | 284.1 | 212.9 | 258.2 | 267.7 | 282.2 | 

### Algorithm Leaderboard (fewest steps among winners)

| Rank | Algorithm | Solo Wins | Tied Wins | Total |
|-----:|-----------|----------:|----------:|------:|
| 1 | Local Leader | 100 | 0 | 100 |
| 2 | Global Average | 18 | 2 | 20 |
| 3 | Global Leader | 0 | 0 | 0 |
| 4 | Local Average | 0 | 2 | 2 |
| 5 | Adaptive Strategy | 0 | 0 | 0 |

### Step Efficiency (steps per 0.01 initial gap)

| Algorithm | Avg Efficiency | Median Efficiency | Best (lowest) | Worst (highest) |
|-----------|---------------:|------------------:|--------------:|----------------:|
| Global Leader | 18.79 | 16.58 | 1.66 | 47.60 |
| Local Leader | 12.21 | 10.62 | 2.55 | 40.83 |
| Global Average | 18.64 | 16.32 | 1.15 | 46.62 |
| Local Average | 18.96 | 16.41 | 1.39 | 52.98 |
| Adaptive Strategy | 19.50 | 17.51 | 1.45 | 62.55 |

### Time Efficiency (ms per 100 steps)

| Algorithm | Avg ms/100 steps | Min | Max |
|-----------|------------------:|----:|----:|
| Global Leader | 0.52 | 0.29 | 2.76 |
| Local Leader | 0.61 | 0.27 | 4.16 |
| Global Average | 1.07 | 0.30 | 3.30 |
| Local Average | 0.92 | 0.33 | 2.92 |
| Adaptive Strategy | 1.06 | 0.46 | 2.88 |
