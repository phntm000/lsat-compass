import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastProvider, Screen, LoadingSkeleton } from '../../components';
import { useStudy } from '../../state/study';
import './more.css';
import { MoreRow } from './common';
import SettingsScreen from './SettingsScreen';
import BackupScreen from './BackupScreen';
import OfficialLogScreen from './OfficialLogScreen';
import GlossaryScreen from './GlossaryScreen';
import NotebookScreen from './NotebookScreen';
import SavedScreen from './SavedScreen';
import ResourcesScreen from './ResourcesScreen';
import AboutScreen from './AboutScreen';

function Hub() {
  const { ready, profile } = useStudy();
  const navigate = useNavigate();

  if (!ready) {
    return (
      <Screen title="More">
        <LoadingSkeleton lines={8} />
      </Screen>
    );
  }

  const target = profile?.targetTestDate;
  const profileSub = target
    ? `Local profile — no account · target ${target}`
    : 'Local profile — no account';

  return (
    <Screen title="More">
      <div className="more-wrap">
        <div className="more-list" role="list">
          <MoreRow title="Profile" sub={profileSub} onClick={() => navigate('settings')} />
          <MoreRow
            title="Settings"
            sub="Theme, timers, sound, session length"
            onClick={() => navigate('settings')}
          />
          <MoreRow
            title="Backup & reset"
            sub="Export, import, or reset your data"
            onClick={() => navigate('backup')}
          />
          <MoreRow
            title="Official practice log"
            sub="Track real PrepTest scores separately"
            onClick={() => navigate('official-log')}
          />
          <MoreRow
            title="Writing module"
            sub="Argumentative Writing practice"
            onClick={() => navigate('/writing')}
          />
          <MoreRow
            title="Glossary"
            sub="LSAT terms in plain English"
            onClick={() => navigate('glossary')}
          />
          <MoreRow
            title="Notebook"
            sub="Your rules, insights, and reminders"
            onClick={() => navigate('notebook')}
          />
          <MoreRow
            title="Saved bookmarks"
            sub="Lessons, questions, and terms you saved"
            onClick={() => navigate('saved')}
          />
          <MoreRow
            title="Resources"
            sub="Official LSAC links and how practice works"
            onClick={() => navigate('resources')}
          />
          <MoreRow
            title="About & privacy"
            sub="Version, privacy, how this app teaches"
            onClick={() => navigate('about')}
          />
        </div>
      </div>
    </Screen>
  );
}

export default function MoreScreen() {
  return (
    <ToastProvider>
      <Routes>
        <Route index element={<Hub />} />
        <Route path="settings" element={<SettingsScreen />} />
        <Route path="backup" element={<BackupScreen />} />
        <Route path="official-log" element={<OfficialLogScreen />} />
        <Route path="glossary" element={<GlossaryScreen />} />
        <Route path="notebook" element={<NotebookScreen />} />
        <Route path="saved" element={<SavedScreen />} />
        <Route path="resources" element={<ResourcesScreen />} />
        <Route path="about" element={<AboutScreen />} />
      </Routes>
    </ToastProvider>
  );
}
