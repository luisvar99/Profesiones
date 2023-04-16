import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Url} from '../Common/Url';
import { useParams } from 'react-router-dom';
import '../Styles/WorkerDetails.css'

export default function WorkerDetails() {

    const [WorkerName, setWorkerName] = useState("")
    const [WorkerCedula, setUserCedula] = useState(0)
    const [WorkerTelf, setUserTelf] = useState("")
    const [WorkerZones, setWorkerZones] = useState("")
    const [WorkerProfession, setWorkerProfession] = useState(0)
    const [WorkerDescription, setWorkerDescription] = useState("")
    const [UserImage, setUserImage] = useState("")

    const params = useParams();

    const getWorkerById = async () => {
        const result = await axios.get(Url + `getWorkerById/${params.id_user}/${params.id_profesion}`)
        console.log(result.data);
        setWorkerName(result.data[0].nombre_completo)
        setUserCedula(result.data[0].cedula)
        setUserTelf(result.data[0].telefono)
        setWorkerProfession(result.data[0].profesion)
        setWorkerZones(result.data[0].zonas)
        setWorkerDescription(result.data[0].descripcion)
        setUserImage(result.data[0].image)
    }

    useEffect(() => {
        getWorkerById()
    }, [])
    
  return (
    <div className='WorkerDetails_main_container'>
        <div className='WorkerDetails_info_container'>
            <div className='WorkerDetails_left_container'>
                <div className='WorkerDetails_img_container'>
                    <img src={UserImage} alt="" />
                </div>
            </div>
            <div className='WorkerDetails_right_container'>

            </div>
        </div>
    </div>
  )
}
