import { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Library, Font, Group } from '@/api/types';

type DraggableItem = Library | Font | Group;

interface DragDropManagementProps<T extends DraggableItem> {
    availableItems: T[];
    assignedItems: T[];
    onAssign: (item: T) => void;
    onUnassign: (item: T) => void;
    itemType: string;
}

function DragDropManagement<T extends DraggableItem>({
                                                         availableItems,
                                                         assignedItems,
                                                         onAssign,
                                                         onUnassign,
                                                         itemType
                                                     }: DragDropManagementProps<T>) {
    const [filter, setFilter] = useState('');

    // Helper function to generate a unique string ID for each item
    const getItemId = (item: T) => `${itemType.toLowerCase()}-${item.id}`;

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        const sourceList = source.droppableId === 'available' ? availableItems : assignedItems;
        const destList = destination.droppableId === 'available' ? availableItems : assignedItems;

        const [reorderedItem] = sourceList.splice(source.index, 1);
        destList.splice(destination.index, 0, reorderedItem);

        if (source.droppableId !== destination.droppableId) {
            if (destination.droppableId === 'assigned') {
                onAssign(reorderedItem);
            } else {
                onUnassign(reorderedItem);
            }
        }
    };

    const filteredAvailableItems = availableItems.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    const renderItem = (item: T, _index: number, isDragging: boolean) => (
        <motion.div
            className={`bg-white dark:bg-gray-600 p-2 mb-2 rounded flex justify-between items-center ${isDragging ? 'opacity-50' : ''}`}
            whileHover={{ scale: 1.02 }}
        >
            <span>{item.name}</span>
            <Button size="sm" variant="ghost" onClick={() => isDragging ? onUnassign(item) : onAssign(item)}>
                {isDragging ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
        </motion.div>
    );

    return (
        <div className="flex flex-col space-y-4">
            <Input
                type="text"
                placeholder={`Filter ${itemType}s...`}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mb-4"
            />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-2 gap-4">
                    <Droppable droppableId="available">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-lg ${snapshot.isDraggingOver ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                            >
                                <h3 className="text-lg font-semibold mb-2">Available {itemType}s</h3>
                                {filteredAvailableItems.map((item, index) => (
                                    <Draggable key={getItemId(item)} draggableId={getItemId(item)} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {renderItem(item, index, false)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="assigned">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-lg ${snapshot.isDraggingOver ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                            >
                                <h3 className="text-lg font-semibold mb-2">Assigned {itemType}s</h3>
                                {assignedItems.map((item, index) => (
                                    <Draggable key={getItemId(item)} draggableId={getItemId(item)} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {renderItem(item, index, true)}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
}

export default DragDropManagement;