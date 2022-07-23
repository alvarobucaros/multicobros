import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ParametrosForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;
    const [iniDate, setIniDate] = useState(new Date());
    const [finDate, setFinDate] = useState(new Date());

    var   [misDatos] = [{}];

    const [empresas, setEmpresas] = useState({  
        id:0,
        em_nombre:'',
        em_direccion:'',
        em_localidad:'',
        em_ciudad:'',
        em_tipodoc:'',
        em_nrodoc:'',
        em_telefono:'',
        em_email:'',
        em_observaciones:'',
        em_autentica:'',
        em_consecRcaja:'',
        em_consecEgreso:'',
        em_fchini:'',
        em_fchfin:'',
        em_estado:'A', 
        em_saldo:0
    });    

const [startDate, setStartDate] = useState(new Date());

useEffect(()=>{
  traeInfo(empresa)
},[])

async function traeInfo(empresa){ 
  await  axios.get('http://localhost:3000/api/empresas/'+empresa)
  .then(res=>{
      setEmpresas(res.data[0])
      setIniDate(empresas.em_fchini.slice(0, -14))
      setFinDate(empresas.em_fchfin.slice(0, -14))     
  })
}

const handledChange = ({target: {name, value}}) => {
  setEmpresas({...empresas, [name]: value});
}

const handledSubmit = async (e) => {
  e.preventDefault();
}

async function ActualizaRegistro () { 
  let err=''
  empresas.em_fchini = iniDate;
  empresas.em_fchfin = finDate;       
  if(empresas.em_nombre===''){err += ', Nombre';}
  if(empresas.em_direccion===''){err += ', Direción';}
  if(empresas.em_telefono===''){err += ', Teléfono';}
  if(empresas.em_email===''){err += ', Email';}
  if (err===''){
  await  axios.post('http://localhost:3000/api/empresas', empresas)
  .then( alert('Información actualizada'),()=>{
  })
  }else{
      setAviso('Falta '+err)
  }
}

//id,em_nombre,em_direccion,em_localidad,em_ciudad,em_tipodoc,em_nrodoc,em_telefono,em_email,em_observaciones,em_autentica,em_consecRcaja,em_consecEgreso,em_fchini,em_fchfin,em_estado,em_saldo

     
  return (
    <div className='container'>
      <main className="form-signin w-800 m-auto">
        <form onSubmit={handledSubmit}>
          <div className="d-flex align-items-sm-center mb0">
            <label className="col-sm-6 col-form-label" htmlFor="em_nombre">Nombre</label>
            <input type="text" className="form-control col-sm-10 ancho200" name='em_nombre' id="em_nombre" 
                defaultValue={empresas.em_nombre} onChange={handledChange}/> 
          </div>
          <div className="d-flex align-items-sm-center mb0">
            <label className="col-sm-6 col-form-label" htmlFor="em_observaciones">Observaciones</label>
            <input type="text" className="form-control col-sm-10 ancho200" name='em_observaciones' id="em_observaciones" 
                defaultValue={empresas.em_observaciones} onChange={handledChange}/> 
          </div>

          <div className="d-flex align-items-sm-center mb0">
            <label className="col-sm-6 col-form-label" htmlFor="em_saldo">Saldo</label>
            <input type="text" className="form-control col-sm-10 ancho200" name='em_saldo' id="em_saldo" 
                defaultValue={empresas.em_saldo} onChange={handledChange}/> 
          </div>

            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-6 col-form-label" htmlFor="em_consecRcaja">Consec Rcaja</label>
                <input type="text" className="form-control ancho100" name='em_consecRcaja' id="em_consecRcaja" 
                    defaultValue={empresas.em_consecRcaja} onChange={handledChange}/> 
            </div>
            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-6 col-form-label" htmlFor="em_consecEgreso">Consec Egreso</label>
                <input type="text" className="form-control ancho100" name='em_consecEgreso' id="em_consecEgreso" 
                    defaultValue={empresas.em_consecEgreso} onChange={handledChange}/> 
            </div>  
            <div className="checkbox mb-3 mb0">
                <button color="primary" onClick={ActualizaRegistro}>Actualiza</button>
            </div>            
        </form>
      </main>
    </div>
  )
}

export default ParametrosForm