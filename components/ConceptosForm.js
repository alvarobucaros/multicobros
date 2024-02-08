import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

function ConceptosForm(props) {

    var   [misDatos] = [{}];
    const [numeroPaginas, setNumeroPaginas] = useState(0);    
    var   totalRegistros = 0;
    const [pagina, setPagina] = useState(0);
    const [registros, setRegistros] = useState([{}]);
    const registrosPorPagina = 6;

    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n

    const [conceptos, setConceptos]  = useState({  
        id:0,
        cp_idEmpresa:empresa, 
        cp_titulo:'',
        cp_descripcion:'', 
        cp_fechaDesde:'', 
        cp_fechaHasta:'', 
        cp_valorCobro:0, 
        cp_cuotas:0, 
        cp_valorCuota:0, 
        cp_estado:'A', 
        cp_aplica:'T' 
    })

    const [conceptosW, setConceptosW]  = useState({  
        id:0, cp_idEmpresa:empresa, cp_titulo:'', cp_descripcion:'',
        cp_fechaDesde:'', cp_fechaHasta:'', cp_valorCobro:0, cp_cuotas:0,
        cp_valorCuota:0, cp_estado:'A', cp_aplica:'T' 

    })
  
    const [aviso, setAviso] = useState('');
    const [modalDel, setModalDel] = React.useState(false);
    const toggle_del = () => setModalDel(!modalDel);
    const [modalPpal, setModalPpal] = React.useState(false);
    const toggle_ppal = () => setModalPpal(!modalPpal);

    const [codBorrado, setCodBorrado] = useState('');
    const [detBorrado, setDetBorrado] = useState('');

    // trae datos de la tabla principal   
    useEffect(()=>{
        traeInfo(empresa)
    },[])

    async function traeInfo(empresa){
        let id = empresa;       
        await  axios.get('http://localhost:3000/api/conceptos/'+id)
        .then(res=>{
            misDatos=res.data; 
        })
		// si trae fechas
        for (var i = 0; i < misDatos.length; i++){
            misDatos[i].cp_fechaDesde =  misDatos[i].cp_fechaDesde.slice(0, -14)
            misDatos[i].cp_fechaHasta =  misDatos[i].cp_fechaHasta.slice(0, -14)    
        }
		totalRegistros = misDatos.length;
		let numeroPaginas =  Math.ceil(totalRegistros / registrosPorPagina);
		setNumeroPaginas(numeroPaginas);
        await subPartirTabla(pagina);
       
    }   
    //  Paginación
    async function subPartirTabla(pagina){   
            
            var ini = pagina * registrosPorPagina;
            var fin = ini + registrosPorPagina;
            var tempData = []
            if(fin > totalRegistros) {fin = totalRegistros}
            for (var i = ini; i < fin; i++){
                tempData.push( misDatos[i] );
            }
           setRegistros(tempData)
        }


    async function paginar(op){
        // P primera, A anterior, S siguiente, U ultima

        let  pg = pagina;
        switch (op) { 
          case 'P':      
            pg = 0
         //     break;      
          case 'A':
            pg -= 1;
            if(pg <0){pg = 0}
        //    break;
          case 'S': 
            pg += 1;
            if(pg > numeroPaginas-1) {pg = (numeroPaginas-1)}
      //      break;
          case 'U':  
            pg = (numeroPaginas - 1);
      //      break;   
        }

   setPagina(pg);
   await subPartirTabla(pg);
      }


      function handleShow(rec){
        setDetBorrado(rec.cp_titulo + ' - ' + rec.cp_descripcion);
        setCodBorrado(rec.id)
        setModalDel(!modalDel);
    }
   
    async function handleShowPpal(rec){
        setConceptos(rec)
        setModalPpal(!modalPpal);
    }

    async function ActualizaRegistro () { 
        let err=''
        setAviso(err);
        conceptos.cp_idEmpresa=empresa;      
        if(conceptos.cp_titulo===''){err += 'Falta Título';}
        if(conceptos.cp_descripcion===''){err += ', Falta Descripción';}
        if(conceptos.cp_valorCobro===''){err += ',Falta Valor Cobro';}
        if(conceptos.cp_valorCobro ==0){err += ', Cobro debe ser mayor a cero';}
        if(conceptos.cp_valorCuota===''){err += ', Valor Cuota';}
        if(conceptos.cp_cuotas===0 ){err += ',Falta nro cuotas';} 
        
        if(conceptos.cp_cuotas > 0){
            let tmp = conceptos.cp_valorCuota / conceptos.cp_cuotas ;
            if (tmp != conceptos.cp_valorCuota ){
                err += ', El valor Deuda no es igual a cuotas * valor cuota';
            }
        }
        
        if(conceptos.cp_fechaDesde > conceptos.cp_fechaHasta){err += ', Fecha final mayor a la de inicio ';}
        if (err===''){
        await  axios.post('http://localhost:3000/api/conceptos', conceptos)
        .then( alert('Información actualizada'),()=>{
        })
        traeInfo(empresa)
        setModalPpal(!modalPpal);
        }else{
            setAviso('Nota: '+err);
        }
    }
    
    async function BorraRegistro(){  
        let id="conceptos|"+codBorrado;
        await  axios.delete('http://localhost:3000/api/generales/'+id)
        .then(res=>{
        })
        traeInfo(empresa)
        setModalDel(!modalDel);
    }

    const handledSubmit = async (e) => {
        e.preventDefault();
        aviso = '';
    }
  
    const handledChange = ({target: {name, value}}) => {
        setConceptos({...conceptos, [name]: value});
    }

    const calculaCuota = () => {
        conceptos.cp_valorCuota = 0;
        if (conceptos.cp_cuotas > 0){
        setConceptos.cp_valorCuota = conceptos.cp_valorCobro / conceptos.cp_cuotas;
        }
    }
    return (
    <div>
        <div>
            <table   className='miTable'>
                <thead>  
                    <tr key={0}>
                        <th className="">Titulo</th>                            
                        <th className="">Detalle</th>
                        <th className="">Fecha Desde</th>
                        <th className="">Fecha Hasta</th>
                        <th className="">Valor Total</th>
                        <th className="">Nr Cuotas</th>                          
                        <th className="">Valor Cuota</th>
                        <th className="">Aplica</th> 
                        <th className="">Estado</th>                             
                        <th colSpan='2'>Comandos</th>
                    </tr>
                </thead>
                <tbody> 
                
                {registros.map((rec, key) =>                
                    <tr key={rec.id}>
                        <td className="trc">{rec.cp_titulo}</td>
                        <td className="trl">{rec.cp_descripcion}</td>
                        <td className="trc">{rec.cp_fechaDesde}</td>
                        <td className="trc">{rec.cp_fechaHasta}</td>
                        <td className="trr">{rec.cp_valorCobro}</td>
                        <td className="trc">{rec.cp_cuotas}</td>
                        <td className="trr">{rec.cp_valorCuota}</td>
                        <td className="trc">{rec.cp_aplica}</td>
                        <td className="trc">{rec.cp_estado}</td>
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
                    <button onClick={() => paginar('U')} className='btn btn-outline-primary btn-sm'> &#8614;| </button>                    <button onClick={() => handleShowPpal(conceptosW)} className='btn btn-sm btn-primary '>Nuevo registro</button>        
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
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_titulo">Título</label>
                                    <div className="col-sm-9">
                                    <input type="text" className="form-control" name='cp_titulo' id="cp_titulo" 
                                        defaultValue={conceptos.cp_titulo} onChange={handledChange} /> 
                                    </div>
                                </div>
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_descripcion">Detalle</label>
                                    <div className="col-sm-9">
                                        <textarea className="form-control" name='cp_descripcion' id="cp_descripcion" 
                                        defaultValue={conceptos.cp_descripcion} onChange={handledChange}
                                        rows={3} cols={50}/>
                                    </div>
                                </div>                            
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_valorCobro">Valor Cobro</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control trr" name='cp_valorCobro' id="cp_valorCobro" 
                                        defaultValue={conceptos.cp_valorCobro} onChange={handledChange}/> 
                                    </div>
                                </div>
                                
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_cuotas">Nr Cuotas</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control trr" name='cp_cuotas' id="cp_cuotas" 
                                        defaultValue={conceptos.cp_cuotas} onChange={handledChange}
                                       /> 
                                    </div>
                                </div>                                
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_valorCuota">Valor Cuota</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control trr" name='cp_valorCuota' id="cp_valorCuota" 
                                        defaultValue={conceptos.cp_valorCuota} onChange={handledChange}/> 
                                    </div>
                                </div>
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_fechaDesde">Fecha Inicio</label>
                                    <div className="col-sm-9">
                                    <input type="date" className="form-control trl" name='cp_fechaDesde' id="cp_fechaDesde" 
                                        defaultValue={conceptos.cp_fechaDesde} onChange={handledChange}/> 
                                    </div>
                                </div>
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_fechaHasta">Fecha Final</label>
                                    <div className="col-sm-9">
                                    <input type="date" className="form-control trl" name='cp_fechaHasta' id="cp_fechaHasta" 
                                        defaultValue={conceptos.cp_fechaHasta} onChange={handledChange}/> 
                                    </div>
                                </div>
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_aplica">Aplica</label>
                                    <div className="col-sm-9">
                                        <input type="radio" value="T" name='cp_aplica'
                                        defaultValue={conceptos.cp_aplica} onChange={handledChange}
                                        checked={conceptos.cp_aplica === "T"}/>A Todos
                                        <input type="radio" value="G" name='cp_aplica'
                                        defaultValue={conceptos.cp_aplica} onChange={handledChange}
                                        checked={conceptos.cp_aplica === "G"}/> A un Grupo
                                    </div>
                                </div>                             
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_estado">Estado</label>
                                    <div className="col-sm-9">
                                        <input type="radio" value="A" name='cp_estado'
                                        defaultValue={conceptos.cp_estado} onChange={handledChange}
                                        checked={conceptos.cp_estado === "A"}/> Activo
                                        <input type="radio" value="I" name='cp_estado'
                                        defaultValue={conceptos.cp_estado} onChange={handledChange}
                                        checked={conceptos.cp_estado === "I"}/> Inactivo
                                    </div>
                                </div>   
                                <span  className='alert'>{aviso}</span>                                                                                                            
                            </form>
                          
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
  
  export default ConceptosForm