/* eslint-disable react-hooks/set-state-in-effect */
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import { 
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
 } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

function BoardContent({board}) {
  // if use PointerSensor default has to associate with the touch-action = 'none' but have bugs.
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
  // Require the mouse move 10px before activating
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  // Press and hold 250ms and move 5px to activate the event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } });
  const sensors = useSensors(mouseSensor, touchSensor);
  const [orderedColumns, setOrderedColumns] = useState([]);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
  }, [board])

  const handleDragEnd = (event) => {
    // console.log(event);
    const { active, over } = event
    if(!over) return
    if(active.id !== over.id){
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id) // Old index of active
      const newIndex = orderedColumns.findIndex(c => c._id === over.id) // Old index of active
      // Use arrayMove to sort column 
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
      setOrderedColumns(dndOrderedColumns);
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width:'100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0',
        '&::-webkit-scrollbar-track': {
          m: 2,
        },
      }}> 
        <ListColumns columns = {orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent