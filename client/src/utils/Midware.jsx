import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config.js';
import Loading from '../components/Loading/Loading.jsx';
import { socket } from '../socket.js';

const Midware = ({ Component }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      console.log(user)
      setIsAuth(!!user);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <Loading></Loading>
  }

  return isAuth ? <Component /> : <Navigate to="/" />;
};

export default Midware;
