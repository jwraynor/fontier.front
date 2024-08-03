import {useState} from 'react';
import useDatabase from '@/hooks/useDatabase';
import {Font, Library, Client} from '@/api/types';

export const useResource = () => {
    const {useFonts, useLibraries, useClients} = useDatabase();
    const {data: fonts, isLoading: isLoadingFonts, error: fontsError} = useFonts();
    const {data: libraries, isLoading: isLoadingLibraries, error: librariesError} = useLibraries();
    const {data: clients, isLoading: isLoadingClients, error: clientsError} = useClients();



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'font' | 'library' | 'user' | null>(null);
    const [selectedItem, setSelectedItem] = useState<Font | Library | Client | null>(null);

    const handleAddResource = (type: 'font' | 'library' | 'user') => {
        setModalType(type);
        setSelectedItem(null);
        setIsModalOpen(true);
    };

    const handleManageResource = (type: 'font' | 'library' | 'user', item: Font | Library | Client) => {
        setModalType(type);
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedItem(null);
    };

    return {
        fonts,
        libraries,
        clients,
        isModalOpen,
        modalType,
        selectedItem,
        handleAddResource,
        handleManageResource,
        handleCloseModal,
        isLoading: isLoadingFonts || isLoadingLibraries || isLoadingClients,
        error: fontsError || librariesError || clientsError,
    };
};