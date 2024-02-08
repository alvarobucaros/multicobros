import React, {useState} from 'react';
import Menu from '../components/Menu'
import Image from 'next/image'
import axios from 'axios'

export default function Login() {

const md5 = require('js-md5');

const [usuarios, setUsuarios] = useState({  
    id:0,
    us_idEmpresa:0,
    us_nombre:'',
    us_email:'',
    us_clave:'',
    us_estado:'',
    us_nivel:''      
});

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
      
            if(typeof misDatos == "undefined" ){
                setAviso('Usuario no registrado');  
                return false
            }

                if (misDatos.us_estado === 'I'){
                    setAviso('Usuario no está habilitado');
                }
                if (md5(usuarios.us_clave) !== misDatos.us_clave){
                    setAviso('Contraseña inválida');
                }
        if(aviso===''){
            <Menu/>
           // return true;
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
                <input type="email" className="form-control" name='us_email' id="us_email" defaultValue={usuarios.us_email}
                        onChange={handledChange}/> 
            </div>

            <div className="row g-3 align-items-center">
                <label htmlFor="us_clave">Contraseña</label>
                <input type="password" className="form-control" name='us_clave' id="us_clave" defaultValue={usuarios.us_clave}
                        onChange={handledChange}/>     
            </div>

            <div className="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"/> Recordarmelo
            </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Ingreso</button>
            <div className='form-group'>
                <span>{aviso}</span>
            </div>  
            <p className="mt-5 mb-3 text-center">&copy; 2022–2023</p>
        </form>
        </main>
    </div>
  )
}