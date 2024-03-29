import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Url} from "./Url"


export default function TemporaryDrawer({state, seState, toggleDrawer}) {

    const [Professions, setProfessions] = useState([])

    const getProfessions = async () =>{
      const result = await axios.get(Url+'getProfesiones')
      setProfessions(result.data)
      //console.log(result.data)
    }

  useEffect(() => {
    getProfessions();
  }, [])
  

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to='/Home' style={{textDecoration:"none", color: "black"}}>
          <ListItem disablePadding >
              <ListItemButton sx={{textAlign: "center"}}>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
              <ListItemText primary="Home" />
              </ListItemButton>
          </ListItem>
        
        </Link>
        {['Mis Solicitudes'].map((text, index) => (
          <Link key={index} to={`/MisSolicitudes/${sessionStorage.getItem("userID")}`} style={{textDecoration:"none", color: "black"}}>
            <ListItem disablePadding>
              <ListItemButton sx={{textAlign: "center"}}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
          ))}      

        {['Mi Perfil'].map((text, index) => (
          <Link key={index} to={`/MyProfile/${sessionStorage.getItem("userID")}`} style={{textDecoration:"none", color: "black"}}>
            <ListItem key={index} disablePadding>
              <ListItemButton sx={{textAlign: "center"}}>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {/* <Divider /> */}
        {/*{Professions.map((p, index) => (
        <Link key={index} to='/Home' style={{textDecoration:"none", color: "black"}}>
          <ListItem disablePadding >
            <ListItemButton sx={{textAlign: "center"}}>
              <ListItemText primary={p.nombre} />
            </ListItemButton>
          </ListItem>
        </Link>
        ))} */}
      </List>


      {
        parseInt(sessionStorage.getItem("rol"))===1
        &&
        <>
        <Divider sx={{margin:0}}/>
      <List>
        {['Admin Panel'].map((text, index) => (
          <Link key={index} to='/AdminPanel' style={{textDecoration:"none", color: "black"}}>
            <ListItem disablePadding>
              <ListItemButton sx={{textAlign: "center"}}>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
        </>
      }
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}