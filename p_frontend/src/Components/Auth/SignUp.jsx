import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../Styles/Login.css'
import {useNavigate} from 'react-router-dom'
import React, { useContext, useState } from 'react'
import AuthContext from '../Context/AuthContext';
import axios from "axios"
import {Url} from '../Common/Url'

export default function SignUp() {
    const navigate = useNavigate();

    const {user, setUser} = useContext(AuthContext);
    const [open, setOpen] = useState(false); 
    const [Username, setUsername] = useState(""); 
    const [Password, setPassword] = useState(""); 
    const [WrongPassword, setWrongPassword] = useState(false); 
    const [WrongUsername, setWrongUsername] = useState(false); 
    const [ErrorMessage, setErrorMessage] = useState(""); 

    const UserSignUp = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post(Url+"login",{
                username: Username,
                password: Password
            })
            if(result.data.success) {
              sessionStorage.setItem("userName", result.data.username)
              //setUser({name:sessionStorage.getItem("userName", result.data.username), rol: 1})
              
              if(result.data.rol===1){
                sessionStorage.setItem("rol", 1)
                navigate("/AdminPanel")
              }else{
                navigate("/Home")
                sessionStorage.setItem("rol", 2)
              }
            }else if(result.data.wrongUsername){
                setErrorMessage("Usuario Invalido")
                setWrongUsername(true)
                setOpen(true)
              }else if(result.data.wrongPassword){
                setErrorMessage("Contrasena Invalida")
                setWrongPassword(true)
                setOpen(true)
            }else{
                setErrorMessage("Ha ocurrido un error")
                setOpen(true)
            }
            //Con esto se forza el re-render de los componentes, es este caso importa el componente
            //del navbar para que muestre el user loggeado que esta en sessionStorage
            setUser({name:sessionStorage.getItem("userName", result.data.username), rol: 1}) 

        } catch (error) {
            setErrorMessage("Ha ocurrido un error")
        }
        
  };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

  return (
    <div className="login_main_container">
    <Container maxWidth="xs">
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }} TransitionComponent="SlideTransition">
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {ErrorMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{  
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border:'#F36C0E 3px solid',
          padding:'2rem',
          borderRadius:'10px'
        }}
      >
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <Box component="form" onSubmit={UserSignUp} sx={{ mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="Username"
            autoFocus
            InputProps={{ sx: { borderRadius: 35 } }}
            error = {WrongUsername}
            onChange={(e) => setUsername(e.target.value)}
            />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{ sx: { borderRadius: 35 } }}
            error = {WrongPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, 
                borderRadius: 35,
                backgroundColor: "#F36C0E",
                padding: "8px",
                fontSize: "18px" ,
                ':hover': {
                    bgcolor: '#FF6900',
                    color: 'white',
                  },
            }}
          >
            Crear Cuenta
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/" variant="body2">
               Ya tienes una cuenta? Inicia Sesion
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </div>
  )
}
