# AHP Decision Support & Recommender System

A web application implementing a Decision Support System (DSS) based on the Analytic Hierarchy Process (AHP). The system determines the best alternative from pairwise comparisons and generates recommendations for losing alternatives to improve their rankings.

## Tech Stack

- **Backend**: Fastify (TypeScript), Typebox validation, Vitest
- **Frontend**: Vanilla TypeScript + HTML/CSS, Vite
- **Monorepo**: npm workspaces

## Prerequisites

- Node.js >= 22
- npm >= 10

## Setup

```bash
# Install all dependencies (backend + frontend)
npm install
```

## Development

```bash
# Start backend (port 3000) and frontend (port 5173) concurrently
npm run dev

# Or start individually
npm run dev:backend    # Fastify on http://localhost:3000
npm run dev:frontend   # Vite on http://localhost:5173
```

The Vite dev server proxies `/api` requests to the backend automatically.

## Build

```bash
# Build both packages
npm run build

# Build individually
npm run build --workspace=packages/backend
npm run build --workspace=packages/frontend
```

## Testing

```bash
# Run all backend tests
npm test

# Run tests in watch mode
npm run test:watch --workspace=packages/backend
```

Tests are organized in:

- `tests/unit/` — AHP math, Saaty scale, individual algorithm logic, recommentations
- `tests/integration/` — endpoint schema validation, input sizes, cross-endpoint consistency
- `tests/e2e/` — full flow with a sample AHP problem, error handling, CR warnings

## Linting & Formatting

```bash
npm run lint           # Check for lint errors
npm run lint:fix       # Auto-fix lint errors
npm run format         # Format all files with Prettier
npm run format:check   # Check formatting without writing
```

## Project Structure

```
packages/
├── backend/
│   └── src/
│       ├── routes/              # Route definitions
│       ├── controllers/         # Request handlers
│       ├── services/
│       │   ├── baseline/        # Core AHP math (priorities, CR check)
│       │   └── recommendations/ # 5 recommendation algorithms
│       ├── schemas/             # Typebox request/response schemas
│       ├── types/               # TypeScript interfaces
│       ├── hooks/               # Validation & error handler hooks
│       ├── plugins/             # Fastify plugins (CORS)
│       ├── utils/               # Saaty scale helpers, input validation
│       ├── app.ts               # App factory
│       └── server.ts            # Entry point
└── frontend/
    └── src/
        ├── pages/               # Baseline & recommendations pages
        ├── components/          # Matrix input, criteria form, results display
        ├── api/                 # Typed API client (fetch wrappers)
        └── styles/              # CSS

```

## API Endpoints

| Method | Path                                     | Description                                                 |
| ------ | ---------------------------------------- | ----------------------------------------------------------- |
| `POST` | `/api/ahp/solve`                         | Baseline AHP: priorities, consistency ratios, ranked result |
| `POST` | `/api/recommendations/global-leader`     | Match the overall winner's local priorities                 |
| `POST` | `/api/recommendations/local-leader`      | Match the best alternative per criterion                    |
| `POST` | `/api/recommendations/global-average`    | Match the median-ranked alternative                         |
| `POST` | `/api/recommendations/local-average`     | Match per-criterion average priorities                      |
| `POST` | `/api/recommendations/adaptive-strategy` | Two-stage: Local Average then Local Leader with early stop  |

### Baseline Request

```json
{
  "criteriaMatrix": [
    [1, 3, 5],
    [0.333, 1, 3],
    [0.2, 0.333, 1]
  ],
  "alternativeMatrices": {
    "Price": [
      [1, 3, 5],
      [0.333, 1, 3],
      [0.2, 0.333, 1]
    ],
    "Quality": [
      [1, 0.5, 2],
      [2, 1, 3],
      [0.5, 0.333, 1]
    ],
    "Delivery": [
      [1, 2, 0.5],
      [0.5, 1, 0.333],
      [2, 3, 1]
    ]
  },
  "criteriaNames": ["Price", "Quality", "Delivery"],
  "alternativeNames": ["A1", "A2", "A3"]
}
```

### Recommendation Request

Same as baseline, plus:

```json
{
  "targetAlternativeIndex": 2
}
```

### Baseline Response

```json
{
  "criteriaWeights": [0.63, 0.26, 0.11],
  "localPriorities": { "Price": [0.63, 0.26, 0.11], "...": "..." },
  "globalPriorities": [
    { "name": "A1", "priority": 0.49 },
    { "name": "A2", "priority": 0.32 },
    { "name": "A3", "priority": 0.19 }
  ],
  "winner": "A1",
  "consistencyRatios": { "criteria": 0.033, "Price": 0.033, "...": 0 },
  "isConsistent": true,
  "warnings": ["Consistency ratio exceeds 0.1 for: ..."]
}
```

The `warnings` field is only present when one or more consistency ratios exceed 0.1.

### Recommendation Response

```json
{
  "originalGlobalPriority": 0.19,
  "newGlobalPriority": 0.5,
  "leaderGlobalPriority": 0.49,
  "leaderGlobalPriorityAfter": 0.45,
  "isWinner": true,
  "totalSteps": 4,
  "actions": [
    {
      "criterion": "Price",
      "comparedTo": "A1",
      "oldValue": 0.2,
      "newValue": 0.5,
      "steps": 3,
      "localPriorityAfterAction": 0.35,
      "globalPriorityAfterAction": 0.48
    },
    {
      "criterion": "Quality",
      "comparedTo": "A2",
      "oldValue": 0.5,
      "newValue": 1.0,
      "steps": 1,
      "localPriorityAfterAction": 0.40,
      "globalPriorityAfterAction": 0.50
    }
  ],
  "modifiedMatrices": { "Price": [[1, "..."]], "...": "..." }
}
```

Actions are merged from individual steps: multiple steps on the same criterion + compared-to pair are combined into a single action showing the first `oldValue`, final `newValue`, and the number of steps taken.

## Algorithms

All algorithms use greedy step selection: at each iteration, every eligible +1 Saaty step is simulated, and the one with the highest global priority gain (ΔU) is applied. Early stopping triggers when the target beats the original leader.

1. **Global Leader** — Eligible criteria: target LP < global winner's LP (snapshotted at start).
2. **Local Leader** — Eligible criteria: target LP < max LP per criterion (snapshotted at start).
3. **Global Average** — Eligible criteria: target LP < median-ranked alternative's LP (snapshotted at start).
4. **Local Average** — Eligible criteria: target LP < average LP per criterion (snapshotted at start).
5. **Adaptive Strategy** — Two-stage greedy optimization: Stage 1 (Local Average) fully completes, bringing target to average LP on all criteria. Stage 2 (Local Leader) matches max LP per criterion with early stopping when the target becomes the winner.
