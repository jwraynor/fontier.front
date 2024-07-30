import React, {useState, useCallback} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useDropzone} from 'react-dropzone';
import {Plus, X} from 'lucide-react';
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
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";

export function EnhancedFontCreationModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const {useUploadFont} = useDatabase();
    const {toast} = useToast();
    const {isError, isSuccess, isPending, mutateAsync} = useUploadFont();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            //TODO: upload all files, not just the first one
            setFile(acceptedFiles[0]);
            setIsOpen(true);
            console.log(acceptedFiles);
        }
    }, []);

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to create font. Please try again.
                </AlertDescription>
            </Alert>
        );

    }

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
            await mutateAsync(formData);
            if (isSuccess) {
                toast({
                    title: "Success",
                    description: "Font created successfully.",
                });
            }
            setFile(null);
            setIsOpen(false);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create font. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <div className="fixed inset-0 pointer-events-none">
                <AnimatePresence>
                    {isDragActive && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center"
                        >
                            <motion.div
                                initial={{scale: 0.9}}
                                animate={{scale: 1}}
                                className="bg-white p-8 rounded-lg shadow-lg text-center"
                            >
                                <p className="text-2xl font-bold text-blue-600">Drop your font file here</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div {...getRootProps()} className="w-full h-full"/>
            </div>

            <motion.button
                className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                onClick={() => setIsOpen(true)}
            >
                <Plus size={24}/>
            </motion.button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Font</DialogTitle>
                    </DialogHeader>
                    <Button variant='ghost' onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
                        <X size={24}/>
                    </Button>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="border-2 border-dashed rounded-md p-4 text-center">
                            <input {...getInputProps()} />
                            {file ? (
                                <p>Selected file: {file.name}</p>
                            ) : (
                                <p>Drag 'n' drop a font file here, or click to select</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Creating...' : 'Create Font'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default EnhancedFontCreationModal;