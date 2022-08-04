import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
function AbonosForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;
   

    const [startDate, setStartDate] = useState(new Date());
    const [opcion, setOpcion] = useState('')
    const [aviso, setAviso] =useState();
    const [nota1, setNota1] =useState('');
    const [nota2, setNota2] =useState('');
    const [nota3, setNota3] =useState('');
    const [show, setShow]= useState(false)

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

  const [abono, setAbono]= useState('')

  const [cobros, setCobros] = useState({
    id:0, cb_idConcepto:'',
    cp_titulo:'',
    cb_periodo:'',
    cb_cuota:'', 
    cb_saldo:'',
   
  })
    
    useEffect(()=>{
      traeComboPpal(empresa)
    },[])

      // id, us_idEmpresa, us_nombre, us_direccion, us_localidad, us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, us_telefono, us_clave, us_estado, us_nivel

    async function traeComboPpal(empresa){ 
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
      
      const handledSubmit = async (e) => {
        e.preventDefault();
      }

      async function handleSelectChange(e){ 
        let id = e.target.value;
       
        usuarios.forEach(object =>{
        if(object.id == id){ 
          let aplica = "E-mail: " + object.us_email;
          if(object.em_autentica == 'T'){aplica = "Teléfono: " + object.us_telefono;}
          if(object.em_autentica == 'C'){aplica = "Código: " + object.us_codigo;}
          if(object.em_autentica == 'D'){aplica = "Identificación: " + object.us_tipoDoc+' - '+object.us_nroDoc;}
          setNota1(object.us_nombre+ " " + '  (' +aplica+ ')');
                }
        })
        let arg = "deudas|"+empresa+"|"+id
        let url = 'http://localhost:3000/api/pagos?arg='+arg;  
        const res = await axios.get(url)
        .then(res=>{
          misDatos=res.data; 
          setCobros(misDatos);            
        }) 
        let saldo = 0;          
        misDatos.map(dat => {             
           saldo += parseInt(dat.cb_saldo);         
        }) 
        setNota2(' Debe $'+saldo)
        setShow(true);
     }

    const handledChange = ({target: {name, value}}) => {
      setAbono({...abono, [name]: value});
    }

    async function ActualizaRegistro(abono) {
      alert (abono.abono);
    }

      return (
        <div className=''>
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
            </div>
               {show ?  
               <div className="mb-1 row">            
                <div className='div_scroll'>
                  <span> Hola : {nota1} {nota2}</span>
                  <table   className='miTable'>
                    <thead>  
                      <tr key={0}>
                        <th className="">Concepto</th>                            
                        <th className="">Periodo</th> 
                        <th className="">Saldo</th>                             
                      
                      </tr>
                    </thead>
                    <tbody> 
                      {cobros.map((rec, key) =>                
                      <tr key={rec.id}>
                          <td className="trc">{rec.cp_titulo}</td>
                          <td className="trl">{rec.cb_periodo}</td>
                          <td className="trc">{rec.cb_saldo}</td>
                      </tr>    
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='container'>
                    <div className="mb-1 row">
                    <label className="col-sm-5 col-form-label" htmlFor="abono">Valor abono</label>
                        <div className="col-sm-7 trr">
                        <input type="text" className="form-control" name='abono' id="abono" 
                            defaultValue={abono}  onChange={handledChange}/> 
                        </div>
                        <Button onClick={() => ActualizaRegistro(abono)} className='btn btn-sm btn-primary '>Actualiza</Button>
                    </div>
                  </div>
                </div>
              :''}
         
            </form>
      </main>
    
    </div>
  )
}


export default AbonosForm