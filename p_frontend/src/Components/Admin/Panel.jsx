import React ,{useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../Styles/AdminPanel.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Url} from '../Common/Url'
import SolicitudDetails from '../Solicitudes/SolicitudDetails';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileTimePicker } from '@mui/x-date-pickers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';


export default function Panel() {

  const inputSearchSolicitud = useRef();
  const [NumberOfProfessions, setNumberOfProfessions] = useState(0)
  const [NumberOfUsers, setNumberOfUsers] = useState(0)
  const [NumberOfWorkers, setNumberOfWorkers] = useState(0)
  const [Solicitudes, setSolicitudes] = useState([])
  const [openModal, setOpenModal] = useState(false); 
  const [SolicitudDate, setSolicitudDate] = useState(dayjs().format('YYYY/MM/DD') ); 
  const [SolicitudTime, setSolicitudTime] = useState("");
  const [SolicitudStatus, setSolicitudStatus] = useState(0);
  const [SelectedSolicitudID, setSelectedSolicitudID] = useState(0);
  const [PreviousDate, setPreviousDate] = useState("");
  const [PreviousTime, setPreviousTime] = useState("");
  const [SolicitudUpdated, setSolicitudUpdated] = useState(false)
  const [ShowSpinnerLoader, setShowSpinnerLoader] = useState(false)
  const [SearchSolicitud, setSearchSolicitud] = useState("")

  const today = dayjs().add(0, 'day');
  const MaxDate = dayjs().add(5, 'day');

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const getStadistics = async () => {
    try {
      const result = await axios.get(Url+'getStadistics');
      setNumberOfUsers(result.data.usuarios)
      setNumberOfWorkers(result.data.workers)
      if(result.data.success===false){
        console.log(result.data)
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  const getTotalNumberOfProfesiones = async () => {
    try {
      const result = await axios.get(Url+'getTotalNumberoOfProfesiones');
      //console.log(result.data)
      if(result.data.success===false){
        console.log(result.data)
      }else{
        setNumberOfProfessions(result.data)
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }

  /*
  const getTotalNumberOfUsers = async () => {
    try {
      const result = await axios.get(Url+'getTotalNumberoOfUsers');
      setNumberOfUsers(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }
  const getTotalNumberOfWorkers = async () => {
    try {
      const result = await axios.get(Url+'getTotalNumberOfWorkers');
      setNumberOfWorkers(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  } */

  const getSolicitudes = async (resetForm) => {
    try {
      const result = await axios.get(Url+'getSolicitudes');
      setSolicitudes(result.data)
      if(resetForm===true){
        inputSearchSolicitud.current.reset()
      }
      
    } catch (error) {
      console.log(error.message);
    }
  }

  const GetSolicitudByID = async (id_solicitud) => {
    try {
        const result = await axios.get(Url + `GetSolicitudByID/${id_solicitud}`)
        console.log(result.data[0]);
        setSolicitudDate(result.data[0].fecha)
        setSolicitudTime(result.data[0].hora)
        setSolicitudStatus(result.data[0].status)
    } catch (error) {
        console.log(error.message);
    }
}

  const HandleEditButton = async (id_solicitud) => {
    setOpenModal(true)
    setSelectedSolicitudID(id_solicitud);
    await GetSolicitudByID(id_solicitud);
  }

  const handleOpenModal = (id) => {
      setOpenModal(true);
  };

  const UpdateSolicitud = async (e) =>{
    e.preventDefault()
    setShowSpinnerLoader(true)
    try {
        const result = await axios.put(Url+'EditSolicitud',{
            id: SelectedSolicitudID,
            fecha: SolicitudDate,
            hora: SolicitudTime,
            status: SolicitudStatus,
        })
        if(result.data.success===true){
            setShowSpinnerLoader(false)
            setSolicitudUpdated(true)
            window.location.reload()
        }else{
            setShowSpinnerLoader(false)
            setSolicitudUpdated(false)
        }
    } catch (error) {
        setSolicitudUpdated(false)
        setShowSpinnerLoader(false)
        console.log(error.message);
    }

}

  const SearchSolicitudByInfo = async (e, user_cedula) =>{
    e.preventDefault()
    const result = await axios.get(Url+`getSolicitudByInfo/${user_cedula}`)
    setSolicitudes(result.data)
    console.log(result.data)
  }

  const Modalstyles = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 24,
    p: 4,
    borderRadius: "2rem"
  };

  useEffect(() => {
    getTotalNumberOfProfesiones();
    /* getTotalNumberOfUsers(); */
    getStadistics()
    getSolicitudes()
    /* getTotalNumberOfWorkers(); */
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='adminPanelMainContainer'>
        <div className='adminPanelSubOneContainer'>
          <Card sx={{ width:"100%" }}>
            <Link to="/Admin/ManageProfessions">
              <CardContent>
                <Typography color="text.primary" gutterBottom>
                  Profesiones
                </Typography>
                {
                  NumberOfProfessions!==0 || NumberOfProfessions
                  ?
                  <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                    <>{NumberOfProfessions}</>
                  </Typography>
                  :
                  <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                    Cargando...
                  </Typography>
                }
            </CardContent>
            </Link>
          </Card>

          <Card sx={{ width:"100%" }}>
            <Link to="/Admin/ManageUsers">
              <CardContent>
                <Typography color="text.primary" gutterBottom>
                  Usuarios
                </Typography>
                {
                  NumberOfUsers!==0 || NumberOfUsers
                  ?
                  <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                    <>{NumberOfUsers}</>                 
                  </Typography>
                  :
                  <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                    Cargando...
                  </Typography>
                }
              </CardContent>
            </Link>
          </Card>

          <Card sx={{ width:"100%" }}>
            <Link to='/Admin/ManageWorkers'>
              <CardContent>
                <Typography color="text.primary" gutterBottom>
                  Trabajadores
                </Typography>
                {
                  NumberOfWorkers!==0 || NumberOfWorkers
                  ?
                  <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                    <>{NumberOfWorkers}</>
                  </Typography>
                  :
                  <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                    Cargando...
                  </Typography>
                }
              </CardContent>
            </Link>
          </Card>
        </div>

        <div className='adminPanelSubTwoContainer'>
          {
            Solicitudes.length===0
            ?
            <Typography sx={{ fontSize: 20 }} variant="h6" component="div">
              Cargando Solicitudes Recientes... 
              <CircularProgress style={{'color': '#F36C0E'}}/>
            </Typography>
            :
            <>
            
            <Typography sx={{ fontSize: 20 }} variant="h6" component="div">
              Solicitudes Recientes
            </Typography>
            <Box component="form" ref={inputSearchSolicitud} onSubmit={(e)=>SearchSolicitudByInfo(e, SearchSolicitud)} sx={{display:"flex", alignItems:"center"}}>
            <TextField
                margin="normal"
                required
                label="Cedula"
                autoFocus
                InputProps={{ sx: { borderRadius: 35} }}
                onChange={(e) => setSearchSolicitud(e.target.value)}
                /* sx={{marginLeft:"2rem"}} */
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
                    '@media screen and (max-width: 600px)': {
                      display: "flex",
                    },
                    display:"inline"
                }}
                >
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
                },'@media screen and (max-width: 600px)': {
                  display: "flex",
                },
                display:"inline"
            }}
            onClick={()=>getSolicitudes(true)}>
            Cancelar
        </Button>     
        </Box>
            <TableContainer component={Paper} 
                sx={{ width: "80%", mb: 3,
                '@media screen and (max-width: 600px)': {
                  width: "100%",
                }}}>
                  <Table sx={{ width: "100%"}} aria-label="simple table">
                  <TableHead sx={{fontWeight:"bold" }}>
                      <TableRow sx={{border: "1px solid rgba(224, 224, 224, 1)"}}>
                      <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>ID</TableCell>
                      <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Resumen</TableCell>
                      <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Servicio</TableCell>
                      <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Fecha / Hora de servicio</TableCell>
                      <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Fecha Solicitud</TableCell>
                      <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Status</TableCell>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'></TableCell>
                      <TableCell align='center'></TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {Solicitudes.map((row, index) => (
                      <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                          <TableCell align='center'>{row.id_solicitud}</TableCell>
                          <TableCell align='center'>
                            <SolicitudDetails id_solicitud={row.id_solicitud}/>
                          </TableCell>
                          <TableCell align='center'>{row.nombre}</TableCell>
                          <TableCell align='center'>{dayjs(row.fecha).format('DD/MM/YYYY')} - {row.hora}</TableCell>
                          <TableCell align='center'>{dayjs(row.fecha_ejecucion).format('DD/MM/YYYY')}</TableCell>
                          <TableCell align='center' sx={{backgroundColor: parseInt(row.status)===0 ? "yellow" : parseInt(row.status)===1 ? "green" : "red" }}>
                            {parseInt(row.status)===0 ? "Por Aprobar" : parseInt(row.status)===1 ? "Aprobado" : "Cancelado" }
                          </TableCell>
                          <TableCell align='center'></TableCell>
                          <TableCell align='center'>
                              <div onClick={()=>HandleEditButton(row.id_solicitud)}>
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
              </>
          }
              <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
              <Box sx={Modalstyles} component="form" onSubmit={UpdateSolicitud}>
                  <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2, textAlign:"center" }}>
                  Modificacion de Solicitud 
                  </Typography>
                  <DemoItem label="Fecha">
                      <DatePicker
                          maxDate={MaxDate}
                          minDate={today}
                          views={['year', 'month', 'day']}
                          onChange={(value)=> setSolicitudDate(value.format('YYYY/MM/DD'))}
                          format='DD/MM/YYYY'
                          value={dayjs(SolicitudDate)}
                      />
                  </DemoItem>
                  <Box sx={{mt:2}} >
                      <DemoItem label="Hora" >
                          <MobileTimePicker 
                              value={dayjs("2000-01-01T"+SolicitudTime)} 
                              onChange={(value) => setSolicitudTime(value.get('hour') + ':' + (value.get('minute')))}
                          />
                      </DemoItem> 
                  </Box>
                  <FormControl fullWidth sx={{maxWidth:"95%", mt:3}}>
                    <InputLabel 
                        id="demo-simple-select-label"
                        sx={{mt:0.5}}>
                        Status
                    </InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SolicitudStatus}
                    label="Rol"
                    onChange={(e) => setSolicitudStatus(e.target.value)}
                    sx={{borderRadius: 35 , mt:0.5, mb:"8px",
                        }}
                    >
                    <MenuItem value={0}>Por Aprobar</MenuItem>
                    <MenuItem value={1}>Aprobado</MenuItem>
                    <MenuItem value={2}>Cancelado</MenuItem>
                    </Select>
                  </FormControl>
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
                  <Box sx={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                      {SolicitudUpdated &&
                          <>
                              <Typography variant="h6" sx={{mr: 1}}>
                                  Solicitud modificada con exito
                              </Typography>
                              <CheckCircleIcon color="success"/>
                          </> 
                      }
                      {ShowSpinnerLoader && <CircularProgress color="success"/>}
                  </Box>
              </Box>
          </Modal>
          </div>
      </div>
    </LocalizationProvider>

  );
}

