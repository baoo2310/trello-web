import React, { useState } from 'react';
import { Toolbar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Grid, Card, CardContent, CardActions, Link, Modal, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import randomColor from 'randomcolor';
import AppBar from '../components/AppBar/AppBar';

// Example boards data
const boards = [
  { id: 1, title: 'Marketing Plan', description: '...', color: randomColor({ luminosity: 'bright' }) },
  { id: 2, title: 'Development', description: '...', color: randomColor({ luminosity: 'bright' }) },
  { id: 3, title: 'Personal', description: '...', color: randomColor({ luminosity: 'bright' }) },
  { id: 4, title: 'Design', description: '...', color: randomColor({ luminosity: 'bright' }) },
  { id: 5, title: 'Design', description: '...', color: randomColor({ luminosity: 'bright' }) },
  { id: 6, title: 'Design', description: '...', color: randomColor({ luminosity: 'bright' }) }
];

function Boards() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', privacy: 'private' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setForm({ title: '', privacy: 'private' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    // Handle create logic here (e.g., API call)
    handleClose();
  };

  return (
    <>
      <AppBar />
      <Box sx={{ display: 'flex', width: '100vw', minHeight: '100vh'}}>
        {/* List Item SideBar */}
        <Box sx={{ overflow: 'auto', height: '100%'}}>
        <List sx={{  }}>
            <Link to="/boards" underline='none' sx={{ cursor: 'pointer' }}>
              <ListItem button="true" sx={{ gap: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <DashboardIcon sx={{ color:'primary.main', mr: 1 }}  />
                  </ListItemIcon>
                <ListItemText primary="Boards" sx={{ color:'text.secondary' }} />
              </ListItem>
            </Link>
            
            <Link to="/templates" underline='none' sx={{ cursor: 'pointer' }}>
              <ListItem button="true">
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <ViewModuleIcon sx={{ color:'primary.main', mr: 1 }} />
                  </ListItemIcon>
                <ListItemText primary="Templates" sx={{ color:'text.secondary' }} />
              </ListItem>
            </Link>

            <Link to="/boards" underline='none' sx={{ cursor: 'pointer' }}>
              <ListItem button="true">
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <HomeIcon sx={{ color:'primary.main', mr: 1 }} />
                  </ListItemIcon>
                <ListItemText primary="Home" sx={{ color:'text.secondary' }} />
              </ListItem>
            </Link>

            <Link to="/boards" underline='none' sx={{ cursor: 'pointer' }}>
              <ListItem button="true" onClick={handleOpen}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <AddBoxIcon sx={{ color:'primary.main', mr: 1 }} />
                  </ListItemIcon>
                <ListItemText primary="Create a new board" sx={{ color:'text.secondary' }} />
              </ListItem>
            </Link>
        </List>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minHeight: 'calc(100vh - 64px)',
            transition: 'background 0.3s',
            bgcolor: 'primary.light',
            display: 'block',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 1400, mx: 'auto' }}>
            <Grid container spacing={3} sx={{
              borderRadius: 2,
              // bgcolor: 'background.paper',
              justifyContent: 'center',
              p: 3
            }}>
              {boards.map((board) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={board.id}>
                  <Card sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 360, minWidth: 360, mx: 'auto' }}>
                    <Box sx={{
                      height: 50,
                      bgcolor: board.color,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8
                    }} />
                    <CardContent sx={{
                      bgcolor: 'background.paper'
                    }}>
                      <Typography gutterBottom variant="h6" component="div" color='primary.dark'>
                        {board.title}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {board.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ bgcolor: 'background.paper', display: 'flex', justifyContent: 'flex-end', minHeight: 32, py: 0.5, px: 1 }}>
                      <Button
                        variant="text"
                        endIcon={<ArrowForwardIosIcon />}
                        sx={{ textTransform: 'none', border: 'none', pl: 0, fontSize: '0.85rem', py: 0, minWidth: 0 }}
                      >
                        Go to Board
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          minWidth: 340,
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h6" mb={2}>Create New Board</Typography>
          <TextField
            label="Board Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            autoFocus
            sx={{
              '& .MuiInputBase-input': { color: 'primary.main' },
              '& label': { color: 'primary.main' },
              '& label.Mui-focused': { color: 'primary.main' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'primary.main' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
              }
            }}
          />
          <FormLabel component="legend" sx={{ mt: 2 }}>Privacy</FormLabel>
          <RadioGroup
            row
            name="privacy"
            value={form.privacy}
            onChange={handleChange}
          >
            <FormControlLabel value="private" control={<Radio />} label="Private" />
            <FormControlLabel value="public" control={<Radio />} label="Public" />
          </RadioGroup>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleCreate} disabled={!form.title}>Create</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Boards;