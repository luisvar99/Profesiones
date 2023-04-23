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
import {Link, useNavigate} from 'react-router-dom'


export default function NavBar() {

  const [Name, setName] = useState("")
  const {user, setUser} = useContext(AuthContext);

  const navigate = useNavigate();

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

  const Logout = () => {
    //console.log();
    sessionStorage.setItem("userName", null);
    sessionStorage.setItem("rol", null);
    sessionStorage.setItem("userID", null);
    navigate("/")
  }

  
  useEffect(() => {
    /* setName(sessionStorage.getItem("userName")) */
    /* console.log(sessionStorage.getItem("userName"));
    console.log(typeof sessionStorage.getItem("userName")); */
  }, [])

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
          
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Bienvenido, {sessionStorage.getItem("userName")}
              </Typography>
        
              {
                sessionStorage.getItem("userName")=== "null" || !sessionStorage.getItem("userName") ?
              <Typography variant="h6" component="div">
                <Link to="/SignUp" style={{textDecoration:"none", color:"white"}}>Registarme</Link>
              </Typography>
              :
                <Button sx={{color:"white"}} onClick={()=>Logout()}>Cerrar Sesion</Button>
              }
        </Toolbar>
      </AppBar>
      {
        sessionStorage.getItem("userName") &&
        <SideBar state={state} seState={setState} toggleDrawer={toggleDrawer}/>
      }
    </Box>
  );
}