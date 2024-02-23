import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { socket } from '../../socket';
import './Chat.css'

export default function Chat() {
    const [mensajes, setMensajes] = useState([]);
    let [icon, setIcon] = useState([])
    
    useEffect(() => {
        let newIconArray = [];
        for (let index = 128512; index < 128572; index++) {
          let etiqueta = "&#"+index+";"
          newIconArray.push(<button onClick={clickIcon} className='icon--img' key={index} dangerouslySetInnerHTML={{__html: etiqueta}}></button>);
        }
        setIcon(newIconArray);
      }, []);
    function enviar(){
   
        let envio = document.getElementById("texto").value;
        let article = <article key={envio+Date.now()} className='enviado'>{envio}</article>
        setMensajes([...mensajes, article])
        socket.emit("mensaje",envio)
    
        document.getElementById("texto").value = ""
        document.getElementById("iconos").style.display = "none"
    
      }
    
      socket.on("mensaje", (value) => {
        let article = <article key={value} className='recibido'>{value}</article>
        setMensajes([...mensajes, article])
      })
      
      function verIconos(){
        document.getElementById("iconos").style.display == "flex"?document.getElementById("iconos").style.display = "none":document.getElementById("iconos").style.display = "flex";
      }
      function verSubir(){
        document.getElementById("archivo").style.display == "flex"?document.getElementById("archivo").style.display = "none":document.getElementById("archivo").style.display = "flex";
      }
      function clickIcon(e){
        document.getElementById("texto").value += e.target.innerHTML
      }
      function nombreArchivo(){
        
        if(document.getElementById("fileInput").files[0] == undefined){
            document.getElementById("fichero").style.display ="none"
        }
        
        console.log("entra")

        if( document.getElementById("fileInput").files[0].name != "" || document.getElementById("fileInput").files.length >0){
            let fileNameElement = document.getElementById('fileName');
            let fileName = document.getElementById("fileInput").files[0].name;
            document.getElementById("fichero").style.display ="flex"
            fileNameElement.textContent = fileName;
        }else{
            document.getElementById("fichero").style.display ="none"
        }
        
      }
      function limpiarInput(){
        console.log(document.getElementById("fileInput"))
        document.getElementById("fileInput").type = "text"
        console.log(document.getElementById("fileInput").files)
        document.getElementById("fileInput").type = "file"
        nombreArchivo()
        
      }
  return (
    <section className='chat'>
        <section className='chat__mensajes'>
            {mensajes}
        </section>
        <div className='chat__input'>
            <div id='iconos' className="iconos">{icon}</div>
            <button onClick={verIconos} className='chat__input__icon'><Icon icon="mingcute:emoji-fill" /></button>
            <div id='archivo' className="subirArchivo">
                <input onChange={nombreArchivo} type="file" id="fileInput" name='archivoCompartido'/>
                <label htmlFor="fileInput" className='chat__input__icon__color'><Icon icon="material-symbols-light:upload-file-rounded" /><span> un archivo</span></label>
            </div>
            <div id='fichero'>
                <p className='icono__grande'><Icon icon="material-symbols-light:upload-file-rounded" /></p>
                <p id="fileName"></p>
                <button>Subir</button>
                <button onClick={limpiarInput}>Cancelar</button>
            </div>

            <button onClick={verSubir} className='chat__input__icon'><Icon icon="ph:paperclip-bold" /></button>
            <input type="text" name="" id="texto" />
            <button onClick={enviar} className='chat__input__icon'><Icon icon="fa:paper-plane" /></button>
        </div>
    </section>

  )
}
