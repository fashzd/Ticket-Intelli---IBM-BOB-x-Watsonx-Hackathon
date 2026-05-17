'use client';

/**
 * SkeletonLoader Component
 * 
 * Displays skeleton loading states for various content types.
 * Provides visual feedback while content is loading.
 */

interface SkeletonLoaderProps {
  type?: 'text' | 'title' | 'card' | 'analysis';
  lines?: number;
  className?: string;
}

export default function SkeletonLoader({ 
  type = 'text', 
  lines = 3,
  className = '' 
}: SkeletonLoaderProps) {
  if (type === 'analysis') {
    return (
      <div className={`space-y-6 ${className}`} role="status" aria-label="Loading analysis">
        {/* Header skeleton */}
        <div className="skeleton skeleton-card" />
        
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="skeleton skeleton-card" />
          <div className="lg:col-span-2 skeleton skeleton-card" />
        </div>
        
        {/* Content sections */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={`skeleton skeleton-card ${className}`} role="status" aria-label="Loading content" />
    );
  }

  if (type === 'title') {
    return (
      <div className={`skeleton skeleton-title ${className}`} role="status" aria-label="Loading title" />
    );
  }

  // Default: text lines
  return (
    <div className={`space-y-2 ${className}`} role="status" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="skeleton skeleton-text"
          style={{ width: `${100 - (i * 10)}%` }}
        />
      ))}
    </div>
  );
}

// Made with Bob