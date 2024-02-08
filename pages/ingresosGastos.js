import React from 'react'
import Foot from '../components/footer'
import Menu from '../components/Menu'
import IngreGastForm from '../components/IngreGastForm'
import { useRouter } from 'next/router' 

export default function ingresosGastos() { 
  const router = useRouter()

  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.n;

  return (
    <div className='mi-container'>
        <div className="item item-head"><Menu titulo='Ingresos y Gastos'/></div>
        <div className="item item-body">
         <IngreGastForm e={e} u={u} n={n}/> 
        </div>
        <div className="item item-foot"><Foot/></div>
    </div>
  )
}
