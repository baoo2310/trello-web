import Box from '@mui/material/Box';
import Column from './Column/Column';
import { Button } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';


function ListColumns({ columns }) {
    /*
    * SortableContext require items is an array ['id-1', 'id-2',...] not [{id: 'id-1'}, {id: 'id-2'},...]
    * Not match the type, it still can be drag and drop but does not have the animations
    */
    return (
        <SortableContext items={columns?.map((c) => c.id)} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden'
            }}>  
                {columns?.map((col) => <Column key={col.id} column={col} />)}
                {/* Add new column */}
                <Box sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
                    mx: 2,
                    borderRadius: '6px',
                    height: 'fit-content',
                    bgcolor: '#ffffff3d'
                }}>
                    <Button 
                        startIcon={<NoteAddIcon />}
                        sx={{ 
                            color: 'white',
                            width: '100%',
                            justifyContent: 'flex-start',
                            pl: 2.5,
                            py: 1
                        }}
                    >
                        Add new Column
                    </Button>
                </Box>
            </Box>
        </SortableContext>
    )
}

export default ListColumns