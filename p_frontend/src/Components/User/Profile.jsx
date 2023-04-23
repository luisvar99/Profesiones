import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Url} from '../Common/Url'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Profile() {

  const params = useParams();
  const [UserNombres, setUserNombres] = useState("")
  const [UserApellidos, setUserApellidos] = useState("")
  const [UserCedula, setUserCedula] = useState("")
  const [UserTelefono, setUserTelefono] = useState("")
  const [UserCorreo, setUserCorreo] = useState("")
  const [UserPassword, setUserPassword] = useState("")
  const [UserNewPassword, setUserNewPassword] = useState("")
  const [UserDireccion, setUserDireccion] = useState("")
  const [UserImage, setUserImage] = useState("")
  const [UserName, setUserName] = useState("")
  const [Message, setMessage] = useState(""); 
  const [Severity, setSeverity] = useState("success"); 
  const [SuccessOpen, setSuccessOpen] = useState(false); 

  const GetUserById = async () => {
    try {
      const result = await axios.get(Url + `getUserById/${params.id_user}`)
      console.log(result.data);
      setUserNombres(result.data.nombres)
      setUserApellidos(result.data.apellidos)
      setUserCedula(result.data.cedula)
      setUserTelefono(result.data.telefono)
      setUserCorreo(result.data.email)
      setUserPassword(result.data.password)
      setUserDireccion(result.data.direccion)
      setUserImage(result.data.image)
      setUserName(result.data.user)
    } catch (error) {
      alert(error.message)
    }
  }

  const EditUser = async (e) =>{
    e.preventDefault()
    try {
          const result = await axios.put(Url + 'EditUser',{
              id: params.id_user,
              nombres:UserNombres,
              apellidos:UserApellidos,
              cedula:UserCedula, 
              user:UserName,
              telefono:UserTelefono,
              email:UserCorreo, 
              rol: 2,
              password:UserNewPassword!=="" ? UserNewPassword: UserPassword, 
              direccion:UserDireccion, 
              image: UserImage,
              newPassword: UserNewPassword!=="" ? true : false
            })
            if(result.data.success===true){
                setMessage("Usuario editado exitosamente")
                setSeverity("success")
                setSuccessOpen(true)
                window.location.reload()
            }else{
                setMessage("Ha ocurrido un error editando al usuario")
                setSeverity("error")
                setSuccessOpen(true)
            }
    }
    catch (error) {
        setMessage("Ha ocurrido un error")
        setSeverity("error")
        setSuccessOpen(true)
    }
  }

  const ConvertImageToBase64 = async (image) =>{
    const reader = new FileReader();

    reader.readAsDataURL(image);

    reader.onload = ()=> {
        setUserImage(reader.result);
        /*console.log(reader.result);*/        
    }

}

  useEffect(() => {
    GetUserById()
  }, [])
  
  return (
    <Container maxWidth="sm">
    <Box
        sx={{  
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding:'1rem 2rem',
        borderRadius:'10px',
        backgroundColor:"white",
        width:"100%",
        border: "1px solid rgba(224, 224, 224, 1)",
        mt:3,
        mb:3
        }}>
        <Typography component="h1" variant="h5">
            Crear una Cuenta
        </Typography>
        <div style={{width:"30%", margin:"0.5rem 0"}}>
            <img src={UserImage} alt="Error al cargar la imagen" style={{width:"100%", borderRadius:"50%"}}/>
        </div>
        <Box component="form" onSubmit={(e)=>EditUser(e)} 
            sx={{ mt: 1, display:"flex", justifyContent:"space-between"}}>
            <Box>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Nombres"
                    autoFocus
                    InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"}}}
                    onChange={(e) => setUserNombres(e.target.value)}
                    value={UserNombres}
                    sx={{width:"95%", mt:0.5}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Apellidos"
                    autoFocus
                    InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                    onChange={(e) => setUserApellidos(e.target.value)}
                    value={UserApellidos}
                    sx={{width:"95%" , mt:0.5}}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Usuario"
                    disabled
                    autoFocus
                    InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                    onChange={(e) => setUserName(e.target.value)}
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
                    onChange={(e) => setUserNewPassword(e.target.value)}
                    /* value={UserPassword} */
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
                    onChange={(e) => setUserTelefono(e.target.value)}
                    value={UserTelefono}
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
                    onChange={(e) => setUserCorreo(e.target.value)}
                    value={UserCorreo}
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
                    onChange={(e) => setUserDireccion(e.target.value)}
                    value={UserDireccion}
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
                onClick={(e)=>EditUser(e)}>
                Aceptar
            </Button>
    </Box>
  </Container>
  )
}
