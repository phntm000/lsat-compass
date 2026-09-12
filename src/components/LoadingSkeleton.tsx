export interface LoadingSkeletonProps {
  lines?: number;
}

export default function LoadingSkeleton({ lines = 3 }: LoadingSkeletonProps) {
  return (
    <div className="skel" aria-hidden="true">
      {Array.from({ length: Math.max(1, lines) }, (_, i) => (
        <div key={i} className="skel-line" />
      ))}
    </div>
  );
}
