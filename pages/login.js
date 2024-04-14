import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import Menu from '../components/Menu'
import Image from 'next/image'
import axios from 'axios';


export default function Login() {

const md5 = require('js-md5');
const UserContext = createContext();
const [usuarios, setUsuarios] = useState([{  
    em_nombre:'',   
    empreasId:0,
    us_clave:'',
    us_email:'',
    us_estado:'',
    us_idEmpresa:0,
    us_nivel:'',
    us_nombre:'',
    usuarioId:0
}]);

const AuthContext = createContext();

const [aviso, setAviso] =useState('');

const handledChange = ({target: {name, value}}) => {
    setUsuarios({...usuarios, [name]: value});
}

const handledSubmit = async (e) => {
    e.preventDefault();
    setAviso('');
    if(usuarios.us_email==='' || usuarios.us_clave===''){
        setAviso('Falta el email o la contraseña');
    }else{
       
        const ruta = "http://localhost:3000/api/usuarios/login";
        await axios.post(ruta,{usu:usuarios})
        .then(res=>{        
            var misDatos=res.data[0];
            setUsuarios(misDatos);
  
            if(typeof misDatos == "undefined" ){
                setAviso('Usuario no registrado');  
                return false
            }

            if (misDatos.us_estado === 'I'){
                setAviso('usuario no está habilitado');
            }
            var clave = md5(usuarios.us_clave);
            if (clave !== misDatos.us_clave){
                setAviso('usuario y/o contraseña con error');
            }
        if(aviso===''){
            <UserContext.Provider value={misDatos}>            
                <Menu />
            </UserContext.Provider>
        }
    })
    }
}

    return (
      <div>
        <main className="form-signin div-center">
        <form onSubmit={handledSubmit}>
            <Image className="mb-8 rounded" src="/logo.png" alt="" width="100" height="60"/>
            <h3 className="h3 mb-3 fw-normal text-center">Autenticación</h3>

            <div className="row g-3 align-items-center">
                <label htmlFor="us_email">Correo electrónico</label>
                <input type="email" className="form-control" name='us_email' id="us_email" 
                        onChange={handledChange}/> 
            </div>

            <div className="row g-3 align-items-center">
                <label htmlFor="us_clave">Contraseña</label>
                <input type="password" className="form-control" name='us_clave' id="us_clave" 
                        onChange={handledChange}/>     
            </div>

  
            <button className="w-100 btn btn-lg btn-primary" type="submit">Ingreso</button>
            <div className='form-group alert'>
                <span>{aviso}</span>
            </div>  
            <p className="mt-5 mb-3 text-center">&copy; 2023–2024</p>
        </form>
        </main>
    </div>
  )
}