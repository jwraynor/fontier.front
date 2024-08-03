import React, { useRef, useEffect, useState } from 'react';
import { Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchBar } from '@/components/SearchBar';
import { Font, Library, Client } from '@/api/types';

interface TopBarProps {
    onAddResource: (type: 'font' | 'library' | 'user') => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filteredFonts: Font[];
    filteredLibraries: Library[];
    filteredClients: Client[];
    handleManageResource: (type: 'font' | 'library' | 'user', item: Font | Library | Client) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
                                                  onAddResource,
                                                  searchTerm,
                                                  setSearchTerm,
                                                  filteredFonts,
                                                  filteredLibraries,
                                                  filteredClients,
                                                  handleManageResource
                                              }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const topBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (topBarRef.current) {
                setIsScrolled(window.scrollY > 10);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={topBarRef}
            className={`sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
                isScrolled ? 'shadow-md' : ''
            }`}
        >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 19L12 4L21 19H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xl font-bold">Fontier</span>
                </div>
                <div className="flex items-center space-x-4 flex-1 max-w-xl mx-4">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filteredFonts={filteredFonts}
                        filteredLibraries={filteredLibraries}
                        filteredClients={filteredClients}
                        handleManageResource={handleManageResource}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4"/> Add <ChevronDown className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => onAddResource('font')}>Font</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onAddResource('library')}>Library</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => onAddResource('user')}>User</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};