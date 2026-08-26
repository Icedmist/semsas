/**
 * A reusable skeleton loading component.
 * Displays a pulsing placeholder block to indicate loading state.
 */
export default function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton ${className}`} />;
}