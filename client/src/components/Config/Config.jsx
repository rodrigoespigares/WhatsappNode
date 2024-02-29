import React, { useState } from 'react'
import './Config.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { socket } from '../../socket';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { BASE_URL } from '../../config';

export default function Config() {
    let [usuario, setUsuario] = useState(null);
    let [tempIMG, setTemp] = useState("");
    let [estado, setEstado] = useState("");
    let [name, setName] = useState("");
    
    function cambioFoto(e){
        setTemp(e.target.src)

    }
    function save(){
        if(tempIMG == ""){
            setTemp(usuario.foto)
        }

        let imagen = tempIMG == ""? usuario.foto: tempIMG;


        let mnd = {
            name: name,
            foto: imagen,
            estado: estado
        }

        socket.emit("configurando", mnd);
    }

    socket.on("conectado", (value) => {
        setUsuario(value);
        setEstado(value.estado)
        setName(value.nick)
    })
    let info = "";
    if(usuario){
        
        info = <section className='configuracion__info'>
                <div>
                    <div className='configuracion__info__user__foto'>
                        <img src={tempIMG==''?usuario.foto:tempIMG} alt='' />
                    </div>
                    <div className='d-flex justify-content-between mt-2'>
                        <div onClick={cambioFoto} className='galery__option__perfil'><img src={BASE_URL+"images/muestra1.jpg"} alt="" /></div>
                        <div onClick={cambioFoto} className='galery__option__perfil'><img src={BASE_URL+"images/muestra2.jpg"} alt="" /></div>
                        <div onClick={cambioFoto} className='galery__option__perfil'><img src={BASE_URL+"images/muestra3.jpg"} alt="" /></div>
                        <div onClick={cambioFoto} className='galery__option__perfil'><img src={BASE_URL+"images/muestra4.jpg"} alt="" /></div>
                        <div onClick={cambioFoto} className='galery__option__perfil'><img src={BASE_URL+"images/muestra5.jpg"} alt="" /></div>
                        <div className='contenedor'>
                            <div className="add_file">
                                <input  type="file" id="imgInput" name='imagenCompartido' accept="image/*"/>
                                <label htmlFor="imgInput" className='btn fs-4'><Icon icon="material-symbols:add"/></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='configuracion__info__user__info'>
                    <h3>Nombre de usuario:</h3>
                    <div className='d-flex mb-5'>
                        <input id='confname' type="text" value={name} className='btn' onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                        <button onClick={() => {
                            if(document.getElementById("confname").classList.contains("linea")){
                                document.getElementById("confname").classList.remove("linea")
                            }else{
                                document.getElementById("confname").classList.add("linea")
                            }
                        }} className='btn'><Icon icon="material-symbols:edit" /></button>
                    </div>
                    <h3>Estado:</h3>
                    <div className='d-flex'>
                        
                        <input id="confestado" type="text" value={estado} className='btn text-left' onChange={(e) => {
                            setEstado(e.target.value)
                        }}/>
                        <button onClick={() => {
                            if(document.getElementById("confestado").classList.contains("linea")){
                                document.getElementById("confestado").classList.remove("linea")
                            }else{
                                document.getElementById("confestado").classList.add("linea")
                            }
                            
                        }} className='btn'><Icon icon="material-symbols:edit" /></button>
                    </div>
                    <button onClick={save} className='btn fs-3'><Icon icon="mynaui:save" /></button>
                </div>
                
            </section>
    }
    return (
        <div className='position-absolute configuracion'>
            <section className='d-flex justify-content-between config__header'>
                <h2>Configuración</h2>
                <button className='btn fs-4'><Icon icon="material-symbols:close" /></button>
            </section>
            {info}
        </div>
    )
}
