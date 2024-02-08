import React, {useState} from 'react';
import Head from 'next/head'
import Menu from '../components/Menu'
import Foot from '../components/footer'
import Login from '../pages/login'

export default function Home() {

  const [data, setData] = useState('');
  const [autentica, setAutentica] = useState(true);
  
  return (
    <div>
      <Head>
        <title>MultiCobros</title>
        <meta name="description" content="Producto de AOrtizC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
        <header> 
          {
            (autentica)
            ? <Menu/>
            : <Login/>
          }
        </header>
  
      <Foot/>
    </div>
  )
}
