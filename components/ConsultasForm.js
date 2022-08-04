import React from 'react'
import { useRouter } from 'next/router'

function Consultas() {
  const router = useRouter()
  
  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.a;

  const handledSubmit = async (e) => {
    e.preventDefault();
    setAviso('');
  }

  return (
    <div className='container'>
      <main className="w-75 p-3">
        <div className='container'>           
          <form onSubmit={handledSubmit}>
            <div>
              <a href="">Saldo actual Movimiento de Ingresos y gastos</a>
            </div>
            <div>
              <a href="">Grupos y sus usuarios</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Consultas