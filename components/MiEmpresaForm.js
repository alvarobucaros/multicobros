import axios from 'axios';
import React, { useEffect, useState} from 'react';
import Input  from '../components/Input';
import md5 from 'js-md5'
import 'bootstrap/dist/css/bootstrap.css';

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
});
const [usuarios, setUsuarios]  = useState({  
    id:0,
    us_idEmpresa:0, 
    us_nombre:'', us_direccion:'', 
    us_localidad:'', 
    us_barrio:'', 
    us_ciudad:'', 
    us_email:'', 
    us_codigo:'Admin', 
    us_tipoDoc:'C', 
    us_nroDoc:'', 
    us_telefono:'', 
    us_clave:'Admin', 
    us_estado:'A', 
    us_nivel:'C'
})

const [aviso, setAviso] =useState('');

const handledChange = ({target: {name, value}}) => {
    setEmpresas({...empresas, [name]: value});
}

const handledChangeUs = ({target: {name, value}}) => {
    setUsuarios({...usuarios, [name]: value});
}
const handledSubmit = async (e) => {
    e.preventDefault();
    setAviso('');
}

async function ActualizaRegistro () { 
    let err=''      
    if(empresas.em_nombre===''){err += ', Nombre Asociación';}
    if(empresas.em_direccion===''){err += ', Direción';}
    if(empresas.em_telefono===''){err += ', Teléfono';}
    if(empresas.em_email===''){err += ', Email Asociación';}
    if(usuarios.us_nombre===''){err += ', Nombre administrador';}
    if(usuarios.us_email===''){err += ', Email administrador';}
    
    if (err===''){
        var elementos
        await  axios.post('http://localhost:3000/api/empresas', empresas)
        .then(response => {
            elementos = response.data.id;
            alert('Empresa actualizada'+elementos);
          });
        
        usuarios.us_clave = md5(usuarios.us_telefono);
        usuarios.us_idEmpresa = elementos;
        await  axios.post('http://localhost:3000/api/usuarios', usuarios)
        .then( alert('Usuario actualizado'),()=>{
        })
    }else{
        setAviso('Falta '+err)
    }
}

return (
    <div className='container'>
       
    <form onSubmit={handledSubmit}>
    <h4 className='item-body'>Asociación</h4>
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="em_nombre">Nombre</label>
            <div className="col-sm-8">
            <input type="text" className="form-control" name='em_nombre' id="em_nombre" 
                defaultValue={empresas.em_nombre} onChange={handledChange} required="required" /> 
            </div>
        </div>
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="em_tipodoc">Tipo Documento</label>
            <div className="col-sm-9">
                <input type="radio" value="C" name='em_tipodoc'
                defaultValue={empresas.em_tipodoc} onChange={handledChange}
                checked={empresas.em_tipodoc === "C"}/>Cédula {' '}
                <input type="radio" value="N" name='em_tipodoc'
                defaultValue={empresas.em_tipodoc} onChange={handledChange}
                checked={empresas.em_tipodoc === "N"}/> Nit
            </div>
        </div>  
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="em_nrodoc">Nro Documento</label>
            <div className="col-sm-3">
            <input type="text" className="form-control" name='em_nrodoc' id="em_nrodoc" 
                defaultValue={empresas.em_nrodoc} onChange={handledChange} required="required" /> 
            </div>
   
            <label className="col-sm-2 col-form-label trr" htmlFor="em_telefono">Teléfono</label>
            <div className="col-sm-3">
            <input type="text" className="form-control" name='em_telefono' id="em_telefono" 
                defaultValue={empresas.em_telefono} onChange={handledChange} required="required" /> 
            </div>
        </div>             
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="em_email">Correo</label>
            <div className="col-sm-6">
            <input type="email" className="form-control" name='em_email' id="em_email" 
                defaultValue={empresas.em_email} onChange={handledChange} required="required" /> 
            </div>
        </div>  

        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="em_autentica">Autentica por</label>
            <div className="col-sm-9">
                <input type="radio" value="M" name='em_autentica'
                defaultValue={empresas.em_autentica} onChange={handledChange}
                checked={empresas.em_autentica === "M"}/>Email {' '}
                <input type="radio" value="C" name='em_autentica'
                defaultValue={empresas.em_autentica} onChange={handledChange}
                checked={empresas.em_autentica === "C"}/> Código
            </div>
        </div> 
  
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="em_direccion">Dirección</label>
            <div className="col-sm-7">
            <input type="text" className="form-control" name='em_direccion' id="em_direccion" 
                defaultValue={empresas.em_direccion} onChange={handledChange} required="required" /> 
            </div>
        </div> 
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="em_ciudad">Ciudad</label>
            <div className="col-sm-7">
            <input type="text" className="form-control" name='em_ciudad' id="em_ciudad" 
                defaultValue={empresas.em_ciudad} onChange={handledChange} required="required" /> 
            </div>
        </div>         
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="em_fchini">Fecha Inicio</label>
            <div className="col-sm-2">
            <input type="date" className="form-control" name='em_fchini' id="em_fchini" 
                defaultValue={empresas.em_fchini} onChange={handledChange} required="required" /> 
            </div>
        </div> 
 
        <h4 className='item-body'>Administrador</h4>
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="us_nombre">Nombre</label>
            <div className="col-sm-7">
            <input type="text" className="form-control" name='us_nombre' id="us_nombre" 
                defaultValue={usuarios.us_nombre} onChange={handledChangeUs} required="required" /> 
            </div>
        </div> 
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="us_nroDoc">Número cédula</label>
            <div className="col-sm-3">
            <input type="text" className="form-control" name='us_nroDoc' id="us_nroDoc" 
                defaultValue={usuarios.us_nroDoc} onChange={handledChangeUs} required="required" /> 
            </div>
       
            <label className="col-sm-2 col-form-label trr" htmlFor="us_telefono">Teléfono</label>
            <div className="col-sm-3">
            <input type="text" className="form-control" name='us_telefono' id="us_telefono" 
                defaultValue={usuarios.us_telefono} onChange={handledChangeUs} required="required" /> 
            </div>
        </div>
        <div className="mb-1 row">
            <label className="col-sm-3 col-form-label" htmlFor="us_email">Email</label>
            <div className="col-sm-5">
            <input type="text" className="form-control" name='us_email' id="us_email" 
                defaultValue={usuarios.us_email} onChange={handledChangeUs} required="required" /> 
            </div>
        </div>           
  
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

<input type="text" name='us_tipoDoc' id="us_tipoDoc" defaultValue={usuarios.us_tipoDoc} /> 
<input type="text" name='us_localidad' id="us_localidad" defaultValue={usuarios.us_localidad} /> 
<input type="text" name='us_direccion' id="us_direccion" defaultValue={usuarios.us_direccion} /> 

</div>       
:''}
          

        </form>
    
</div>
  )
}

export default MiEmpresaForm