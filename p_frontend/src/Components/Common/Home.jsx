import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Url} from '../Common/Url'
import axios from 'axios';

export default function Home() {
    
    const [Workers, setWorkers] = useState([])

    const GetWorkers = async () =>{
        const result = await axios.get(Url+'getWorkers')
        setWorkers(result.data)
        //console.log(result.data)
    }

    useEffect(() => {
        GetWorkers()
    }, [])
    

  return (
    <div className='home_main_container'>
        {Workers.map((w, index)=>(
            <Card key={index} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {w.nombre_completo}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                        {w.descripcion}
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        ))
        }
    </div>
  )
}
