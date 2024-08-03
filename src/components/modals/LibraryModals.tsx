import {useState, useEffect} from 'react';
import {Button} from "@/components/ui/button.tsx";
import Modal from "@/components/modals/Modal.tsx";
import DragDropManagement from "@/components/modals/draggable.tsx";
import {Library, Font} from '@/api/types.ts';
import useDatabase from "@/hooks/useDatabase.ts";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

interface LibraryManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    library: Library | null;
}

export function LibraryManagementModal({isOpen, onClose, library}: LibraryManagementModalProps) {
    const {
        useLibraryFonts,
        useFonts,
        useCreateLibrary,
        useUpdateLibrary,
        useAssignFontToLibrary,
        useUnassignFontFromLibrary
    } = useDatabase();

    const [libraryName, setLibraryName] = useState(library?.name || '');
    const [libraryDescription, setLibraryDescription] = useState(library?.description || '');
    const {data: libraryFonts, isLoading: isLoadingLibraryFonts} = useLibraryFonts(library?.id || 0);
    const {data: allFonts, isLoading: isLoadingAllFonts} = useFonts();

    const createLibraryMutation = useCreateLibrary();
    const updateLibraryMutation = useUpdateLibrary();
    const assignFontMutation = useAssignFontToLibrary();
    const unassignFontMutation = useUnassignFontFromLibrary();

    const [availableFonts, setAvailableFonts] = useState<Font[]>([]);

    useEffect(() => {
        if (allFonts && libraryFonts) {
            setAvailableFonts(allFonts.filter(font => !libraryFonts.some(lf => lf.id === font.id)));
        }
    }, [allFonts, libraryFonts]);

    const handleSave = async () => {
        try {
            if (library) {
                await updateLibraryMutation.mutateAsync({
                    id: library.id,
                    name: libraryName,
                    description: libraryDescription
                });
            } else {
                await createLibraryMutation.mutateAsync({
                    name: libraryName,
                    description: libraryDescription
                });
            }
            onClose();
        } catch (error) {
            console.error('Failed to save library:', error);
        }
    };

    const handleAssignFont = async (font: Font) => {
        if (library) {
            try {
                await assignFontMutation.mutateAsync({libraryId: library.id, fontId: font.id});
            } catch (error) {
                console.error('Failed to assign font:', error);
            }
        }
    };

    const handleUnassignFont = async (font: Font) => {
        if (library) {
            try {
                await unassignFontMutation.mutateAsync({libraryId: library.id, fontId: font.id});
            } catch (error) {
                console.error('Failed to unassign font:', error);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={library ? `Edit ${library.name}` : 'Create New Library'}>
            <div className="space-y-4">
                <Input
                    placeholder="Library Name"
                    value={libraryName}
                    onChange={(e) => setLibraryName(e.target.value)}
                />
                <Textarea
                    placeholder="Library Description"
                    value={libraryDescription}
                    onChange={(e) => setLibraryDescription(e.target.value)}
                />
                <Button onClick={handleSave}>
                    {library ? 'Update Library' : 'Create Library'}
                </Button>
            </div>
            {library && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Manage Fonts</h3>
                    {isLoadingLibraryFonts || isLoadingAllFonts ? (
                        <div>Loading fonts...</div>
                    ) : (
                        <DragDropManagement<Font>
                            availableItems={availableFonts}
                            assignedItems={libraryFonts || []}
                            onAssign={handleAssignFont}
                            onUnassign={handleUnassignFont}
                            itemType="Font"
                        />
                    )}
                </div>
            )}
        </Modal>
    );
}