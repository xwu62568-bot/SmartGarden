import { BrowserRouter, HashRouter, useInRouterContext } from 'react-router-dom';
import { AppRoutes } from './router';

function AppContent() {
  return <AppRoutes />;
}

export function App() {
  const inRouterContext = useInRouterContext();

  if (inRouterContext) {
    return <AppContent />;
  }

  const Router = import.meta.env.VITE_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
