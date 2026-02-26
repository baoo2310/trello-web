import React from 'react';
import { Toolbar, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import randomColor from 'randomcolor';
import { Typography } from '@mui/material';
import AppBar from '../components/AppBar/AppBar';

// Example boards data
const boards = [
  { id: 1, title: 'Marketing Plan', description: 'This impressive paella is a perfect party dish and a fun meal to cook together.' },
  { id: 2, title: 'Development', description: 'This impressive paella is a perfect party dish and a fun meal to cook together.' },
  { id: 3, title: 'Personal', description: 'This impressive paella is a perfect party dish and a fun meal to cook together.' },
  { id: 4, title: 'Design', description: 'This impressive paella is a perfect party dish and a fun meal to cook together.' }
];

function Boards() {
  return (
    <>
      <AppBar />
      <Box sx={{ display: 'flex', width: '100vw', minHeight: '100vh', bgcolor: (theme) => theme.palette.mode === 'dark' ? '#23272f' : '#f4f5f7' }}>
        <Box sx={{ overflow: 'auto', height: '100%', bgcolor: (theme) => theme.palette.mode === 'dark' ? '#23272f' : '#f4f5f7' }}>
        <List sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? '#23272f' : '#f4f5f7' }}>
            <ListItem button>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Boards" />
            </ListItem>
            <ListItem button>
            <ListItemIcon><ViewModuleIcon /></ListItemIcon>
            <ListItemText primary="Templates" />
            </ListItem>
            <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText primary="Create a new board" />
            </ListItem>
        </List>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            // ml: `${drawerWidth}px`,
            mt: '6px',
            minHeight: 'calc(100vh - 64px)',
            transition: 'background 0.3s',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#23272f' : '#f4f5f7'
          }}
        >
          <Grid container spacing={3} sx={{
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#23272f' : '#f4f5f7'
          }}>
            {boards.map((board) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={board.id}>
                <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                  <Box sx={{
                    height: 50,
                    bgcolor: randomColor({ luminosity: 'light' }),
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                  }} />
                  <CardContent sx={{
                    bgcolor: 'white'
                  }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {board.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {board.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ bgcolor: 'white' }}>
                    <Button
                      variant="text"
                      endIcon={<ArrowForwardIosIcon />}
                      sx={{ textTransform: 'none', border: 'none', pl: 0 }}
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
    </>
  );
}

export default Boards;