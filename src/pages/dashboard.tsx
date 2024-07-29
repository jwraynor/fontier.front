import { Link } from 'react-router-dom';
import { Line, LineChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Type, BookOpen, UserCircle, Users, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import useDatabase from '@/hooks/useDatabase';

export function Dashboard() {
    const {
        useFonts,
        useLibraries,
        useClients,
        useGroups,
        useClientActivity,
        useLibraryDistribution
    } = useDatabase();

    const {data: fonts, isLoading: isFontsLoading} = useFonts();
    const {data: libraries, isLoading: isLibrariesLoading} = useLibraries();
    const {data: clients, isLoading: isClientsLoading} = useClients();
    const {data: groups, isLoading: isGroupsLoading} = useGroups();
    const {data: clientActivity, isLoading: isClientActivityLoading} = useClientActivity();
    const {data: libraryDistribution, isLoading: isLibraryDistributionLoading} = useLibraryDistribution();

    if (isFontsLoading || isLibrariesLoading || isClientsLoading || isGroupsLoading ||
        isClientActivityLoading || isLibraryDistributionLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin"/>
        </div>;
    }

    const chartConfig = {
        clientActivity: {
            label: "Client Activity",
            color: "hsl(var(--chart-2))",
        },
        fontLibrary: {
            label: "Font Library",
            color: "hsl(var(--chart-3))",
        },
    };


    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 p-1">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Link to="/fonts">
                        <Card className="hover:bg-muted/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Total Fonts</CardTitle>
                                <Type className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{fonts?.length || 0}</div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link to="/libraries">
                        <Card className="hover:bg-muted/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Font Libraries</CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{libraries?.length || 0}</div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link to="/users">
                        <Card className="hover:bg-muted/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                                <UserCircle className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{clients?.filter(c => c.active).length || 0}</div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link to="/groups">
                        <Card className="hover:bg-muted/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">User Groups</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{groups?.length || 0}</div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Activity (Last 7 Days)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={clientActivity}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="date"/>
                                        <YAxis/>
                                        <Tooltip content={<ChartTooltipContent/>}/>
                                        <Line type="monotone" dataKey="activeClients"
                                              stroke="var(--color-clientActivity)"/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Font Libraries Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={libraryDistribution}
                                            dataKey="fontCount"
                                            nameKey="libraryId"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="var(--color-fontLibrary)"
                                            label
                                        />
                                        <Tooltip content={<ChartTooltipContent/>}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;