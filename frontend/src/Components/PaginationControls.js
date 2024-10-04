// PaginationControls.js
import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationControls = ({ currentPage, setCurrentPage, totalPages }) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middlePage = Math.ceil(maxPagesToShow / 2);
      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + middlePage - 1 >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middlePage + 1;
        endPage = currentPage + middlePage - 1;
      }
    }

    return Array.from({ length: (endPage + 1) - startPage }, (_, i) => startPage + i);
  };

  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
      {getPageNumbers().map(pageNumber => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default PaginationControls;
