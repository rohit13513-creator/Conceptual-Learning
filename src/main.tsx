import {Component, StrictMode, Suspense, lazy, useState} from 'react';
import type {ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import {LandingPage} from './components/LandingPage';
import './index.css';

// The full portal is a very large bundle (notes, simulators, question banks). Visitors who are not
// logged in only need the small public home page, so the portal is downloaded only once someone
// logs in, registers, or already has a saved session -- a first-time visitor on a phone no longer
// has to download and parse all of it just to see the home page.
//
// Two ways this download can fail for a real student: a weak mobile connection drops it halfway,
// or the page was opened before a new version went live, so the file it asks for has been
// replaced. Either one used to leave "Loading your portal..." on screen forever. Now it is tried
// again once, then the page reloads itself once to pick up the current files, and if that still
// fails the student gets a message with a Reload button instead of a blank or frozen screen.
const RELOAD_KEY = 'portal_reload_at';
function reloadOnce(): boolean {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 60_000) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch { /* storage unavailable: reload anyway, once per page load below */ }
  window.location.reload();
  return true;
}

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  reloadOnce();
});

const App = lazy(() =>
  import('./App.tsx').catch(async (firstError) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      return await import('./App.tsx');
    } catch {
      if (reloadOnce()) return new Promise<never>(() => {});
      throw firstError;
    }
  }),
);

type BoundaryProps = {children: ReactNode};
class PortalErrorBoundary extends Component<BoundaryProps, {failed: boolean}> {
  declare props: BoundaryProps;
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div style={{minHeight: '100vh', background: '#060b14', color: '#e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, textAlign: 'center', fontFamily: 'sans-serif'}}>
        <p style={{fontSize: 16, fontWeight: 700, margin: 0}}>The portal could not load.</p>
        <p style={{fontSize: 14, margin: 0, maxWidth: 360}}>This usually happens on a weak internet connection. Please check your connection and reload.</p>
        <button onClick={() => window.location.reload()} style={{padding: '10px 22px', borderRadius: 10, border: 0, background: '#06b6d4', color: '#04121a', fontWeight: 700, fontSize: 14}}>Reload</button>
      </div>
    );
  }
}

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
    <PortalErrorBoundary>
      <Suspense fallback={<div style={{minHeight: '100vh', background: light ? '#f8fafc' : '#060b14', color: light ? '#0f172a' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 14, padding: 24, textAlign: 'center'}}>Loading your portal... this can take a few seconds on a slow connection.</div>}>
        <App initialAuthTab={authTab || undefined} />
      </Suspense>
    </PortalErrorBoundary>
  );
}

// Apply the saved light theme before the first paint, so the theme-aware text colours (which key off
// the html.light class) are right on the public home page and sign-in screens too.
try {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light');
    document.body.classList.add('light');
  }
} catch { /* storage unavailable */ }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
