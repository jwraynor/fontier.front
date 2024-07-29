import { Plus, Users, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import useDatabase from "@/hooks/useDatabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";
import { Group } from '@/api/types';

interface GroupCardProps {
    group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Users className="mr-2 h-6 w-6"/>
                    {group.name}
                </CardTitle>
                <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="mt-4 w-full">Manage Group</Button>
            </CardContent>
        </Card>
    )
}

export function GroupsPage() {
    const { useGroups } = useDatabase();
    const { data: groups, isLoading, error } = useGroups();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="mr-2 h-8 w-8 animate-spin"/>
                <p>Loading groups...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="m-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Failed to load groups. Please try again later.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">User Groups</h1>
                    <Button>
                        <Plus className="mr-2 h-4 w-4"/> Create New Group
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {groups?.map((group) => (
                        <GroupCard key={group.id} group={group} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GroupsPage;