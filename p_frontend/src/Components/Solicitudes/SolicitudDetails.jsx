import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Url} from '../Common/Url';

export default function SolicitudDetails({id_solicitud}) {

    const [Worker, setWorker] = useState("")
    const [User, setUser] = useState("")

    const GetSolicitudByID = async () => {
        try {
            const result = await axios.get(Url + `GetSolicitudByID/${id_solicitud}`)
            setWorker(result.data[0].nombre_completo)
            setUser(result.data[1].nombre_completo)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        GetSolicitudByID()
    }, [])
    

  return (
    <>
        <p style={{margin:0}}>Usuario: {User}</p>
        <p style={{margin:0}}>Trabajador: {Worker} </p>
    </>
  )
}
