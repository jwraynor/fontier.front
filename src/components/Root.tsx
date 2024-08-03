import React, {useState, useCallback} from 'react';
import {TopBar} from '@/components/TopBar';
import {ResourceAccordion} from '@/components/ResourceAccordian';
import {ResourceModals} from '@/components/ResourceModals';
import {useResource} from "@/hooks/useResource.ts";

const ITEMS_PER_PAGE = 6;

const Root:React.FC = () => {
    const {
        fonts,
        libraries,
        clients,
        isModalOpen,
        modalType,
        selectedItem,
        handleAddResource,
        handleManageResource,
        handleCloseModal,
        isLoading
    } = useResource();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPages, setCurrentPages] = useState({ fonts: 1, libraries: 1, users: 1 });

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
        setCurrentPages({ fonts: 1, libraries: 1, users: 1 });
    }, []);

    const filterItems = useCallback((items: any[]) => {
        return items?.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        ) || [];
    }, [searchTerm]);

    const filteredFonts = filterItems(fonts || []);
    const filteredLibraries = filterItems(libraries || []);
    const filteredClients = filterItems(clients || []);

    const paginateItems = useCallback((items: any[], page: number) => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, []);

    const paginatedFonts = paginateItems(filteredFonts, currentPages.fonts);
    const paginatedLibraries = paginateItems(filteredLibraries, currentPages.libraries);
    const paginatedClients = paginateItems(filteredClients, currentPages.users);

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar
                onAddResource={handleAddResource}
                searchTerm={searchTerm}
                setSearchTerm={handleSearch}
                filteredFonts={filteredFonts}
                filteredLibraries={filteredLibraries}
                filteredClients={filteredClients}
                handleManageResource={handleManageResource}
            />
            <main className="flex-1 container mx-auto px-4 py-8">
                <ResourceAccordion
                    fonts={paginatedFonts}
                    libraries={paginatedLibraries}
                    clients={paginatedClients}
                    onManageResource={handleManageResource}
                    currentPages={currentPages}
                    setCurrentPages={setCurrentPages}
                    totalItems={{
                        fonts: filteredFonts.length,
                        libraries: filteredLibraries.length,
                        users: filteredClients.length
                    }}
                    itemsPerPage={ITEMS_PER_PAGE}
                    isLoaded={!isLoading}
                />
            </main>
            <ResourceModals
                isOpen={isModalOpen}
                type={modalType}
                item={selectedItem}
                onClose={handleCloseModal}
            />
        </div>
    );
}


export default Root;