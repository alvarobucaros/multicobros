import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Image from 'next/image';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

function CobrosForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;

    var   [misDatos] = [{}];
    const [listo, setListo] = useState(false)
    const [swtGrupo, setSwtGrupo] = useState(false)
    const [swtProcesa, setSwtProcesa] = useState(false)
    const [swtLoad, setSwtLoad] = useState(false)
    const [aviso, setAviso] =useState();
    const [nota1, setNota1] =useState('');
    const [nota2, setNota2] =useState('');
    const [nota3, setNota3] =useState('');
    const [modalDel, setModalDel] = React.useState(false);
    const toggle_del = () => setModalDel(!modalDel);

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
  
    const[ctaXcobrar, setCtaXcobrar] = useState({
      id:0,
      cc_idEmpresa:0,
      cc_idConcepto:0 ,
      cc_idGrupo:0,
      cc_fechaProceso: new Date(),
      cc_valor:0,
      cc_saldo:0,
      cc_activa:'',
      cc_aplica:''
    })



    const [cpto, setCpto] = useState([])
    const [notas, setNotas] = useState('')
    const [grpo, setGrpo] = useState([])
   
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

  async function traeCuentasXcobrar(empresa){
    ctaXcobrar.cc_idEmpresa = empresa;    
    let cp =  setCtaXcobrar.cc_idConcepto;
    let gr = setCtaXcobrar.cc_idGrupo 
    let url = 'http://localhost:3000/api/cuentasXcobrar?e='+empresa+'&cp='+cp+'&gr='+gr+'&op=existe';   
    await  axios.get(url)
    .then(res=>{
        misDatos=res.data; 
        if( misDatos.length === 0)  {
          ActualizaCobros()
        }
        else{
          let nota = 'Hay cobros pendientes del '
          let saldo = 0;          
          misDatos.map(dat => {             
             nota += dat.cc_fechaProceso.slice(0, 7)+ ', ';
             saldo += parseInt(dat.saldo);         
            })
          nota += ' por $'+ saldo
          setAviso(nota)
          handleShow(nota);
        }
    })
  }

  const Continua = () => {
    setModalDel(false);
    ActualizaCobros()
  }

  async function  ActualizaCobros() {
    setSwtLoad(true);
    let cp =  setCtaXcobrar.cc_idConcepto;
    let gr = setCtaXcobrar.cc_idGrupo 
    let arg = "ctaVlr|"+empresa+"|"+cp+"|"+gr
    let url = 'http://localhost:3000/api/cuentasXcobrar?arg='+arg;   
    await  axios.post(url)
    .then(res=>{
      misDatos=res.data; 
      
    let fecha = misDatos[0].cp_fechaDesde.slice(0, 7)
    let cuota = misDatos[0].cp_cuotas
    let valor = misDatos[0].cp_valorCuota
   alert('CREA CUENTAS CON '+empresa+'|'+cp+'|'+gr+'|'+fecha+'|'+cuota+'|'+valor)
     
    })
    setSwtLoad(false);
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
        setSwtLoad(false);
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
    
      setCtaXcobrar.cc_aplica=object.cp_aplica;
      if(object.cp_aplica == 'G'){
        aplica = "Aplica solo a un grupo";
        setSwtGrupo(true);
      }else
      {
        setSwtProcesa(true)
      }
      setNotas(aplica)
      setNota1(object.cp_titulo+ " " + object.cp_descripcion);
      setNota2('Valor Deuda $'+ object.cp_valorCobro.toLocaleString("en-US", {style:"currency", currency:"USD"}) + " paga en " + object.cp_cuotas + " cuota(s) cada una de  $"+ object.cp_valorCuota.toLocaleString("en-US", {style:"currency", currency:"EUR"}));
      setNota3('Vigencia : del '+ object.cp_fechaDesde.split('T')[0] + " al "+ object.cp_fechaHasta.split('T')[0]);  
      setListo(true);
    }

    const handleSelectChangeGrpo = (e) =>{
      let id = e.target.value;
      setCtaXcobrar.cc_idGrupo = id;
      setSwtProcesa(true)
    }


    const procesar = () => {
        traeCuentasXcobrar(empresa)
    }


    function handleShow(rec){
      setModalDel(!modalDel);
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
                  defaultValue={setCtaXcobrar.cc_idConcepto} >
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
            <div className="trc"><button onClick={() => procesar()} className='btn btn-sm btn-primary '>Procesa..</button></div>
            :''}
            {swtLoad ?
          <div className='col-xs-8'><Image className="mb-12 rounded strong" src="/loader.gif" alt="" width="80" height="70"/>
          </div>
          :''}
      </form>
      <div className='modal1'>    
          <Modal isOpen={modalDel} toggle_del={toggle_del}>
          <ModalHeader  toggle_del={toggle_del}>Continua con el proceso ?? </ModalHeader>
              <ModalBody>
              <span> {aviso} </span>
              <div>
                  <Button color="primary" onClick={toggle_del}>NO</Button>
                  <Button color="primary" onClick={Continua}>SI</Button>
              </div>
              </ModalBody>
          </Modal>
      </div>
    </div>

  )
}


export default CobrosForm