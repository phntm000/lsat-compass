import { useState } from 'react';
import { Screen, SegmentedControl, Toggle, Field, Button, LoadingSkeleton, useToast } from '../../components';
import { useStudy } from '../../state/study';
import { MoreBack } from './common';

export default function SettingsScreen() {
  const { ready, profile, updateProfile } = useStudy();
  const toast = useToast();
  const [sessionInput, setSessionInput] = useState<string | null>(null);

  if (!ready || !profile) {
    return (
      <Screen title="Settings">
        <LoadingSkeleton lines={8} />
      </Screen>
    );
  }

  const save = async (patch: Parameters<typeof updateProfile>[0]) => {
    try {
      await updateProfile(patch);
    } catch {
      toast('Could not save that change. Try again.');
    }
  };

  const commitSessionMinutes = (raw: string) => {
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) {
      setSessionInput(null);
      return;
    }
    const clamped = Math.min(60, Math.max(5, n));
    setSessionInput(null);
    void save({ preferredSessionMinutes: clamped });
  };

  return (
    <Screen title="Settings">
      <div className="more-wrap">
        <MoreBack />
        <p className="more-note">Changes save automatically.</p>

        <h2 className="more-section-title">Appearance</h2>
        <div className="more-card">
          <SegmentedControl
            ariaLabel="Theme"
            options={[
              { value: 'system', label: 'System' },
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
            value={profile.theme}
            onChange={(v) => void save({ theme: v as 'system' | 'light' | 'dark' })}
          />
        </div>

        <h2 className="more-section-title">Timers</h2>
        <div className="more-card">
          <div className="more-form">
            <div>
              <span className="more-field-label" id="timer-mode-label">Timer display</span>
              <SegmentedControl
                ariaLabel="Timer mode"
                options={[
                  { value: 'visible', label: 'Visible' },
                  { value: 'minimized', label: 'Minimized' },
                  { value: 'hidden', label: 'Hidden' },
                ]}
                value={profile.timerMode}
                onChange={(v) => void save({ timerMode: v as 'visible' | 'minimized' | 'hidden' })}
              />
            </div>
            <Toggle
              label="Timer warnings"
              description="Warn before time runs out in timed work"
              checked={profile.timerWarnings}
              onChange={(v) => void save({ timerWarnings: v })}
            />
          </div>
        </div>

        <h2 className="more-section-title">Feedback</h2>
        <div className="more-card">
          <div className="more-form">
            <Toggle
              label="Sound"
              description="Play subtle sounds on events"
              checked={profile.soundEnabled}
              onChange={(v) => void save({ soundEnabled: v })}
            />
            <Toggle
              label="Haptics"
              description="Vibrate on supported devices"
              checked={profile.haptics}
              onChange={(v) => void save({ haptics: v })}
            />
            <Toggle
              label="Reduced motion"
              description="Minimize animations and transitions"
              checked={profile.reducedMotion}
              onChange={(v) => void save({ reducedMotion: v })}
            />
          </div>
        </div>

        <h2 className="more-section-title">Study plan</h2>
        <div className="more-card">
          <div className="more-form">
            <Field
              label="Preferred session length (minutes)"
              type="number"
              inputMode="numeric"
              min={5}
              max={60}
              value={sessionInput ?? String(profile.preferredSessionMinutes)}
              onChange={(v) => setSessionInput(v)}
              hint="5–60 minutes. Press done to save."
            />
            <Button
              variant="ghost"
              onClick={() => commitSessionMinutes(sessionInput ?? String(profile.preferredSessionMinutes))}
            >
              Save session length
            </Button>
            <Field
              label="Target test date"
              type="date"
              value={profile.targetTestDate ?? ''}
              onChange={(v) => void save({ targetTestDate: v === '' ? null : v })}
            />
          </div>
        </div>
      </div>
    </Screen>
  );
}
