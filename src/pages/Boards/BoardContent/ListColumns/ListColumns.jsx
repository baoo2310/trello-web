import Box from '@mui/material/Box';
import Column from './Column/Column';
import { Button } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function ListColumns({ columns }) {
    return (
        <Box sx={{
            bgcolor: 'inherit',
            width: '100%',
            height: '100%',
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden'
        }}>  
            {columns?.map((col) => <Column key={col._id} column={col} />)}
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
    )
}

export default ListColumns