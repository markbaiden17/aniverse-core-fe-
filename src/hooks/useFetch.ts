/**
 * useFetch.ts
 * Custom React hook for handling async API calls with loading and error states.
 * Features: Generic type support, race-condition prevention (isMounted), 
 * and automatic cleanup to prevent memory leaks.
 */

import { useState, useEffect } from 'react';

// --- State Interface ---
interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for fetching data
 * @param asyncFunction - The async function to call (e.g., kitsuService.getTrendingAnime)
 * @param dependencies - Dependency array for useEffect
 * @returns Object with data, loading, and error states
 */
export function useFetch<T>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
): UseFetchState<T> {
  
  // Initialize state with loading: true to provide an immediate "Loading" signal
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // --- Guard: Prevent state updates on unmounted components ---
    let isMounted = true; 

    const fetchData = async () => {
      try {
        // Reset state for new fetch attempts
        setState((prev) => ({ ...prev, loading: true, error: null }));
        
        const result = await asyncFunction();

        if (isMounted) {
          setState({
            data: result,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            // Fallback for non-Error objects
            error: err instanceof Error ? err.message : 'An error occurred',
          });
        }
      }
    };

    fetchData();

    // --- Cleanup: Lifecycle Management ---
    return () => {
      isMounted = false; // Effectively cancels the state update if the component dies
    };
  }, dependencies); // Re-runs whenever a provided dependency (like a category ID) changes

  return state;
}