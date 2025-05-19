import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UserData from "./UserData";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useState } from 'react';

const UserDataList = ({dataList, removeItem, showMessage, onReorder}) => {
    const [activeId, setActiveId] = useState(null);
    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    
    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };
    
    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (active.id !== over.id) {
            const oldIndex = dataList.findIndex((item) => item.id === active.id);
            const newIndex = dataList.findIndex((item) => item.id === over.id);
            
            // Create a new array with the updated order
            const newItems = arrayMove(dataList, oldIndex, newIndex);
            
            // Call the onReorder function from props to update the state in the parent
            onReorder(newItems);
        }
        
        setActiveId(null);
    };
    
    // Find the active item if needed for the overlay
    const activeItem = activeId ? dataList.find(item => item.id === activeId) : null;
    
    return(
        <div style={{width:"350px"}}>
            {
                (dataList.length > 0) ?
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        modifiers={[restrictToVerticalAxis]}
                    >
                        <SortableContext
                            items={dataList.map(item => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <List dense>
                                {
                                    dataList.map(d => (
                                        <UserData 
                                            data={d} 
                                            deleteItem={removeItem} 
                                            key={d.id} 
                                            showMessage={showMessage}
                                            id={d.id}
                                        />
                                    ))
                                }
                            </List>
                        </SortableContext>
                        
                        <DragOverlay>
                            {activeId ? (
                                <UserData 
                                    data={activeItem} 
                                    deleteItem={removeItem} 
                                    showMessage={showMessage}
                                    isDragging={true}
                                />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                    :
                    <Card>
                        <CardContent>No data is configured. Add text using below form</CardContent>
                    </Card>
            }
        </div>
    );    
}

export default UserDataList;