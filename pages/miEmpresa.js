import React from 'react'
import Foot from '../components/footer'
import Menu from '../components/Menu'
import MiEmpresaForm from '../components/MiEmpresaForm'
import { useRouter } from 'next/router'

export default function cobros() {
  const router = useRouter()

  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.n;

  return (
    /*
    <div className='mi-container'>
        <div className="item item-head"><Menu titulo='Crea una sociedad y un usuario master'/></div>
        <div className="item item-body">
         <MiEmpresaForm/> 
        </div>
        <div className="item item-foot"><Foot/></div>
    </div>
*/

    <div className='mi-empresa'>
      <h3 className='item-body'>CREA UNA EMPRESA</h3>
        <div className="">
         <MiEmpresaForm/> 
        </div>
    </div>
  )
}