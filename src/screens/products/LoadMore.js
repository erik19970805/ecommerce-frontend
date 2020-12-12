import React from "react";

const LoadMore = ({ filters, setFilters, result }) => {
  return (
    <div className="load_more">
      {result < filters.page * 9 ? (
        ""
      ) : (
        <button
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default LoadMore;
