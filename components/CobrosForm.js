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

    const [startDate, setStartDate] = useState(new Date());
    const [opcion, setOpcion] = useState('')
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
  
  const [conceptosW, setConceptosW]  = useState({ 
    id:0, cp_idEmpresa:empresa, cp_titulo:'', cp_descripcion:'',  cp_fechaDesde:'', 
    cp_fechaHasta:'', cp_valorCobro:'', cp_valorCuota:'', cp_estado:'', cp_aplica:''}) 

    const [cpto, setCpto] = useState([])
    const [notas, setNotas] = useState('')


    useEffect(()=>{
        traeComboPpal(empresa)
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

async function traeCpto(id)
  {
    const res =await  axios.post('http://localhost:3000/api/conceptos/'+id)
    .then(res=>{
      misDatos=res.data;       
    });
      setConceptosW(misDatos[0]);

      if(conceptosW.cp_aplica === 'G'){
        traeGrupos;
      }
      setListo(true)
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
    

      async function traeGrupos() {
        console.log('trae grupos + ' + empresa)
      }
      
      const handledChange = ({target: {name, value}}) => {
        setConceptos({...conceptos, [name]: value});
      }
      
      const handledSubmit = async (e) => {
        e.preventDefault();
      }

      async function handleSelectChange(e) {
        let id = e.target.value;
        conceptos.forEach(object =>{
        if(object.id == id){ 
          let aplica = "Aplica para todos";
          if(object.cp_aplica == 'G'){aplica = "Aplica solo a un grupo"}
          setNota1(object.cp_titulo+ " " + object.cp_descripcion+ '  (' +aplica+ ')');
          setNota2('Valor Deuda $'+ object.cp_valorCobro.toLocaleString("en-US", {style:"currency", currency:"USD"}) + " Valor cuota $"+ object.cp_valorCuota.toLocaleString("en-US", {style:"currency", currency:"EUR"}));
          setNota3('Vigencia : del '+ object.cp_fechaDesde.toLocaleString("es-US") + " al "+ object.cp_fechaHasta);  
          setListo(true);
        }
        })
    }

  return (
    <div className='container'>
      <form onSubmit={handledSubmit}>
          <div className="mb-1 row">
              <label className="col-sm-3 col-form-label" htmlFor="cp_titulo">Concepto</label>
              <div className="col-sm-9">            
                <select id='estado' name='estado' className='form-control'
                  onChange={e => handleSelectChange(e)}
                  defaultValue={conceptos.id} >
                    <option key={0} value={0}> Seleccione un concepto</option>
                    {cpto.map((cp)=>(
                  <option key={cp.id} value={cp.id}> {cp.cp_titulo} - {cp.cp_descripcion}</option>
                  
                  ))} 
                </select> 
              </div>
          </div>
        { listo ?
          <div className='container'>
            <div className="d-flex align-items-sm-center">
              <span>{nota1} </span></div>
            <div className="d-flex align-items-sm-center">
            <span>{nota2} </span></div>
            <div className="d-flex align-items-sm-center">
            <span>{nota3} </span></div>      
          </div>:''}
      </form>
    </div>

  )
}


export default CobrosForm