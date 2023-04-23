import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Url} from '../Common/Url'
import axios from 'axios';
import '../Styles/Home.css'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { MobileTimePicker } from '@mui/x-date-pickers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
    
    const [Workers, setWorkers] = useState([])
    const [Professions, setProfessions] = useState([])
    const [openModal, setOpenModal] = useState(false); 
    const [Date, setDate] = useState(dayjs().format('DD/MM/YYYY') ); 
    const [Time, setTime] = useState(dayjs().get('hour')+':'+ dayjs().get('minute')); 
    const [Status, setStatus] = useState(0); 
    /* const [FechaEjecucion, setFechaEjecucion] = useState(dayjs().format('DD/MM/YYYY'));  */
    const [WorkerID, setWorkerID] = useState(0); 
    const [WorkerIdProfesion, setWorkerIdProfesion] = useState(0); 
    const [SolicitudAdded, setSolicitudAdded] = useState(false)
    const [ShowSpinnerLoader, setShowSpinnerLoader] = useState(false)

    const tomorrow = dayjs().add(1, 'day');
    const MaxDate = dayjs().add(5, 'day');

    const handleCloseModal = () => {
      setOpenModal(false)
    }

    const GetWorkers = async () =>{
        try {
            const result = await axios.get(Url+'getWorkers')
            setWorkers(result.data)
            console.log(result.data)
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const getProfessions = async () =>{
        try {
            const result = await axios.get(Url+'getProfesiones')
            setProfessions(result.data)
            //console.log(result.data)
            
        } catch (error) {
            console.log(error.message);
        }
    }
    const FilterWorkersByProfession = async (id_profesion) =>{
        try {
            console.log("FilterWorkersByProfession: " + id_profesion)
            const result = await axios.get(Url+'getWorkersByProfession/'+id_profesion)
            setWorkers(result.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const CreateSolicitud = async (e) =>{
        e.preventDefault()
        setShowSpinnerLoader(true)
        try {
            const result = await axios.post(Url+'CreateSolicitud',{
                id_user: sessionStorage.getItem("userID"),
                id_trabajador: WorkerID,
                id_profesion: WorkerIdProfesion,
                fecha: Date,
                hora: Time,
                status: 0,
                fecha_ejecucion: dayjs().format('DD/MM/YYYY')
            })
            if(result.data.success===true){
                setShowSpinnerLoader(false)
                setSolicitudAdded(true)
            }else{
                setShowSpinnerLoader(false)
                setSolicitudAdded(false)
            }
        } catch (error) {
            setSolicitudAdded(false)
            setShowSpinnerLoader(false)
            console.log(error.message);
        }

    }

    const getWorkerById = async (id_user, id_profesion) => {
        const result = await axios.get(Url + `getWorkerById/${id_user}/${id_profesion}`)
        console.log(result.data);
        setWorkerID(result.data[0].id_trabajador)
        setWorkerIdProfesion(result.data[0].id_profesion)
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
        GetWorkers()
        getProfessions()
    }, [])
    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='home_main_container'>
            <div className="buttonGroup">
                {Professions.map((p, index)=>(
                    <Button key={index} variant="contained" onClick={()=>FilterWorkersByProfession(p.id)}
                        sx={{ mt: 1, mr: 2, 
                        borderRadius: "1rem",
                        backgroundColor: "#F36C0E",
                        padding: "8px",
                        fontSize: "16px" ,
                        ':hover': {
                            bgcolor: '#FF6900',
                            color: 'white',
                        },
                        }}>
                        {p.nombre}
                    </Button>
                ))}
                    <Button variant="contained" onClick={()=>GetWorkers()}
                        sx={{ mt: 1, mr: 2, 
                        borderRadius: "1rem",
                        backgroundColor: "#F36C0E",
                        padding: "8px",
                        fontSize: "16px" ,
                        ':hover': {
                            bgcolor: '#FF6900',
                            color: 'white',
                        },
                        }}>
                        Todos
                    </Button>
            </div>
            <div className="cards_container">
                {Workers.map((w, index)=>(
                    <Card key={index} /* sx={{width:"100%"}} */ onClick={()=>setOpenModal(true)}>
                            <CardActionArea onClick={()=>getWorkerById(w.id_user ,w.id_profesion)}>
                                <img
                                    src={w.image}
                                    alt="Error"
                                    loading="lazy"
                                    className='Cards_img'
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {w.nombre_completo}
                                    </Typography>
                                    
                                    <Typography variant="body2" color="text.secondary">
                                    <b>Especialidades: </b>{w.descripcion}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <b>Zonas: </b> {w.zonas}
                                    </Typography>
                                    {/* <Typography variant="body2" color="text.secondary">
                                        <b>Contacto: </b> {w.telefono}
                                    </Typography> */}
                                </CardContent>
                            </CardActionArea>
                    </Card>
                ))
                }
            </div>
        </div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={Modalstyles} component="form" onSubmit={CreateSolicitud}>
                <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2, textAlign:"center" }}>
                Solicitud de servicio
                </Typography>
                <DemoItem label="Fecha">
                    <DatePicker
                        defaultValue={tomorrow}
                        maxDate={MaxDate}
                        minDate={tomorrow}
                        views={['year', 'month', 'day']}
                        onChange={(value)=> setDate(value.format('DD/MM/YYYY'))}
                        format='DD/MM/YYYY'
                    />
                </DemoItem>
                <Box sx={{mt:2}} >
                    <DemoItem label="Hora" >
                        <MobileTimePicker 
                            defaultValue={tomorrow} 
                            onChange={(value) => setTime(value.get('hour') + ':' + (value.get('minute')))}
                            minTime={dayjs().set('hour', 8)}
                            maxTime={dayjs().set('hour', 17)}
                        />
                    </DemoItem> 
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
                >
                Aceptar
                </Button>
                <Box sx={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                    {SolicitudAdded &&
                        <>
                            <Typography variant="h6" sx={{mr: 1}}>
                                Solicitud enviada con exito
                            </Typography>
                            <CheckCircleIcon color="success"/>
                        </> 
                    }
                    {ShowSpinnerLoader && <CircularProgress color="success"/>}
                </Box>
            </Box>
        </Modal>
    </LocalizationProvider>
  )
}
