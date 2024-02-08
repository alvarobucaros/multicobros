import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import 'bootstrap/dist/css/bootstrap.css';
 
function GruposForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;

    const [grupoEscogido, setGrupoEscogido] = useState(0);
    const [opcion, setOpcion] = useState(false)
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
    empresa:'', 
    usuario:'', 
    grupo:'', 
    us_nombre:'',
    estado:''})
    
    const llave = {grupo:0, empresa:0}

    const [grps, setGrps] = useState([])

    useEffect(()=>{
      traeComboPpal(empresa)
      traeInfoUsuarios(empresa)
    },[])

    async function traeComboPpal(empresa){ 
      let id =  "id, grp_nombre, grp_detalle|grupos|";
      id += "grp_estado = 'A' AND grp_idEmpresa = "  +empresa + "| grp_nombre";    
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

      async function traeInfoUsuarios(empresa){ 
        await  axios.get("http://localhost:3000/api/usuarios?e="+empresa)
        .then(res=>{
          setGrpUsuario(res.data) 
          setOpcion(true)
        })
      }

      async function  ActualizaRegistro (e) {
        e.preventDefault();
       
        let si = ''
        let nota = ''
        for (let index = 0; index < grpUsuario.length; index++) {
          nota += '{ '+grpUsuario[index].estado+' '+ grpUsuario[index].us_nombre+ '} ';
          if (grpUsuario[index].estado===1){
            si +=grpUsuario[index].usuario +','
            }
        }
        si +='0';
       
        await  axios.post('http://localhost:3000/api/grupos/grupoUser?e='+empresa+'&si='+si+'&gr='+grupoEscogido)
        .then( alert('Información actualizada'),()=>{
        })
     
      }
      
      const handledSubmit = async (e) => {
        e.preventDefault();
      }

      const handleSelectChange = (e) => {
        let id = e.target.value;
        llave.empresa  = empresa;
        llave.grupo= id
        setGrupoEscogido(id)
        traeInfoUsuarios(llave)
    }
    const handleChangeEstado = (grp) => {

      if (grp.estado === 1) {grp.estado = 0} else {grp.estado = 1}
    }


      return (
        <div className='container'>
          <main className="w-75 p-3"> 
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
            {opcion ?
            <div className="d-flex text-black flex-wrap w-33 p-0">                
                {grpUsuario.map((grp, key) =>  
                  <div className="p-2 border">
                    <input type="checkbox" id={grp.id} name={grp.id} 
                     onClick={() => handleChangeEstado(grp)} checked={grp.estado}
                    defaultValue={grp.usuario} />{grp.us_nombre}
                  </div>             
                )}
            </div>
              :''}
            <div className="checkbox mb-3 mb0">
                <button className='btn-sx btn-primary' onClick={ActualizaRegistro}>Actualiza</button>
            </div>  
     
          </form>
      </main>
    </div>
  )
}


export default GruposForm