import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';


export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
       
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              
              </ListItemIcon>
              <ListItemText primary= "Create Group" />
            </ListItemButton>
          </ListItem>
       
      </List>
      <Divider />
      <List>
      
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                
              </ListItemIcon>
              <ListItemText primary="Join Group" />
            </ListItemButton>
          </ListItem>
        
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><MenuIcon/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
