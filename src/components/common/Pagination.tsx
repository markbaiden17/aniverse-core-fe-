/**
 * Pagination.tsx
 * Navigation component for multi-page lists.
 * Features: Dynamic ellipsis generation, current page highlighting, 
 * and animated transitions for page numbers.
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // --- Early Exit ---
  if (totalPages <= 1) return null;

  // --- Logic: Generate Page Sequence ---
  const pageNumbers: (number | string)[] = [];

  // Always include the first page
  pageNumbers.push(1);

  // Add leading ellipsis if current page is far from start
  if (currentPage > 3) {
    pageNumbers.push('...');
  }

  // Calculate and add middle pages (current +/- 1)
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!pageNumbers.includes(i)) {
      pageNumbers.push(i);
    }
  }

  // Add trailing ellipsis if current page is far from end
  if (currentPage < totalPages - 2) {
    pageNumbers.push('...');
  }

  // Always include the last page
  if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
    pageNumbers.push(totalPages);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-2 mt-12 mb-8"
    >
      {/* Action: Previous Page */}
      {currentPage > 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 mr-2 bg-card hover:bg-primary text-gray-300 hover:text-white rounded-lg transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </motion.button>
      )}

      {/* Page Number List */}
      {pageNumbers.map((page, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-400 select-none">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 rounded-lg font-bold transition-all text-sm ${
                page === currentPage
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-card text-gray-300 hover:bg-primary/20 hover:text-white'
              }`}
            >
              {page}
            </button>
          )}
        </motion.div>
      ))}

      {/* Action: Next Page */}
      {currentPage < totalPages && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 ml-2 bg-card hover:bg-primary text-gray-300 hover:text-white rounded-lg transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </motion.button>
      )}
    </motion.div>
  );
}