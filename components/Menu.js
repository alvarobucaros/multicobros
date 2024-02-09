import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import LinkMenu  from '../components/LinkMenu';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";

function Menu(props) {
    const nomEmpresa = " MI EMPRESA COLOMBIANA DE PRUEBAS ";
    const nomUsuario = "Alvaro Ortiz";
    const nomTipo = "Consultas";
    const empresa = 2;
    const usuario = 1;
    const nivel = 'A';

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [aviso, setAviso] =useState('');
    const [usuarios, setUsuarios] = useState({  
        id:usuario,
        us_idEmpresa:empresa,
        us_clave:'',
        us_nueva_clave:'',
        us_repite_clave:'',      
    });
  
    
    const handleClick = (e) => {
        e.preventDefault()
        setModal(true);
      }

      const ActualizaRegistro = (e) => {
          e.preventDefault()
          e.preventDefault();
          setAviso('');
           if(usuarios.us_clave ==='' ) {setAviso('Falta contraseña actual');}
           if(usuarios.us_nueva_clave !== usuarios.us_repite_clave ) {setAviso('Clave repite no es igual a la nueva');}
           if(usuarios.us_nueva_clave === usuarios.us_clave ) {setAviso('Clave nueva es igual a la actual');}
           if (aviso === ''){
                Actualizar()
                setModal(false);
           }
            else{
                setModal(true);}
        }
  
        async function Actualizar(){  
            const ruta = "/api/usuarios/login";
            const res = await axios.put(ruta,{id:usuarios.id, clave:usuarios.us_nueva_clave})
            .then( alert('Información actualizada'),()=>{
            })
        }
 

        const handledChange = ({target: {name, value}}) => {
            setUsuarios({...usuarios, [name]: value});
        }
              
        useEffect(()=>{
            setUsuarios.us_clave='';
            setUsuarios.us_nueva_clave='';
            setUsuarios.us_repite_clave='';
        },[])

    return (
        <>
    <div className='mi-menu'>
        <div className='mn-flex'>
            <div className='col-xs-8'><Image className="" src="/logo.png" alt="" width="100" height="50"/>
              
            </div>
            <div className='div-grupo'> 
                <div className='div-flex div-center div-emp'><span >{nomEmpresa}</span></div>
                <div className='div-flex div-center div-usu trc'> 
                <a href='#' onClick={handleClick}><span >{nomUsuario} - {nomTipo}</span> </a> </div>
            </div> 
        </div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-xl miTexto">
                <LinkMenu links="/abonos" detalle="Pago de cuotas" empresa={empresa} usuario={usuario} nivel={nivel}/>
                <LinkMenu links="/anticipos" detalle="Pago anticipado" empresa={empresa} usuario={usuario} nivel={nivel}/>
                <LinkMenu links="/cobros" detalle="Ctas por Cobrar" empresa={empresa} usuario={usuario} nivel={nivel}/>
                <LinkMenu links="/ingresosGastos" detalle="Ingresos/Gastos" empresa={empresa} usuario={usuario} nivel={nivel}/>
                <LinkMenu links="/usuarios" detalle="Usuarios" empresa={empresa} usuario={usuario} nivel={nivel}/>
                <LinkMenu links="/grupos" detalle="Grupos" empresa={empresa} usuario={usuario} nivel={nivel}/>
                <LinkMenu links="/grupoUser" detalle="Grupos de usuarios" empresa={empresa} usuario={usuario} nivel={nivel}/>
                <LinkMenu links="/conceptos" detalle="Conceptos" empresa={empresa} usuario={usuario}  nivel={nivel}/>
                <LinkMenu links="/empresas" detalle="Parámetros" empresa={empresa} usuario={usuario} nivel={nivel}/>
                <LinkMenu links="/salida" detalle="Salir" empresa={empresa} usuario={usuario} nivel={nivel}/>
                <span className='div-right'>{props.titulo}</span>
            </div>
        </nav>
    </div>
    <span>
       {modal  ?    
        // <CambiaUsuario/ > : ''  }
        <div className='modal1'>    
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader  toggle={toggle}>Actualiza contraseña de {nomUsuario}</ModalHeader>
            <ModalBody>
                <main className="form-signin w-100 m-auto">
                    <form>
                        <div className="row align-items-center">
                            <label htmlFor="us_clave">Contraseña actual</label>
                            <input type="password" className="form-control" name='us_clave' id="us_clave" 
                            defaultValue={usuarios.us_clave} onChange={handledChange}/> 
                        </div>
                        <div className="row align-items-center">
                            <label htmlFor="us_nueva_clave">Nueva Contraseña</label>
                            <input type="password" className="form-control" name='us_nueva_clave' id="us_nueva_clave" 
                            defaultValue={usuarios.us_nueva_clave} onChange={handledChange}/>     
                        </div>
                        <div className="row align-items-center">
                            <label htmlFor="us_repite_clave">Repita Contraseña</label>
                            <input type="password" className="form-control" name='us_repite_clave' id="us_repite_clave" 
                            defaultValue={usuarios.us_repite_clave} onChange={handledChange}/>     
                        </div>                         
                        <div className="row align-items-center">
                            <span className='alert'>{aviso}</span>
                        </div> 
                    </form>
                </main>               
                <Button color="primary" onClick={toggle}>Ignora</Button>
                <Button color="primary" onClick={ActualizaRegistro}>Actualiza</Button>
            </ModalBody>
        </Modal>
      </div >
        :''}
    </span>
    </>
    )
}



export default Menu