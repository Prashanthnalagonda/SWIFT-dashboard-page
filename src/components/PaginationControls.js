import React from "react";

const PaginationControls = ({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
      <div>
        <label htmlFor="pageSize">Page Size: </label>
        <select id="pageSize" value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          {[10, 50, 100].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;