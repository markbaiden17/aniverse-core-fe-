/**
 * ErrorDisplay.tsx
 * A full-screen fallback component used when API requests or page loads fail.
 * Features: Visual "Goku" asset, customizable messages, and an optional retry action.
 */

import Goku from '../../assets/images/Goku.svg';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({ 
  message = 'Something went wrong. Please try again.',
  onRetry 
}: ErrorDisplayProps) {
  return (
    // Full-screen centered container
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        
        {/* Error Illustration */}
        <img 
          src={Goku} 
          alt="Error Illustration" 
          className="w-60 h-60 mx-auto mb-6" 
        />
        
        {/* Error Content */}
        <h2 className="text-2xl font-bold mb-4 text-secondary">Oops!</h2>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">{message}</p>
        
        {/* Optional Retry Action */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-primary hover:bg-secondary text-white rounded-lg transition-colors font-bold shadow-lg"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}