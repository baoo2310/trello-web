import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppBar from '../components/AppBar/AppBar';
import { Box, Container, Tab } from '@mui/material';
import AccountTab from './AccountTab';
import SecurityTab from './SecurityTab';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const TABS = {
  ACCOUNT: 'account',
  SECURITY: 'security'
}

function Settings() {
  const location = useLocation();
  const getDefaultTab = () => {
    if (location.pathname.includes(TABS.SECURITY)) return TABS.SECURITY;
    return TABS.ACCOUNT;
  };
  const [activeTab, setActiveTab] = useState(getDefaultTab());
  const handleChangeTab = (event, selectedTab) => { setActiveTab(selectedTab) };
  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      {/* Setting Bar */}
      <TabContext value={activeTab}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <TabList onChange={handleChangeTab}>
            <Tab 
              icon={<PersonIcon />} 
              iconPosition='start' 
              label='Account' 
              value={TABS.ACCOUNT} 
              component={Link} 
              to="/settings/account"
            />
            <Tab 
              icon={<SecurityIcon />} 
              iconPosition='start' 
              label='Security' 
              value={TABS.SECURITY} 
              component={Link} 
              to="/settings/security" 
            />
          </TabList>
        </Box>
        <Box>
          <TabPanel value={TABS.ACCOUNT}><AccountTab /></TabPanel>
          <TabPanel value={TABS.SECURITY}><SecurityTab /></TabPanel>
        </Box>
      </TabContext>

    </Container>

  )
}

export default Settings