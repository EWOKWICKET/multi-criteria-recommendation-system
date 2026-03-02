# AHP Decision Support & Recommender System

A web application implementing a Decision Support System (DSS) based on the Analytic Hierarchy Process (AHP). The system determines the best alternative from pairwise comparisons and generates recommendations for losing alternatives to improve their rankings.

## Tech Stack

- **Backend**: Fastify (TypeScript), Typebox validation
- **Frontend**: Vanilla TypeScript + HTML/CSS, Vite
- **Monorepo**: npm workspaces

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
│       ├── plugins/             # Fastify plugins (CORS)
│       ├── utils/               # Saaty scale helpers
│       ├── app.ts               # App factory
│       └── server.ts            # Entry point
└── frontend/
    └── src/
        ├── pages/               # Baseline & recommendations pages
        ├── components/          # Matrix input, results display
        ├── api/                 # API client
        └── styles/              # CSS
```

## Setup

```bash
# Install dependencies
npm install

# Start backend (port 3000) and frontend (port 5173) together
npm run dev

# Or start individually
npm run dev:backend
npm run dev:frontend
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/ahp/solve` | Baseline AHP: compute priorities, CR, and rank alternatives |
| `POST` | `/api/recommendations/scenario-1` | Global Leader: match the overall winner |
| `POST` | `/api/recommendations/scenario-2` | Local Leader: match best-per-criterion |
| `POST` | `/api/recommendations/scenario-3` | Global Average: match the median alternative |
| `POST` | `/api/recommendations/scenario-4` | Local Average: match per-criterion average |
| `POST` | `/api/recommendations/scenario-5` | Adaptive Strategy: greedy min-cost optimization |

## Testing

```bash
npm test
```
