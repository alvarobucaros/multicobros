import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

function ParametrosForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;
    const [show, setShow]= useState(false)

    var   [misDatos] = [{}];

    const [empresas, setEmpresas] = useState({  
        id:0,
        em_nombre:'',
        em_direccion:'',
        em_ciudad:'',
        em_tipodoc:'',
        em_nrodoc:'',
        em_telefono:'',
        em_email:'',
        em_observaciones:'',
        em_autentica:'',
        em_consecRcaja:'',
        em_consecEgreso:'',
        em_consecAjustes:'',
        em_fchini:'',
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
    misDatos=res.data[0];       
      for (var i = 0; i < misDatos.length; i++){
        misDatos[i].em_fchini =  misDatos[i].em_fchini.slice(0, -14)
        // misDatos[i].em_fchfin =  misDatos[i].em_fchfin.slice(0, -14)    
    }  
    setEmpresas(misDatos) 
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


     
  return (
    <div className='container'>
      <main className="form-signin w-800 m-auto">
        <form onSubmit={handledSubmit}>
          <div className="d-flex align-items-sm-center mb0">
            <label className="col-sm-6 col-form-label" htmlFor="em_nombre">Nombre</label>
            <input type="text" className="form-control col-sm-10 ancho200" name='em_nombre' id="em_nombre" 
                defaultValue={empresas.em_nombre} onChange={handledChange}/> 
          </div>
<br/>
          <div className="d-flex align-items-sm-center mb0">
            <label className="col-sm-6 col-form-label" htmlFor="em_observaciones">Observaciones</label>
            <textarea name="em_observaciones" id="em_observaciones" cols="200" rows="2"                
           className="form-control col-sm-10 ancho200"  defaultValue={empresas.em_observaciones} onChange={handledChange}/>
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
            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-6 col-form-label" htmlFor="em_consecAjustes">Consec Ajustes</label>
                <input type="text" className="form-control ancho100" name='em_consecAjustes' id="em_consecAjustes" 
                    defaultValue={empresas.em_consecAjustes} onChange={handledChange}/> 
            </div>  
            <div className="checkbox mb-3 mb0">
                <button className='btn btn-outline-primary btn-sm' 
                onClick={ActualizaRegistro}>Actualiza</button>
            </div>   

            {show ?  
<div>

<input type="text" name='em_direccion' id="em_direccion" defaultValue={empresas.em_direccion} /> 
<input type="text" name='em_ciudad' id="em_ciudad" defaultValue={empresas.em_ciudad} /> 
<input type="text" name='em_tipodoc' id="em_tipodoc" defaultValue={empresas.em_tipodoc} /> 
<input type="text" name='em_nrodoc' id="em_nrodoc" defaultValue={empresas.em_consem_nrodocecAjustes} /> 

<input type="text" name='em_telefono' id="em_telefono" defaultValue={empresas.em_telefono} /> 
<input type="text" name='em_email' id="em_email" defaultValue={empresas.em_email} /> 
<input type="text" name='em_autentica' id="em_autentica" defaultValue={empresas.em_autentica} /> 
<input type="text" name='em_fchini' id="em_fchini" defaultValue={empresas.em_fchini} /> 
<input type="text" name='em_estado' id="em_estado" defaultValue={empresas.em_estado} /> 
</div>       
:''}            

        </form>
      </main>
    </div>
  )
}


export default ParametrosForm