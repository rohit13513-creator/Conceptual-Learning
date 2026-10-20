import {StrictMode, Suspense, lazy, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {LandingPage} from './components/LandingPage';
import './index.css';

// The full portal is a very large bundle (notes, simulators, question banks). Visitors who are not
// logged in only need the small public home page, so the portal is downloaded only once someone
// logs in, registers, or already has a saved session -- a first-time visitor on a phone no longer
// has to download and parse all of it just to see the home page.
const App = lazy(() => import('./App.tsx'));

function hasSavedSession(): boolean {
  try {
    return !!(localStorage.getItem('optics_v1_user') || sessionStorage.getItem('optics_v1_user'));
  } catch {
    return false;
  }
}

function Root() {
  const needsPortal = hasSavedSession() || new URLSearchParams(window.location.search).has('print');
  const [authTab, setAuthTab] = useState<'login' | 'register' | null>(null);
  const [light, setLight] = useState<boolean>(() => {
    try { return localStorage.getItem('theme') === 'light'; } catch { return false; }
  });

  if (!needsPortal && !authTab) {
    const toggle = () => {
      const next = !light;
      setLight(next);
      document.documentElement.classList.toggle('light', next);
      document.body.classList.toggle('light', next);
      try { localStorage.setItem('theme', next ? 'light' : 'dark'); } catch { /* storage unavailable */ }
    };
    return <LandingPage isLightMode={light} onToggleTheme={toggle} onLogin={() => setAuthTab('login')} onRegister={() => setAuthTab('register')} />;
  }

  return (
    <Suspense fallback={<div style={{minHeight: '100vh', background: light ? '#f8fafc' : '#060b14', color: light ? '#0f172a' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 14}}>Loading your portal...</div>}>
      <App initialAuthTab={authTab || undefined} />
    </Suspense>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
