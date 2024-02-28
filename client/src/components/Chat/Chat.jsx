import React, { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react';
import { socket } from '../../socket';
import './Chat.css'
import { BASE_URL } from '../../config';
import { BASE_URL_2000 } from '../../config';
import Config from '../Config/Config';

export default function Chat() {
    let [mensajes, setMensajes] = useState([]);
    let [icon, setIcon] = useState([]);
    let [nombre, setNombre] = useState("Chat Común")
    let [cambia, setCambia] = useState("enviar")
    let [id, setId] = useState("")
    let [priv, setPriv] = useState([]);
    let [fichero, setFich] = useState(true)
    let [userWriting,setUserWriting] = useState([])
    let escribiendoTime = useRef(null);

    useEffect(() => {
        let newIconArray = [];
        for (let index = 128512; index < 128572; index++) {
            let etiqueta = "&#" + index + ";"
            newIconArray.push(<button onClick={clickIcon} className='icon--img' key={index} dangerouslySetInnerHTML={{ __html: etiqueta }}></button>);
        }
        setIcon(newIconArray);
        return () => {
            clearTimeout(escribiendoTime.current);
        };
    }, []);
    socket.on("mensaje", (value) => {
        let article =   <article key={value.text + Date.now()} className='recibido my-2'>
                            <h6>{value.user}</h6> 
                            <p>{value.text}</p>  
                        </article>
        setMensajes([...mensajes, article])
    })
    function renderizarMensajes() {
        
        if(nombre != "Chat Común"){
            const mensajesPrivados = priv[nombre];
            if (mensajesPrivados) {
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
                if (document.getElementById("fileInput").files[0].type.startsWith('image/')) {
                    setFich(false);
                } else {
                    setFich(true);
                }
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
        let endpoint = BASE_URL_2000 + "upload";
        let archivo = fileInput.files[0];
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
            let article =   <article key={Date.now()+data.name} className='d-flex enviado my-2'>
                                <p>{data.name}</p>
                                <a href={BASE_URL_2000+"download?fileName=" + data.name} download><Icon icon="material-symbols:download-2" /></a>
                            </article>
            if(nombre != "Chat Común"){
                setPriv(prevState => ({
                    ...prevState,
                    [nombre]: prevState[nombre] ? [...prevState[nombre], article] : [article],
                }));
            }else{
                setMensajes([...mensajes, article])
            }
            socket.emit("archivo", data.name)
            limpiarInput();
        }).catch((error) => {
            console.error('Error:', error);
            // Aquí puedes manejar los errores que ocurran durante la solicitud
        });
    }
    socket.on("archivo", (value) => {
        let article =   <article key={value.text + Date.now()} className='recibido my-2'>
                            <h6>{value.user}</h6> 
                            <p>{value.archivo}</p>
                            <a href={BASE_URL_2000+"download?fileName=" + value.archivo} download><Icon icon="material-symbols:download-2" /></a>
                        </article>
        if(nombre != "Chat Común"){
            if (priv[value.user] !== undefined) {
                setPriv({ ...priv, [value.user]: [...priv[value.user], article] });
            } else {
                setPriv({ ...priv, [value.user]: [article] });
            }
        }else{
            setMensajes([...mensajes, article])
        }
    })
    function subirImagen() {
        let fileInput = document.getElementById("fileInput");
        let endpoint = BASE_URL_2000+"upload";
        let archivo = fileInput.files[0];
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
            let article =   <article key={Date.now()+data.name} className='d-flex flex-column enviado my-2'>
                                <div className='mensaje__img'>
                                    <img src={BASE_URL+"upload/"+data.name} alt={data.name} />
                                </div>
                                <a href={BASE_URL_2000+"download?fileName=" + data.name} download><Icon icon="material-symbols:download-2" /></a>
                            </article>
            if(nombre != "Chat Común"){
                setPriv(prevState => ({
                    ...prevState,
                    [nombre]: prevState[nombre] ? [...prevState[nombre], article] : [article],
                }));
            }else{
                setMensajes([...mensajes, article])
            }
            socket.emit("imagen", data.name)
            limpiarInput();
        }).catch((error) => {
            console.error('Error:', error);
            // Aquí puedes manejar los errores que ocurran durante la solicitud
        });
    }
    socket.on("imagen", (value) => {
        let article =   <article key={value.text + Date.now()} className='d-flex flex-column recibido my-2'>
                            <h6>{value.user}</h6> 
                            <div className='mensaje__img'>
                                <img className='w-100' src={BASE_URL+"upload/"+value.imagen} alt={value.imagen} />
                            </div>
                            <a href={BASE_URL_2000+"download?fileName=" + value.imagen} download><Icon icon="material-symbols:download-2" /></a>
                        </article>
        if(nombre != "Chat Común"){
            if (priv[value.user] !== undefined) {
                setPriv({ ...priv, [value.user]: [...priv[value.user], article] });
            } else {
                setPriv({ ...priv, [value.user]: [article] });
            }
        }else{
            setMensajes([...mensajes, article])
        }
    })
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
        if(nombre == "Chat Común"){
            clearTimeout(escribiendoTime.current);
            escribiendoTime.current = setTimeout(() => {
                socket.emit("escribiendo", false);
            }, 3000);
        }
        let envio = document.getElementById("texto").value;
        if((e.code == "Enter" || e.code == null) && envio != "" ){
            let article = <article key={envio + Date.now()} className='enviado my-2'><p>{envio}</p></article>
            if(nombre=="Chat Común"){
                setMensajes([...mensajes, article])
                socket.emit("mensaje", envio)
            }else{
                setPriv(prevState => ({
                    ...prevState,
                    [nombre]: prevState[nombre] ? [...prevState[nombre], article] : [article],
                }));
                socket.emit('mensajePrivado', { mensaje: envio, destinatarioId: id });
            }
            document.getElementById("texto").value = ""
            document.getElementById("iconos").style.display = "none"
            if(nombre == "Chat Común"){
                socket.emit("escribiendo", false);
            }
        }else if(nombre == "Chat Común"){
            socket.emit("escribiendo", true);
        }
    }
    socket.on("escribiendo", (value) => {
        
        if(value.if && !userWriting.includes(value.user.nick)){
            setUserWriting([...userWriting,value.user.nick])
        }else if(!value.if){
            setUserWriting(prevUserWriting => prevUserWriting.filter(nick => nick !== value.user.nick));  
        }
    })
    socket.on("mensajePrivado", (value) => {
        let article =   <article key={value.text + Date.now()} className='recibido my-2'>
                            <h6>{value.user}</h6> 
                            <p>{value.text}</p>  
                        </article>
        if(value.grupo != undefined){
            if (priv[value.grupo] !== undefined) {
                setPriv({ ...priv, [value.grupo]: [...priv[value.grupo], article] });
            } else {
                setPriv({ ...priv, [value.grupo]: [article] });
            }
        }else{
            if (priv[value.user] !== undefined) {
                setPriv({ ...priv, [value.user]: [...priv[value.user], article] });
            } else {
                setPriv({ ...priv, [value.user]: [article] });
            }
        }
        
    });
    socket.on("conectado", (value) => {
        let article = <div key={"div"+value.uid+Date.now()} className='d-flex justify-content-center w-100'> <article key={value.uid+Date.now()} className='conect my-2'>{value.nick} se ha unido al chat</article> </div>
        setMensajes([...mensajes, article])
    })
    socket.on("desconectado", (value) => {
        let article = <div key={"div"+value.uid+Date.now()} className='d-flex justify-content-center w-100'> <article key={value.uid+Date.now()} className='conect my-2'>{value.nick} ha salido del chat</article> </div>
        setMensajes([...mensajes, article])
    })
    socket.on("conectGrupo", (value) => {
        let article = <div key={"div"+value.user.uid+Date.now()} className='d-flex justify-content-center w-100'> <article key={value.user.uid+Date.now()} className='conect my-2'>{value.user.nick} se ha unido al chat</article> </div>
        
        if (priv[value.grupo] !== undefined) {
            setPriv({ ...priv, [value.grupo]: [...priv[value.grupo], article] });
        } else {
            setPriv({ ...priv, [value.grupo]: [article] });
        }
       
    })
    return (
        <>
            <section className='c'>
                <h2 className='text-white'>{nombre}</h2>
                <section className='chat'>
                
                    <section className='chat__mensajes'>
                        {renderizarMensajes()}
                    </section>
                    <div className='px-4' style={{ display: (userWriting.length>0 && nombre == "Chat Común") ? 'block' : 'none' }}>
                        <p className='text-white'>{userWriting.join(', ')} está escribiendo...</p>
                    </div>
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
                        <div id='fichero' className='text-white'>
                            <button className='btn fs-1' onClick={limpiarInput}><Icon icon="material-symbols:close" /></button>
                            <div className='d-flex flex-column align-items-center fichero__content'>
                                <p className='icono__grande'><Icon icon="material-symbols-light:upload-file-rounded" /></p>
                                <p id="fileName"></p>
                                <button className='btn' onClick={fichero?subirArchivo:subirImagen}><Icon icon="fa:paper-plane" /></button>
                            </div>
                        </div>

                        <button onClick={verSubir} className='chat__input__icon'><Icon icon="ph:paperclip-bold" /></button>
                        <input onKeyUp={enviar} type="text" name="" id="texto" />
                        <button onClick={enviar} className='chat__input__icon'><Icon icon="fa:paper-plane" /></button>
                    </div>
                </section>
            </section>
            <Config></Config>
        </>
    )
}
