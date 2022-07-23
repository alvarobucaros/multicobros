import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ConceptosForm(props) {

    var   [misDatos] = [{}];
    const [registros, setRegistros] = useState([{}]);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const registrosPorPagina = 6;
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [pagina, setPagina] = useState(0);
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
        cp_valorCuota:0, 
        cp_estado:'A', 
        cp_aplica:'T' 
    })

    const [conceptosW, setConceptosW]  = useState({  
        id:0,         cp_idEmpresa:empresa,         cp_titulo:'',
        cp_descripcion:'',         cp_fechaDesde:'',         cp_fechaHasta:'', 
        cp_valorCobro:0,         cp_valorCuota:0,         cp_estado:'A',         cp_aplica:'T' 

    })
    const [desdeDate, setDesdeDate] = useState(new Date());
    const [hastaDate, setHastaDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [aviso, setAviso] = useState('')

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
          //  setRegistros(misDatos)
            let totalRegs = misDatos.length;
            setTotalRegistros(totalRegs);
            setNumeroPaginas( Math.ceil(totalRegs / registrosPorPagina));
            var libros =  subTablaPartir(pagina);
           // setRegistros(libros)
  alert('#### setT '+totalRegistros+' tot'+totalRegs+' npag'+numeroPaginas)
        })
    }   
    //  Paginación
    async function subTablaPartir(pagina){       
            var ini = pagina * registrosPorPagina;
            var fin = (ini + registrosPorPagina) ;
            var xdatos = [{}]
            let j=0;
            if(fin > totalRegistros) {fin = totalRegistros}
alert('valores pg='+pagina+' i'+ini+' f '+fin);
             for (var i = ini; i < fin; i++){
                xdatos[j] = misDatos[i];
                j+=1;
            }
           setRegistros(xdatos)
           // return xdatos; //misDatos;
        }


    async function paginar(op){
        // 0 primera, 9 ultima, 1 siguiente, 2 anterior, 0 ninguna
        let pg = pagina;
        alert(op)
        switch (op) {
           
          case 2:
            if (pg > 0){
                pg -= 1;
            }
            if(pg <0){pg = 0}
        //    break;
          case 0:      
          pg = 0
       //     break;
          case 1: 
            if (pg < (numeroPaginas-1)){
                pg += 1;
            }
            if(pg >= numeroPaginas-1) {pg = (numeroPaginas-1)}
      //      break;
          case 9:  
          pg = (numeroPaginas - 1);
      //      break;   
        }
        setPagina(pg);
        subTablaPartir(pg);
        // var libros = subTablaPartir(pagina);
        // setRegistros(libros, [])
      }

           // Fecha de ISO a amd
     async function fecha(fch){
        var fecha = Date('MM/dd/YYY')
       
         if (fch != null && fch !== undefined) {
            fecha = fch.toLocaleDateString("en-US")  // m/d/a
            fch = fecha.split('/')
            fch = fch[2]+'/'+fch[0]+'/'+fch[1]
        }else{
            fch=new Date();
        }
       return fch;
    }
      function handleShow(rec){
        setDetBorrado(rec.cp_titulo + ' - ' + rec.cp_descripcion);
        setCodBorrado(rec.id)
        setModalDel(!modalDel);
    }
   
    async function handleShowPpal(rec){
        setConceptos(rec)
        if(conceptos.id > 0){
            setDesdeDate(await fecha(conceptos.cp_fechaDesde))
            setHastaDate(await fecha(conceptos.cp_fechaHasta))
        }
        setModalPpal(!modalPpal);
    }

    async function ActualizaRegistro () { 
        let err=''
        conceptos.cp_idEmpresa=empresa;
        conceptos.cp_fechaDesde = await fecha(desdeDate)
        conceptos.cp_fechaHasta = await fecha(hastaDate)
        if(conceptos.cp_titulo===''){err += ', Título';}
        if(conceptos.cp_descripcion===''){err += ', Descripción';}
        if(conceptos.cp_valorCobro===''){err += ', Valor Cobro';}
        if(conceptos.cp_valorCobro===0){err += ', Cobro debe ser mayor a cero';}
        if(conceptos.cp_valorCuota===''){err += ', Valor Cuota';}
        if(conceptos.cp_valorCuota===0){err += ', Cuota debe ser mayor a cero';}
        if(conceptos.cp_fechaDesde > conceptos.cp_fechaHasta){err += ', Fecha final mayor a la de inicio ';}
        if (err===''){
        await  axios.post('http://localhost:3000/api/conceptos', conceptos)
        .then( alert('Información actualizada'),()=>{
        })
        traeInfo(empresa)
        setModalPpal(!modalPpal);
        }else{
            setAviso('Falta '+err)
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
        setAviso('');
    }
  
    const handledChange = ({target: {name, value}}) => {
        setConceptos({...conceptos, [name]: value});
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
                        <td className="trc">{rec.cp_periodoDesde}</td>
                        <td className="trc">{rec.cp_periodoHasta}</td>
                        <td className="trr">{rec.cp_valorCobro}</td>
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
                    <button onClick={() => paginar(0)} className='boton btn'> |&#8612; </button>
                    <button onClick={() => paginar(2)} className='boton btn'> &larr; </button>
                    <button onClick={() => paginar(1)} className='boton btn'> &rarr; </button>
                    <button onClick={() => paginar(9)} className='boton btn'> &#8614;| </button>
                    <button onClick={() => handleShowPpal(conceptosW)} className='btn btn-sm btn-primary '>Nuevo registro</button>        
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
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_valorCuota">Valor Cuota</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control trr" name='cp_valorCuota' id="cp_valorCuota" 
                                        defaultValue={conceptos.cp_valorCuota} onChange={handledChange}/> 
                                    </div>
                                </div>
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_fechaDesde">Fecha Inicio</label>
                                    <div className="col-sm-9">
                                    <DatePicker selected={desdeDate} onChange={(date) => setDesdeDate(date)} />
                                    </div>
                                </div>
                                <div className="mb-1 row">
                                    <label className="col-sm-3 col-form-label" htmlFor="cp_hastaDesde">Fecha Final</label>
                                    <div className="col-sm-9">
                                    <DatePicker selected={hastaDate} onChange={(date) => setHastaDate(date)} />
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
  
  export default ConceptosForm