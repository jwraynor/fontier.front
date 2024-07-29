import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Type, Bell, CircleUser } from 'lucide-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ModeToggle } from './ui/theme-toggle';
import { AnimatedSearchInput } from './search';
import NavigationMenu from './navigation';

const Layout: React.FC = () => {
    return (
        <div className="flex min-h-screen">
            <NavigationMenu />
            <div className="flex flex-col flex-1">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold">
                        <Type className="h-6 w-6"/>
                        <span className="">Font Manager</span>
                    </Link>
                    <div className="flex-1">
                        <AnimatedSearchInput className="ml-auto w-full flex-1 md:w-auto md:flex-none"/>
                    </div>
                    <ModeToggle/>
                    <Button variant="outline" size="icon" className="ml-2">
                        <Bell className="h-4 w-4"/>
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;