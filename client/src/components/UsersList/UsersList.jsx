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
  
    return (
      <div className='lista px-5'>
        <h2 className='text-white'>Lista de Usuarios:</h2>
        <section>
          {usuarios.map((element) => (
            <article className='d-flex align-items-center my-3 text-white usuario' key={element.uid}>
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
