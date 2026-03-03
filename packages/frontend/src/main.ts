import { renderBaseline } from './pages/baseline';
import { renderRecommendations } from './pages/recommendations';

const app = document.querySelector<HTMLDivElement>('#app')!;

function route(): void {
  const hash = window.location.hash || '#baseline';

  switch (hash) {
    case '#recommendations':
      renderRecommendations(app);
      break;
    default:
      renderBaseline(app);
  }
}

window.addEventListener('hashchange', route);
route();
