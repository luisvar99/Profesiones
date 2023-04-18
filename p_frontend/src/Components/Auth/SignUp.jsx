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
import Modal from '@mui/material/Modal';

export default function SignUp() {
    const navigate = useNavigate();

    const [UserNames, setUserNames] = useState("")
    const [UserLastNames, setUserLastNames] = useState("")
    const [UserName, setUserName] = useState("")
    const [UserCedula, setUserCedula] = useState(0)
    const [UserTelf, setUserTelf] = useState("")
    const [UserEmail, setUserEmail] = useState("")
    const [UserPassword, setUserPassword] = useState("")
    const [UserAddress, setUserAddress] = useState("")
    const [UserImage, setUserImage] = useState("")
    const [WrongEmail, setWrongEmail] = useState(false); 
    const [WrongUsername, setWrongUsername] = useState(false); 
    const [WrongCedula, setWrongCedula] = useState(false); 
    const [WrongTelefono, setWrongTelefono] = useState(false); 
    const [ErrorMessage, setErrorMessage] = useState("");
    const {user, setUser} = useContext(AuthContext);

    const [openModal, setOpenModal] = useState(false); 
    const [open, setOpen] = useState(false); 

    const handleCloseModal = () => {
      setOpenModal(false)
      navigate("/Home")
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    const UserSignUp = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post(Url+"AddUser",{
                user: UserName,
                email: UserEmail,
                password: UserPassword,
                nombres: UserNames,
                apellidos: UserLastNames,
                image: UserImage,
                cedula: UserCedula,
                telefono: UserTelf,
                direccion: UserAddress,
                rol: 2
                
            })
            if(result.data.success) {
              sessionStorage.setItem("userName", result.data.username)
              setUser({name:sessionStorage.getItem("userName", result.data.username), rol: 2}) 
              setOpenModal(true)
            }else if(result.data.ValidUserName===false){
              setErrorMessage("El usuario ingresado esta asociado a otra cuenta")
              setWrongUsername(true)
              setOpen(true)
            }else if(result.data.ValidUserEmail===false){
              setErrorMessage("El correo ingresado esta asociado a otro usuario")
              setWrongEmail(true)
              setOpen(true)
            }else if(result.data.ValidUserCedula===false){
              setErrorMessage("La cedula ingresada esta asociado a otro usuario")
              setWrongCedula(true)
              setOpen(true)
            }
            else if(result.data.ValidUserTelefono===false){
              setErrorMessage("El telefono ingresado esta asociado a otro usuario")
              setWrongTelefono(true)
              setOpen(true)
            }else{
              setErrorMessage("Ha ocurrido un error al crear su cuenta")
              setOpen(true)
            }
        } catch (error) {
            setErrorMessage("Ha ocurrido un error")
        }
        
  };

    const ConvertImageToBase64 = async (image) =>{
      const reader = new FileReader();

      reader.readAsDataURL(image);

      reader.onload = ()=> {
          setUserImage(reader.result);
          /*console.log(reader.result);*/        
      }
    }

    const Modalstyles = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid gray',
      boxShadow: 24,
      p: 4,
      borderRadius: "2rem"
    };

  return (
      <div className="login_main_container">
        <Container maxWidth="sm">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} TransitionComponent="SlideTransition">
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {ErrorMessage}
          </Alert>
        </Snackbar>
                  <Box
                      sx={{  
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding:'1rem 2rem',
                      borderRadius:'10px',
                      backgroundColor:"white",
                      width:"100%"
                      }}>
                      <Typography component="h1" variant="h5">
                          Registro
                      </Typography>
                      <Box component="form" onSubmit={(e)=>UserSignUp(e)}
                          sx={{ mt: 1, display:"flex", justifyContent:"space-between"}}>
                          <Box>
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  label="Nombres"
                                  autoFocus
                                  InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"}}}
                                  onChange={(e) => setUserNames(e.target.value)}
                                  value={UserNames}
                                  sx={{width:"95%", mt:0.5}}
                              />
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  label="Apellidos"
                                  autoFocus
                                  InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                  onChange={(e) => setUserLastNames(e.target.value)}
                                  value={UserLastNames}
                                  sx={{width:"95%" , mt:0.5}}
                              />
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  label="Usuario"
                                  autoFocus
                                  InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                  onChange={(e) => setUserName(e.target.value)}
                                  error={WrongUsername}
                                  value={UserName}
                                  sx={{width:"95%" , mt:0.5}}
                              />
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  label="Contrasena"
                                  autoFocus
                                  InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                  onChange={(e) => setUserPassword(e.target.value)}
                                  value={UserPassword}
                                  sx={{width:"95%" , mt:0.5}}
                              />
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  autoFocus
                                  InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                  onChange={(e) => ConvertImageToBase64(e.target.files[0])}
                                  type='file'
                                  sx={{width:"95%" , mt:0.5}}
                              />
                          </Box>
                          <Box>
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  label="Cedula"
                                  autoFocus
                                  InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                  onChange={(e) => setUserCedula(e.target.value)}
                                  error={WrongCedula}
                                  value={UserCedula}
                                  sx={{width:"95%" , mt:0.5}}
                              />
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  label="Telefono"
                                  autoFocus
                                  InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                  onChange={(e) => setUserTelf(e.target.value)}
                                  error={WrongTelefono}
                                  value={UserTelf}
                                  type='number'
                                  sx={{width:"95%" , mt:0.5}}
                              />
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  label="Correo"
                                  autoFocus
                                  InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                  onChange={(e) => setUserEmail(e.target.value)}
                                  value={UserEmail}
                                  error={WrongEmail}
                                  type='email'
                                  sx={{width:"95%" , mt:0.5}}
                              />
                              <TextField
                                  margin="normal"
                                  required
                                  fullWidth
                                  multiline
                                  rows="4"
                                  label="Direccion"
                                  autoFocus
                                  InputProps={{ sx: { borderRadius: "2rem", paddingLeft:"1rem"} }}
                                  onChange={(e) => setUserAddress(e.target.value)}
                                  value={UserAddress}
                                  type='email'
                                  sx={{width:"95%" , mt:0.5}}
                              />
                          </Box>
                      </Box>
                          <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 1, mb: 1, 
                                  borderRadius: 35,
                                  backgroundColor: "#F36C0E",
                                  padding: "8px",
                                  fontSize: "18px" ,
                                  ':hover': {
                                      bgcolor: '#FF6900',
                                      color: 'white',
                                  },
                              }}
                              onClick={(e)=>UserSignUp(e)}>
                              Crear Cuenta  
                          </Button>
                          <Box sx={{width:"100%"}}>
                            <Typography sx={{ mt: 2}}>
                                <Link href="/" sx={{color:"black", textAlign:"left"}}>Ya tienes una cuenta? Inicia Sesion</Link>
                            </Typography>
                          </Box>
                  </Box>
              </Container>
          <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={Modalstyles}>
            <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2, textAlign:"center" }}>
              Su cuenta ha sido creada exitosamente
            </Typography>
              <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, 
                          borderRadius: 35,
                          backgroundColor: "#F36C0E",
                          padding: "8px",
                          fontSize: "18px",
                          ':hover': {
                              bgcolor: '#F36C0E',
                              color: 'white',
                          }
                      }}
                      onClick={handleCloseModal}>
                      Aceptar
              </Button>
          </Box>
        </Modal>
      </div>
  )
}
