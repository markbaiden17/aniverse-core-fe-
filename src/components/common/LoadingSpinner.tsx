/**
 * LoadingSpinner.tsx
 * A full-screen, animated loading indicator.
 * Displays a spinning circular gradient to represent ongoing background tasks.
 */

import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    // Full-screen centered viewport container
    <div className="flex items-center justify-center min-h-screen">
      
      {/* Animated Spinner Element */}
      <motion.div
        className="
          /* Circular base with brand-colored borders */
          w-16 h-16 border-4 border-primary border-t-secondary rounded-full
        "
        
        /* Animation Configuration: 360-degree infinite loop */
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
      />
    </div>
  );
}