import Box from '@mui/material/Box';
import Column from './Column/Column';
import { Button } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';


function ListColumns({ columns, createNewColumn, createNewCard }) {
    /*
    * SortableContext require items is an array ['id-1', 'id-2',...] not [{id: 'id-1'}, {id: 'id-2'},...]
    * Not match the type, it still can be drag and drop but does not have the animations
    */
    const [openNewColumnForm, setopenNewColumnForm] = useState(false);
    const toggleopenNewColumnForm = () => setopenNewColumnForm(!openNewColumnForm);

    const [newColumnTitle, setNewColumnTitle] = useState('');

    const addNewColumn = async () => {
        if(!newColumnTitle){
            toast.error(`Please enter Column title`)
        }

        const newColumnData = {
            title: newColumnTitle,
        }

        await createNewColumn(newColumnData);

        toggleopenNewColumnForm();
        setNewColumnTitle('');
    }
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
                {columns?.map((col) => <Column key={col.id} column={col} createNewCard={createNewCard} />)}
                {/* Add new column */}
                {!openNewColumnForm
                    ? <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d'
                    }}>
                        <Button
                            onClick={toggleopenNewColumnForm}
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
                    : <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        p: 1,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}>
                        <TextField
                            variant='outlined'
                            label="Enter column title..."
                            type="text"
                            size='small'
                            autoFocus
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{
                                minWidth: '120px',
                                maxWidth: '180px',
                                '& label': { color: 'white' },
                                '& input': { color: 'white' },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' },
                                }
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Button
                                onClick={addNewColumn}
                                variant='contained'
                                color='success'
                                size='small'
                                sx={{
                                    boxShadow: 'none',
                                    border: '0.5px solid',
                                    borderColor: (theme) => theme.palette.success.main,
                                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                                }}
                            >Add Column</Button>
                            <CloseIcon
                                sx={{ 
                                    color: 'white', 
                                    cursor: 'pointer',
                                    '&:hover': { color: (theme) => theme.palette.warning.light }
                                }}
                                onClick={toggleopenNewColumnForm}
                            />
                        </Box>
                    </Box>
                }

            </Box>
        </SortableContext>
    )
}

export default ListColumns