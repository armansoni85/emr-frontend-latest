import { useState } from "react";

const Pagination = ({ position = "end", limitPerPage = 10, countData = 0, onChangePage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(countData / limitPerPage);

    const handlePageChange = (e) => {
        const page = e.target.value.replace(/\D/g, "");
        setCurrentPage(page);
    };

    const onEnterKeyPress = (e) => {
        if (onChangePage) {
            onChangePage(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            if (onChangePage) {
                onChangePage(newPage);
            }
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            if (onChangePage) {
                onChangePage(newPage);
            }
        }
    };

    const enumPosition = {
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
    };

    return (
        <div className={`flex ${enumPosition[position]} items-center mt-4 mx-4`}>
            <div className="flex items-center space-x-2">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage <= 1}
                    className="px-3 py-1 border border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-muted"
                >
                    Previous
                </button>
                <div className="flex items-center space-x-1">
                    <span>Page</span>
                    <input
                        type="text"
                        className="px-2 border w-14 text-center border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150 remove-input-spin"
                        value={currentPage}
                        onChange={handlePageChange}
                        onBlur={(e) => {
                            onEnterKeyPress(e);
                        }}
                    />
                    <span>of {totalPages}</span>
                </div>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage >= totalPages}
                    className="px-3 py-1 border border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-muted"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
