import axios from 'axios';
import React, { useEffect, useState} from 'react';
import Input  from '../components/Input';
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
        em_tipodoc:'C',
        em_nrodoc:'',
        em_telefono:'',
        em_email:'',
        em_observaciones:'',
        em_autentica:'M',
        em_consecRcaja:'000000',
        em_consecEgreso:'000000',
        em_consecAjustes:'000000',
        em_fchini:'',
        em_fchfin:'',
        em_estado:'A',
        em_saldo:0,

        em_us_idEmpresa:'',
        em_us_nombre:'',
        em_us_direccion:'',
        em_us_localidad:'',
        em_us_barrio:'',
        em_us_ciudad:'',
        em_us_email:'',
        em_us_codigo:'Admin',
        em_us_tipoDoc:'C',
        em_us_nroDoc:'',
        em_us_clave:'',
        em_us_telefono:'',
        em_us_estado:'A',
        em_us_nivel:'A'
});

const [aviso, setAviso] =useState('');

useEffect(() => {
    const  avisoLS = JSON.parse( localStorage.getItem('aviso'))
},[]);

useEffect (() => {
 localStorage.setItem("aviso",JSON.stringify(aviso));
}, [aviso]);


const handledChange = ({target: {name, value}}) => {
    setEmpresas({...empresas, [name]: value});
}

const handledSubmit = async (e) => {
    e.preventDefault();
    setAviso('');
}

async function ActualizaRegistro () { 
    let err=''      
    if(empresas.em_nombre===''){err += ', Nombre Aspciación';}
    if(empresas.em_direccion===''){err += ', Direción';}
    if(empresas.em_telefono===''){err += ', Teléfono';}
    if(empresas.em_email===''){err += ', Email Asociación';}
    if(empresas.em_us_nombre===''){err += ', Nombre administrador';}
    if(empresas.em_us_email===''){err += ', Email administrador';}
    
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

        <Input label="Nombre" inputName="em_nombre" 
        inputRequired = "yes"  inputValue={empresas.em_nombre} inputOnChange="handledChange"/>

            <div className="checkbox mb0">
            <label className="col-sm-5 col-form-label" htmlFor="em_tipodoc">Tipo Documento</label>
                    <input type="radio" value="C" name='em_tipodoc' 
                    defaultValue={empresas.em_tipodoc} onChange={handledChange}
                    checked={empresas.em_tipodoc === "C"}/> Cédula
                    <input type="radio" value="N" name='em_tipodoc'
                    defaultValue={empresas.em_tipodoc} onChange={handledChange}
                    checked={empresas.em_tipodoc === "N"}/> Nit
            </div>
            <Input label="Nro Documento" inputName="em_nrodoc" 
                inputRequired = "yes" inputValue={empresas.em_nrodoc} inputOnChange="handledChange"/>

            <Input label="Teléfono" inputName="em_telefono" 
                inputRequired = "yes" inputValue={empresas.em_telefono} inputOnChange="handledChange"/>

            <Input label="E-mail" inputName="em_email" 
                inputRequired = "yes" inputValue={empresas.em_email} inputOnChange="handledChange"/>                   
  
            <div className="checkbox mb-3 mb0">
            <label className="col-sm-5 col-form-label" htmlFor="em_autentica">Autentica por</label>
                    <input type="radio" value="M" name='em_autentica' id ='autM'
                    defaultValue={empresas.em_autentica} onChange={handledChange}
                    checked={empresas.em_autentica === "M"}/> Email
                    <input type="radio" value="C" name='em_autentica' id ='autC'
                    defaultValue={empresas.em_autentica} onChange={handledChange}
                    checked={empresas.em_autentica === "C"}/> Código
            </div>

            <Input label="Dirección" inputName="em_email" 
                inputRequired = "yes" inputValue={empresas.em_email} inputOnChange="handledChange"/>   

            <Input label="Ciudad" inputName="em_ciudad" 
                inputRequired = "yes" inputValue={empresas.em_ciudad} inputOnChange="handledChange"/>   

 
            <div className="d-flex align-items-sm-center mb0">
                <label className="col-sm-5 col-form-label" htmlFor="iniDate">Fecha Inicio</label>
                <input type="date" className="form-control ancho100" name='iniDate' id="iniDate" 
                    defaultValue={empresas.em_fchini} /> 
            </div>  
            <div className="checkbox mb-3 mb0">
            <label className="col-sm-5 col-form-label" htmlFor="em_estado">Estado</label>
                    <input type="radio" value="A" name='em_estado' id ='estA'
                    defaultValue={empresas.em_estado} onChange={handledChange}
                    checked={empresas.em_estado === "A"}/> Activo
                    <input type="radio" value="I" name='em_estado' id ='estI'
                    defaultValue={empresas.em_estado} onChange={handledChange}
                    checked={empresas.em_estado === "I"}/> Inactivo
            </div>  
       
           <h4>Administrador</h4>

           <Input label="Nombre" inputName="em_us_nombre" 
                inputRequired = "yes" inputValue={empresas.em_us_nombre} inputOnChange="handledChange"/>   

            <Input label="Nro Cédula" inputName="em_us_nroDoc" 
                inputRequired = "yes" inputValue={empresas.em_us_nroDoc} inputOnChange="handledChange"/> 

            <Input label="Teléfono" inputName="em_us_telefono" 
                inputRequired = "yes" inputValue={empresas.em_us_telefono} inputOnChange="handledChange"/>   

            <Input label="E mail" inputName="em_us_email" 
                inputRequired = "yes" inputValue={empresas.em_us_email} inputOnChange="handledChange"/> 
    
            <div className="checkbox mb-3 mb0">
                <button className='btn btn-outline-primary btn-sm' onClick={ActualizaRegistro}>Actualiza</button>
            </div>
            <div className="checkbox mb-3 mb0">
                <span  className='alert'>{aviso}</span>
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