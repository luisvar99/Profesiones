import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Url} from '../Common/Url'
import axios from 'axios';
import '../Styles/Home.css'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

export default function Home() {
    
    const [Workers, setWorkers] = useState([])
    const [Professions, setProfessions] = useState([])

    const GetWorkers = async () =>{
        const result = await axios.get(Url+'getWorkers')
        setWorkers(result.data)
        console.log(result.data)
    }

    const getProfessions = async () =>{
        const result = await axios.get(Url+'getProfesiones')
        setProfessions(result.data)
        //console.log(result.data)
    }
    const FilterWorkersByProfession = async (id_profesion) =>{
        console.log("FilterWorkersByProfession: " + id_profesion)
        const result = await axios.get(Url+'getWorkersByProfession/'+id_profesion)
        setWorkers(result.data)
    }

    useEffect(() => {
        GetWorkers()
        getProfessions()
    }, [])
    
  return (
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
                <Card key={index} sx={{width:"100%"}}>
                    <Link to={`/Worker/${w.id_user}/${w.id_profesion}`} style={{textDecoration:"none", color:"black"}}>
                        <CardActionArea>
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
                    </Link>
                </Card>
            ))
            }
        </div>
    </div>
  )
}
