import React ,{useState, useEffect} from 'react';
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

export default function Panel() {

  const [NumberOfProfessions, setNumberOfProfessions] = useState(0)
  const [NumberOfUsers, setNumberOfUsers] = useState(0)
  const [NumberOfWorkers, setNumberOfWorkers] = useState(0)
  const [Solicitudes, setSolicitudes] = useState([])
  const [openModal, setOpenModal] = useState(false); 
  const [SolicitudDate, setSolicitudDate] = useState(""); 
  const [SolicitudTime, setSolicitudTime] = useState("");
  const [SolicitudStatus, setSolicitudStatus] = useState(0);
  const [SelectedSolicitudID, setSelectedSolicitudID] = useState(0);
  const [PreviousDate, setPreviousDate] = useState("");
  const [PreviousTime, setPreviousTime] = useState("");
  const [SolicitudUpdated, setSolicitudUpdated] = useState(false)
  const [ShowSpinnerLoader, setShowSpinnerLoader] = useState(false)

  const today = dayjs().add(0, 'day');
  const MaxDate = dayjs().add(5, 'day');

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const getTotalNumberOfProfesiones = async () => {
    const result = await axios.get(Url+'getTotalNumberoOfProfesiones');
    setNumberOfProfessions(result.data)
  }
  const getTotalNumberOfUsers = async () => {
    const result = await axios.get(Url+'getTotalNumberoOfUsers');
    setNumberOfUsers(result.data)
  }
  const getTotalNumberOfWorkers = async () => {
    const result = await axios.get(Url+'getTotalNumberOfWorkers');
    setNumberOfWorkers(result.data)
  }
  const getSolicitudes = async () => {
    const result = await axios.get(Url+'getSolicitudes');
    setSolicitudes(result.data)
  }

  const GetSolicitudByID = async (id_solicitud) => {
    try {
        const result = await axios.get(Url + `GetSolicitudByID/${id_solicitud}`)
        console.log(result.data[0]);
        setSolicitudDate(result.data[0].fecha)
        setSolicitudTime(result.data[0].hora)
        setSolicitudStatus(result.data[0].status)
    } catch (error) {
        alert(error.message);
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
    getTotalNumberOfUsers();
    getTotalNumberOfWorkers();
    getSolicitudes()
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='adminPanelMainContainer'>
        <div className='adminPanelSubOneContainer'>
          <Card sx={{ width:"80%" }}>
            <Link to="/Admin/ManageProfessions">
              <CardContent>
                <Typography color="text.primary" gutterBottom>
                  Profesiones
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                  {NumberOfProfessions}
                </Typography>
            </CardContent>
            </Link>
          </Card>

          <Card sx={{ width:"80%" }}>
            <Link to="/Admin/ManageUsers">
              <CardContent>
                <Typography color="text.primary" gutterBottom>
                  Usuarios
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                  {NumberOfUsers}
                </Typography>
              </CardContent>
            </Link>
          </Card>

          <Card sx={{ width:"80%" }}>
            <Link to='/Admin/ManageWorkers'>
              <CardContent>
                <Typography color="text.primary" gutterBottom>
                  Trabajadores
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h6" component="div">
                  {NumberOfWorkers}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </div>

        <div className='adminPanelSubTwoContainer'>
          <div>
            <Typography sx={{ fontSize: 20 }} variant="h6" component="div">
              Solicitudes Recientes
            </Typography>
            <TableContainer component={Paper} sx={{ width: "80%"}}>
                  <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                      <TableCell align='center' sx={{fontSize:"1.1rem"}}>ID</TableCell>
                      <TableCell align='center' sx={{fontSize:"1.1rem"}}>Resumen</TableCell>
                      <TableCell align='center' sx={{fontSize:"1.1rem"}}>Servicio</TableCell>
                      <TableCell align='center' sx={{fontSize:"1.1rem"}}>Fecha / Hora de servicio</TableCell>
                      <TableCell align='center' sx={{fontSize:"1.1rem"}}>Fecha Solicitud</TableCell>
                      <TableCell align='center' sx={{fontSize:"1.1rem"}}>Status</TableCell>
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
                          <TableCell align='center'>{row.id}</TableCell>
                          <TableCell align='center'><SolicitudDetails id_solicitud={row.id}/></TableCell>
                          <TableCell align='center'>{row.nombre}</TableCell>
                          <TableCell align='center'>{dayjs(row.fecha).format('DD/MM/YYYY')} - {row.hora}</TableCell>
                          <TableCell align='center'>{dayjs(row.fecha_ejecucion).format('DD/MM/YYYY')}</TableCell>
                          <TableCell align='center' sx={{backgroundColor: parseInt(row.status)===0 ? "yellow" : parseInt(row.status)===1 ? "green" : "red" }}>
                            {parseInt(row.status)===0 ? "Por Aprobar" : parseInt(row.status)===1 ? "Aprobado" : "Cancelado" }
                          </TableCell>
                          <TableCell align='center'></TableCell>
                          <TableCell align='center'>
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
                          onChange={(value)=> setSolicitudDate(value.format('DD/MM/YYYY'))}
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
      </div>
    </LocalizationProvider>

  );
}

