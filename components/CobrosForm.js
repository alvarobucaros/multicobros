import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConceptosForm from './ConceptosForm';

function CobrosForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;

    var   [misDatos] = [{}];
    const[listo, setListo] = useState(false)
    const [swtGrupo, setSwtGrupo] = useState(false)
    const [swtProcesa, setSwtProcesa] = useState(false)
    const [aviso, setAviso] =useState();
    const [nota1, setNota1] =useState('');
    const [nota2, setNota2] =useState('');
    const [nota3, setNota3] =useState('');

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
  
 const[ctaXcobrar, setCtaXcobrar] = useState({
  id:0, 
  cc_idEmpresa:empresa ,
  cc_idConcepto:0 ,
  cc_idGrupo:0 ,
  cc_fechaProceso: new Date(),
  cc_valor:0,
  cc_saldo:0,
  cc_activa:''
 })



    const [cpto, setCpto] = useState([])
    const [notas, setNotas] = useState('')
    const [grpo, setGrpo] = useState([])
    var grupoId = 0;
    var conceptoId = 0

    useEffect(()=>{
        traeComboPpal(empresa);
        traeGrupos(empresa);
    },[])
      
    async function traeComboPpal(empresa){ 
      let id = empresa;       
      await  axios.post('http://localhost:3000/api/conceptos/'+id)
      .then(res=>{
          misDatos=res.data;               
          setConceptos(misDatos) 
          setCpto(misDatos.map(dat => {
            let properties = {
              "id": dat.id,
              "cp_titulo": dat.cp_titulo,
              "cp_descripcion":dat.cp_descripcion
            };
            return properties;
            }));             
      })
    }

async function traeGrupos(id)
  {
    await  axios.get('http://localhost:3000/api/grupos/'+id)
    .then(res=>{
        misDatos=res.data; 
        setGrpo(misDatos.map(dat => {
          let properties = {
            "id": dat.id,
            "grp_nombre": dat.grp_nombre,
            "grp_detalle":dat.grp_detalle
          };
          return properties;
          }));      
    })
  }

      const ActualizaRegistro= async (e) => {
        e.preventDefault();
        setAviso('')
      }

      async function fecha(fch){
     
          if (fch != null && fch !== undefined) {
              fch = fch.split('T')[0]
          }else{
              fch=new Date();
          }
          return fch;
      }
      
      const handledSubmit = async (e) => {
        e.preventDefault();
      }

      async function handleSelectChangeCpto(e) {
        let id = e.target.value;
        setCtaXcobrar.cc_idConcepto= id;
        setCtaXcobrar.cc_idGrupo= 0;
        conceptos.forEach(object =>{
          if(object.id == id){ 
            mostrarValores(object)
          }
        })
    }

    async  function mostrarValores(object){
      let aplica = "Aplica para todos";
      setSwtGrupo(false)
      setSwtProcesa(false)
      grupoId=0;
      if(object.cp_aplica == 'G'){
        aplica = "Aplica solo a un grupo";
        setSwtGrupo(true);
      }else
      {
        setSwtProcesa(true)
      }
      setNotas(aplica)
      setNota1(object.cp_titulo+ " " + object.cp_descripcion);
      setNota2('Valor Deuda $'+ object.cp_valorCobro.toLocaleString("en-US", {style:"currency", currency:"USD"}) + " Valor cuota $"+ object.cp_valorCuota.toLocaleString("en-US", {style:"currency", currency:"EUR"}));
      setNota3('Vigencia : del '+ object.cp_fechaDesde.split('T')[0] + " al "+ object.cp_fechaHasta.split('T')[0]);  
      setListo(true);
    }

    const handleSelectChangeGrpo = (e) =>{
      let id = e.target.value;
      setCtaXcobrar.cc_idGrupo= id;
     setSwtProcesa(true)
      alert('Grupo : '+id);
    }


    const procesar = () => {
alert ('Procesa el concepto :' + setCtaXcobrar.cc_idConcepto + ' con el grupo: '+setCtaXcobrar.cc_idGrupo)
    }

  return (
    <div className='container'>
      <form onSubmit={handledSubmit}>
          <div className="mb-1 row">
              <label className="col-sm-1 col-form-label" htmlFor="cp_titulo">Concepto</label>
              <div className="col-sm-9">            
                <select id='estado' name='estado' className='form-control'
                  onChange={e => handleSelectChangeCpto(e)}
                  defaultValue={conceptos.id} >
                    <option key={0} value={0}> Seleccione un concepto</option>
                    {cpto.map((cp)=>(
                  <option key={cp.id} value={cp.id}> {cp.cp_titulo} - {cp.cp_descripcion}</option>
                  
                  ))} 
                </select> 
              </div>
          </div>
        { listo ?
        <div>
            <div className='container'>
              <div className="d-flex align-items-sm-center">
                <span>{nota1} </span>  <strong className='strong'> ( {notas} )</strong></div>
              <div className="d-flex align-items-sm-center">
              <span>{nota2} </span></div>
              <div className="d-flex align-items-sm-center">
              <span>{nota3} </span></div>      
            </div>
            { swtGrupo ?
            <div className="mb-1 row">
            <label className="col-sm-1 col-form-label" htmlFor="cp_titulo">Grupo</label>
              <div className="col-sm-9">            
                <select id='grupo' name='grupo' className='form-control'
                  onChange={e => handleSelectChangeGrpo(e)}
                  defaultValue={grupoId} >
                    <option key={0} value={0}> Seleccione un grupo</option>
                    {grpo.map((cp)=>(
                  <option key={cp.id} value={cp.id}> {cp.grp_nombre} - {cp.grp_detalle}</option>
                  
                  ))} 
                </select> 
              </div>
              </div>
            :''}
          </div>          
          :''}
          {swtProcesa ?  
            <div className="trc"><button onClick={() => procesar()} className='btn btn-sm btn-primary '>Procesa</button></div>
            :''}

      </form>
    </div>

  )
}


export default CobrosForm