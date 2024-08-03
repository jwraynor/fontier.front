import {useState, useEffect} from 'react';
import {Button} from "@/components/ui/button.tsx";
import Modal from "@/components/modals/Modal.tsx";
import DragDropManagement from "@/components/modals/draggable.tsx";
import {Client, Library as LibraryType, Font, Group} from '@/api/types.ts';
import useDatabase from "@/hooks/useDatabase.ts";

interface ClientManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    client: Client | null;
}

export function ClientModals({isOpen, onClose, client}: ClientManagementModalProps) {
    const {
        useClientLibraries,
        useClientFonts,
        useClientGroups,
        useLibraries,
        useFonts,
        useGroups,
        useAssignLibraryToClient,
        useUnassignLibraryFromClient,
        useAssignFontToClient,
        useUnassignFontFromClient,
        useAssignGroupToClient,
        useUnassignGroupFromClient
    } = useDatabase();

    const [activeTab, setActiveTab] = useState<'libraries' | 'fonts' | 'groups'>('libraries');
    const {data: clientLibraries, isLoading: isLoadingClientLibraries} = useClientLibraries(client?.hwid || '');
    const {data: clientFonts, isLoading: isLoadingClientFonts} = useClientFonts(client?.hwid || '');
    const {data: clientGroups, isLoading: isLoadingClientGroups} = useClientGroups(client?.hwid || '');
    const {data: allLibraries, isLoading: isLoadingAllLibraries} = useLibraries();
    const {data: allFonts, isLoading: isLoadingAllFonts} = useFonts();
    const {data: allGroups, isLoading: isLoadingAllGroups} = useGroups();

    const isLoading = isLoadingClientLibraries || isLoadingClientFonts || isLoadingClientGroups ||
        isLoadingAllLibraries || isLoadingAllFonts || isLoadingAllGroups;

    const assignLibraryMutation = useAssignLibraryToClient();
    const unassignLibraryMutation = useUnassignLibraryFromClient();
    const assignFontMutation = useAssignFontToClient();
    const unassignFontMutation = useUnassignFontFromClient();
    const assignGroupMutation = useAssignGroupToClient();
    const unassignGroupMutation = useUnassignGroupFromClient();

    const [availableLibraries, setAvailableLibraries] = useState<LibraryType[]>([]);
    const [availableFonts, setAvailableFonts] = useState<Font[]>([]);
    const [availableGroups, setAvailableGroups] = useState<Group[]>([]);

    useEffect(() => {
        if (allLibraries && clientLibraries) {
            setAvailableLibraries(allLibraries.filter(lib => !clientLibraries.some(cl => cl.id === lib.id)));
        }
    }, [allLibraries, clientLibraries]);

    useEffect(() => {
        if (allFonts && clientFonts) {
            setAvailableFonts(allFonts.filter(font => !clientFonts.some(cf => cf.id === font.id)));
        }
    }, [allFonts, clientFonts]);

    useEffect(() => {
        if (allGroups && clientGroups) {
            setAvailableGroups(allGroups.filter(group => !clientGroups.some(cg => cg.id === group.id)));
        }
    }, [allGroups, clientGroups]);

    const handleAssignLibrary = async (library: LibraryType) => {
        if (client) {
            try {
                await assignLibraryMutation.mutateAsync({clientId: client.hwid, libraryId: library.id});
            } catch (error) {
                console.error('Failed to assign library:', error);
            }
        }
    };

    const handleUnassignLibrary = async (library: LibraryType) => {
        if (client) {
            try {
                await unassignLibraryMutation.mutateAsync({clientId: client.hwid, libraryId: library.id});
            } catch (error) {
                console.error('Failed to unassign library:', error);
            }
        }
    };

    const handleAssignFont = async (font: Font) => {
        if (client) {
            try {
                await assignFontMutation.mutateAsync({clientId: client.hwid, fontId: font.id});
            } catch (error) {
                console.error('Failed to assign font:', error);
            }
        }
    };

    const handleUnassignFont = async (font: Font) => {
        if (client) {
            try {
                await unassignFontMutation.mutateAsync({clientId: client.hwid, fontId: font.id});
            } catch (error) {
                console.error('Failed to unassign font:', error);
            }
        }
    };

    const handleAssignGroup = async (group: Group) => {
        if (client) {
            try {
                await assignGroupMutation.mutateAsync({clientId: client.hwid, groupId: group.id});
            } catch (error) {
                console.error('Failed to assign group:', error);
            }
        }
    };

    const handleUnassignGroup = async (group: Group) => {
        if (client) {
            try {
                await unassignGroupMutation.mutateAsync({clientId: client.hwid, groupId: group.id});
            } catch (error) {
                console.error('Failed to unassign group:', error);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Manage ${client?.name || 'Client'}`}>
            <div className="flex space-x-2 mb-4">
                <Button
                    variant={activeTab === 'libraries' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('libraries')}
                >
                    Libraries
                </Button>
                <Button
                    variant={activeTab === 'fonts' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('fonts')}
                >
                    Fonts
                </Button>
                <Button
                    variant={activeTab === 'groups' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('groups')}
                >
                    Groups
                </Button>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {activeTab === 'libraries' && (
                        <DragDropManagement<LibraryType>
                            availableItems={availableLibraries}
                            assignedItems={clientLibraries || []}
                            onAssign={handleAssignLibrary}
                            onUnassign={handleUnassignLibrary}
                            itemType="Library"
                        />
                    )}
                    {activeTab === 'fonts' && (
                        <DragDropManagement<Font>
                            availableItems={availableFonts}
                            assignedItems={clientFonts || []}
                            onAssign={handleAssignFont}
                            onUnassign={handleUnassignFont}
                            itemType="Font"
                        />
                    )}
                    {activeTab === 'groups' && (
                        <DragDropManagement<Group>
                            availableItems={availableGroups}
                            assignedItems={clientGroups || []}
                            onAssign={handleAssignGroup}
                            onUnassign={handleUnassignGroup}
                            itemType="Group"
                        />
                    )}
                </>
            )}
        </Modal>
    );
}