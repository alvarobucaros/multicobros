import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CobrosForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;

    const [startDate, setStartDate] = useState(new Date());
    const [opcion, setOpcion] = useState('')
    const [aviso, setAviso] =useState('');

    useEffect(()=>{
        traeInfo(empresa)
      },[])
      
      async function traeInfo(empresa){ 
        await  axios.get('http://localhost:3000/api/empresas/'+empresa)
        .then(res=>{
           // setEmpresas(res.data[0]) 
        })
      }

      const ActualizaRegistro= async (e) => {
        e.preventDefault();
        setAviso('')
      }
      
      const handledChange = ({target: {name, value}}) => {
        setIngregasto({...ingregasto, [name]: value});
      }
      
      const handledSubmit = async (e) => {
        e.preventDefault();
      }

      return (
        <div className='container'>
          <main className="form-signin w-800 m-auto">
            <form onSubmit={handledSubmit}>
            <span>P A G O S   A N T I C I P A D O S</span>
            </form>
      </main>
    </div>
  )
}


export default CobrosForm