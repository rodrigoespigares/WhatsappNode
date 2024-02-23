import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { socket } from './socket';
import './App.css'

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    
    socket.on("entradaUsuarios", (msg) => {console.log(msg)})
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  function enviar(){
   
    let envio = document.getElementById("texto").value;
    let article = <article className='enviado'>{envio}</article>
    setMensajes([...mensajes, article])
    socket.emit("mensaje",envio)

  }

  socket.on("mensaje", (value) => {
    console.log(value)
    let article = <article className='recibido'>{value}</article>
    setMensajes([...mensajes, article])
  })

  return (
    <div className="App">
      
      <section className='chat'>
        <section className='chat__mensajes'>
          {mensajes}
        </section>
        <div className='chat__input'>
            <input type="text" name="" id="texto" />
            <button onClick={enviar} className='chat__input__enviar'><Icon icon="fa:paper-plane" /></button>
            
        </div>
      </section>
    </div>
  );
}
