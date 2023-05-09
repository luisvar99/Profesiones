import React ,{useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../Styles/AdminPanel.css'
import {Link, useParams} from 'react-router-dom'
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
import CircularProgress from '@mui/material/CircularProgress';
import '../Styles/UserSolicitudes.css'

export default function Solicitudes() {
    
    const params = useParams()
    const [Solicitudes, setSolicitudes] = useState([])
    const [LoadingSolicitudes, setLoadingSolicitudes] = useState(false)

    const getUserSolicitudes = async () => {
        setLoadingSolicitudes(true)
        const result = await axios.get(Url+'getUserSolicitudes/'+params.id_user);
        setSolicitudes(result.data)
        setLoadingSolicitudes(false)
    }

    useEffect(() => {
        getUserSolicitudes()
    }, [])
    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className= {LoadingSolicitudes  ? 'user_solicitudes_container_spinner' : 'user_solicitudes_main_container'}>
            {LoadingSolicitudes ?
             <>
                <CircularProgress style={{'color': '#F36C0E'}}/>
                <p style={{marginLeft:"1rem"}}>Cargando...</p>
            </>
            :
            <Box sx={{display:"flex", flexDirection: "column", alignItems:'center', mt:3}}>
                <Typography sx={{ fontSize: 20, fontWeight: 600, mb:3 }} variant="h6" component="div">
                    Mis Solicitudes
                </Typography>
                <TableContainer component={Paper} sx={{ width: "80%", mb: 3}}>
                    <Table sx={{ width: "100%"}} aria-label="simple table">
                    <TableHead sx={{fontWeight:"bold" }}>
                        <TableRow sx={{border: "1px solid rgba(224, 224, 224, 1)"}}>
                        <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>ID</TableCell>
                        <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Trabajador</TableCell>
                        <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Servicio</TableCell>
                        <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Fecha / Hora de servicio</TableCell>
                        <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Fecha Solicitud</TableCell>
                        <TableCell align='center' sx={{fontSize:"1rem", fontWeight:"bold"}}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Solicitudes.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align='center'>{row.id_solicitud}</TableCell>
                            <TableCell align='center'>{row.nombre_completo}</TableCell>
                            <TableCell align='center'>{row.categoria}</TableCell>
                            <TableCell align='center'>{dayjs(row.fecha).format('DD/MM/YYYY')} - {row.hora}</TableCell>
                            <TableCell align='center'>{dayjs(row.fecha_ejecucion).format('DD/MM/YYYY')}</TableCell>
                            <TableCell align='center' sx={{backgroundColor: parseInt(row.status)===0 ? "yellow" : parseInt(row.status)===1 ? "green" : "red" }}>
                            {parseInt(row.status)===0 ? "Por Aprobar" : parseInt(row.status)===1 ? "Aprobado" : "Cancelado" }
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Box>}
        </div>
    </LocalizationProvider>
  )
}
