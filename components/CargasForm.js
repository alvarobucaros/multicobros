import React, {useState, setState} from 'react';
import { useRouter } from 'next/router'
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import md5 from 'js-md5'
import axios from 'axios';

function CargasForm() {
  const router = useRouter()
  
  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.a;

  const tablaCarga = [
    {id:1,codigo:'Conceptos', detalle:'Conceptos de cobro',nota:'datos'},
    {id:2,codigo:'Grupos', detalle:'Grupos de usuarios',nota:'datos'},
    {id:3,codigo:'Ingresos Gastos', detalle:'Detalles de ingresos y gastos',nota:'datos'},
    {id:4,codigo:'Usuarios', detalle:'Usuarios',nota:'Nombre, Email, Dirección, Barrio, Ciudad, TipoDoc, NroDoc, Código, Teléfono'}
  ]
  const tablaDesCarga = [
    
      {id:1,codigo:'Anticipos', detalle:'Pagos anticipados'},
      {id:2,codigo:'Conceptos', detalle:'Conceptos de cobro'},
      {id:3,codigo:'Deudas', detalle:'Deudas pendientes de cobro'},
      {id:4,codigo:'Grupos', detalle:'Grupos de usuarios'},
      {id:5,codigo:'GruposUser', detalle:'Grupos de usuarios'},
      {id:6,codigo:'Ingresos Gastos', detalle:'Detalles de ingresos y gastos'}
  ]

  const [users, setUsers] = useState({  
    id:0,
    us_nombre:'',
    us_email:'',
    us_clave:'',
    us_idEmpresa:e,
    us_direccion:'',
    us_barrio:'',
    us_ciudad:'',
    us_localidad:'',
    us_tipoDoc:'',
    us_nroDoc:'',
    us_codigo:'',
    us_telefono:'',
    us_nivel:'C',
    us_estado:'A'
});

var usersWk = {
  id:0,
  us_nombre:'',
  us_email:'',
  us_clave:'',
  us_idEmpresa:e,
  us_direccion:'',
  us_barrio:'',
  us_ciudad:'',
  us_localidad:'',
  us_tipoDoc:'',
  us_nroDoc:'',
  us_codigo:'',
  us_telefono:'',
  us_nivel:'C',
  us_estado:'A'
}

  // const handledSubmit = async (e) => {
  //   e.preventDefault();
  //   setAviso('');
  // }

  async function creaUsuarios(data){
        // alert(data.us_codigo+' '+data.us_clave+' '+data.us_email);  
        await  axios.post('http://localhost:3000/api/cargaDatos/'+data)
        .then(res=>{
            misDatos=res.data; 
        })
          
  }

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        const myJSON = JSON.stringify(resp);
        let position = myJSON.search('"cols"') - 3;
        let myjs = myJSON.substring(10, position).split("],[");
      //  const myArray = text.split("],[");
      var col='';
      var fila = '';
      var data = '';
      var dt = '';
        for (let index = 1; index < myjs.length; index++) {
          col = myjs[index].split(",");

          fila= '';
          for (let i = 0; i < col.length; i++) {
            fila += col[i].replace(/"/g, "'")+',';  
          }
          fila += 'A,0';  
          dt = fila.split(",");
  
          // Nombre	Email	Dirección	Barrio	Ciudad	TipoDoc	NroDoc	Código	Teléfono
         
          // data = dt[0].trim()+','+dt[1].trim()+",'"+md5(dt[8])+"','"+e+"',"+dt[2].trim()+
          // ','+dt[3].trim()+','+dt[4].trim()+','+"'',"+dt[5].trim()+",'"+dt[6].trim()+
          // "',"+dt[7].trim()+",'"+dt[8].trim()+"','C','A'";
          // setUsers= data;
      
          usersWk.us_nombre=dt[0].trim();
          usersWk.us_email=dt[1].trim();
          usersWk.us_clave=md5(dt[8]);
          usersWk.us_direccion=dt[2].trim();
          usersWk.us_barrio=dt[3].trim();
          usersWk.us_ciudad=dt[4].trim();
          usersWk.us_localidad='';
          usersWk.us_tipoDoc=dt[5].trim();
          usersWk.us_nroDoc=dt[6].trim();
          usersWk.us_codigo=dt[7].trim();
          usersWk.us_telefono=dt[8].trim();
          usersWk.us_nivel='C';
          usersWk.us_estado='A';

        // alert(usersWk.us_idEmpresa+' '+usersWk.us_nombre);
         creaUsuarios(usersWk);
          //(us_nombre,us_email,us_clave,us_idEmpresa,us_direccion,us_barrio,us_ciudad,us_localidad,
          // us_tipoDoc, us_nroDoc,us_codigo,us_telefono,us_nivel,us_estado)
          
         // 'Jacinto Contreras','ja@gmail.com','202cb962ac59075b964b07152d234b70','2','cra 56','Las Juntas','Bogotá','',
         // 'C','1213','AP01','123','C','A'

        }
      }
    });               

  }
  return (
    <div className='container w-75 p-3'>
    
        <div className='div-grupo'>           
          <div className=' p-2 div-flex'>
            <p>CARGA DATOS</p>         
              {tablaCarga.map((rec, key) =>    
              <div>            
                <a key={rec.id} href={rec.codigo}>{rec.detalle} </a> (  {rec.nota} )
              </div>   
              )}  
              <input type="file" onChange={e => fileHandler(e)}
               style={{"padding":"10px"}} accept=".xls,.xlsx" />
          </div>
          <div className=' p-2 div-flex'>
            <p>DESCARGA DATOS</p>         
              {tablaDesCarga.map((rec, key) =>    
              <div>            
                <a key={rec.id*2} href={rec.codigo}>{rec.detalle} </a> 
              </div>   
              )}         
            </div>
        </div>
      
    </div>
  )
}

export default CargasForm