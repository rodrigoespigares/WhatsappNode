import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import {
  createBrowserRouter,
  RouterProvider, Outlet
} from "react-router-dom";
import './App.css'
import Error from './components/Error/Error';
import Login from './components/Login/Login';
import InChat from './views/InChat/InChat';
import 'bootstrap/dist/css/bootstrap.min.css';
import Midware from './utils/Midware';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  

  
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    
    socket.on("entradaUsuarios", (msg) => {console.log(msg)})
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
    
  }, []);

  const router = createBrowserRouter([
    {
      element: (
        <>
            <Outlet></Outlet>
        </>
      ),
      children:[
        {
          path: "/",
          element: <Login></Login>
        },
        {
          path: "/chat",
          element: <Midware Component={InChat}></Midware>
        },
        {
          path: "*",
          element:
            <Error></Error>
        }
      ]
    },
  ]);
  
  return (
    <div className="App">
       <RouterProvider router={router} /> 
      
    </div>
  );
}
