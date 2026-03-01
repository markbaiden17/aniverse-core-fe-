/**
 * main.tsx / index.tsx
 * The entry point of the React application.
 * Responsibility: Mounts the React component tree to the physical DOM.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global styles and Tailwind configuration
import './index.css';

// The root application component with routing and logic
import App from './App.tsx';

/**
 * 1. Locate the 'root' element in index.html.
 * 2. Create the React root.
 * 3. Render the application within StrictMode.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);