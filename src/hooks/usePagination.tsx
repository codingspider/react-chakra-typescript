/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import apiClient from "../services/axios";

// Pagination hook
const usePagination = (endpoint: string) => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await apiClient.get(`${endpoint}?page=${currentPage}`);
        const paginatedData = response.data.data;
        setData(paginatedData.data); // Set the actual paginated data
        setCurrentPage(paginatedData.current_page); // Set current page
        setLastPage(paginatedData.last_page); // Set last page
      } catch (err) {
        setError("Error fetching data" + err);
      } finally {
        setLoading(true);
      }
    };

    fetchData();
  }, [currentPage, endpoint]);

  const goToNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    data,
    currentPage,
    lastPage,
    loading,
    error,
    goToNextPage,
    goToPreviousPage,
  };
};

export default usePagination;
