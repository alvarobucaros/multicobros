import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

function MiEmpresaForm(props) {
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
        em_autentica:'M',
        em_consecRcaja:'000000',
        em_consecEgreso:'000000',
        em_consecAjustes:'000000',
        em_fchini:'',
        em_estado:'A',
        em_saldo:0
});

const [aviso, setAviso] =useState('');

const handledChange = ({target: {name, value}}) => {
    setEmpresas({...empresas, [name]: value});
}

const handledSubmit = async (e) => {
    e.preventDefault();
    setAviso('');
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
    <main className="form-signin  m-auto">
        <form onSubmit={handledSubmit}>
            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-5 col-form-label" htmlFor="em_nombre">Nombre</label>
                <input type="text" className="form-control ancho100" name='em_nombre' id="em_nombre" 
                    defaultValue={empresas.em_nombre} onChange={handledChange}/> 
            </div>
            <div className="checkbox mb0">
            <label className="col-sm-5 col-form-label" htmlFor="em_tipodoc">Tipo Documento</label>
                    <input type="radio" value="C" name='em_tipodoc'
                    defaultValue={empresas.em_tipodoc} onChange={handledChange}
                    checked={empresas.em_tipodoc === "C"}/> Cédula
                    <input type="radio" value="N" name='em_tipodoc'
                    defaultValue={empresas.em_tipodoc} onChange={handledChange}
                    checked={empresas.em_tipodoc === "N"}/> Nit
            </div>
            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-5 col-form-label" htmlFor="em_nrodoc">Nro Documento</label>
                <input type="text" className="form-control ancho100" name='em_nrodoc' id="em_nrodoc" 
                    defaultValue={empresas.em_nrodoc} onChange={handledChange}/> 
            </div>

            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-5 col-form-label" htmlFor="em_telefono">Teléfono</label>
                <input type="text" className="form-control ancho100" name='em_telefono' id="em_telefono" 
                    defaultValue={empresas.em_telefono} onChange={handledChange}/> 
            </div>
            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-5 col-form-label" htmlFor="em_email">E-mail</label>
                <input type="mail" className="form-control ancho100" name='em_email' id="em_email" 
                    defaultValue={empresas.em_email} onChange={handledChange}/> 
            </div>    
            <div className="checkbox mb-3 mb0">
            <label className="col-sm-5 col-form-label" htmlFor="em_autentica">Autentica por</label>
                    <input type="radio" value="M" name='em_autentica'
                    defaultValue={empresas.em_autentica} onChange={handledChange}
                    checked={empresas.em_autentica === "M"}/> Email
                    <input type="radio" value="C" name='em_autentica'
                    defaultValue={empresas.em_autentica} onChange={handledChange}
                    checked={empresas.em_autentica === "C"}/> Código
            </div>
            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-5 col-form-label" htmlFor="em_direccion">Dirección</label>
                <input type="text" className="form-control ancho100" name='em_direccion' id="em_direccion" 
                    defaultValue={empresas.em_direccion} onChange={handledChange}/> 
            </div>
            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-5 col-form-label" htmlFor="em_ciudad">Ciudad</label>
                <input type="text" className="form-control ancho100" name='em_ciudad' id="em_ciudad" 
                    defaultValue={empresas.em_ciudad} onChange={handledChange}/> 
            </div> 
            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-5 col-form-label" htmlFor="iniDate">Fecha Inicio</label>
                <input type="date" className="form-control ancho100" name='iniDate' id="iniDate" 
                    defaultValue={empresas.em_fchini} /> 
            </div>
  
            <div className="checkbox mb-3 mb0">
            <label className="col-sm-5 col-form-label" htmlFor="em_estado">Estado</label>
                    <input type="radio" value="A" name='em_estado'
                    defaultValue={empresas.em_estado} onChange={handledChange}
                    checked={empresas.em_estado === "A"}/> Activo
                    <input type="radio" value="I" name='em_estado'
                    defaultValue={empresas.em_estado} onChange={handledChange}
                    checked={empresas.em_estado === "I"}/> Inactivo
            </div>  
            <div className="checkbox mb-3 mb0">
                <span  className='alert'>{aviso}</span>
            <button className='btn btn-outline-primary btn-sm' onClick={ActualizaRegistro}>Actualiza</button>
                {/* <Button className='btn btn-outline-primary btn-sm' onClick={ActualizaRegistro}>Actualiza</Button>                */}
            </div>

{show ?  
<div>
<input type="text" name='em_saldo' id="em_saldo" defaultValue={empresas.em_saldo} /> 
<input type="text" name='em_observaciones' id="em_observaciones" defaultValue={empresas.em_observaciones} /> 
<input type="text" name='em_consecRcaja' id="em_consecRcaja" defaultValue={empresas.em_consecRcaja} /> 
<input type="text" name='em_consecEgreso' id="em_consecEgreso" defaultValue={empresas.em_consecEgreso} /> 
<input type="text" name='em_consecAjustes' id="em_consecAjustes" defaultValue={empresas.em_consecAjustes} /> 
</div>       
:''}
          
        </form>
    </main>
</div>
  )
}

export default MiEmpresaForm