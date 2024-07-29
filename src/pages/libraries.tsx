import { Plus, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useDatabase from '@/hooks/useDatabase';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Library } from '@/api/types';

function LibraryCard({ library }: { library: Library }) {
    return (
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-6 w-6"/>
                    {library.name}
                </CardTitle>
                <CardDescription>{library.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mt-2 space-y-2">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Created: {new Date(library.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Updated: {new Date(library.updatedAt).toLocaleDateString()}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                <Button className="w-full text-white font-semibold py-2 px-4 rounded transition duration-300">
                    Manage Library
                </Button>
            </CardFooter>
        </Card>
    );
}

export function LibrariesPage() {
    const { useLibraries } = useDatabase();
    const { data: libraries, isLoading, error } = useLibraries();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <p>Loading libraries...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="m-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load libraries. Please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Font Libraries</h1>
                    <Button>
                        <Plus className="mr-2 h-4 w-4"/> Create New Library
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {libraries?.map((library) => (
                        <LibraryCard key={library.id} library={library} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default LibrariesPage;