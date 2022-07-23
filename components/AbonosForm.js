import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
function AbonosForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;
    const[listo, setListo] = useState(false)

    const [startDate, setStartDate] = useState(new Date());
    const [opcion, setOpcion] = useState('')
    const [aviso, setAviso] =useState();
    const [nota1, setNota1] =useState('');
    const [nota2, setNota2] =useState('');
    const [nota3, setNota3] =useState('');

    var   [misDatos] = [{}];
    const [usrs, setUsrs] = useState([])

    const [usuarios, setUsuarios]  = useState({  
      id:0, 
      us_idEmpresa:'', 
      us_nombre:'', 
      us_email:'',
      us_codigo:'',
      us_tipoDoc:'',
      us_nroDoc:'',
      us_telefono:'',
      em_autentica:''
  })
  
  
    useEffect(()=>{
      traeComboPpal(empresa)
    },[])

      // id, us_idEmpresa, us_nombre, us_direccion, us_localidad, us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, us_telefono, us_clave, us_estado, us_nivel

    async function traeComboPpal(empresa){ 
    //  http://localhost:3000/api/usuarios?e=2&op=abono
    
      const ruta = "http://localhost:3000/api/usuarios?e="+empresa+"&op=abono";
  
      const res = await axios.get(ruta)
      .then(res=>{
          misDatos=res.data;               
          setUsuarios(misDatos) 
          setUsrs(misDatos.map(dat => {
            let properties = {
              "id": dat.id,
              "us_nombre": dat.us_nombre,
              "us_codigo":dat.us_codigo
            };
            return properties;
           }));             
      })
    }
 
      async function traeInfoUsuarios(){ 
           
  

        
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

      const handleSelectChange = (e) => {
        let id = e.target.value;
       
        usuarios.forEach(object =>{
        if(object.id == id){ 
          let aplica = "E-mail: " + object.us_email;
          if(object.em_autentica == 'T'){aplica = "Teléfono: " + object.us_telefono;}
          if(object.em_autentica == 'C'){aplica = "Código: " + object.us_codigo;}
          if(object.em_autentica == 'D'){aplica = "Identificación: " + object.us_tipoDoc+' - '+object.us_nroDoc;}
          setNota1(object.us_nombre+ " " + '  (' +aplica+ ')');
          setListo(true);
        }
        })
      //  var results = [ {"id":"10", "class": "child-of-9"}, {"id":"11", "classd": "child-of-10"} ];
    }

      return (
        <div className='container'>
          <main className="form-signin w-800 m-auto">
          <form onSubmit={handledSubmit}>
          <div className="mb-1 row">
              <label className="col-sm-2 col-form-label" htmlFor="us_nombre">Deudor:</label>
              <div className="col-sm-10">            
                <select id='us_nombre' name='us_nombre' className='form-control'
                  onChange={e => handleSelectChange(e)}
                  defaultValue={usrs.id} >
                  <option key={0} value={0}> Seleccione un deudor</option>
                  {usrs.map((usr)=>(
                   <option key={usr.id} value={usr.id}> {usr.us_nombre} - {usr.us_codigo}</option>                
                  ))} 
                </select> 
              </div>
              <span> Hola : {nota1}</span>
          </div>
            </form>
      </main>
    
    </div>
  )
}


export default AbonosForm