import { Button, Chip, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import DashBoardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const MENU_STYLES = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
        backgroundColor:'primary',
        width:'100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        paddingX: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        borderTop: '1px solid',
        borderColor: (theme) => theme.palette.mode === 'dark' ? '#2c2c2c' : '#e0e0e0'
    }}>
        <Box sx={{ display:'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            sx={MENU_STYLES}
            icon={<DashBoardIcon />} 
            label="Trello App" 
            clickable
          />
          <Chip 
            sx={MENU_STYLES}
            icon={<VpnLockIcon />} 
            label="Public/Private Workspace" 
            clickable
          />
          <Chip 
            sx={MENU_STYLES}
            icon={<AddToDriveIcon />} 
            label="Add to Google Drive" 
            clickable
          />
          <Chip 
            sx={MENU_STYLES}
            icon={<BoltIcon />} 
            label="Automation" 
            clickable
          />
          <Chip 
            sx={MENU_STYLES}
            icon={<FilterListIcon />} 
            label="Filters" 
            clickable
          />
        </Box>
        <Box sx={{ display:'flex', alignItems: 'center', gap: 2 }}>
          <Button variant='outlined' startIcon={<PersonAddIcon/>} sx={{}}>Invite</Button>
          <AvatarGroup 
            max={7} 
            total={8}
            sx={{
              '&. MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16,
              }
            }}  
          >
            <Tooltip title="username">
              <Avatar alt="User Name" src="/static/images/avatar/usern1.jpg" />
            </Tooltip>
            <Tooltip title="username">
              <Avatar alt="User Name" src="/static/images/avatar/usern1.jpg" />
            </Tooltip>
            <Tooltip title="username">
              <Avatar alt="User Name" src="/static/images/avatar/usern1.jpg" />
            </Tooltip>
          </AvatarGroup>
        </Box>
    </Box>
  )
}

export default BoardBar