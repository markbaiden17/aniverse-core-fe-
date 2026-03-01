/**
 * useLocalStorage.ts
 * Custom React hook for persisting data to browser's localStorage.
 * Essential for features like watchlists, favorites, or user theme preferences
 * that need to survive a page refresh.
 */

import { useState } from 'react';

/**
 * Custom hook for localStorage management
 * @param key - The unique string key for localStorage (e.g., 'watchlist')
 * @param initialValue - Default value if no data is found in storage
 * @returns A stateful value and a function to update it, similar to useState
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  
  // --- Initialization Logic ---
  // We use a "Lazy Initializer" function inside useState to ensure 
  // localStorage is only read once during the initial mount.
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Return parsed JSON from storage, or fallback to the provided initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Handle potential JSON.parse errors or restricted browser environments
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // --- Persistence Logic ---
  // A wrapper for the setter function that updates both the React state 
  // and the actual browser storage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Support for functional updates (e.g., setWatchlist(prev => [...prev, newItem]))
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Update React state to trigger re-renders
      setStoredValue(valueToStore);
      
      // Update Browser Storage as a JSON string
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}