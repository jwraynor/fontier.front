import {useState} from 'react';
import {Plus, Loader2, CheckCircle, Clock, Library, Type } from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Client} from '@/api/types';
import useDatabase from "@/hooks/useDatabase";
import {ClientManagementModal} from "@/components/ClientManagementModal";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx"; // Import the new component

function ClientCard({client, onManage}: { client: Client; onManage: () => void }) {
    const {useClientLibraries, useClientFonts} = useDatabase();
    const {data: libraries} = useClientLibraries(client.hwid);
    const {data: fonts} = useClientFonts(client.hwid);

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Card
            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
            <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                    <div
                        className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 text-2xl font-bold">
                        {getInitials(client.name)}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{client.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{client.hwid}</p>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm">
                        <CheckCircle className={`w-5 h-5 mr-2 ${client.active ? 'text-green-500' : 'text-gray-400'}`}/>
                        <span
                            className={`font-medium ${client.active ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            {client.active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="w-5 h-5 mr-2 text-gray-400"/>
                        Last Seen: {new Date(client.lastSeen).toLocaleString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Library className="w-5 h-5 mr-2 text-gray-400"/>
                        Assigned Libraries: {libraries?.length || 0}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Type className="w-5 h-5 mr-2 text-gray-400"/>
                        Assigned Fonts: {fonts?.length || 0}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                <Button className="w-full text-white font-semibold py-2 px-4 rounded transition duration-300"
                        onClick={onManage}>
                    Manage Client
                </Button>
            </CardFooter>
        </Card>
    );
}

export function UsersPage() {
    const {useClients} = useDatabase();
    const {data: clients, isLoading: isLoadingClients, error} = useClients();
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleManageClient = (client: Client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedClient(null);
    };

    if (isLoadingClients) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="mr-2 h-8 w-8 animate-spin"/>
                <p>Loading users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load clients. Please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Clients</h1>
                    <Button>
                        <Plus className="mr-2 h-4 w-4"/> Add New Client
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {clients?.map((client) => (
                        <ClientCard key={client.id} client={client} onManage={() => handleManageClient(client)}/>
                    ))}
                </div>
            </main>
            <div
                className="flex items-center justify-center h-16 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                <p>Showing {clients?.length || 0} clients</p>
            </div>
            {selectedClient && (
                <ClientManagementModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    client={selectedClient}
                />)}
        </div>
    );
}

export default UsersPage;