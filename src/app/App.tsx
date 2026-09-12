import { HashRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { StudyProvider, useStudy } from '../state/study';
import { ToastProvider } from '../components/Toast';
import { LoadingSkeleton } from '../components/index';
import '../styles/app.css';

// Route-level code splitting: each tab/feature becomes its own chunk so the
// initial load stays small and the content bank splits per area (see
// vite.config.ts manualChunks). All content remains precached for offline use.
const TodayScreen = lazy(() => import('../features/today/TodayScreen'));
const LearnScreen = lazy(() => import('../features/learn/LearnScreen'));
const PracticeScreen = lazy(() => import('../features/practice/PracticeScreen'));
const ProgressScreen = lazy(() => import('../features/progress/ProgressScreen'));
const MoreScreen = lazy(() => import('../features/more/MoreScreen'));
const OnboardingScreen = lazy(() => import('../features/onboarding/OnboardingScreen'));
const WritingScreen = lazy(() => import('../features/writing/WritingScreen'));
const ExamSetupScreen = lazy(() => import('../features/exam/ExamSetupScreen'));
const ExamRunner = lazy(() => import('../features/exam/ExamRunner'));
const BreakScreen = lazy(() => import('../features/exam/BreakScreen'));
const ExamResultsScreen = lazy(() => import('../features/exam/ExamResultsScreen'));
const SecondPassScreen = lazy(() => import('../features/exam/SecondPassScreen'));

function RouteFallback() {
  return (
    <div className="screen">
      <div className="screen-body" style={{ paddingTop: 32 }}>
        <LoadingSkeleton lines={6} />
      </div>
    </div>
  );
}

const TABS = [
  {
    to: '/today',
    label: 'Today',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    to: '/learn',
    label: 'Learn',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z" />
        <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
      </svg>
    ),
  },
  {
    to: '/practice',
    label: 'Practice',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: '/progress',
    label: 'Progress',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
      </svg>
    ),
  },
  {
    to: '/more',
    label: 'More',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="5" cy="12" r="1.4" fill="currentColor" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        <circle cx="19" cy="12" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
];

function useTheme() {
  useEffect(() => {
    const apply = () => {
      const stored = localStorage.getItem('compass-theme');
      const theme =
        stored === 'light' || stored === 'dark'
          ? stored
          : window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
      document.documentElement.dataset.theme = theme;
    };
    apply();
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
}

function TabBar() {
  return (
    <nav className="tabbar" aria-label="Primary">
      {TABS.map(t => (
        <NavLink
          key={t.to}
          to={t.to}
          className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}
        >
          {t.icon}
          <span>{t.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function GatedRoutes() {
  const { ready, profile } = useStudy();
  const location = useLocation();
  const onOnboarding = location.pathname.startsWith('/onboarding');

  if (!ready) {
    return (
      <div className="app">
        <main className="app-main">
          <div className="screen">
            <div className="screen-body" style={{ paddingTop: 32 }}>
              <LoadingSkeleton lines={6} />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (profile && !profile.onboardingComplete && !onOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="app">
      <main className="app-main">
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/today" replace />} />
          <Route path="/today" element={<TodayScreen />} />
          <Route path="/learn/*" element={<LearnScreen />} />
          <Route path="/practice/*" element={<PracticeScreen />} />
          <Route path="/progress/*" element={<ProgressScreen />} />
          <Route path="/more/*" element={<MoreScreen />} />
          <Route path="/writing/*" element={<WritingScreen />} />
          <Route path="/exam" element={<ExamSetupScreen />} />
          <Route path="/exam/run" element={<ExamRunner />} />
          <Route path="/exam/break" element={<BreakScreen />} />
          <Route path="/exam/results/:runId" element={<ExamResultsScreen />} />
          <Route path="/exam/second-pass" element={<SecondPassScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="*" element={<Navigate to="/today" replace />} />
        </Routes>
        </Suspense>
      </main>
      {!onOnboarding && <TabBar />}
    </div>
  );
}

export default function App() {
  useTheme();
  return (
    <StudyProvider>
      <ToastProvider>
        <HashRouter>
          <GatedRoutes />
        </HashRouter>
      </ToastProvider>
    </StudyProvider>
  );
}
