import React, {useState, useEffect} from 'react';

export default function Salida() {
    const [autentica, setAutentica] = useState(false);
  
    useEffect(() => {
      setAutentica(false);
    });
}