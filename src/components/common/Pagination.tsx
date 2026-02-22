/**
 * Pagination.tsx
 * Reusable pagination component for browsing multiple pages
 */

import { ChevronRight } from 'lucide-react';
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
  if (totalPages <= 1) return null;

  const pageNumbers: (number | string)[] = [];

  // Show first page
  pageNumbers.push(1);

  // Show pages around current page
  if (currentPage > 3) {
    pageNumbers.push('...');
  }

  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (!pageNumbers.includes(i)) {
      pageNumbers.push(i);
    }
  }

  // Show last page if totalPages > 1
  if (currentPage < totalPages - 2) {
    pageNumbers.push('...');
  }

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
      {pageNumbers.map((page, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 rounded-lg font-bold transition-all text-sm ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'bg-card text-gray-300 hover:bg-primary/20 hover:text-white'
              }`}
            >
              {page}
            </button>
          )}
        </motion.div>
      ))}

      {/* Next Button */}
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