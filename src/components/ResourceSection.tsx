import React from 'react';
import {AccordionItem, AccordionTrigger, AccordionContent} from "@/components/ui/accordion";
import {PaginationComponent} from '@/components/Pagination';
import {usePagination} from '@/hooks/usePagination';

interface ResourceSectionProps<T> {
    title: string;
    items: T[];
    renderCard: (item: T) => React.ReactNode;
}

export function ResourceSection<T>({title, items, renderCard}: ResourceSectionProps<T>) {
    const {currentPage, totalPages, currentItems, goToPage} = usePagination(items, 6);

    return (
        <AccordionItem value={title.toLowerCase()}>
            <AccordionTrigger>
                <h2 className="text-2xl font-semibold">{title}</h2>
            </AccordionTrigger>
            <AccordionContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
                    {currentItems.map(renderCard)}
                </div>
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />
            </AccordionContent>
        </AccordionItem>
    );
}