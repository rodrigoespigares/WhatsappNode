import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { socket } from '../../socket';
import './Chat.css'
import { BASE_URL } from '../../config';

export default function Chat() {
    let [mensajes, setMensajes] = useState([]);
    let [icon, setIcon] = useState([]);
    let [nombre, setNombre] = useState("Chat Común")
    let [cambia, setCambia] = useState("enviar")
    let [id, setId] = useState("")
    let [priv, setPriv] = useState([]);

    useEffect(() => {
        let newIconArray = [];
        for (let index = 128512; index < 128572; index++) {
            let etiqueta = "&#" + index + ";"
            newIconArray.push(<button onClick={clickIcon} className='icon--img' key={index} dangerouslySetInnerHTML={{ __html: etiqueta }}></button>);
        }
        setIcon(newIconArray);
    }, []);
    

    socket.on("mensaje", (value) => {
        let article =   <article key={value.text + Date.now()} className='recibido'>
                            <h6>{value.user}</h6> 
                            <p>{value.text}</p>  
                        </article>
        setMensajes([...mensajes, article])
    })


    function renderizarMensajes() {
        
        if(nombre != "Chat Común"){
            const mensajesPrivados = priv[nombre];
            if (mensajesPrivados) {
                console.log("ENtrando")
                return mensajesPrivados.map((mensaje, index) => (
                    <div key={index}>
                        {mensaje}
                    </div>
                ));
            }
            return null;
        }else{
            return mensajes
        }
        
    }

    function verIconos() {
        document.getElementById("iconos").style.display == "flex" ? document.getElementById("iconos").style.display = "none" : document.getElementById("iconos").style.display = "flex";
    }
    function verSubir() {
        document.getElementById("archivo").style.display == "flex" ? document.getElementById("archivo").style.display = "none" : document.getElementById("archivo").style.display = "flex";
    }
    function clickIcon(e) {
        document.getElementById("texto").value += e.target.innerHTML
    }
    function nombreArchivo() {
        if (document.getElementById("fileInput").files[0] != undefined) {
            if (document.getElementById("fileInput").files[0].name != "" || document.getElementById("fileInput").files.length > 0) {
                let fileNameElement = document.getElementById('fileName');
                let fileName = document.getElementById("fileInput").files[0].name;
                document.getElementById("fichero").style.display = "flex"
                fileNameElement.textContent = fileName;
            } else {
                document.getElementById("fichero").style.display = "none"
            }
        } else {
            document.getElementById("fichero").style.display = "none"
        }
    }
    function limpiarInput() {
        document.getElementById("fileInput").type = "text"
        document.getElementById("fileInput").type = "file"
        nombreArchivo()
    }
    function subirArchivo() {
        let fileInput = document.getElementById("fileInput");
        let endpoint = "http://192.168.56.1:2000/upload";
        let archivo = fileInput.files[0];
        console.log(archivo.name)
        let form = new FormData();
        form.append("fichero", archivo);
    
        fetch(endpoint, {
            method: 'POST',
            body: form
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            let article =   <article key={Date.now()+data.name} className='d-flex enviado'>
                                <p>{data.name}</p>
                                <a href="#" download={BASE_URL + "upload/" + data.name}><Icon icon="material-symbols:download-2" /></a>
                            </article>
            if(nombre != "Chat Común"){
                setPriv(prevState => ({
                    ...prevState,
                    [nombre]: prevState[nombre] ? [...prevState[nombre], article] : [article],
                }));
            }else{
                setMensajes([...mensajes, article])
            }
            limpiarInput();
        }).catch((error) => {
            console.error('Error:', error);
            // Aquí puedes manejar los errores que ocurran durante la solicitud
        });
    }
    function subirImagen() {
        let fileinput = document.getElementById("fileInput");
        let endpoint = "http://192.168.56.1:3000/upload";
        let archivo = fileinput.files[0];
        let form = new FormData();
        form.append("fichero", archivo);
        fetch(endpoint, {
            method: 'POST',
            body: form
        }).then(response => response.text())
            .then(data => {
                limpiarInput();
                // Mandar al chat imagen
            }).catch((err) => {
                console.log("ERROR")
            }
        )
    }

    socket.on("cambioUser",(value) => {
        if(value!=null){
            setNombre(value.nick)
            setCambia("enviarMP")
            setId(value.id)
        }else{
            setNombre("Chat Común")
            setCambia("enviar")
        }
    })
    function enviar(e) {
        let envio = document.getElementById("texto").value;
        if((e.code == "Enter" || e.code == null) && envio != "" ){
            
            let article = <article key={envio + Date.now()} className='enviado'>{envio}</article>
            setMensajes([...mensajes, article])
            socket.emit("mensaje", envio)

            document.getElementById("texto").value = ""
            document.getElementById("iconos").style.display = "none"
        }
    }
    function enviarMP(e){
        let envio = document.getElementById("texto").value;
        if((e.code == "Enter" || e.code == null) && envio != "" ){
            let article = <article key={envio + Date.now()} className='enviado'>{envio}</article>
            setPriv(prevState => ({
                ...prevState,
                [nombre]: prevState[nombre] ? [...prevState[nombre], article] : [article],
            }));
            socket.emit('mensajePrivado', { mensaje: envio, destinatarioId: id });

            document.getElementById("texto").value = ""
            document.getElementById("iconos").style.display = "none"
        }
        
    }
    socket.on("mensajePrivado", (value) => {
        console.log("HOLA")
        let article =   <article key={value.text + Date.now()} className='recibido'>
                            <h6>{value.user}</h6> 
                            <p>{value.text}</p>  
                        </article>
        setPriv(prevState => ({
          ...prevState,
          [value.user]: prevState[value.user] ? [...prevState[value.user], article] : [article],
        }));
    });

    return (
        <section className='c'>
            <h2 className='text-white'>{nombre}</h2>
            <section className='chat'>
            
                <section className='chat__mensajes'>
                    {renderizarMensajes()}
                </section>
                <div className='chat__input'>
                    <div id='iconos' className="iconos">{icon}</div>
                    <button onClick={verIconos} className='chat__input__icon'><Icon icon="mingcute:emoji-fill" /></button>
                    <div id='archivo' className="subirArchivo">
                        <div className="archivos">
                            <input onChange={nombreArchivo} type="file" id="fileInput" name='archivoCompartido' />
                            <label htmlFor="fileInput" className='chat__input__icon__color archivo'><Icon icon="material-symbols-light:upload-file-rounded" /><span> un archivo</span></label>
                        </div>
                        <div className="archivos">
                            <input onChange={nombreArchivo} type="file" id="imgInput" name='imagenCompartido' accept="image/*"/>
                            <label htmlFor="imgInput" className='chat__input__icon__color foto'><Icon icon="material-symbols-light:photo-camera" /><span> una imagen</span></label>
                        </div>
                    </div>
                    <div id='fichero'>
                        <p className='icono__grande'><Icon icon="material-symbols-light:upload-file-rounded" /></p>
                        <p id="fileName"></p>
                        <button onClick={subirArchivo}>Subir</button>
                        <button onClick={limpiarInput}>Cancelar</button>
                    </div>

                    <button onClick={verSubir} className='chat__input__icon'><Icon icon="ph:paperclip-bold" /></button>
                    <input onKeyUp={cambia === "enviar" ? enviar : enviarMP} type="text" name="" id="texto" />
                    <button onClick={cambia === "enviar" ? enviar : enviarMP} className='chat__input__icon'><Icon icon="fa:paper-plane" /></button>
                </div>
            </section>

        </section>
    )
}
