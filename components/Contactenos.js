import React, {useState} from 'react';
import { useRouter } from 'next/router'
import {Button, Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap"
import Link from 'next/link'
import styles from '../styles/Home.module.css'

function Contactenos() {
    const router = useRouter()
  
    const e = router.query.e;
    const u = router.query.u;
    const n = router.query.a;

    const [aviso, setAviso] =useState('');

    const handledChange = ({target: {name, value}}) => {
        setContactos({...contactos, [name]: value});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setAviso('');
    }

    const [contactos, setContactos] = useState({ 
         id:'', 
         co_idempresa:e, 
         co_nombre:'', 
         co_email:'', 
         co_asunto:'', 
         co_mensaje:'', 
         co_telefono:'', 
         co_fecha:''     
    });
    

  return (
    <div>
      <p className={styles.description}>
       
        <code className={styles.code}>Contactenos</code>
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="first">First Name</label>
        <input type="text" id="first" name="first" required />
        <label htmlFor="last">Last Name</label>
        <input type="text" id="last" name="last" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contactenos