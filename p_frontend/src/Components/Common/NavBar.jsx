import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import SideBar from './SideBar'
import React, { useEffect, useState } from 'react'


export default function NavBar() {

  const [Name, setName] = useState("")
  const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
      console.log("Renderizando NavBar:" );
      setName(sessionStorage.getItem("userName"))
    }, [])
    

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor: '#F36C0E'}}>
        <Toolbar>
          {sessionStorage.getItem("userName") &&
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer("left", true)}
            >
            <MenuIcon />
            </IconButton>
          }
          {
            sessionStorage.getItem("userName") &&
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Bienvenido, {user.name}
                {/* Bienvenido, {sessionStorage.getItem("userName")} */}
              </Typography>
        }
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {
        sessionStorage.getItem("userName") &&
        <SideBar state={state} seState={setState} toggleDrawer={toggleDrawer}/>
      }
    </Box>
  );
}