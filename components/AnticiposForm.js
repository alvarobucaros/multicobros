import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button} from "reactstrap"


function AnticiposForm(props) {
  const empresa = props.e;
  const usuario = props.u;
  const nivel = props.n;
  const[usu, setUsu] = useState(0)

  const [startDate, setStartDate] = useState(new Date());
  const [opcion, setOpcion] = useState('')
  const [aviso, setAviso] =useState();
  const [nota1, setNota1] =useState('');
  const [nota2, setNota2] =useState('');
  const [nota3, setNota3] =useState('');

  var   [misDatos] = [{}];
  const [usrs, setUsrs] = useState([])
  const [anticipos, setAnticipos] = useState([])

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
  
const [abono, setAbono] = useState({
  id:0,
  an_idEmpresa:'',
  an_idUsuario:'',
  an_Fecha:'',
  an_Valor:'',
  an_Saldo:''
})

const [ingregastos, setIngregastos] = useState({
  id:0, 
  ig_idEmpresa:0, 
  ig_idUsuario:0, 
  ig_tipo:'I', 
  ig_numero:0, 
  ig_Fecha:'', 
  ig_periodo:'', 
  ig_detalle:'', 
  ig_Documento:'', 
  ig_debito:0, 
  ig_credito:0, 
  ig_tercero:'', 
  ig_procesado:'N'
})

const [usuEmpre, setUsuEmpre] = useState({
  us_nombre:'',
  us_tipoDoc:'',
  us_nroDoc:'',
  em_consecRcaja:'',
  em_saldo:0
})

  useEffect(()=>{
    traeComboPpal(empresa)
  },[])

    // id, us_idEmpresa, us_nombre, us_direccion, us_localidad, us_barrio, us_ciudad, us_email, us_codigo, us_tipoDoc, us_nroDoc, us_telefono, us_clave, us_estado, us_nivel

    async function traeComboPpal(empresa){ 
      let arg = "abono|"+empresa+"||";
      const ruta = "http://localhost:3000/api/usuarios?arg="+arg;
      const res = await axios.get(ruta)
      .then(res=>{
          misDatos=res.data;               
          setUsuarios(misDatos) 
          setUsrs(misDatos.map(dat => {
            let properties = {
              "id": dat.id,
              "us_nombre": dat.us_nombre,
              "us_telefono":dat.us_telefono,
              "us_email":dat.us_email
            };
            return properties;
           }));             
      })
    }

    async function traeInfoUsuarios(usu){ 
      let arg = "usuEmpresa|"+empresa+"|"+usu+"|";
      const ruta = "http://localhost:3000/api/usuarios?arg="+arg;
      const res = await axios.get(ruta)
      .then(res=>{
          misDatos=res.data;                    
          setUsuEmpre(misDatos) 
          misDatos.map(dat => {            
            usuEmpre.us_nombre = dat.us_nombre,
            usuEmpre.us_tipoDoc = dat.us_tipoDoc,
            usuEmpre.us_nroDoc = dat.us_nroDoc,
            usuEmpre.em_consecRcaja = dat.em_consecRcaja,
            usuEmpre.em_saldo = dat.em_saldo
           });
           alert('traeInfoUsuarios ' + usuEmpre.us_nombre + ' ' + usuEmpre.us_nroDoc )           
      })
    }

    function ActualizaRegistro() {
      let err=''
      if(abono.an_Valor===''){err += 'Falta Valor Anticipo\n';}
      if(abono.an_Fecha===''){err += 'Falta fecha';}
      if (err === ''){
        abono.an_idEmpresa=empresa;   
        abono.an_idUsuario=usu; 
        abono.an_Saldo = abono.an_Valor
      }else{
        alert(err);
      }
      traeInfoUsuarios(usu);
      alert('ActualizaRegistro   ' + usuEmpre.us_nombre + ' ' +usuEmpre.us_nroDoc)
    }
    
    const handledChange = ({target: {name, value}}) => {
      setAbono({...abono, [name]: value});
    }
    
    const handledSubmit = async (e) => {
      e.preventDefault();
    }

    async function handleSelectChange(e){
      let id = e.target.value;   
      setAviso("");
      setUsu(id);
      let arg = "anticipo|"+empresa+"|"+id+"|";
      const ruta = "http://localhost:3000/api/usuarios?arg="+arg;
      const res = await axios.get(ruta)
      .then(res=>{
        misDatos=res.data;
        setAnticipos(misDatos) 
        if (misDatos.length > 0){ 
          misDatos.map(dat => {    
            setAviso("Tiene un anticipo del " + dat.an_Fecha.slice(0, -14)  + 
            " Por $ " + parseInt(dat.an_Saldo).toLocaleString('en-US', 0) )                 
            }) 
        }   
    })

    }

    return (
    <div className=''>
      <main className="w-800 ml-10">
        <form  onSubmit={handledSubmit}>
          <h3>Anticipos</h3>
          <div className="div_select">
              <label className="col-sm-2 col-form-label" htmlFor="us_nombre">Deudor:</label>
              <div className="col-sm-10">            
                <select id='us_nombre' name='us_nombre' className='form-control'
                  onChange={e => handleSelectChange(e)}
                  defaultValue={usrs.id} >
                  <option key={0} value={0}> Seleccione un deudor</option>
                  {usrs.map((usr)=>(
                  <option key={usr.id} value={usr.id}> {usr.us_nombre} - cel: {usr.us_telefono}, { } e-mail: {usr.us_email}</option>                
                  ))} 
                </select> 
              </div>
          </div>
          <div  className="avisoAnticipo">
          <span> {aviso} </span>  
          </div >
                            
     
            <div className='div_select mn-flex'>
                <div className="mt-10">
                  <label className="" htmlFor="an_Valor">Valor anticipo</label>   
                  </div>
                <div className="div-right"> 
                  <input type="text" className="form-control trr" name='an_Valor' id="an_Valor" 
                    defaultValue={abono.an_Valor}  onChange={handledChange}/> 
                </div>
                <div className="">
                  <label className="" htmlFor="an_Fecha">Fecha abono</label>
                  </div>
                <div className="div-right">
                  <input type="date" className="form-control" name='an_Fecha' id="an_Fecha" 
                      defaultValue={abono.an_Fecha}  onChange={handledChange}/> 
                </div>
                <div className="">                      
                <Button color="primary" onClick={ActualizaRegistro}>Actualiza</Button>
                </div>
              </div>
       
            
        
        </form>
   
      </main>
    </div>
)
}


export default AnticiposForm