import type { ReactNode } from 'react';

export default function Screen({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="screen">
      <header className="screen-header">
        <h1>{title}</h1>
      </header>
      <div className="screen-body">{children}</div>
    </div>
  );
}
