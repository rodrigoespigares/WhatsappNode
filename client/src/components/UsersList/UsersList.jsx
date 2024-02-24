import React, { useEffect, useState } from 'react'
import { socket } from '../../socket';
import './UsersList.css'


export default function UsersList() {
    let [usuarios, setUsuarios] = useState([]);
    let [users, setUsers] = useState([]);
  
    useEffect(() => {
      socket.on("newUser", (value) => {
        console.log(value)
        setUsuarios(value);
      });
  
      return () => {
        socket.off("newUser");
      };
    }, []);

    function activar(e){
      if(document.getElementsByClassName("usuario__activo").length>0){
      document.getElementsByClassName("usuario__activo")[0].classList.remove("usuario__activo");
      }
      e.target.classList.add("usuario__activo")
    }
  
    return (
      <div className='lista'>
        <h2 className='text-white px-5'>Lista de Usuarios:</h2>
        <section>
          {usuarios.map((element) => (
            <article onClick={activar} className='d-flex align-items-center my-3 text-white usuario px-5 py-3' key={element.uid}>
              <div className='usuario__img'>
                <img src={element.foto} alt={`Foto de perfil de ${element.nick}`} />
              </div>
              <h2 className='px-3'>{element.nick}</h2>
            </article>
          ))}
        </section>
      </div>
    );
  }
