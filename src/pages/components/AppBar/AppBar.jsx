import Box from '@mui/material/Box';
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';
import TrelloIcon from '~/assets/trello-brands-solid-full.svg?react'
import { InputAdornment, Typography } from '@mui/material';
import Workspaces from './Menus/Workspaces';
import Recents from './Menus/Recents';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profiles from './Menus/Profiles';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ModeSelect from '../ModeSelect/ModeSelect';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material';


function AppBar() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      paddingX: 2,
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto'
    }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Link to="/boards">
          <Tooltip title="Board List">
            <AppsIcon sx={{ color: 'primary.main', verticalAlign: 'middle' }} />
          </Tooltip>
        </Link>
        <Link to="/">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }} />
            <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recents />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon={<LibraryAddIcon />}>Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="search-field"
          label="Search..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          size="small"
          color='secondary'
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

        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: 'primary.main', cursor: 'pointer' }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar