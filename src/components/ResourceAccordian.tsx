import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {FontCard, LibraryCard, UserCard} from '@/components/Cards';
import {PaginationComponent} from '@/components/Pagination';
import {Font, Library, Client} from '@/api/types';

interface ResourceAccordionProps {
    fonts: Font[];
    libraries: Library[];
    clients: Client[];
    onManageResource: (type: 'font' | 'library' | 'user', item: Font | Library | Client) => void;
    currentPages: { fonts: number; libraries: number; users: number };
    setCurrentPages: React.Dispatch<React.SetStateAction<{ fonts: number; libraries: number; users: number }>>;
    totalItems: { fonts: number; libraries: number; users: number };
    itemsPerPage: number;
    isLoaded: boolean;
}

export const ResourceAccordion: React.FC<ResourceAccordionProps> = ({
                                                                        fonts,
                                                                        libraries,
                                                                        clients,
                                                                        onManageResource,
                                                                        currentPages,
                                                                        setCurrentPages,
                                                                        totalItems,
                                                                        itemsPerPage,
                                                                        isLoaded,
                                                                    }) => {

    console.log(clients);
    if (!isLoaded) return null;
    const renderPagination = (totalItems: number, section: 'fonts' | 'libraries' | 'users') => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (totalPages <= 1) return null;
        return (
            <PaginationComponent
                currentPage={currentPages[section]}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPages(prev => ({...prev, [section]: page}))}
            />
        );
    };


    const renderCards = (items: any[], CardComponent: React.ComponentType<any>, type: 'font' | 'library' | 'user') => (
        console.log(items),
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${type}-${currentPages[type as keyof typeof currentPages]}`}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.9}}
                            transition={{duration: 0.2}}
                        >
                            <CardComponent
                                {...{[type]: item}}
                                onManage={() => onManageResource(type, item)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
    );

    return (
        <Accordion type="multiple" defaultValue={['fonts', 'libraries', 'users']} className="w-full">
            <AnimatePresence>
                {clients.length > 0 && (
                    <motion.div
                        key="users-section"
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3}}
                    >
                        <AccordionItem value="users">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-semibold">Users</h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                {renderCards(clients, UserCard, 'user')}
                                {renderPagination(totalItems.users, 'users')}
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
                )}

                {fonts.length > 0 && (
                    <motion.div
                        key="fonts-section"
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3}}
                    >
                        <AccordionItem value="fonts">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-semibold">Fonts</h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                {renderCards(fonts, FontCard, 'font')}
                                {renderPagination(totalItems.fonts, 'fonts')}
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
                )}

                {libraries.length > 0 && (
                    <motion.div
                        key="libraries-section"
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3}}
                    >
                        <AccordionItem value="libraries">
                            <AccordionTrigger>
                                <h2 className="text-2xl font-semibold">Libraries</h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                {renderCards(libraries, LibraryCard, 'library')}
                                {renderPagination(totalItems.libraries, 'libraries')}
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
                )}


            </AnimatePresence>
        </Accordion>
    );
};