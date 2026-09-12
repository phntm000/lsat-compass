import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** Back button used by every More sub-screen. */
export function MoreBack({ label = 'More' }: { label?: string }) {
  const navigate = useNavigate();
  return (
    <button type="button" className="more-back" onClick={() => navigate(-1)} aria-label={`Back to ${label}`}>
      <span className="chev" aria-hidden="true">‹</span> {label}
    </button>
  );
}

/** Hub navigation row: 44px min target, chevron. */
export function MoreRow({
  title,
  sub,
  onClick,
  danger = false,
}: {
  title: string;
  sub?: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      className={`more-row${danger ? ' more-row--danger' : ''}`}
      onClick={onClick}
    >
      <span className="more-row-main">
        <span className="more-row-title">{title}</span>
        {sub && <span className="more-row-sub">{sub}</span>}
      </span>
      <span className="more-row-chev" aria-hidden="true">›</span>
    </button>
  );
}

/**
 * Simple table loader for screens that own their Dexie tables directly.
 * Returns [rows, loading, reload]. Reload after every mutation.
 */
export function useTable<T>(load: () => Promise<T[]>): [T[], boolean, () => Promise<void>] {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    try {
      setRows(await load());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await load();
        if (!cancelled) setRows(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [rows, loading, reload];
}
