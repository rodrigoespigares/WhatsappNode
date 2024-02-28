import React, { useState } from 'react'
import './Config.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { socket } from '../../socket';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { BASE_URL } from '../../config';

export default function Config() {
    const [usuario, setUsuario] = useState(null);

    socket.on("conectado", (value) => {
        setUsuario(value);
    })
    let info = "";
    if(usuario){
        
        info = <section className='configuracion__info'>
                <div>
                    <div className='configuracion__info__user__foto'>
                        <img src={usuario.foto} alt='' />
                    </div>
                    <div className='d-flex justify-content-between mt-2'>
                        <div className='galery__option__perfil'><img src={BASE_URL+"images/muestra1.jpg"} alt="" /></div>
                        <div className='galery__option__perfil'><img src={BASE_URL+"images/muestra2.jpg"} alt="" /></div>
                        <div className='galery__option__perfil'><img src={BASE_URL+"images/muestra3.jpg"} alt="" /></div>
                        <div className='galery__option__perfil'><img src={BASE_URL+"images/muestra4.jpg"} alt="" /></div>
                        <div className='galery__option__perfil'><img src={BASE_URL+"images/muestra5.jpg"} alt="" /></div>
                        <button>AÑADIR</button>
                    </div>
                </div>
                <div className='configuracion__info__user__info'>
                    <div className='d-flex'>
                        <h2 className='fs-4'>{usuario.nick}</h2>
                        <button>edit</button>
                    </div>
                    <div className='d-flex'>
                        <p>{usuario.estado}</p>
                        <button>edit</button>
                    </div>
                    <button>Save</button>
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
