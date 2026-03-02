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
| `POST` | `/api/ahp/solve` | Baseline AHP: compute priorities, consistency ratios, and rank alternatives |
| `POST` | `/api/recommendations/global-leader` | Match the overall winner's local priorities |
| `POST` | `/api/recommendations/local-leader` | Match the best alternative per criterion |
| `POST` | `/api/recommendations/global-average` | Match the median-ranked alternative |
| `POST` | `/api/recommendations/local-average` | Match per-criterion average priorities |
| `POST` | `/api/recommendations/adaptive-strategy` | Greedy min-cost optimization with early stopping |

## Testing

```bash
npm test
```
