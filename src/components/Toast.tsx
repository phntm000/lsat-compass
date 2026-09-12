import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export interface ToastOptions {
  title?: string;
}

export type ShowToast = (message: string, opts?: ToastOptions) => void;

interface ToastItem {
  id: number;
  message: string;
  title?: string;
}

const ToastContext = createContext<ShowToast | null>(null);

export function useToast(): ShowToast {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

/** Rules-of-hooks-safe variant: no-op outside a provider (tests, edge renders). */
export function useSafeToast(): ShowToast {
  const ctx = useContext(ToastContext);
  return ctx ?? (() => {});
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback<ShowToast>(
    (message, opts) => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, message, title: opts?.title }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast" role="status">
            {t.title && <div className="toast-title">{t.title}</div>}
            <div className="toast-msg">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
