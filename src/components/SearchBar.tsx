import React, { useState, useRef, useEffect } from 'react';
import { X, FileText, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filteredFonts: any[];
    filteredLibraries: any[];
    filteredClients: any[];
    handleManageResource: (type: 'font' | 'library' | 'user', item: any) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
                                                        searchTerm,
                                                        setSearchTerm,
                                                        filteredFonts,
                                                        filteredLibraries,
                                                        filteredClients,
                                                        handleManageResource
                                                    }) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const commandRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex-1" ref={commandRef}>
            <div className="absolute inset-0">
                <Command className="rounded-lg border shadow-sm w-full" shouldFilter={false}>
                    <CommandInput
                        placeholder="Search all resources..."
                        className="h-9 w-full"
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                        onFocus={() => setIsSearchFocused(true)}
                    />
                    <AnimatePresence>
                        {isSearchFocused && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 right-0 top-full mt-1 bg-background border rounded-lg shadow-lg z-50"
                            >
                                <CommandList className="max-h-[300px] overflow-y-auto">
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    {filteredFonts.length > 0 && (
                                        <CommandGroup heading="Fonts">
                                            {filteredFonts.slice(0, 3).map((font) => (
                                                <CommandItem
                                                    key={font.id}
                                                    onSelect={() => handleManageResource('font', font)}
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    <FileText className="mr-2 h-4 w-4"/>
                                                    {font.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    )}
                                    {filteredLibraries.length > 0 && (
                                        <CommandGroup heading="Libraries">
                                            {filteredLibraries.slice(0, 3).map((library) => (
                                                <CommandItem
                                                    key={library.id}
                                                    onSelect={() => handleManageResource('library', library)}
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    <BookOpen className="mr-2 h-4 w-4"/>
                                                    {library.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    )}
                                    {filteredClients.length > 0 && (
                                        <CommandGroup heading="Users">
                                            {filteredClients.slice(0, 3).map((client) => (
                                                <CommandItem
                                                    key={client.id}
                                                    onSelect={() => handleManageResource('user', client)}
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    <User className="mr-2 h-4 w-4"/>
                                                    {client.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    )}
                                </CommandList>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Command>
            </div>
            <div className="h-10" aria-hidden="true"></div>
            {searchTerm && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setSearchTerm('')}
                >
                    <X className="h-4 w-4"/>
                </Button>
            )}
        </div>
    );
};