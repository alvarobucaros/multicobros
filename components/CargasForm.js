import React from 'react'
import { useRouter } from 'next/router'

function CargasForm() {
  const router = useRouter()
  
  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.a;
  const tablaCarga = [
    {id:1,codigo:'Conceptos', detalle:'Conceptos de cobro'},
    {id:2,codigo:'Grupos', detalle:'Grupos de usuarios'},
    {id:3,codigo:'Ingresos Gastos', detalle:'Detalles de ingresos y gastos'},
    {id:4,codigo:'Usuarios', detalle:'Usuarios de la aplicación'}
  ]
  const tablaDesCarga = [
    
      {id:1,codigo:'Anticipos', detalle:'Pagos anticipados'},
      {id:2,codigo:'Conceptos', detalle:'Conceptos de cobro'},
      {id:3,codigo:'Deudas', detalle:'Deudas pendientes de cobro'},
      {id:4,codigo:'Grupos', detalle:'Grupos de usuarios'},
      {id:5,codigo:'GruposUser', detalle:'Grupos de usuarios'},
      {id:6,codigo:'Ingresos Gastos', detalle:'Detalles de ingresos y gastos'}
  ]
  const handledSubmit = async (e) => {
    e.preventDefault();
    setAviso('');
  }
  return (
    <div className='container w-75 p-3'>
    
        <div className='div-grupo'>           
          <div className=' p-2 div-flex'>
            <p>CARGA DATOS</p>         
              {tablaCarga.map((rec, key) =>    
              <div>            
                <a key={rec.id} href={rec.codigo}>{rec.detalle} </a> 
                </div>   
              )}          
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