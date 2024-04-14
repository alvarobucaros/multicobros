import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';

function GruposForm(props) {
  
    var   [misDatos] = [{}];
    const [registros, setRegistros] = useState([{}]);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const registrosPorPagina = 6;
    var   totalRegistros = 0;
    const [pagina, setPagina] = useState(0);
    const [aviso, setAviso] =useState('');

    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;

    const [grupos, setGrupos]  = useState({  
      id:0, 
      grp_idEmpresa:'', 
      grp_nombre:'', 
      grp_detalle:'', 
      grp_estado:'A'
  })

// SELECT id, grp_idEmpresa, grp_nombre, grp_detalle, grp_estado  FROM grupos
  const [gruposW, setGruposW]  = useState({  
      id:0, grp_idEmpresa:empresa, grp_nombre:'', grp_detalle:'', grp_estado:'A'})

  const [modalDel, setModalDel] = React.useState(false);
  const toggle_del = () => setModalDel(!modalDel);
  const [modalPpal, setModalPpal] = React.useState(false);
  const toggle_ppal = () => setModalPpal(!modalPpal);

  const [codBorrado, setCodBorrado] = useState('');
  const [detBorrado, setDetBorrado] = useState('');
  
  useEffect(()=>{
      traeInfo(empresa)
    },[])
      
    async function traeInfo(empresa){ 
      let id = empresa;       
      await  axios.get('http://localhost:3000/api/grupos/'+id)
      .then(res=>{
          misDatos=res.data; 
          setRegistros(misDatos)
          totalRegistros = misDatos.length;
          setNumeroPaginas( Math.ceil(totalRegistros / registrosPorPagina));
          var libros =  subTablaPartir(pagina);
          setRegistros(libros)
      })
    }

  //  Paginación
  function subTablaPartir(pagina){       
    var ini = pagina * registrosPorPagina;
    var fin = (ini + registrosPorPagina) ;
    var xdatos = [{}]
    let j=0;
    if(fin > totalRegistros) {fin = totalRegistros}
      for (var i = ini; i < fin; i++){
        xdatos[j] = misDatos[i];
        j+=1;
    }
    return xdatos; 
  }

async function paginar(op){
  // 0 primera, 9 ultima, 1 siguiente, 2 anterior, 0 ninguna
  let pagina =0
  switch (op) {
    case 2:
      if (pagina > 0){
          pagina -= 1;
      }
      if(pagina <0){pagina = 0}
      break;
    case 0:      
      pagina = 0
      break;
    case 1: 
      if (pagina < (numeroPaginas-1)){
          pagina += 1;
      }
      if(pagina >= numeroPaginas-1) {pagina = (numeroPaginas-1)}
      break;
    case 9:  
     pagina = (numeroPaginas - 1);
      break;   
  }
  setPagina(pagina);
  
  var libros = subTablaPartir(pagina);
  setRegistros(libros, [])
}

function handleShow(rec){
  setDetBorrado(rec.grp_nombre + ' - ' + rec.grp_detalle);
  setCodBorrado(rec.id)
  setModalDel(!modalDel);
}

async function handleShowPpal(rec){
  setGrupos(rec)
  setModalPpal(!modalPpal);
}

async function ActualizaRegistro () { 
  let err=''
  grupos.grp_idEmpresa=empresa;
  if(grupos.grp_nombre===''){err += ', Nombre';}
  if(grupos.grp_detalle===''){err += ', Detalle';}
   if (err===''){
    if(grupos.id === 0){   
    await  axios.post('http://localhost:3000/api/grupos', grupos)
    .then( alert('Información actualizada'),()=>{
    })
  }else{
    await  axios.put('http://localhost:3000/api/grupos', grupos)
    .then( alert('Información actualizada'),()=>{
    })   
  }
  
  traeInfo(empresa)
  setModalPpal(!modalPpal);
  }else{
      setAviso('Falta '+err)
  }
}

async function BorraRegistro(){  
  let id="grupos|"+codBorrado;
  await  axios.delete('http://localhost:3000/api/generales/'+id)
  .then(res=>{
  })
  traeInfo(empresa)
  setModalDel(!modalDel);
}

const handledSubmit = async (e) => {
  e.preventDefault();
  setAviso('');
}

const handledChange = ({target: {name, value}}) => {
  setGrupos({...grupos, [name]: value});
}

return (
<div>
  <div>
      <table   className='miTable'>
          <thead>  
              <tr key={0}>
                  <th className="">Nombre</th>                            
                  <th className="">Detalle</th> 
                  <th className="">Estado</th>                             
                  <th colSpan='2'>Comandos</th>
              </tr>
          </thead>
          <tbody> 
          
          {registros.map((rec, key) =>                
              <tr key={rec.id}>
                  <td className="trc">{rec.grp_nombre}</td>
                  <td className="trl">{rec.grp_detalle}</td>
                  <td className="trc">{rec.grp_estado}</td>
                  <td className="trc"><button onClick={() => handleShowPpal(rec)} className='btn btn-sm btn-primary '>Edita</button></td>
                  <td className="trc"><button onClick={() => handleShow(rec)} className='btn btn-sm btn-danger '>Anula</button></td>
              </tr>    
          )}
          </tbody>
      </table> 
      <div className='botones'>
          <div>
          <button onClick={() => paginar('P')} className='btn btn-outline-primary  btn-sm'> |&#8612; </button>
                    <button onClick={() => paginar('A')} className='btn btn-outline-primary btn-sm'> &larr; </button>
                    <button onClick={() => paginar('S')} className='btn btn-outline-primary btn-sm'> &rarr; </button>
                    <button onClick={() => paginar('U')} className='btn btn-outline-primary btn-sm'> &#8614;| </button>              <button onClick={() => handleShowPpal(gruposW)} className='btn btn-sm btn-primary '>Nuevo registro</button>        
          </div>
          <div>
              <span>Página {pagina+1} de {numeroPaginas}  
                  Total Registros = {totalRegistros},  Registros Por Pagina = {registrosPorPagina}                   
              </span>
          </div>
          <div className='modal1'>    
              <Modal isOpen={modalDel} toggle_del={toggle_del}>
              <ModalHeader  toggle_del={toggle_del}>Borra el registro {codBorrado}</ModalHeader>
                  <ModalBody>
                  <span> {detBorrado} </span>
                  <div>
                      <Button color="primary" onClick={toggle_del}>NO</Button>
                      <Button color="primary" onClick={BorraRegistro}>SI</Button>
                  </div>
                  </ModalBody>
              </Modal>
          </div>
          <div className='modal1'>    
              <Modal isOpen={modalPpal} toggle_ppal={toggle_ppal}>
              <ModalHeader  toggle_ppal={toggle_ppal}>Actualiza información</ModalHeader>
                  <ModalBody>
                  <div className='container'>
                      <form onSubmit={handledSubmit}>
                          <div className="mb-1 row">
                              <label className="col-sm-3 col-form-label" htmlFor="grp_nombre">Nombre</label>
                              <div className="col-sm-9">
                              <input type="text" className="form-control" name='grp_nombre' id="grp_nombre" 
                                  defaultValue={grupos.grp_nombre} onChange={handledChange} /> 
                              </div>
                          </div>
                          <div className="mb-1 row">
                              <label className="col-sm-3 col-form-label" htmlFor="grp_detalle">Detalle</label>
                              <div className="col-sm-9">
                                  <textarea className="form-control" name='grp_detalle' id="grp_detalle" 
                                  defaultValue={grupos.grp_detalle} onChange={handledChange}
                                  rows={3} cols={50}/>
                              </div>
                          </div>                            
                                
                          <div className="mb-1 row">
                              <label className="col-sm-3 col-form-label" htmlFor="grp_estado">Estado</label>
                              <div className="col-sm-9">
                                  <input type="radio" value="A" name='grp_estado'
                                  defaultValue={grupos.grp_estado} onChange={handledChange}
                                  checked={grupos.grp_estado === "A"}/> Activo
                                  <input type="radio" value="I" name='grp_estado'
                                  defaultValue={grupos.grp_estado} onChange={handledChange}
                                  checked={grupos.grp_estado === "I"}/> Inactivo
                              </div>
                          </div>                                                                                                               
                      </form>
                      <span  className='alert'>{aviso}</span>
                  </div>
                  <ModalFooter>
                      <Button color="primary" onClick={toggle_ppal}>Ignora</Button>
                      <Button color="primary" onClick={ActualizaRegistro}>Actualiza</Button>
                  </ModalFooter>
                  </ModalBody>
              </Modal>
          </div>        
      </div>    
  </div>
</div>

)
}


export default GruposForm