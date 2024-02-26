import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import { Icon } from '@iconify/react';
import './Info.css';

export default function Info() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        socket.on('newUser', (value) => {
          const userObj = value.find((objeto) => objeto.uid === user.uid);
          setUsuario(userObj);
        });
      } else {
        // User is signed out
        setUsuario(null);
      }
    });

    return () => {
      // Unsubscribe when the component is unmounted
      unsubscribe();
    };
  }, []);

  function cerrarSesion() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        // Handle error
      });
  }

  let login = '';
  if (usuario) {
    login = (
      <div className='user__control'>
        <button onClick={cerrarSesion} className='btn fs-3'>
          <Icon icon='mynaui:config-vertical' />
        </button>
        <button onClick={cerrarSesion} className='btn fs-3'>
          <Icon icon='mdi:exit-run' />
        </button>
      </div>
    );
  }

  return (
    <div className='d-flex align-items-center justify-content-evenly user'>
      {usuario && (
        <>
          <div className='user__foto'>
            <img src={usuario.foto} alt='' />
          </div>
          <div>
            <h2 className='fs-4'>{usuario.nick}</h2>
            <p>{usuario.estado}</p>
          </div>
          {login}
        </>
      )}
    </div>
  );
}