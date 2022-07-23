import React from 'react'
import Foot from '../components/footer'
import Menu from '../components/Menu'
import AbonosForm from '../components/AbonosForm'
import { useRouter } from 'next/router'

export default function anticipos() {
  const router = useRouter()

  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.n;

  return (
    <div className='mi-container'>
        <div className="item item-head"><Menu titulo='Pago de deuda '/></div>
        <div className="item item-body">
         <AbonosForm e={e} u={u} n={n}/> 
        </div>
        <div className="item item-foot"><Foot/></div>
    </div>

    
  )
}