/**
 * ErrorDisplay.tsx
 * Reusable error message component
 * Shows when API calls fail or other errors occur
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <img src={Goku} alt="Error" className="w-60 h-60 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4 text-secondary">Oops!</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-primary hover:bg-secondary text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}