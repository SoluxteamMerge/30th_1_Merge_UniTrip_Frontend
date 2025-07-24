import React, { useState } from "react";

interface PaginationProps<T> {
  items: T[]; // 전체 아이템 배열
  itemsPerPage: number; // 페이지당 아이템 수
  renderItem: (item: T) => React.ReactNode; // 아이템 렌더링 함수
}

const Pagination = <T,>({ items, itemsPerPage, renderItem }: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 이동 시 스크롤 상단으로
  };

  return (
    <div>
      {/* 현재 페이지 아이템 렌더링 */}
      <div 
        style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
        }}
        >
         {currentItems.map(renderItem)}
       </div>

      {/* 페이지네이션 버튼 */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              margin: "0 8px",
              padding: "8px 14px",
              border: "none",
              borderRadius: 6,
              fontWeight: currentPage === page ? 700 : 400,
              backgroundColor: currentPage === page ? "#ececec" : "transparent",
              cursor: "pointer",
              fontSize: 16
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
