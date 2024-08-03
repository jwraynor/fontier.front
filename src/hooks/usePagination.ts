import { useState, useMemo } from 'react';

export const usePagination = <T>(items: T[] | undefined, itemsPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = items?.length ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    const currentItems = useMemo(() => {
        if (!items) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, currentPage, itemsPerPage]);

    const goToPage = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    return {
        currentPage,
        totalPages,
        currentItems,
        goToPage,
    };
};