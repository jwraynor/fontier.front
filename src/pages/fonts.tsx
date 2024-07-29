import React, { useState } from 'react';
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useDatabase from '@/hooks/useDatabase';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FontCreationModal } from '@/components/FontCreationModal';
import {Badge} from "@/components/ui/badge.tsx";

export function FontsPage() {
    const { useFonts } = useDatabase();
    const { data: fonts, isLoading, error } = useFonts();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="mr-2 h-8 w-8 animate-spin"/>
                <p>Loading fonts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="m-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load fonts. Please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-1">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Fonts</h1>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4"/> Add New Font
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {fonts?.map((font) => (
                        <Card key={font.id}>
                            <CardHeader className='select-none'>
                                <div className='flex flex-row justify-between'>
                                    <CardTitle>{font.name}</CardTitle>
                                    <Badge variant='outline'>{font.file_type}</Badge>
                                </div>
                                <CardDescription className='pt-0.5'><Badge >{font.style}</Badge></CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl" style={{fontFamily: font.name}}>
                                    The quick brown fox jumps over the lazy dog
                                </p>
                                <Button className="mt-4 w-full">Manage Font</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
            <FontCreationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default FontsPage;