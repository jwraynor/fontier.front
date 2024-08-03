import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {BookOpen, CheckCircle, Clock, Type} from "lucide-react";
import { Font, Library, Client } from '@/api/types';

export function FontCard({ font, onManage }: { font: Font; onManage: () => void }) {
    return (
        <Card>
            <CardHeader className='select-none'>
                <div className='flex flex-row justify-between'>


                    <CardTitle className="flex items-center gap-2"><Type className='h-6 w-6'/>{font.name}</CardTitle>
                    <Badge variant='outline'>{font.file_type}</Badge>
                </div>
                <CardDescription className='pt-0.5'><Badge>{font.style}</Badge></CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-2xl" style={{fontFamily: font.name}}>
                    The quick brown fox jumps over the lazy dog
                </p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={onManage}>Manage Font</Button>
            </CardFooter>
        </Card>
    );
}

export function LibraryCard({ library, onManage }: { library: Library; onManage: () => void }) {
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
            <CardFooter>
                <Button className="w-full" onClick={onManage}>
                    Manage Library
                </Button>
            </CardFooter>
        </Card>
    );
}

export function UserCard({ user, onManage }: { user: Client; onManage: () => void }) {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };
    return (
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
            <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 text-2xl font-bold">
                        {getInitials(user.name)}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{user.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.hwid}</p>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm">
                        <CheckCircle className={`w-5 h-5 mr-2 ${user.active ? 'text-green-500' : 'text-gray-400'}`}/>
                        <span className={`font-medium ${user.active ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            {user.active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="w-5 h-5 mr-2 text-gray-400"/>
                        Last Seen: {new Date(user.lastSeen).toLocaleString()}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={onManage}>
                    Manage Client
                </Button>
            </CardFooter>
        </Card>
    );
}