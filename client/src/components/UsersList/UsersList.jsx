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
      <div className='lista'>
        <h2>Lista de Usuarios:</h2>
        <ul>
          {usuarios.map((element) => (
            <li key={element.uid}>
              <div>
                <img src={element.foto} alt={`Foto de perfil de ${element.nick}`} />
                <p>Nick: {element.nick}</p>
                <p>UID: {element.uid}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
