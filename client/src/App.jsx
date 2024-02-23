import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { socket } from './socket';
import './App.css'

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [iconos, setIconos] = useState("no-visible")
  let [icon, setIcon] = useState([])

  
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    let cod = [];
    for (let index = 128512; index < 128572; index++){
      console.log(index)
      setIcon([...icon,index]);     
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
    let article = <article key={envio+Date.now()} className='enviado'>{envio}</article>
    setMensajes([...mensajes, article])
    socket.emit("mensaje",envio)

  }

  socket.on("mensaje", (value) => {
    console.log(value)
    let article = <article key={value} className='recibido'>{value}</article>
    setMensajes([...mensajes, article])
  })
  
  let iconogragia = icon.map((e) => {
    <p>{e}</p>
  })
  function verIconos(){

  }
  return (
    <div className="App">
      
      <section className='chat'>
        <section className='chat__mensajes'>
          {mensajes}
        </section>
        <div className='chat__input'>
            <div className={iconos}>{iconogragia}</div>
            <button onClick={verIconos} className='chat__input__icon'><Icon icon="mingcute:emoji-fill" /></button>
            <button className='chat__input__icon'><Icon icon="ph:paperclip-bold" /></button>
            <input type="text" name="" id="texto" />
            <button onClick={enviar} className='chat__input__icon'><Icon icon="fa:paper-plane" /></button>
            
        </div>
      </section>
    </div>
  );
}
