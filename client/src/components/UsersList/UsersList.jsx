import React, { useEffect, useState } from 'react'
import { socket } from '../../socket';
import './UsersList.css'


export default function UsersList() {
    let [usuarios, setUsuarios] = useState([]);
  
    useEffect(() => {
      socket.on("newUser", (value) => {
        setUsuarios(value);
      });
  
      return () => {
        socket.off("newUser");
      };
    }, []);

    function activar(e,uid){
      if(document.getElementsByClassName("usuario__activo").length>0){
      document.getElementsByClassName("usuario__activo")[0].classList.remove("usuario__activo");
      }
      e.target.classList.add("usuario__activo")
      
      
      socket.emit("clickUser", uid);
    }
  
    return (
      <div className='lista'>
        <h2 className='text-white px-5'>Lista de Usuarios:</h2>
        <section>
            <article onClick={(e) => activar(e,"default")} className='d-flex align-items-center my-3 text-white usuario px-5 py-3' key={"default"}>
              <h2 className='px-3 usuario__name' style={{ pointerEvents: 'none' }}>Chat común</h2>
            </article>
            <article onClick={(e) => activar(e,"programacion")} className='d-flex align-items-center my-3 text-white usuario px-5 py-3' key={"futbol"}>
              <h2 className='px-3 usuario__name' style={{ pointerEvents: 'none' }}>Programación</h2>
            </article>
          {usuarios.map((element) => (
            <article onClick={(e) => activar(e, element.uid)} className='d-flex align-items-center my-3 text-white usuario px-5 py-3' key={element.uid}>
              <div className='usuario__img' style={{ pointerEvents: 'none' }}>
                <img src={element.foto} alt={`Foto de perfil de ${element.nick}`} />
              </div>
              <h2 className='px-3 usuario__name' style={{ pointerEvents: 'none' }}>{element.nick}</h2>
            </article>
          ))}
        </section>
      </div>
    );
  }
