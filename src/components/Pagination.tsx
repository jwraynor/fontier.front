import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationProps> = ({
                                                                   currentPage,
                                                                   totalPages,
                                                                   onPageChange,
                                                               }) => {
    const maxVisiblePages = 5;

    const getPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {currentPage === 1 ? (
                        <PaginationPrevious className="pointer-events-none opacity-50" />
                    ) : (
                        <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
                    )}
                </PaginationItem>
                {getPageNumbers().map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            onClick={() => onPageChange(pageNumber)}
                            isActive={currentPage === pageNumber}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    {currentPage === totalPages ? (
                        <PaginationNext className="pointer-events-none opacity-50" />
                    ) : (
                        <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};