import React from 'react'
import Foot from '../components/footer'
import Menu from '../components/Menu'
import GrupoUserForm from '../components/GrupoUserForm'
import { useRouter } from 'next/router'

export default function usuarios() {
  const router = useRouter()

  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.n;

  return (
    <div className='mi-container'>
        <div className="item item-head"><Menu titulo='Usuarios en un grupo'/></div>
        <div className="item item-body">
         <GrupoUserForm e={e} u={u} n={n}/> 
        </div>
        <div className="item item-foot"><Foot/></div>
    </div>

    
  )
}