import React, {useState} from 'react';
import Foot from '../components/footer'
import Menu from '../components/Menu'
import ContactenosForm from '../components/ContactenosForm'
import EmpresaForm from '../components/EmpresaForm'
import ParametrosForm from '../components/ParametrosForm'
import CargasForm from '../components/CargasForm'
import ConsultasForm from '../components/ConsultasForm'
import { useRouter } from 'next/router'
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"

export default function empresas() { 
  const router = useRouter()

  const e = router.query.e;
  const u = router.query.u;
  const n = router.query.n;

  const [opcion, setOpcion] = useState(0);
  const aviso = ['','Datos de la asociación','Parámetros','Contáctenos','Carga y Descarga datos','Consultas y Reportes'];


  return (
   
    <div className='mi-container'>
        <div className="item item-head">
          <Menu titulo='Datos de la asociación'/>
        </div>

        <div className="item item-body">
          <div className="tabset">
            <button className='btn-xs primary' onClick={() => setOpcion(1)}>Asociación</button>
            <button className='btn-xs primary' onClick={() => setOpcion(2)}>Parámetros</button>
            <button className='btn-xs primary' onClick={() => setOpcion(3)}>Contáctenos</button>
            <button className='btn-xs primary' onClick={() => setOpcion(4)}>Carga y Descarga datos</button>
            <button className='btn-xs primary' onClick={() => setOpcion(5)}>Consultas e Informes</button>
            <span>{aviso[opcion]}</span>
          </div>

          <div className="tab-panels">
            {opcion == 1 ? <EmpresaForm e={e} u={u} n={n}/> : 
            opcion == 2 ? <ParametrosForm  e={e} u={u} n={n}/> :
            opcion == 3 ? <ContactenosForm  e={e} u={u} n={n}/> :
            opcion == 4 ? <CargasForm  e={e} u={u} n={n}/> :
            opcion == 5 ? <ConsultasForm  e={e} u={u} n={n}/> :''}
              
          </div>
        </div>
        <div className="item item-foot"><Foot/></div>
    </div>
  )
}
