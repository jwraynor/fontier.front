import React, {useState, useCallback, useEffect} from 'react';
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {useDatabase} from "@/hooks/useDatabase";
import {useToast} from "@/components/ui/use-toast";
import {useDropzone} from 'react-dropzone';

interface FontCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function FontCreationModal({isOpen, onClose}: FontCreationModalProps) {
    const [fontName, setFontName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const {useUploadFont} = useDatabase();
    const {toast} = useToast();
    const uploadFontMutation = useUploadFont();


    const close = () => {
        onClose();
        //Reset the state
        setFile(null);
        setFontName('');
        //Reset the mutation state
        uploadFontMutation.reset();
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setFontName(acceptedFiles[0].name.split('.')[0]); // Set font name to file name without extension
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'font/ttf': ['.ttf'],
            'font/otf': ['.otf'],
            'font/woff': ['.woff'],
            'font/woff2': ['.woff2']
        },
        multiple: false
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            toast({
                title: "Error",
                description: "Please select a font file to upload.",
                variant: "destructive",
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);
            const {filePath} = await uploadFontMutation.mutateAsync(formData);

            toast({
                title: "Success",
                description: "Font created successfully.",
            });
            //Clear the drag and drop area
            setFile(null);
            close();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create font. Please try again.",
                variant: "destructive",
            });
        }
    };

    const getErrorMessage = (error: any) => {
        try {
            //Converts the axios error code message to a human readable format. the error code is at the end of the message
            const message = error.message;
            const code = parseInt(message.substring(message.lastIndexOf('status code ') + 12));
            switch (code) {
                case 413:
                    return 'The font file is too large. Please upload a smaller file.';
                case 415:
                    return 'Invalid file format. Please upload a valid font file.';
                case 409:
                    return 'This font already exists in the database. The name is irrelevant, only the file\'s content matters.';
                default:
                    return message;
            }
        } catch (e) {
            return error.message;
        }

    }

    if (uploadFontMutation.isError) {
        return (
            <Dialog open={isOpen} onOpenChange={close}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Font</DialogTitle>
                    </DialogHeader>
                    <div className="p-4 bg-red-50 rounded-md">
                        <p className="text-red-800">{getErrorMessage(uploadFontMutation.error)}</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={close}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Font</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div {...getRootProps()}
                         className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>Drop the font file here ...</p> :
                                !file &&  <p>Drag 'n' drop a font file here, or click to select</p>
                        }
                        {file && <p className="mt-2">Selected file: {file.name}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={close}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={uploadFontMutation.isLoading}>
                            {uploadFontMutation.isLoading ? 'Creating...' : 'Create Font'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}