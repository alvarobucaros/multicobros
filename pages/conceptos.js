import React from 'react'
import Foot from '../components/footer'
import Menu from '../components/Menu'
import ConceptosForm from '../components/ConceptosForm'
import { useRouter } from 'next/router'

export default function conceptos() {
  const router = useRouter()

  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.n;

  return (
    <div className='mi-container'>
        <div className="item item-head"><Menu titulo='Acualiza conceptos'/></div>
        <div className="item item-body">
         <ConceptosForm e={e} u={u} n={n}/> 
        </div>
        <div className="item item-foot"><Foot/></div>
    </div>

    
  )
}