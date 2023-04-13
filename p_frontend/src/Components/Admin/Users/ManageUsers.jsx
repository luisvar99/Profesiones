import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Url from '../../Common/Url';
import '../../Styles/ManageProfessions.css'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ManageUsers() {

    const [Users, setUsers] = useState([])
    const [UserId, setUserId] = useState(0)
    const [UserNames, setUserNames] = useState("")
    const [UserLastNames, setUserLastNames] = useState("")
    const [UserName, setUserName] = useState("")
    const [UserCedula, setUserCedula] = useState(0)
    const [UserTelf, setUserTelf] = useState("")
    const [UserEmail, setUserEmail] = useState("")
    const [UserPassword, setUserPassword] = useState("")
    const [UserAddress, setUserAddress] = useState("")
    const [UserRol, setUserRol] = useState("")
    const [SuccessOpen, setSuccessOpen] = useState(false); 
    const [Message, setMessage] = useState(""); 
    const [Severity, setSeverity] = useState("success"); 
    const [ShowAddingForm, setShowAddingForm] = useState(false); 
    const [ShowEditForm, setShowEditForm] = useState(false); 
    const [ModalForm, setModalForm] = useState(false); 
    const [SearchUser, setSearchUser] = useState(""); 

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (id) => {
        setUserId(id)
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);
    const handleCloseModalForm = () => setModalForm(false);

    const GetUsers = async () =>{
        const result = await axios.get(Url+'getUsers')
        setUsers(result.data)
        //console.log(result.data)
    }

    const SearchUserByInfo = async (e,SearchUser) =>{
        e.preventDefault()
        const result = await axios.get(Url+`getUserByInfo/${SearchUser}`)
        setUsers(result.data)
        //console.log(result.data)
    }

    const AddOrEditUser = async (e,user_id) =>{
        console.log("AddOrEditUser");
        e.preventDefault()
        try {
            if(ShowAddingForm){
                const result = await axios.post(Url+'AddUser',{
                    nombres: UserNames,
                    apellidos: UserLastNames,
                    cedula: UserCedula,
                    telefono: UserTelf,
                    email:UserEmail,
                    rol:UserRol,
                    user:UserName,
                    password: UserPassword,
                    direccion: UserAddress
                })
                if(result.data.success===true){
                    setMessage("Usuario agregado exitosamente")
                    setSeverity("success")
                    setSuccessOpen(true)
                    //setProfessions([...Professions,{nombre:ProfessionName}])
                    window.location.reload()
                }else{
                    setMessage("Ha ocurrido un error agregando al Usuario")
                    setSeverity("error")
                    setSuccessOpen(true)
                }
            }else if(ShowEditForm){
                const result = await axios.put(Url + 'EditUser',{
                    id: UserId,
                    nombres:UserNames,
                    apellidos:UserLastNames,
                    user:UserName,
                    cedula:UserCedula, 
                    telefono:UserTelf,
                    email:UserEmail, 
                    password:UserPassword, 
                    direccion:UserAddress, 
                    rol:UserRol
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
        }
        catch (error) {
            setMessage("Ha ocurrido un error")
            setSeverity("error")
            setSuccessOpen(true)
        }
      }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    setSuccessOpen(false);
    };

    const HandleEditButton = async (user_id) => {
        setShowEditForm(true) 
        setShowAddingForm(false)
        setUserId(user_id)
        setModalForm(true)
        const result = await axios.get(Url + `getUserById/${user_id}`)
        console.log(result.data);
        setUserNames(result.data[0].nombres)
        setUserLastNames(result.data[0].apellidos)
        setUserName(result.data[0].user)
        setUserCedula(result.data[0].cedula)
        setUserTelf(result.data[0].telefono)
        setUserEmail(result.data[0].email)
        setUserPassword(result.data[0].password)
        setUserAddress(result.data[0].direccion)
        setUserRol(result.data[0].rol)
    }

    const DeleteUser = async (user_id) => {
        try {
            const result = await axios.delete(Url + `DeleteUser/${user_id}`)
            if(result.data.success===true){
                setUsers(Users.filter(p=>p.id!==user_id))
                setMessage("Usuario eliminado exitosamente")
                setSeverity("success")
                setSuccessOpen(true)
                setOpenModal(false)
            }else{
                setMessage("Ha ocurrido un error eliminando al usuario")
                setSeverity("error")
                setSuccessOpen(true)
                setOpenModal(false)
            }
        } catch (error) {
            setMessage("Ha ocurrido un error eliminando al usuario")
            setSeverity("error")
            setSuccessOpen(true)
            setOpenModal(false)
        }

    }
  
      
const Modalstyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
    useEffect(() => {
      GetUsers();
    }, [])


  return (
    <div className="manageProfessionsMainContainer">
        <Box component="form" onSubmit={(e)=>SearchUser(e, UserId)} sx={{ mt: 1, display:"flex", alignItems:"center"}}>
            <TextField
                margin="normal"
                required
                label="Cedula"
                autoFocus
                InputProps={{ sx: { borderRadius: 35, paddingLeft:"0.5rem"} }}
                onChange={(e) => setSearchUser(e.target.value)}
                sx={{marginLeft:"2rem"}}
                type='number'
                />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2, 
                    borderRadius: 35,
                    backgroundColor: "#F36C0E",
                    padding: "14.5px 2rem",
                    fontSize: "14px" ,
                    ':hover': {
                        bgcolor: '#F36C0E',
                        color: 'white',
                    },
                    display:"inline"
                }}
                onClick={(e)=>SearchUserByInfo(e,SearchUser)}>
                Aceptar
            </Button>   
        </Box>
        <div className="manageProfessionsContainerOne">
        <div style={{height:"3rem"}} onClick={()=> {setModalForm(true); setShowAddingForm(true); setShowEditForm(false); setUserNames("")}}>
                <AddCircleIcon 
                sx={{fontSize:'3rem',  
                    color:"#F36C0E", 
                    '&:hover': {
                        cursor: 'pointer',
                    }
                    }}
                >
                </AddCircleIcon>
            </div>
            <TableContainer component={Paper} sx={{ width: "95%"}}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell align='center' sx={{fontSize:"1rem"}}>Nombres</TableCell>
                    <TableCell align='center' sx={{fontSize:"1rem"}}>Apellidos</TableCell>
                    <TableCell align='center' sx={{fontSize:"1rem"}}>Usuario</TableCell>
                    <TableCell align='center' sx={{fontSize:"1rem"}}>Cedula</TableCell>
                    <TableCell align='center' sx={{fontSize:"1rem"}}>Telefono</TableCell>
                    <TableCell align='center' sx={{fontSize:"1rem"}}>Correo</TableCell>
                    <TableCell align='center' sx={{fontSize:"1rem"}}>Direccion</TableCell>
                    <TableCell align='center'></TableCell>
                    <TableCell align='center'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Users.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell sx={{padding:"14px"}} align='center'>{row.nombres}</TableCell>
                        <TableCell sx={{padding:"14px"}} align='center'>{row.apellidos}</TableCell>
                        <TableCell sx={{padding:"14px"}} align='center'>{row.user}</TableCell>
                        <TableCell sx={{padding:"14px"}} align='center'>{row.cedula}</TableCell>
                        <TableCell sx={{padding:"14px"}} align='center'>{row.telefono}</TableCell>
                        <TableCell sx={{padding:"14px"}} align='center'>{row.email}</TableCell>
                        <TableCell sx={{padding:"14px"}} align='center'>{row.direccion}</TableCell>
                        <TableCell sx={{padding:"14px"}} align='center'>
                            <div onClick={()=>HandleEditButton(row.id)}>
                                <ModeEditIcon 
                                    sx={{
                                        '&:hover': {
                                            cursor: 'pointer',
                                        }
                                    }}>
                                </ModeEditIcon>
                            </div>
                        </TableCell>
                        <TableCell align='center'>
                            <div onClick={()=>handleOpenModal(row.id)}>
                                <DeleteIcon 
                                    sx={{
                                        '&:hover': {
                                            cursor: 'pointer',
                                        }
                                        }}>
                                </DeleteIcon>
                            </div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            
        </div>

        <Snackbar open={SuccessOpen} autoHideDuration={6000} onClose={handleClose} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} TransitionComponent="SlideTransition">
            <Alert onClose={handleClose} severity={Severity} sx={{ width: '100%' }}>
                {Message}
            </Alert>
        </Snackbar>
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={Modalstyles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmación
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Está seguro que desea eliminar el registro?
          </Typography>
          <div style={{display: 'flex', justifyContent:"space-between"}}>
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, 
                        borderRadius: 35,
                        backgroundColor: "green",
                        padding: "8px",
                        fontSize: "18px" ,
                        ':hover': {
                            bgcolor: 'green',
                            color: 'white',
                        }
                    }}
                    onClick={()=>DeleteUser(UserId)}>
                    Aceptar
            </Button>
            <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, 
                        borderRadius: 35,
                        backgroundColor: "red",
                        padding: "8px",
                        fontSize: "18px",
                        ':hover': {
                            bgcolor: 'red',
                            color: 'white',
                        }
                    }}
                    onClick={handleCloseModal}>
                    Cancelar
            </Button>
          </div>
        </Box>
      </Modal>


      <Modal
            open={ModalForm}
            onClose={handleCloseModalForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{  
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding:'2rem',
                    borderRadius:'10px',
                    backgroundColor:"white",
                    width:"100%"
                    }}>
                    {ShowAddingForm && <Typography component="h1" variant="h5">
                        Crear Usuario
                    </Typography>
                    }
                    {ShowEditForm && <Typography component="h1" variant="h5">
                        Editar Usuario
                    </Typography>
                    }
                    <Box component="form" onSubmit={(e)=>AddOrEditUser(e, UserId)} 
                        sx={{ mt: 1, display:"flex", justifyContent:"space-between"}}>
                        <Box>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Nombres"
                                autoFocus
                                InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                onChange={(e) => setUserNames(e.target.value)}
                                value={UserNames}
                                sx={{width:"95%"}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label={ShowAddingForm && "Apellidos"}
                                autoFocus
                                InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                onChange={(e) => setUserLastNames(e.target.value)}
                                value={UserLastNames}
                                sx={{width:"95%"}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Usuario"
                                disabled={ShowEditForm}
                                autoFocus
                                InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                onChange={(e) => setUserName(e.target.value)}
                                value={UserName}
                                sx={{width:"95%"}}
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
                                sx={{width:"95%"}}
                            />
                            <FormControl fullWidth sx={{maxWidth:"95%"}}>
                                <InputLabel 
                                    id="demo-simple-select-label"
                                    sx={{width:"95%", borderRadius: 35, mt:"16px", mb:"8px"}}>'
                                    Rol
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={UserRol}
                                label="Rol"
                                onChange={(e) => setUserRol(e.target.value)}
                                sx={{borderRadius: 35, mt:"16px", mb:"8px",
                                    }}
                                >
                                <MenuItem value={1}>Administrador</MenuItem>
                                <MenuItem value={2}>Usuario Regular</MenuItem>
                                </Select>
                            </FormControl>
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
                                sx={{width:"95%"}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Telefono"
                                autoFocus
                                InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                onChange={(e) => setUserTelf(e.target.value)}
                                value={UserTelf}
                                type='number'
                                sx={{width:"95%"}}
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
                                type='email'
                                sx={{width:"95%"}}
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
                                sx={{width:"95%"}}
                            />
                        </Box>
                    </Box>
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
                            onClick={(e)=>AddOrEditUser(e, UserId)}>
                            {ShowAddingForm && "Aceptar"}  
                            {ShowEditForm && "Guardar Cambios"}  
                        </Button>
                </Box>
            </Container>
      </Modal>

    </div>
  )
}