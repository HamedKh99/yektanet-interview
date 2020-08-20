import React from "react";
import "./Pagination.css";

function Pagination({setPage, page, dataLength}) {
  return (
    <div className="Container">
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>قبل</button>
      <button onClick={() => setPage(page + 1)} disabled={(page + 1) * 7 > dataLength}>بعد</button>
    </div>
  );
}

export default Pagination;
