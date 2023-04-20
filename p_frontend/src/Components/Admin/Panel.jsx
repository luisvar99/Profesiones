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
import dayjs from 'dayjs';

export default function Panel() {

  const [NumberOfProfessions, setNumberOfProfessions] = useState(0)
  const [NumberOfUsers, setNumberOfUsers] = useState(0)
  const [NumberOfWorkers, setNumberOfWorkers] = useState(0)
  const [Solicitudes, setSolicitudes] = useState([])
  const [Worker, setWorker] = useState("")
  const [User, setUser] = useState("")

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
        setWorker(result.data[0].nombre_completo)
        setUser(result.data[1].nombre_completo)
    } catch (error) {
        console.log(error.message);
    }
}

  const HandleEditButton = async (id_solicitud) => {
    await GetSolicitudByID(id_solicitud);
  }

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (id) => {
      setOpenModal(true);
  };

  useEffect(() => {
    getTotalNumberOfProfesiones();
    getTotalNumberOfUsers();
    getTotalNumberOfWorkers();
    getSolicitudes()
  }, [])

  return (
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
                    <TableCell align='center' sx={{fontSize:"1.2rem"}}>ID</TableCell>
                    <TableCell align='center' sx={{fontSize:"1.2rem"}}>Resumen</TableCell>
                    <TableCell align='center' sx={{fontSize:"1.2rem"}}>Servicio</TableCell>
                    <TableCell align='center' sx={{fontSize:"1.2rem"}}>Fecha y Hora de servicio</TableCell>
                    <TableCell align='center' sx={{fontSize:"1.2rem"}}>Fecha Solicitud</TableCell>
                    <TableCell align='center' sx={{fontSize:"1.2rem"}}>Status</TableCell>
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
        </div>
      </div>
    </div>
  );
}

