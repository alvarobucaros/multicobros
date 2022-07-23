import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function IngreGastForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;

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
        em_fchini:'24/07/2013',
        em_fchfin:'',
        em_estado:'A',
        em_saldo:0
    });    

    const [ingregasto, setIngregasto] = useState({  
      id:0,
      ig_idEmpresa:'', 
      ig_fecha:'', 
      ig_tipo:'', 
      ig_detalle:'', 
      ig_numero:'', 
      ig_documento:'', 
      ig_idUsuario:'', 
      ig_valor:'',       
      ig_saldo:''      
    }); 

const [startDate, setStartDate] = useState(new Date());
const [opcion, setOpcion] = useState('')
const [aviso, setAviso] =useState('');


useEffect(()=>{
  traeInfo(empresa)
},[])

async function traeInfo(empresa){ 
  await  axios.get('http://localhost:3000/api/empresas/'+empresa)
  .then(res=>{
      setEmpresas(res.data[0]) 
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

const anular = async (e) => {
  e.preventDefault();
  setIngregasto([{}]);

}
  return (
    <div className='container'>
      <main className="form-signin w-800 m-auto">
        <form onSubmit={handledSubmit}>
          <div className="d-flex align-items-sm-center mt-0">
              <label className="col-sm-6 col-form-label" htmlFor="em_nombre">Operación</label>
              <select onChange={(e) => {setOpcion(e.target.value)}}>
                  <option value="I">Ingresos</option>
                  <option value="G">Gasto</option>
                  <option value="A">Ajustes</option>           
              </select> 
          </div>
          <div className="d-flex align-items-sm-center">
                <label className="col-sm-6 col-form-label" htmlFor="ig_numero">Consecutivo</label>
                <input type="text" className="form-control ancho100" name='ig_numero' id="ig_numero" 
                    defaultValue={ingregasto.ig_numero} onChange={handledChange}/> 
          </div>
          <div className="d-flex align-items-sm-center">
                <label className="col-sm-6 col-form-label" htmlFor="em_fchini">Fecha Operación</label>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className="d-flex align-items-sm-center">
                <label className="col-sm-6 col-form-label" htmlFor="ig_detalle">Detalle</label>
                <textarea className="form-control" name='ig_detalle' id="ig_detalle" 
                    defaultValue={ingregasto.ig_detalle} onChange={handledChange}
                    rows={3} cols={50}/>
          </div>

          <div className="d-flex align-items-sm-center">
                <label className="col-sm-6 col-form-label" htmlFor="ig_documento">Comprobante</label>
                <input type="text" className="form-control ancho100" name='ig_documento' id="ig_documento" 
                    defaultValue={ingregasto.ig_documento} onChange={handledChange}/> 
          </div>
          <div className="d-flex align-items-sm-center">
                <label className="col-sm-6 col-form-label" htmlFor="ig_valor">Valor</label>
                <input type="text" className="form-control ancho100" name='ig_valor' id="ig_valor" 
                    defaultValue={ingregasto.ig_valor} onChange={handledChange}/> 
          </div>
          <div className="d-flex align-items-sm-center">
                <label className="col-sm-6 col-form-label" htmlFor="ig_saldo">Nuevo saldo</label>
                <input type="text" className="form-control ancho100" name='ig_saldo' id="ig_saldo" 
                    defaultValue={ingregasto.ig_saldo} onChange={handledChange}/> 
          </div>  
          <div className="row align-items-center">
              <span className='alert'>{aviso}</span>
          </div>     
            
            <Button className='btn btn-primary btn-sm' onClick={anular}>Ignora</Button><span>  </span>
            <Button className='btn btn-primary btn-sm' onClick={ActualizaRegistro}>Actualiza</Button>
        </form>
      </main>
    </div>
  )
}


export default IngreGastForm