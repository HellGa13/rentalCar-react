import { useState, useCallback } from 'react';

export const useLoadMore = (initialLimit) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [carsLimit] = useState(initialLimit);

  const loadMore = useCallback(() => {
    setCurrentPage(prevPage => prevPage + 1);
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return [currentPage, carsLimit, loadMore, resetPagination];
};