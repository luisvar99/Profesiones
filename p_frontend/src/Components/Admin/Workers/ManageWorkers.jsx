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

export default function ManageWorkers() {

    const [Professions, setProfessions] = useState([])
    const [Workers, setWorkers] = useState([])
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
    const [WorkerDescription, setWorkerDescription] = useState("")
    const [WorkerZones, setWorkerZones] = useState("")
    const [WorkerProfession, setWorkerProfession] = useState(0)
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

    const EditWorker = async () => {

    }

    const GetUsers = async () =>{
        const result = await axios.get(Url+'getWorkers')
        setWorkers(result.data)
        //console.log(result.data)
    }

    const SearchWorkerByInfo = async (e,SearchUser) =>{
        e.preventDefault()
        const result = await axios.get(Url+`getUserByInfo/${SearchUser}`)
        setWorkers(result.data)
        //console.log(result.data)
    }

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

    useEffect(() => {
        GetUsers()
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
            onClick={(e)=>SearchWorkerByInfo(e,SearchUser)}>
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
                <TableCell align='center' sx={{fontSize:"1rem"}}>Nombre</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Cedula</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Telefono</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Profesion</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Zonas</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Descripcion</TableCell>
                <TableCell align='center'></TableCell>
                <TableCell align='center'></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Workers.map((row, index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell sx={{padding:"14px"}} align='center'>{row.nombre_completo}</TableCell>
                    <TableCell sx={{padding:"14px"}} align='center'>{row.cedula}</TableCell>
                    <TableCell sx={{padding:"14px"}} align='center'>{row.telefono}</TableCell>
                    <TableCell sx={{padding:"14px"}} align='center'>{row.profesion}</TableCell>
                    <TableCell sx={{padding:"14px"}} align='center'>{row.zonas}</TableCell>
                    <TableCell sx={{padding:"14px"}} align='center'>{row.descripcion}</TableCell>
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
                    padding:'1rem 2rem',
                    borderRadius:'10px',
                    backgroundColor:"white",
                    width:"100%"
                    }}>
                    <Typography component="h1" variant="h5">
                        Editar Usuario
                    </Typography>
                    
                    <Box component="form" onSubmit={(e)=>EditWorker(e, UserId)} 
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
                                disabled={ShowEditForm}
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
                                onChange={(e) => setUserPassword(e.target.value)}
                                value={UserPassword}
                                sx={{width:"95%" , mt:0.5}}
                            />
                            <FormControl fullWidth sx={{maxWidth:"95%"}}>
                                <InputLabel 
                                    id="demo-simple-select-label"
                                    sx={{width:"95%", borderRadius: 35, mt:0.5, mb:"8px"}}>'
                                    Rol
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={UserRol}
                                label="Rol"
                                onChange={(e) => setUserRol(e.target.value)}
                                sx={{borderRadius: 35 , mt:0.5, mb:"8px",
                                    }}
                                >
                                <MenuItem value={1}>Administrador</MenuItem>
                                <MenuItem value={2}>Usuario Regular</MenuItem>
                                <MenuItem value={3}>Trabajador</MenuItem>
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
                                value={UserTelf}
                                type='number'
                                sx={{width:"95%" , mt:0.5}}
                            />
                            {UserRol===3 &&
                            <React.Fragment>

                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Zonas de trabajo"
                                autoFocus
                                InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                onChange={(e) => setWorkerZones(e.target.value)}
                                value={WorkerZones}
                                sx={{width:"95%" , mt:0.5}}
                                />
                            <FormControl fullWidth sx={{maxWidth:"95%" , mt:0.5}}>
                                <InputLabel 
                                    id="demo-simple-select-label"
                                    sx={{width:"95%", borderRadius: 35, mt:0.5}}>'
                                    Categoria
                                </InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={WorkerProfession}
                                label="Profesion"
                                onChange={(e) => setWorkerProfession(e.target.value)}
                                sx={{borderRadius: 35 , mt:0.5, mb:"6px",
                                    }}
                                >{
                                    Professions.map((p,index)=>(
                                        <MenuItem key={index} value={p.id}>{p.nombre}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                                
                            </React.Fragment>
                            }
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
                            onClick={(e)=>EditWorker(e, UserId)}>
                            Guardar Cambios
                        </Button>
                </Box>
            </Container>
      </Modal>
    </div>
  )
}
