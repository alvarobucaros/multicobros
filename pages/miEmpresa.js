import React from 'react'
import MiEmpresaForm from '../components/MiEmpresaForm'
import { useRouter } from 'next/router'

export default function cobros() {
  const router = useRouter()

  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.n;

  return (
    <div className='mi-empresa'>
      {/* <h3 className='item-body'>CREA UNA EMPRESA</h3> */}
        <div className="">
         <MiEmpresaForm/> 
        </div>
    </div>
  )
}