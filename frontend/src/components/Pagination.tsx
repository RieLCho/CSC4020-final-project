interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center mt-4 join">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="join-item btn rounded-full"
      >
        {'«'}
      </button>
      {/* TODO button 클릭 시 페이지 변경 */}
      <button className="join-item btn">
        {currentPage} / {totalPages}
      </button>
      <button
        className="join-item btn rounded-full"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        {'»'}
      </button>
    </div>
  );
};

export default Pagination;
