import axios from 'axios';
import React, { useEffect, useState} from 'react';
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

 
function AbonosForm(props) {
    const empresa = props.e;
    const usuario = props.u;
    const nivel = props.n;
   

    const [startDate, setStartDate] = useState(new Date());
    const [opcion, setOpcion] = useState('')
    const [aviso, setAviso] =useState();
    const [nota1, setNota1] =useState('');
    const [nota2, setNota2] =useState('');
    const [nota3, setNota3] =useState('Imprime comprobante de ingreso ?');
    const [modalDel, setModalDel] =useState(false);
    const toggle_del = () => setModalDel(!modalDel);
    const [modalImp, setModalImp] =useState(false);
    const toggle_imp = () => setModalImp(!modalImp);

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

  const [abono, setAbono] = useState({
    valor:'',
    fecha:'',
    nroAbono:0
  })
  const [saldo, setSaldo] = useState('')
  const [cobros, setCobros] = useState({
    id:0, 
    cb_idConcepto:'',
    cp_titulo:'',
    cb_periodo:'',
    cb_cuota:'', 
    cb_saldo:'',
  })

  const [ingresos, setIngresos] = useState({
    id:0, 
    ig_idEmpresa: empresa,
    ig_fecha: new Date() ,
    ig_tipo:'I' ,
    ig_detalle:'' ,
    ig_numero:'' ,
    ig_documento:'' ,
    ig_idUsuario:'' ,
    ig_valor:'' ,
    ig_saldo:0
  })

  const [empresas, setEmpresas] = useState({  
    id:0,
    em_nombre:'',
    em_direccion:'',
    em_ciudad:'',
    em_tipodoc:'',
    em_nrodoc:'',
    em_telefono:'',
    em_email:'',
    em_observaciones:'',
    em_autentica:'',
    em_consecRcaja:'',
    em_consecEgreso:'',
    em_consecAjustes:'',
    em_fchini:'',
    em_estado:'',
    em_saldo:0
});
  const[usuAplica, setUsuAplica] = useState(0);
    
    useEffect(()=>{
      traeComboPpal(empresa)
      traeEmpresa(empresa)
    },[])

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
      
    async function traeEmpresa(empresa){ 
      await  axios.get('http://localhost:3000/api/empresas/'+empresa)
      .then(res=>{
        misDatos=res.data[0];     
        setEmpresas(misDatos) 
      })
    }

      const handledSubmit = async (e) => {
        e.preventDefault();
      }

      async function handleSelectChange(e){ 
        let id = e.target.value;
        setUsuAplica(id);       
        usuarios.forEach(object =>{
        if(object.id == id){ 
          let aplica = "E-mail: " + object.us_email;
          if(object.em_autentica == 'T'){aplica = "Teléfono: " + object.us_telefono;}
          if(object.em_autentica == 'C'){aplica = "Código: " + object.us_codigo;}
          if(object.em_autentica == 'D'){aplica = "Identificación: " + object.us_tipoDoc+' - '+object.us_nroDoc;}
          setNota1(object.us_nombre+ " " + '  (' +aplica+ ')');
          traeCobros(id)
          }
        })

 
     }

     async function traeCobros(id){
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
      setNota2(' Debe $'+saldo.toLocaleString())
      setSaldo(saldo)
      
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
      //  return [year, month, day].join('-');
    
      let fecha = [day, month, year].join('-');
      abono.fecha=fecha; 
     
      setShow(true);
     }

    const handledChange = ({target: {name, value}}) => {
      setAbono({...abono, [name]: value});
    }

    function ActualizaRegistro(abono) {
      setAviso('Valor a pagar $'+abono.abono)
      setModalDel(!modalDel);
    }

    async function Continua(){
      let valor = abono.abono;
      let usu = usuAplica    
      let arg = 'aplica|'+empresa+'|'+usu+'|'+valor;
      let url = 'http://localhost:3000/api/pagos?arg='+arg;
      await  axios.post(url)
      .then(res=>{
        let misDatos=res.data[0].mensaje; 
          let nota=''; 
          let swtSiga=true;
          let arr = misDatos.split('|');
          for (let index = 1; index < arr.length; index++) {
            let arreglo = arr[index].split(',');
            if(arreglo[0] == 'T'){
              if(swtSiga){ nota +=' Pago Cuota '}
              swtSiga=false;
              nota+= ' '+arreglo[2]+' ';
            }
            else{
              nota +=' Abono de '+ arreglo[3].toLocaleString() + ' a cuota '+ arreglo[2]}
          }

          if(valor > saldo){
            let anticipo = valor - saldo;
            alert('El abono se '+ valor+ ' Es mayor a la deuda de '+ saldo + ' crea un anticipo de '+ anticipo)
            nota += ' Anticipo de '+ anticipo;
          }

          abono.nroAbono=empresas.em_consecRcaja+1;
          ingresos.ig_detalle=nota;
          ingresos.ig_idUsuario=usu;
          ingresos.ig_valor=valor;
          ingresos.ig_fecha=abono.fecha;
          ingresos.ig_numero=abono.nroAbono;
          
          alert(nota);
          setModalDel(false);
          traeCobros(usu);
          setAbono(0);
          grabaIngresos(ingresos);
          actualizaEmpresa();
          setModalImp(!modalImp);
      })
    }

    async function grabaIngresos(ingresos){
      await  axios.post('http://localhost:3000/api/ingreGasto', ingresos)
      .then(res=>{
        let misDatos=res.data[0]; 
      })
      alert('Imprime ingreso # '+misDatos.id)
    }
  
    async function actualizaEmpresa(){
      let arg = 'ingre|'+empresa+'|'+abono.nroAbono;
      let url = 'http://localhost:3000/api/empresas?arg='+arg;
      await  axios.post(url)
      .then( ()=>{
      })
    }


    function Imprime(){
      empresas.em_consecRcaja += 1;
      alert ('Imprime r.Caja Nr' + empresas.em_consecRcaja);
      setModalImp(!modalImp);
    }
      return (
        <div className=''>
          <main className="w-800 ml-10">
          <form onSubmit={handledSubmit}>
            <div className="div_select">
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
                <div className='div_select mn-flex'>
                    <div className="mt-10">
                      <label className="" htmlFor="abono">Valor abono</label>   
                      </div>
                    <div className="div-right"> 
                      <input type="text" className="form-control" name='abono' id="abono" 
                        defaultValue={abono.valor}  onChange={handledChange}/> 
                    </div>
                    <div className="">
                      <label className="" htmlFor="fecha">Fecha abono</label>
                      </div>
                    <div className="div-right">
                      <input type="date" className="form-control" name='fecha' id="fecha" 
                          defaultValue={abono.fecha}  onChange={handledChange}/> 
                    </div>
                    <div className="">                      
                      <Button onClick={() => ActualizaRegistro(abono)} className='btn-sm btn-primary '>Actualiza</Button>
                    </div>
                  </div>
                </div>
              :''}
         
            </form>
            <div className='modal1'>    
              <Modal isOpen={modalDel} toggle_del={toggle_del}>
              <ModalHeader  toggle_del={toggle_del}>Abono a cuenta </ModalHeader>
                  <ModalBody>
                  <span> {aviso} </span>
                  <div>
                      <Button color="primary" onClick={toggle_del}>NO</Button>
                      <Button color="primary" onClick={Continua}>SI</Button>
                  </div>
                  </ModalBody>
              </Modal>
            </div>
            <div className='modal1'>    
              <Modal isOpen={modalImp} toggle_imp={toggle_imp}>
              <ModalHeader  toggle_imp={toggle_imp}> Impresión</ModalHeader>
                  <ModalBody>
                  <span> {nota3} </span>
                  <div>
                      <Button color="primary" onClick={toggle_imp}>NO</Button>
                      <Button color="primary" onClick={Imprime}>SI</Button>
                  </div>
                  </ModalBody>
              </Modal>
            </div>
      </main>
    
    </div>
  )
}


export default AbonosForm