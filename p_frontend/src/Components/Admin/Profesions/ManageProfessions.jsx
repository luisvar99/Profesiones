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


export default function ManageProfessions() {

    const [Professions, setProfessions] = useState([])
    const [ProfessionName, setProfessionName] = useState("")
    const [SuccessOpen, setSuccessOpen] = useState(false); 
    const [Message, setMessage] = useState(""); 
    const [Severity, setSeverity] = useState(""); 
    const [ShowForm, setShowForm] = useState(false); 

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const getProfessions = async () =>{
        const result = await axios.get(Url+'getProfesiones')
        setProfessions(result.data)
        //console.log(result.data)
      }

    const AddProfession = async (e) =>{
        e.preventDefault()
        const result = await axios.post(Url+'AddProfesion',{
            nombre: ProfessionName
        })
        if(result.data.success===true){
            setMessage("Categoria agregada exitosamente")
            setSeverity("success")
            setSuccessOpen(true)
            setProfessions([...Professions,{id: 1, nombre:ProfessionName}])
        }else{
            setMessage("Ha ocurrido un error Agregando la Categoria")
            setSeverity("error")
            setSuccessOpen(true)
        }
        //console.log(result.data)
      }

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSuccessOpen(false);
      };
  
      
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
      getProfessions();
    }, [])

  return (
    <div className="manageProfessionsMainContainer">
        <div className="manageProfessionsContainerOne">
            <TableContainer component={Paper} sx={{ width: "35%"}}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    <TableCell align='center' sx={{fontSize:"1.2rem"}}>Nombre</TableCell>
                    <TableCell align='center'></TableCell>
                    <TableCell align='center'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Professions.map((row, index) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align='center'>{row.nombre}</TableCell>
                        <TableCell align='center'>
                            <div onClick={handleOpenModal}>
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
                            <DeleteIcon sx={{
                                            '&:hover': {
                                                cursor: 'pointer',
                                            }
                                        }}>
                            </DeleteIcon>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <div style={{height:"3rem"}} onClick={()=> setShowForm(true)}>
                <AddCircleIcon sx={{fontSize:'3rem', 
                                    marginLeft: "1rem", 
                                    color:"#F36C0E", 
                                    '&:hover': {
                                        cursor: 'pointer',
                                    }
                                    }}
                                    >
                </AddCircleIcon>
            </div>
            {ShowForm && 
                <Container maxWidth="xs">
                    <Snackbar open={SuccessOpen} autoHideDuration={6000} onClose={handleClose} 
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }} TransitionComponent="SlideTransition">
                        <Alert onClose={handleClose} severity={Severity} sx={{ width: '100%' }}>
                            {Message}
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
                    Crear Categoria
                    </Typography>
                    <Box component="form" onSubmit={AddProfession} sx={{ mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Nombre"
                        label="Nombre"
                        name="Nombre"
                        autoComplete="Nombre"
                        autoFocus
                        InputProps={{ sx: { borderRadius: 35 } }}
                        onChange={(e) => setProfessionName(e.target.value)}
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
                            Aceptar
                        </Button>
                    </Box>
                </Box>
            </Container>}
        </div>


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
                    >
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
