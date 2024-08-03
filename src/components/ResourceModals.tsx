import React from 'react';
import {EnhancedFontCreationModal} from '@/components/modals/FontModals.tsx';
import {LibraryManagementModal} from '@/components/modals/LibraryModals.tsx';
import {ClientModals} from '@/components/modals/ClientModals.tsx';
import {Font, Library, Client} from '@/api/types.ts';

interface ResourceModalsProps {
    isOpen: boolean;
    type: 'font' | 'library' | 'user' | null;
    item: Font | Library | Client | null;
    onClose: () => void;
}

export const ResourceModals: React.FC<ResourceModalsProps> = ({isOpen, type, item, onClose}) => {
    return (
        <>
            {type === 'font' && (
                <EnhancedFontCreationModal isOpen={isOpen} onClose={onClose} font={item as Font}/>
            )}
            {type === 'library' && (
                <LibraryManagementModal isOpen={isOpen} onClose={onClose} library={item as Library}/>
            )}
            {type === 'user' && (
                <ClientModals isOpen={isOpen} onClose={onClose} client={item as Client}/>
            )}
        </>
    );
};