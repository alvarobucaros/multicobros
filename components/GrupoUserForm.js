import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
function GruposForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;

    const [startDate, setStartDate] = useState(new Date());
    const [opcion, setOpcion] = useState('')
    const [aviso, setAviso] =useState('');

    var   [misDatos] = [{}];

    const [grupos, setGrupos]  = useState({  
      id:0, 
      grp_empresa:'', 
      grp_nombre:'', 
      grp_detalle:'', 
      grp_estado:'A'
  })

  const[grpUsuario, setGrpUsuario] = useState({
    id:0, 
    grp_empresa:'', 
    grp_nombre:'', 
    grp_detalle:'', 
    grp_estado:''})
  
    const llave = {grupo:0, empresa:0}

  const [grps, setGrps] = useState([])

    useEffect(()=>{
      traeComboPpal(empresa)
    },[])

    async function traeComboPpal(empresa){ 
      let id =  "id, grp_nombre, grp_detalle|grupos|";
      id += "grp_estado = 'A' AND grp_empresa = "  +empresa + "| grp_nombre";   
 
      await  axios.get('http://localhost:3000/api/generales/'+id)
      .then(res=>{
          misDatos=res.data;               
          setGrupos(misDatos) 
          setGrps(misDatos.map(dat => {
            let properties = {
              "id": dat.id,
              "grp_nombre": dat.grp_nombre,
              "grp_detalle":dat.grp_detalle
            };
            return properties;
           }));             
      })
    }
 
      async function traeInfoUsuarios(llave){ 
        let id =  llave.empresa+'|'+llave.grupo  
        await  axios.get('http://localhost:3000/api/grupos/grupoUser/'+id)
        .then(res=>{
           setGrpUsuario(res.data) 
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

      const handleSelectChange = (e) => {
        let id = e.target.value;
        llave.empresa  = empresa;
        llave.grupo= id
        traeInfoUsuarios(llave)
    }

      return (
        <div className='container'>
          <main className="form-signin w-800 m-auto">
          <form onSubmit={handledSubmit}>
          <div className="mb-1 row">
              <label className="col-sm-2 col-form-label" htmlFor="grp_nombre">Grupo :</label>
              <div className="col-sm-10">            
                <select id='estado' name='estado' className='form-control'
                  onChange={e => handleSelectChange(e)}
                  defaultValue={grupos.id} >
                    <option key={0} value={0}> Seleccione un grupo</option>
                  {grps.map((gr)=>(
                  <option key={gr.id} value={gr.id}> {gr.grp_nombre} - {gr.grp_detalle}</option>
                   
                  ))} 
                </select> 
              </div>
          </div>
            </form>
      </main>
    </div>
  )
}


export default GruposForm