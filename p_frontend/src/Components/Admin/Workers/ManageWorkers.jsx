import React, {useState, useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {Url} from '../../Common/Url';
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
    const [WorkerUserId, setWorkerUserId] = useState(0)
    const [WorkerProfessionId, setWorkerProfessionId] = useState(0)
    const [WorkerLastProfessionId, setWorkerLastProfessionId] = useState(0)
    const [WorkerName, setWorkerName] = useState("")
    const [WorkerCedula, setUserCedula] = useState(0)
    const [WorkerTelf, setUserTelf] = useState("")
    const [WorkerZones, setWorkerZones] = useState("")
    const [WorkerProfession, setWorkerProfession] = useState(0)
    const [WorkerDescription, setWorkerDescription] = useState(0)
    const [SuccessOpen, setSuccessOpen] = useState(false); 
    const [Message, setMessage] = useState(""); 
    const [Severity, setSeverity] = useState("success"); 
    const [ModalForm, setModalForm] = useState(false); 
    const [SearchWorker, setSearchWorker] = useState(""); 

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (id_usuario, id_profesion) => {
        setWorkerUserId(id_usuario)
        setWorkerLastProfessionId(id_profesion)
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);
    const handleCloseModalForm = () => setModalForm(false);

    const EditWorker = async (id_profesion) => {
        try {
            const result = await axios.put(Url + 'EditWorker',{
                id_usuario: WorkerUserId,
                last_id_profesion: WorkerLastProfessionId,
                id_profesion:WorkerProfessionId,
                descripcion: WorkerDescription,
                zonas: WorkerZones
            })
            if(result.data.success===true){
                setMessage("Trabajador editado exitosamente")
                setSeverity("success")
                setSuccessOpen(true)
                window.location.reload()
            }else{
                setMessage("Ha ocurrido un error editando al trabajador")
                setSeverity("success")
                setSuccessOpen(true)
            }
        } catch (error) {
            setMessage("Ha ocurrido un error editando al trabajador")
            setSeverity("success")
            setSuccessOpen(true)
            
        }
    }

    const GetWorkers = async () =>{
        const result = await axios.get(Url+'getWorkers')
        setWorkers(result.data)
        //console.log(result.data)
    }

    const SearchWorkerByInfo = async (e,SearchWorker) =>{
        e.preventDefault()
        const result = await axios.get(Url+`getWorkerByInfo/${SearchWorker}`)
        setWorkers(result.data)
        //console.log(result.data)
    }

    const HandleEditButton = async (id_usuario, id_profesion) => {
        setWorkerUserId(id_usuario)
        setWorkerProfessionId(id_profesion)
        setModalForm(true)
        const result = await axios.get(Url + `getWorkerById/${id_usuario}/${id_profesion}`)
        console.log(result.data);
        setWorkerName(result.data[0].nombre_completo)
        setUserCedula(result.data[0].cedula)
        setUserTelf(result.data[0].telefono)
        setWorkerProfession(result.data[0].profesion)
        setWorkerZones(result.data[0].zonas)
        setWorkerDescription(result.data[0].descripcion)
        setWorkerLastProfessionId(result.data[0].id_profesion)
    }

    const getProfessions = async () =>{
        const result = await axios.get(Url+'getProfesiones')
        setProfessions(result.data)
        //console.log(result.data)
      }

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    setSuccessOpen(false);
    };

    const DeleteWorker = async (id_usuario, id_profesion) => {
        try {
            const result = await axios.delete(Url + `DeleteWorker/${id_usuario}/${id_profesion}`)
            if(result.data.success===true){
                setWorkers(Workers.filter(w=>w.id_user!==id_usuario && w.id_profesion!== id_profesion))
                setMessage("trabajador eliminado exitosamente")
                setSeverity("success")
                setSuccessOpen(true)
                setOpenModal(false)
            }else{
                setMessage("Ha ocurrido un error eliminando al trabajador")
                setSeverity("error")
                setSuccessOpen(true)
                setOpenModal(false)
            }
        } catch (error) {
            setMessage("Ha ocurrido un error eliminando al trabajador")
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
        GetWorkers();
        getProfessions();
    }, [])
    

  return (
    <div className="manageProfessionsMainContainer">
    <Box component="form" onSubmit={(e)=>SearchWorkerByInfo(e, SearchWorker)} sx={{ mt: 1, display:"flex", alignItems:"center"}}>
        <TextField
            margin="normal"
            required
            label="Cedula"
            autoFocus
            InputProps={{ sx: { borderRadius: 35, paddingLeft:"0.5rem"} }}
            onChange={(e) => setSearchWorker(e.target.value)}
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
            onClick={(e)=>SearchWorkerByInfo(e,SearchWorker)}>
            Aceptar
        </Button>   
        <Button
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 2, 
                borderRadius: 35,
                backgroundColor: "gray",
                padding: "14.5px 2rem",
                fontSize: "14px" ,
                ':hover': {
                    bgcolor: 'gray',
                    color: 'white',
                },
                display:"inline"
            }}
            onClick={()=>GetWorkers()}>
            Cancelar
        </Button>   
    </Box>
    <div className="manageProfessionsContainerOne">
        <TableContainer component={Paper} sx={{ width: "95%"}}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Nombre</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Cedula</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Telefono</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Categoria</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Zonas</TableCell>
                <TableCell align='center' sx={{fontSize:"1rem"}}>Descripcion</TableCell>
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
                        <div onClick={()=>HandleEditButton(row.id_user, row.id_profesion)}>
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
                        <div onClick={()=>handleOpenModal(row.id_user, row.id_profesion)}>
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
                    <Box component="form" onSubmit={(e)=>EditWorker(e, WorkerUserId, WorkerProfessionId)} 
                        sx={{ mt: 1}}>
                            <TextField
                                margin="normal"
                                disabled
                                fullWidth
                                label="Nombres"
                                autoFocus
                                InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"}}}
                                onChange={(e) => setWorkerName(e.target.value)}
                                value={WorkerName}
                                sx={{width:"95%", mt:0.5}}
                            />
                            <TextField
                                margin="normal"
                                disabled
                                fullWidth
                                label="Cedula"
                                autoFocus
                                InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                onChange={(e) => setUserCedula(e.target.value)}
                                value={WorkerCedula}
                                sx={{width:"95%" , mt:0.5}}
                            />
                            <TextField
                                margin="normal"
                                disabled
                                fullWidth
                                label="Telefono"
                                autoFocus
                                InputProps={{ sx: { borderRadius: 35, paddingLeft:"1rem"} }}
                                onChange={(e) => setUserTelf(e.target.value)}
                                value={WorkerTelf}
                                type='number'
                                sx={{width:"95%" , mt:0.5}}
                            />
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
                                value={WorkerProfessionId}
                                label="Profesion"
                                onChange={(e) => setWorkerProfessionId(e.target.value)}
                                sx={{borderRadius: 35 , mt:0.5, mb:"6px",
                                    }}
                                >{
                                    Professions.map((p,index)=>(
                                        <MenuItem key={index} value={p.id}>{p.nombre}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>    
                            <TextField
                                margin="normal"
                                multiline
                                rows={4}
                                fullWidth
                                label="Descripcion"
                                autoFocus
                                InputProps={{ sx: { borderRadius: "2rem", paddingLeft:"1rem"} }}
                                onChange={(e) => setWorkerDescription(e.target.value)}
                                value={WorkerDescription}
                                type='number'
                                sx={{width:"95%" , mt:0.5}}
                            />                        
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
                            onClick={(e)=>EditWorker(e, WorkerUserId, WorkerProfessionId)}>
                            Guardar Cambios
                        </Button>
            </Box>
            </Container>
      </Modal>
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
                    onClick={()=>DeleteWorker(WorkerUserId,WorkerLastProfessionId)}>
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
    </div>
  )
}
