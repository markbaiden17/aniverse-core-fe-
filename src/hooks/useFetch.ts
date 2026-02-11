/**
 * useFetch.ts
 * Custom React hook for handling async API calls with loading and error states
 * Reduces code duplication across components that fetch data
 */

import { useState, useEffect } from 'react';

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
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted component

    const fetchData = async () => {
      try {
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
            error: err instanceof Error ? err.message : 'An error occurred',
          });
        }
      }
    };

    fetchData();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}